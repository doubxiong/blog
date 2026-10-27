#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""normalize_u2028.py —— 把 content 里 md 文件的 U+2028（行分隔符）归一化为 \n

背景（2026-10-27）：部分历史文章的行分隔符是 U+2028，Quartz/remark 不认它，
会把多行并成一段（Obsidian 显示正常但站上"没分段"）。在构建前跑一遍兜底。
"""
import glob
import io

PATTERN = "/home/drea_/quartz/content/**/*.md"
fixed = 0
for p in glob.glob(PATTERN, recursive=True):
    with io.open(p, encoding="utf-8") as f:
        s = f.read()
    if "\u2028" in s:
        with io.open(p, "w", encoding="utf-8", newline="") as f:
            f.write(s.replace("\u2028", "\n"))
        fixed += 1
print(f"normalize_u2028: {fixed} files fixed")
