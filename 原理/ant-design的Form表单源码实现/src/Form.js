import React, { Component } from 'react';

// Form.create高阶组件
function create(FormComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.options = {}; // 字段配置选项
      this.state = {}; // 存储各字段值   
    }

    handleChange = e => {
      const { name, value } = e.target; // 从React.cloneElement克隆元素获取设置的name和value属性
      this.setState({
        [name]: value
      })
    }

    getFeildDecorator = (field, option) => {
      this.options[field] = option; // 用field区分option
      return (Comp) => {
        return(
          <div>
            {/* React.cloneElement克隆并返回一个新的React元素，第一个元素为克隆元素，第二个参数为克隆元素添加新的props */}
            {
              React.cloneElement(Comp, {
                name: field, // 控件名
                value: this.state[field] || '', // 控件value值
                onChange: this.handleChange, // 将onChange集中在高阶组件里处理
              })
            }
          </div>
        )
      }
    }

    render() {
      const form = {
        getFeildDecorator: (field, option) => {
          return (Comp) => {
            return this.getFeildDecorator(field, option)(Comp)
          }
        }
      }
      // 将form传递到被装饰的组件中，被装饰的组件可以通过props获取form
      return <FormComponent {...this.props} form={form}/>
    }
  }
}
export const Form = {
  create,
}


