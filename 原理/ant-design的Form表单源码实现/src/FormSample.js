import React, { Component } from 'react'
import { Form } from './Form'

class FormSample extends Component {
  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if(!err) {
        console.log('表单校验成功', values)
      }else{
        console.log('表单校验失败', err)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    
    return (
      <div>
        {
          getFieldDecorator('username', {
            rules: [
              { required: true, message: '请填写手机号' },
              { pattern: /^1[34578]\d{9}$/, message: '手机号格式不正确' }
            ]
          })(<input type="text" placeholder="请输入手机号" />)
        }
        {
          getFieldDecorator('password', {
            rules: [{ required: true, message: '请填写密码' }]
          })(<input type="password" placeholder="请输入密码" />)
        }
        <button onClick={this.onSubmit}>登录</button>
      </div>
    )
  }
}
const WrappedFormSample = Form.create(FormSample)
export default WrappedFormSample
