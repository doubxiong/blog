import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// 2026-10-27 版式改版（依据 opus 5.5 排版审稿）：
//   · 单栏居中：去掉左右侧栏，站名/导航/搜索收进 title 上方的一行
//   · 标签从标题下移到正文末尾
//   · 日期只留一个，阅读时长不要

const isHome = (props: { fileData: { slug?: string } }) => props.fileData.slug === "index"
const hasDate = (props: { fileData: { frontmatter?: Record<string, unknown> } }) =>
  Boolean(props.fileData.frontmatter?.date)

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.PageTitle(),
    Component.NavLinks(),
    Component.Flex({
      components: [{ Component: Component.Search() }, { Component: Component.Darkmode() }],
      gap: "0.8rem",
    }),
  ],
  afterBody: [Component.TagList()],
  footer: Component.Footer({
    links: {
      关于: "/about",
    },
  }),
}

// 单篇文章
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (p) => !isHome(p),
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta({ showReadingTime: false }),
      condition: (p) => hasDate(p),
    }),
  ],
  left: [],
  right: [],
}

// 列表页（栏目 / 标签）
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [],
  right: [],
}
