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
    // vnode为原生标签(原生jsx)
    if ( typeof vnode.type === 'string' ) {
        return createEle( vnode );
    }
    // vnode为组件
    if ( typeof vnode.type === 'function' ) {
        return createComponent( vnode.type, vnode.props );
    }
}

// 渲染原生jsx方法
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

// 渲染组件方法
function createComponent( type, props ) {
    const instance = createComponentInstance( type, props );
    return renderComponent( instance );
}
// 创建组件的实例
function createComponentInstance( comp, props ) {
    let instance;
    // 组件类型判断 是函数类型组件还是class类型组件
    if ( comp.prototype && comp.prototype.render ) {
        // class类型组件 comp参数是一个Component的子类直接实例化，并且把props传到Component里
        instance = new comp( props );
    }else {
        // 函数类型组件 将其扩展为class类型组件
        instance = new Component( props );
        instance.constructor = comp;
        instance.render = function() {
            return this.constructor( props );
        }
    }
    return instance;
}
// 渲染组件，将组件的虚拟dom渲染成真实dom
function renderComponent( instance ) {
    const newVnode = instance.render(); // 执行render得到原生jsx
    return initVnode( newVnode );
}