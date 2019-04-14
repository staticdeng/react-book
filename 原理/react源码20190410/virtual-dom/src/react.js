function createElement(type, props, ...children) {
    props.children = children;
    return { type, props };
}

const React = {
    createElement,
};
export default React;