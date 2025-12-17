document.addEventListener('DOMContentLoaded', () => {
    // --- 主題切換按鈕邏輯 ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const activeTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = activeTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // 通知 giscus 評論區變更主題
            const giscusFrame = document.querySelector('iframe.giscus-frame');
            if (giscusFrame) {
                giscusFrame.contentWindow.postMessage({
                    giscus: {
                        setTheme: newTheme
                    }
                }, 'https://giscus.app');
            }
            
            // 更新 Medium Zoom 背景色
            if (typeof mediumZoom === 'function') {
                 const zoom = mediumZoom('.prose img:not(.pagefind-ui__result-image)');
                 zoom.update({
                    background: newTheme === 'dark' ? '#0f172a' : '#ffffff'
                 });
            }
        });
    }

    // --- 複製程式碼按鈕 & 語言標籤邏輯 ---
    document.querySelectorAll('div.highlight').forEach(block => {
        // 1. Copy Button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-button';
        copyButton.type = 'button';
        copyButton.innerText = 'Copy';
        copyButton.addEventListener('click', () => {
            const code = block.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.innerText = 'Copied!';
                setTimeout(() => {
                    copyButton.innerText = 'Copy';
                }, 2000);
            });
        });
        block.appendChild(copyButton);

        // 2. Language Label
        const codeElement = block.querySelector('code[data-lang]');
        if (codeElement) {
            const lang = codeElement.getAttribute('data-lang');
            if (lang) {
                const label = document.createElement('span');
                label.className = 'code-language-label';
                label.innerText = lang.toUpperCase();
                block.appendChild(label);
            }
        }
    });

    // --- 圖片燈箱 (Medium Zoom) ---
    if (typeof mediumZoom === 'function') {
        mediumZoom('.prose img:not(.pagefind-ui__result-image)', {
            margin: 24,
            background: document.documentElement.getAttribute('data-theme') === 'dark' ? '#0f172a' : '#ffffff',
            scrollOffset: 0,
        });
    }

    // --- 目錄高亮邏輯 ---
    const tocLinks = document.querySelectorAll('.post-toc-sidebar nav#TableOfContents a');
    const headings = Array.from(tocLinks).map(link => {
        try {
            const id = decodeURIComponent(link.getAttribute('href').substring(1));
            return document.getElementById(id);
        } catch (e) {
            return null;
        }
    }).filter(Boolean);

    if (headings.length > 0) {
        const observer = new IntersectionObserver(entries => {
            let visibleHeadings = [];
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    visibleHeadings.push(entry.target);
                }
            });

            if (visibleHeadings.length > 0) {
                const topHeading = visibleHeadings.reduce((prev, curr) => {
                    return prev.getBoundingClientRect().top < curr.getBoundingClientRect().top ? prev : curr;
                });

                tocLinks.forEach(link => link.classList.remove('active'));
                const id = topHeading.getAttribute('id');
                const correspondingLink = document.querySelector(`.post-toc-sidebar nav#TableOfContents a[href="#${encodeURIComponent(id)}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        }, {
            rootMargin: '-80px 0px -60% 0px'
        });
        headings.forEach(heading => observer.observe(heading));
    }

    // --- Giscus 評論區初始化邏輯 ---
    const giscusContainer = document.getElementById('giscus-container');
    if (giscusContainer) {
        const script = document.createElement('script');
        script.src = "https://giscus.app/client.js";
        script.setAttribute("data-repo", "eric861129/ChiYu-Blob");
        script.setAttribute("data-repo-id", "R_kgDOO2a_UQ");
        script.setAttribute("data-category", "Announcements");
        script.setAttribute("data-category-id", "DIC_kwDOO2a_Uc4CrGzL");
        script.setAttribute("data-mapping", "pathname");
        script.setAttribute("data-strict", "0");
        script.setAttribute("data-reactions-enabled", "1");
        script.setAttribute("data-emit-metadata", "0");
        script.setAttribute("data-input-position", "top");
        script.setAttribute("data-theme", document.documentElement.getAttribute('data-theme'));
        script.setAttribute("data-lang", "zh-TW");
        script.setAttribute("crossorigin", "anonymous");
        script.async = true;
        giscusContainer.appendChild(script);
    }

    // --- 回到頂部按鈕邏輯 ---
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Mobile Sidebar Logic ---
    const mobileSidebarToggle = document.getElementById('mobile-sidebar-toggle');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (mobileSidebarToggle && mobileSidebar && sidebarOverlay) {
        mobileSidebarToggle.addEventListener('click', () => {
            mobileSidebar.classList.toggle('is-open');
            sidebarOverlay.classList.toggle('is-open');
        });

        sidebarOverlay.addEventListener('click', () => {
            mobileSidebar.classList.remove('is-open');
            sidebarOverlay.classList.remove('is-open');
        });
    }
    
    // --- 閱讀進度條邏輯 ---
    const progressBar = document.getElementById('reading-progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollPercentage + '%';
        });
    }
});

// --- Pagefind Search Initialization ---
window.initPagefind = function() {
    if (window.PagefindUI) {
        new PagefindUI({
            element: '#search',
            showSubResults: false,
            baseUrl: '/ChiYu-Blob/',
            language: 'zh-tw'
        });
    }
};
