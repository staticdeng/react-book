import React from 'react'

const Context = React.createContext();
const theme = 'blue';

// Provider和Consumer的高阶组件
const withProvider = Com => props => (
    <Context.Provider value={theme}>
        <Com {...props} />
    </Context.Provider>
)
const withConsumer = Com => props => (
    <Context.Consumer value={theme}>
        {value => <Com {...props} value={value} />}
    </Context.Consumer>
)

function Button({value, ...rest}) {
  return (
    <button {...rest} style={{ color: value }}>button</button>
  );
}
const ThemedButton = withConsumer(Button)

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
        <ThemeWrap />
    );
  }
}

export default withProvider(App)