import React, { useState } from 'react';
import { Form, Input, Button, message, Col, Select } from 'antd';

const { Option } = Select;

const ApplicationForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [applicationData, setApplicationData] = useState({
    nome: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (changedValues) => {
    setApplicationData({
      ...applicationData,
      ...changedValues,
    });
  };

  const onFinish = () => {
    onSubmit(applicationData);
    form.resetFields();
    setSubmitted(true);
    message.success('Obrigado por se inscrever!');
  };

  return (
    <div>
      {submitted ? (
        <div>
          <p>Obrigado por se inscrever!</p>
        </div>
      ) : (
        <Form form={form} onValuesChange={handleFormChange} onFinish={onFinish} initialValues={{ nome: '' }}>
          <p style={{fontSize:"20px"}}>Formulário de adoção</p>

          <Col span={23} xs={23} sm={23} lg={23}>
            <Form.Item
              label="Nome Completo"
              name="nome"
            >
              <Input placeholder="Nome" />
            </Form.Item>
          </Col>
        <Col span={23} xs={23} sm={23} lg={23}>
        <Form.Item  name="email"
          label="Email"
        >
          <Input />
        </Form.Item>
        </Col>

        <Col span={23} xs={23} sm={23} lg={23}>
          <Form.Item name="age"
            label="Idade"
          >
            <Input type="number" />
          </Form.Item>
        </Col>

        <Col span={23} xs={23} sm={23} lg={23}>
          <Form.Item name="cpf"
            label="CPF"
          >
            <Input type="number" />
          </Form.Item>
        </Col>

        <Col span={23} xs={23} sm={23} lg={23}>
          <Form.Item name="carrierObjective"
           label="Endereço completo" 
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={23} xs={23} sm={23} lg={23}>
          <Form.Item name="phone"
           label="CEP"
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={23} xs={23} sm={23} lg={23}>
          <Form.Item  name="phoneType" 
            label="Telefone"
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={23} xs={23} sm={23} lg={23}>
          <Form.Item name="animal"
            label="Você já tem algum animal em casa?"
          >
            <Select>
              <Option value="sim">Sim</Option>
              <Option value="nao">Não</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={23} xs={23} sm={23} lg={23}>
          <Form.Item name="qtyAnimal"
          label="Quantos animais tem em casa?"
          >
            <Input type="number" />
          </Form.Item>
        </Col>

        <Col span={23} xs={23} sm={23} lg={23}>
          <Form.Item name="vacinAnimal"
            label="Os animais estão todos com vacinas em dia?"
          >
            <Select>
              <Option value="sim">Sim, todos em dia</Option>
              <Option value="nao">Não, não estão todos em dia</Option>
              <Option value="nenhum">Não, nenhum é vacinado</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={23} xs={23} sm={23} lg={23}>
          <Form.Item  name="residence"
           label="Qual seu tipo de residência?"
          >
            <Select>
              <Option value="casa">Casa</Option>
              <Option value="apartamento">Apartamento</Option>
              <Option value="sitio">Sítio</Option>
              <Option value="fazenda">Fazenda</Option>
              <Option value="outro">Outro</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={23} xs={23} sm={23} lg={23}>
          <Form.Item name="residenceType"
            label="É próprio ou alugado?" 
          >
            <Select>
              <Option value="sim">Próprio</Option>
              <Option value="nao">Alugado</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={23} xs={23} sm={23} lg={23}>
          <Form.Item name="recidenceAdult"
           label="Na residência, quantos adultos?"
          >
            <Input type="number" />
          </Form.Item>
        </Col>

        <Col span={23} xs={23} sm={23} lg={23}>
          <Form.Item  name="adultsAgree"
           label="Todos concordam com a adoção?"
          >
            <Select>
              <Option value="sim">Sim</Option>
              <Option value="nao">Não</Option>
              <Option value="meio">Nem todos</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={23} xs={23} sm={23} lg={23}>
          <Form.Item name="allergy"
            label="Alguém na sua casa é alérgico a animais?"
          >
            <Select>
              <Option value="sim">Sim</Option>
              <Option value="nao">Não</Option>
              <Option value="naosei">Não sei</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={30} xs={23} sm={23} lg={30}>
          <Form.Item name="agree"
          label="Você concorda que as respostas são verdadeiras ?"
          >
            <Select>
              <Option value="sim">Sim</Option>
              <Option value="nao">Não</Option>
            </Select>
          </Form.Item>
        </Col>

          <Form.Item>
            <Button type="primary" className="primary-button" htmlType="submit">
              Enviar Aplicação
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default ApplicationForm;
