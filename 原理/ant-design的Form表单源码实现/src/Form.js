import React, { Component } from 'react';
// Form.create高阶组件
function create(FormComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.options = {}; // 表单项字段配置选项
      this.state = {}; // 存储表单项各字段值和验证错误信息
    }

    
    handleChange = e => {
      // 获取React.cloneElement克隆元素设置的name和value属性
      const { name, value } = e.target;
      // onChange事件触发时把表单项数据放到state里收集表单的数据，并且需要在setState的回调中(同步方法，等数据变化后)做数据校验
      this.setState({
        [name]: value
      }, () => {
        this.validate(name);
      });
    }
    
    // 表单项校验
    validate = field => {
      const rules = this.options[field].rules;
      const res = rules.some(rule => {
        // 必填项校验
        if (rule.required) {
          if (!this.state[field]) {
            // 校验失败信息
            this.setState({
              [field + 'Message']: rule.message
            });
            return true;  // some里返回true跳出循环
          }
        }
        // pattern校验
        if (rule.pattern) {
          if (!rule.pattern.test(this.state[field])) {
            this.setState({
              [field + 'Message']: rule.message
            });
            return true;
          }
        }
        return false;
      });

      if (!res) {
        // 校验成功
        this.setState({
          [field + 'Message']: ''
        });
      }
      return !res;
    }

    // 所有表单项校验(如提交的时候需要校验)
    validateFields = cb => {
      const validates = Object.keys(this.options).map(field => {
        return this.validate(field)
      });
      const res = validates.every(v => v === true); // 每一个表单项都验证通过，res才为true，否则为false
      if (res) {
        cb(null, this.state);
      } else {
        cb(this.state, this.state);
      }
    }

    getFieldDecorator = (field, option) => {
      this.options[field] = option; // 用field区分option
      return (Comp) => {
        return (
          <div>
            {/* React.cloneElement克隆并返回一个新的React元素，第一个元素为克隆元素，第二个参数为克隆元素添加新的props */}
            {
              React.cloneElement(Comp, {
                name: field, // 控件名
                value: this.state[field] || '', // 控件value值
                onChange: this.handleChange, // 将onChange集中在高阶组件里处理
              })
            }
            {
              this.state[field + 'Message']
              &&
              (
                <div style={{ color: 'red' }}>{this.state[field + 'Message']}</div>
              )
            }
          </div>
        )
      }
    }

    render() {
      const form = {
        getFieldDecorator: (field, option) => {
          return (Comp) => {
            return this.getFieldDecorator(field, option)(Comp)
          }
        },
        validateFields: (cb) => {
          this.validateFields(cb);
        }
      }
      // 将form传递到被装饰的组件中，被装饰的组件可以通过props获取form
      return <FormComponent {...this.props} form={form} />
    }
  }
}

export const Form = {
  create,
}


