import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "云秋雁",
    pageTitleSuffix: " | 云秋雁",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "zh-CN",
    baseUrl: "blog.doub.cc.cd",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      // 2026-10-27 换皮：拉丁字母用衬线（EB Garamond / Source Serif 4），
      // 中文由 custom.scss + Head.tsx 引入霞鹜文楷。见 02-Areas/工具/Quartz博客部署_T8.md
      typography: {
        header: "EB Garamond",
        body: "Source Serif 4",
        code: "IBM Plex Mono",
      },
      // 2026-10-27 换皮：宣纸 / 墨 / 赭石
      colors: {
        lightMode: {
          light: "#fbf9f4",
          lightgray: "#e6dfd2",
          gray: "#b3ab9d",
          darkgray: "#5f594f",
          dark: "#22201c",
          secondary: "#8a4b32",
          tertiary: "#9c8f7c",
          highlight: "rgba(138, 75, 50, 0.10)",
          textHighlight: "#f2d98ccc",
        },
        darkMode: {
          light: "#15140f",
          lightgray: "#2e2b25",
          gray: "#6a655c",
          darkgray: "#cfc8bb",
          dark: "#ece6da",
          secondary: "#c99378",
          tertiary: "#8d8375",
          highlight: "rgba(201, 147, 120, 0.12)",
          textHighlight: "#5a4a1fcc",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      // 2026-10-27 修复「没分段」：日记/随笔为一行一句、无空行分隔；Obsidian 硬换行显示正常，
      // Quartz 默认按 CommonMark 合并成整段，启用 HardLineBreaks 让单个换行渲染为断行
      Plugin.HardLineBreaks(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest", prettyLinks: false }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
