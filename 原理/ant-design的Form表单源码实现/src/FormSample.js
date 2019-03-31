import React, { Component } from 'react'
import { Form } from './Form'

class FormSample extends Component {
  render() {
    const { getFeildDecorator } = this.props.form;
    
    return (
      <div>
        {
          getFeildDecorator('username', {
            rules: [{ require: true, message: '请填写用户名' }]
          })(<input type="text" placeholder="请输入用户名" />)
        }
        {
          getFeildDecorator('password', {
            rules: [{ require: true, message: '请填写密码' }]
          })(<input type="password" placeholder="请输入密码" />)
        }
        <button>登录</button>
      </div>
    )
  }
}
const WrappedFormSample = Form.create(FormSample)
export default WrappedFormSample
