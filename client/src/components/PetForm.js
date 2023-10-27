import { Button, Col, Form, Input, Row } from "antd";
import React from "react";

function PetForm({ onFinish, initivalValues }) {
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
      <h1 className="card-title mt-3">Pet Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Nome"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Nome" />
          </Form.Item>
        </Col>
      
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
}

export default PetForm;