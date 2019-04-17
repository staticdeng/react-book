function createElement(type, props, ...children) {
    delete props.__source;
    delete props.__self;
    props.children = children;
    return { type, props };
}

export class Component {
    constructor( props = {} ) {
        this.props = props;
        this.state = {};
    }
    setState() {
        // 后面实现
    }
}

const React = {
    createElement,
    Component,
};
export default React;