// 来源于elementUI https://www.jianshu.com/p/c63906531fdd
// 获取滚动条宽度，最好缓存下
export default function getScrollBarWidth() {
  const outer = document.createElement("div"); // 创建外部的容器
  outer.className = "scrollbar__wrap"; // 同样会加入overflow: scroll
  outer.style.visibility = "hidden"; // 不可见
  outer.style.width = "100px"; // 设置一个宽度
  outer.style.position = "absolute"; // 绝对定位
  outer.style.top = "-9999px"; // 移除可视区域
  document.body.appendChild(outer); // 插入

  const widthNoScroll = outer.offsetWidth; // 可视宽度
  outer.style.overflow = "scroll"; // 会显示出滚动条

  const inner = document.createElement("div"); // 创建内部
  inner.style.width = "100%"; // 宽度为100%，实际上因为父级有滚动条，父级的 width 会变成 100px - 滚动条宽度
  outer.appendChild(inner); // 插入

  const widthWithScroll = inner.offsetWidth; // 内部宽度
  outer.parentNode.removeChild(outer); // 移除

  return widthNoScroll - widthWithScroll; // 滚动条宽度
}
