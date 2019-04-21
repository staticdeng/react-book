function render(vnode, container) {
    // vnode为虚拟dom树
    const dom = initVnode(vnode);

    return container.appendChild( dom );   // 将最后的渲染结果dom添加到根节点
}

// 判断节点类型将虚拟dom转换为真实dom
function initVnode(vnode) {
    // vnode为文本节点
    if ( !vnode.type && typeof vnode === 'string' ) {
        return document.createTextNode( vnode );
    }
    // vnode为原生标签
    if ( typeof vnode.type === 'string' ) {
        return createEle(vnode);
    }
}

function createEle(vnode) {
    const { type, props } = vnode;
    const node = document.createElement( type );
    
    // 属性处理
    const { key, children, ...rest } = props;
    Object.keys( rest ).forEach( attr => {
        const value = rest[attr];
        setAttribute( node, attr, value );    // 设置属性
    } );

    // 递归渲染子节点
    props.children.forEach( child => {
        node.appendChild(initVnode(child))
    });    
    return node;
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
        if ( value ) {
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