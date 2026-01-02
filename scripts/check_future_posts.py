#!/usr/bin/env python3
"""
檢查未來日期的文章是否具備安全標記，以避免尚未公開的內容被誤佈署。
目前的流程是透過停用 buildFuture 來阻擋未來文章被建置；若有重新開啟，
本腳本會確認這些文章至少包含 draft 或 noindex 標記。
"""

from __future__ import annotations

import datetime
import pathlib
import sys
import tomllib


# 內容根目錄與 Hugo 設定檔路徑，集中管理便於維護。
CONTENT_ROOT = pathlib.Path("content")
HUGO_CONFIG = pathlib.Path("hugo.toml")


def load_config_build_future() -> bool:
    """讀取 hugo.toml 並回傳 buildFuture 設定，若缺少則預設為 False。"""

    try:
        config_data = tomllib.loads(HUGO_CONFIG.read_text(encoding="utf-8"))
    except FileNotFoundError:
        # 若缺少設定檔則以安全值為主，避免誤判。
        return False

    return bool(config_data.get("buildFuture", False))


def parse_toml_front_matter(markdown_text: str) -> dict[str, object]:
    """解析以 +++ 包起來的 TOML Front Matter，回傳欄位字典。"""

    # 簡單判斷 Front Matter 開頭，若沒有則直接返回空字典。
    if not markdown_text.startswith("+++"):
        return {}

    # 找到第二個分隔符號的位置，鎖定 Front Matter 範圍。
    second_delimiter = markdown_text.find("+++", 3)
    if second_delimiter == -1:
        return {}

    front_matter_block = markdown_text[3:second_delimiter].strip()
    if not front_matter_block:
        return {}

    try:
        return tomllib.loads(front_matter_block)
    except tomllib.TOMLDecodeError as parse_error:
        # 解析失敗時回傳空字典並留下錯誤訊息，方便日後追蹤。
        print(f"無法解析 Front Matter：{parse_error}", file=sys.stderr)
        return {}


def to_date(value: object) -> datetime.date | None:
    """嘗試將值轉換為日期物件，便於比較是否屬於未來文章。"""

    if isinstance(value, datetime.datetime):
        # 文章若包含時區或時間資訊，統一折算為日期比較。
        return value.date()

    if isinstance(value, datetime.date):
        return value

    if isinstance(value, str):
        try:
            return datetime.date.fromisoformat(value)
        except ValueError:
            return None

    return None


def find_future_entries() -> list[tuple[pathlib.Path, dict[str, object]]]:
    """尋找所有未來日期的內容頁面並回傳 (路徑, Front Matter) 清單。"""

    future_entries: list[tuple[pathlib.Path, dict[str, object]]] = []
    today = datetime.date.today()

    for markdown_file in CONTENT_ROOT.rglob("*.md"):
        # 逐一解析 Front Matter，並轉出日期物件。
        front_matter = parse_toml_front_matter(markdown_file.read_text(encoding="utf-8"))
        page_date = to_date(front_matter.get("date"))

        # 沒有日期或日期格式不符則略過，以避免誤報。
        if page_date is None:
            continue

        if page_date > today:
            future_entries.append((markdown_file, front_matter))

    return future_entries


def main() -> int:
    """主流程：依據 buildFuture 狀態決定是否嚴格檢查未來文章。"""

    build_future_enabled = load_config_build_future()
    future_entries = find_future_entries()

    if not future_entries:
        print("沒有找到未來日期的文章，無需額外處理。")
        return 0

    if not build_future_enabled:
        # 主要防線：停用 buildFuture，未來文章不會被建置。
        print(
            "偵測到未來文章，但 buildFuture 已停用，內容不會在部署時輸出。"
        )
        return 0

    # 如果 buildFuture 再次啟用，必須確保這些文章具備防護標記。
    violations = [
        path
        for path, meta in future_entries
        if not (meta.get("draft") or meta.get("noindex"))
    ]

    if violations:
        print("以下未來文章缺少 draft 或 noindex，請先補上再部署：")
        for path in violations:
            print(f" - {path}")
        return 1

    print("所有未來文章皆有 draft 或 noindex，安全性檢查通過。")
    return 0


if __name__ == "__main__":
    # 以非零碼結束可讓 CI 直接判定失敗，便於阻擋風險部署。
    sys.exit(main())
