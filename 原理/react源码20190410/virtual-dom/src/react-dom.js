function render(vnode, container) {
    // vnode虚拟节点，container挂载的容器
    container.innerHTML = `<pre>${JSON.stringify(vnode, null, 2)}</pre>`;
}

export default { render };