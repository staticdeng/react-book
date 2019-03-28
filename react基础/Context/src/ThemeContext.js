import React from 'react'

// 创建一个 theme Context
const Context = React.createContext();
const theme = 'blue';

function ThemedButton(props) {
  // ThemedButton 组件从 Context.Consumer 获取数据theme
  return (
    <Context.Consumer>
      {/* 获取数据必须内嵌一个函数 */}
      {value => <button {...props} style={{ color: value }}>button</button>}
    </Context.Consumer>
  );
}

// 中间组件
function ThemeWrap(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class App extends React.Component {
  render() {
    return (
      // Context.Provider在最外层包裹，value传递数据theme
      <Context.Provider value={theme}>
        <ThemeWrap />
      </Context.Provider>
    );
  }
}

export default App