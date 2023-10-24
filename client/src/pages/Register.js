import React from 'react'
import { Form, Button, Input } from "antd";


function Register() {
  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
         <h1 className="card-title">Nice To Meet U</h1>
         <Form layout="vertical">
            <Form.Item label="Name" name="name"
              // onFinish={onFinish}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input placeholder="Password" type="password" />
            </Form.Item>

            <Button
              className="primary-button my-2 full-width-button"
              htmlType="submit"
            >
              REGISTER
            </Button>
        </Form>
      </div>
    </div>
  )
}

export default Register