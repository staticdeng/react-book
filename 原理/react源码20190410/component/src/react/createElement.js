function createElement(type, props, ...children) {
    delete props.__source;
    delete props.__self;
    props.children = children;
    return { type, props };
}

export default createElement;