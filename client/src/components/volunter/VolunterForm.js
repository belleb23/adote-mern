import { Button, Col, Form, Input, Row, TimePicker, Checkbox, Select } from "antd";
import moment from "moment";
import React from "react";
import dayjs from 'dayjs';

function VolunterForm({ onFinish, initivalValues, btn }) {
  const { Option } = Select;

  return (
    <Form
      layout="vertical"
       onFinish={onFinish}
       initialValues={{
         ...initivalValues,
         ...(initivalValues && {
          timings: [
            dayjs(initivalValues?.timings[0], "HH:mm"),
            dayjs(initivalValues?.timings[1], "HH:mm"),
          ],
        
         }),
       }}
    >
      <h1 className="card-title mt-3">Informações Pessoais</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Nome"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder='Nome' />
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
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Telefone"
            required
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder="Telefone" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Data de nascimento"
            required
            name="birth"
            rules={[{ required: true }]}
          >
            <Input placeholder="Data de nascimento" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Endereço"
            required
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Endereço" />
          </Form.Item>
        </Col>
      </Row>

      <hr />
      <h1 className="card-title mt-3">Informações Voluntariado</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Profissão"
            required
            name="work"
            rules={[{ required: true }]}
          >
            <Input placeholder="Profissão" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Empresa que trabalha"
            required
            name="company"
            rules={[{ required: true }]}
          >
            <Input placeholder="Empresa" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
         <Form.Item label="Possui habilitação?" 
            rules={[{ required: true }]} required 
            name="driverLicense"
            >
            <Select
              placeholder="Habilitação"
              allowClear
            >
              <Option value={true} selected>Sim</Option>
              <Option value={false}>Não</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
         <Form.Item label="Possui carro?" 
            name="car"
            rules={[{ required: true }]} required>
            <Select
              placeholder="Carro"
              allowClear
            >
              <Option value={true} selected>Sim</Option>
              <Option value={false}>Não</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Motivo para ser voluntário"
            required
            name="reason"
            rules={[{ required: true }]}
          >
            <Input placeholder="Motivo"  />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Horários disponíveis"
            required
            name="timings"
            rules={[{ type: 'array', required: true }]}
          >
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>
        </Col>
        <Col span={24} xs={24} sm={24} lg={24}>
          <Form.Item label="Assinale a opção para as atividades em que deseja voluntariar"
            required
            name="activities"
            rules={[{ required: true }]}
          >
              <Checkbox.Group>
              <Checkbox value="postagem">Postagem redes sociais</Checkbox>
              <Checkbox value="doacoes">Retirar doações</Checkbox>
              <Checkbox value="recepcionar">Recepcionar visitantes</Checkbox>
              <Checkbox value="postar">Apoio feira de adoção</Checkbox>
              <Checkbox value="escritorio">Atividades de escritório</Checkbox>
            </Checkbox.Group>
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

export default VolunterForm;