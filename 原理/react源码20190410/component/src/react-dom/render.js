import Component from '../react/component';
import { setAttribute } from './dom';

export function render( vnode, container ) {
    // vnode为虚拟dom树
    const dom = initVnode( vnode );

    return container.appendChild( dom );   // 将最后的渲染结果dom添加到根节点
}

// 判断节点类型将虚拟dom转换为真实dom
function initVnode( vnode ) {
    // vnode为文本节点
    if ( !vnode.type && typeof vnode === 'string' ) {
        return document.createTextNode( vnode );
    }
    // vnode为原生标签
    if ( typeof vnode.type === 'string' ) {
        return createEle( vnode );
    }
    // vnode为组件
    if ( typeof vnode.type === 'function' ) {
        createComponent( vnode.type, vnode.props );
    }
}

function createEle( vnode ) {
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
        node.appendChild(initVnode( child ))
    });    
    return node;
}


// 创建组件的实例
function createComponent( component, props ) {
    let inst;
    if ( component.proptype && component.proptype.render ) {
        // class类型组件 是一个Component直接实例化，并且把props传到Component里
        inst = new component( props );
    }else {
        // 函数类型组件 将其扩展为class类型组件
        inst = new Component( props );
        inst.constructor = component;
        inst.render = function() {
            return this.constructor( props );
        }
    }
}