import React from 'react'
import { Form, Button, Input } from "antd";
import { Link } from "react-router-dom";


function Login() {
  const onFinish = async (values) => {
    console.log('Receive values form: ', values)
  }


  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
         <h1 className="card-title">Welcome Back</h1>
         <Form layout="vertical" onFinish={onFinish}>
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
            <Link to="/register" className="anchor mt-2">
              CLICK HERE TO REGISTER
            </Link>
        </Form>
      </div>
    </div>
  )
}

export default Login