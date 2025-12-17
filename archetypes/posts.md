+++
title = "{{ replace .Name "-" " " | title }}"
date = {{ .Date }}
slug = "{{ .File.ContentBaseName }}"
dates = ["{{ .Date.Format "2006-01-02" }}"]
tags = []
series = []
categories = []
weight = 10
# prev_post_slug = ""
# next_post_slug = ""
draft = true
+++
