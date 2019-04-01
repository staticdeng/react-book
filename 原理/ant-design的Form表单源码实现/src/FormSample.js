import React, { Component } from 'react'
import { Form } from './Form'

class FormSample extends Component {
  render() {
    const { getFeildDecorator } = this.props.form;
    
    return (
      <div>
        {
          getFeildDecorator('username', {
            rules: [
              { required: true, message: '请填写手机号' },
              { pattern: /^1[34578]\d{9}$/, message: '手机号格式不正确' }
            ]
          })(<input type="text" placeholder="请输入手机号" />)
        }
        {
          getFeildDecorator('password', {
            rules: [{ required: true, message: '请填写密码' }]
          })(<input type="password" placeholder="请输入密码" />)
        }
        <button>登录</button>
      </div>
    )
  }
}
const WrappedFormSample = Form.create(FormSample)
export default WrappedFormSample
