import React from "react";
import { Card, Row, Col } from "antd";
import { AppleOutlined, AndroidOutlined, WindowsOutlined } from "@ant-design/icons";

const CardAdmin = () => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card
          title="Card 1"
          style={{ width: 300 }}
          extra={<AppleOutlined style={{ fontSize: 24 }} />}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          title="Card 2"
          style={{ width: 300 }}
          extra={<AndroidOutlined style={{ fontSize: 24 }} />}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          title="Card 3"
          style={{ width: 300 }}
          extra={<WindowsOutlined style={{ fontSize: 24 }} />}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
    </Row>
  );
};

export default CardAdmin;
