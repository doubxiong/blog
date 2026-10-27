import { QuartzTransformerPlugin } from "../types"
import { Root } from "hast"
import { visit } from "unist-util-visit"

/**
 * 2026-10-27：把 HardLineBreaks 产生的 <br> 换成 <span class="beat">。
 *
 * 为什么：<br> 加不了间距（display/margin/伪元素在 Chromium 里都不生效），
 * 而版式需要分两级——「一拍」（原文单换行，约 0.45em）和「换气」（原文空行，1.5em）。
 * 块级 span 既断行又能带高度。
 */
export const BeatBreak: QuartzTransformerPlugin = () => {
  return {
    name: "BeatBreak",
    htmlPlugins() {
      return [
        () => (tree: Root) => {
          visit(tree, "element", (node, index, parent) => {
            if (node.tagName !== "br" || parent == null || index == null) return
            parent.children[index] = {
              type: "element",
              tagName: "span",
              properties: { className: ["beat"] },
              children: [],
            }
          })
        },
      ]
    },
  }
}
