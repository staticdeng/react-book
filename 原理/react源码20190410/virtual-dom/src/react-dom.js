function render(vnode, container) {
    // 当vnode为字符串时，渲染结果是一段文本
    if ( typeof vnode === 'string' ) {
        const textNode = document.createTextNode( vnode );
        return container.appendChild( textNode );
    }

    const dom = document.createElement( vnode.type );

    // 属性处理
    if ( vnode.props ) {
        Object.keys( vnode.props ).forEach( key => {
            const value = vnode.props[ key ];
            setAttribute( dom, key, value );    // 设置属性
        } );
    }

    vnode.props.children.forEach( child => render( child, dom ) );    // 递归渲染子节点

    return container.appendChild( dom );   // 将最后的渲染结果dom添加到根节点
}

function setAttribute( dom, name, value ) {
    // 如果属性名是className，则改回class
    if ( name === 'className' ) name = 'class';

    // 如果属性名是onXXX，则是一个事件监听方法
    if ( /on\w+/.test( name ) ) {
        name = name.toLowerCase();
        dom[ name ] = value || '';
    // 如果属性名是style，则更新style对象
    } else if ( name === 'style' ) {
        if ( !value || typeof value === 'string' ) {
            dom.style.cssText = value || '';
        } else if ( value && typeof value === 'object' ) {
            for ( let name in value ) {
                // 可以通过style={ width: 20 }这种形式来设置样式，可以省略掉单位px
                dom.style[ name ] = typeof value[ name ] === 'number' ? value[ name ] + 'px' : value[ name ];
            }
        }
    // 普通属性则直接更新属性
    } else {
        if ( value && name !== 'children') {
            dom.setAttribute( name, value );
        } else {
            dom.removeAttribute( name );
        }
    }
}
const ReactDOM = {
    render: (vnode, container) => {
        container.innerHTML = '';
        return render( vnode, container );
    }
}
export default ReactDOM;