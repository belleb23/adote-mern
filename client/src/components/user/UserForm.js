import { Button, Col, Form, Input, Row, Select } from "antd";
import React from "react";


function UserForm({ onFinish, initivalValues, btn }) {
  const { Option } = Select;

  return (
    <Form
      layout="vertical"
       onFinish={onFinish}
       initialValues={{
         ...initivalValues,
         ...(initivalValues && {
          
         }),
       }}
    >
      <h1 className="card-title mt-3">Informações Pessoais</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Nome"
            required
            name="name"                                                                                                                                                            
            rules={[{ required: true }]}
          >
            <Input placeholder="Nome" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Email"
            required
            name="email"
            rules={[{ required: true }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
        
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          {btn}
        </Button>
      </div>
    </Form>
  );
}

export default UserForm;