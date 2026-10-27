import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// 2026-10-27 新增：左侧导航（全部文章 / 分类 / 关于）
// 为什么自己写：Quartz 4.5.2 的 Explorer 只能显示目录树，34 篇文章会把侧栏铺满，
// 而站点真正的入口是三个固定页面。Explorer 已从 layout 里移除。
const links = [
  { label: "全部文章", slug: "全部文章" },
  { label: "分类", slug: "分类" },
  { label: "关于", slug: "about" },
]

const NavLinks: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const slug = fileData.slug ?? ""
  return (
    <nav class={classNames(displayClass, "navlinks")}>
      {links.map((l) => (
        <a href={`/${encodeURI(l.slug)}`} class={slug === l.slug ? "active" : ""}>
          {l.label}
        </a>
      ))}
    </nav>
  )
}

NavLinks.css = `
.navlinks {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0.2rem 0 1.6rem;
}
.navlinks a {
  color: var(--darkgray);
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  background: none;
  text-decoration: none;
}
.navlinks a:hover,
.navlinks a.active {
  color: var(--secondary);
}
`

export default (() => NavLinks) satisfies QuartzComponentConstructor
