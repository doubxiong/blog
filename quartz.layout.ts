import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// 2026-10-27 改版：
//   · 去掉右栏的关系图谱 / 反向链接（34 篇互不链接的旧文，图上只有孤立点）
//   · 去掉目录树 Explorer，换成 NavLinks（全部文章 / 分类 / 关于）
//   · 正文元信息只留日期，不显示阅读时长
//   · 首页（slug === "index"）不重复渲染站名

const isHome = (props: { fileData: { slug?: string } }) => props.fileData.slug === "index"
const hasDate = (props: { fileData: { frontmatter?: Record<string, unknown> } }) =>
  Boolean(props.fileData.frontmatter?.date)

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    // 2026-10-27 上线：去掉上游 Quartz 的 GitHub/Discord 链接，改为站内「关于」页
    links: {
      关于: "/about",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
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
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.NavLinks(),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
  ],
  right: [],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs({ rootName: "首页" }), Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.NavLinks(),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
  ],
  right: [],
}
