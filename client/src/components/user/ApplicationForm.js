import React, { useState } from 'react';
import { Form, Input, Button, message, Col, Select } from 'antd';
import { useNavigate } from "react-router-dom";


const { Option } = Select;

const ApplicationForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [applicationData, setApplicationData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleFormChange = (changedValues) => {
    setApplicationData({
      ...applicationData,
      ...changedValues,
    });
  };

  const validateCPF = (rule, value) => {
    const cpfRegex = /^[0-9]{11}$/; 
    if (!value || cpfRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject('Por favor, digite um CPF válido!');
  };

  const validateCEP = (rule, value) => {
    const cepRegex = /^[0-9]{5}-[0-9]{3}$/; 
    if (!value || cepRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject('Por favor, digite um CEP válido no formato XXXXX-XXX');
  };

  const validatePositiveNumber = (_, value) => {
    if (value >= 0) {
      return Promise.resolve();
    }
    return Promise.reject('O valor não pode ser negativo');
  };

  const onFinish = () => {
    onSubmit(applicationData);
    form.resetFields();
    setSubmitted(true);
    message.success('Obrigado por se inscrever!');
    navigate("/user-adoptions");

  };

  return (
    <div>
      {submitted ? (
        <div>
          <p>Obrigado por se inscrever!</p>
        </div>
      ) : (
        <Form
          form={form}
          onValuesChange={handleFormChange}
          onFinish={onFinish}
        >
         
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item 
                  name="age"
                  label="Idade"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite sua idade',
                    },
                    {
                      validator: validatePositiveNumber,
                    },
                  ]}
                >
                  <Input type="number" placeholder='digite sua idade'/>
                </Form.Item>
              </Col>
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item 
                  name="birth"
                  label="Data de nascimento"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite sua data de nascimento',
                    },
                  ]}
                >
                  <Input placeholder='digite a data de nascimento'/>
                </Form.Item>
              </Col>
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item 
                  name="cpf"
                  label="CPF"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite seu CPF',
                    },
                    {
                      validator: validateCPF,
                    },
                  ]}
                >
                  <Input type="number" placeholder='digite seu CPF'/>
                </Form.Item>
              </Col>
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item 
                  name="address"
                  label="Endereço" 
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite seu endereço completo',
                    },
                  ]}
                >
                  <Input placeholder='digite seu endereço completo'/>
                </Form.Item>
              </Col>
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item 
                  name="cep"
                  label="CEP"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite seu CEP',
                    },
                    {
                      validator: validateCEP,
                    },
                  ]}
                >
                  <Input placeholder='digite seu CEP'/>
                </Form.Item>
              </Col>
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item 
                  name="phone" 
                  label="Telefone"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite seu telefone',
                    },
                  ]}
                >
                  <Input placeholder='digite seu telefone'/>
                </Form.Item>
              </Col>
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item 
                  name="work" 
                  label="Profissão"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite sua profissão',
                    },
                  ]}
                >
                  <Input placeholder='digite sua profissão'/>
                </Form.Item>
              </Col>
   

         
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item 
                  name="havePet"
                  label="Você já tem algum pet em casa?"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite',
                    },
                    {
                      validator: validatePositiveNumber,
                    },
                  ]}
                >
                  <Select placeholder='selecione'>
                    <Option value={true}>Sim</Option>
                    <Option value={false}>Não</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item 
                  name="qtyPet"
                  label="Quantos animais tem em casa?"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite',
                    },
                    {
                      validator: validatePositiveNumber,
                    },
                  ]}
                >
                  <Input type="number" placeholder='digite quantos pets'/>
                </Form.Item>
              </Col>
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item 
                  name="vaciPet"
                  label="Os animais estão todos com vacinas em dia?"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite',
                    },
                  ]}
                >
                  <Select placeholder='selecione'>
                    <Option value="sim">Sim, todos em dia</Option>
                    <Option value="nao">Não, não estão todos em dia</Option>
                    <Option value="nenhum">Não, nenhum é vacinado</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item 
                  name="castPet"
                  label="Os animais estão todos castrados?"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite',
                    },
                  ]}
                >
                  <Select placeholder='selecione'>
                    <Option value="sim">Sim, todos em dia</Option>
                    <Option value="nao">Não, não estão todos em dia</Option>
                    <Option value="nenhum">Não, nenhum é vacinado</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item 
                  name="condPet"
                  label="Você tem condições para cuidar de um pet?"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite',
                    },
                  ]}
                >
                  <Select placeholder='selecione'>
                    <Option value="sim">Sim</Option>
                    <Option value="nao">Não</Option>
                    <Option value="nem sempre">Nem sempre</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item  
                  name="residenceType"
                  label="Qual seu tipo de residência?"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite',
                    },
                  ]}
                >
                  <Select placeholder='selecione'>
                    <Option value="casa">Casa</Option>
                    <Option value="apartamento">Apartamento</Option>
                    <Option value="sitio">Sítio</Option>
                    <Option value="fazenda">Fazenda</Option>
                    <Option value="outro">Outro</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item 
                  name="resiBill"
                  label="É próprio ou alugado?" 
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite',
                    },
                  ]}
                >
                  <Select placeholder='selecione'>
                    <Option value="proprio">Próprio</Option>
                    <Option value="alugado">Alugado</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item 
                  name="resiAdult"
                  label="Na residência, quantos adultos?"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite',
                    },
                    {
                      validator: validatePositiveNumber,
                    },
                  ]}
                >
                  <Input type="number"  placeholder='digite quantos adultos'/>
                </Form.Item>
              </Col>
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item  
                  name="adultAgree"
                  label="Todos concordam com a adoção?"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite',
                    },
                  ]}
                >
                  <Select placeholder='selecione'>
                    <Option value="sim">Sim</Option>
                    <Option value="nao">Não</Option>
                    <Option value="nem todos">Nem todos</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item 
                  name="allergy"
                  label="Alguém na sua casa é alérgico a animais?"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite',
                    },
                  ]}
                >
                  <Select placeholder='selecione'>
                    <Option value="sim">Sim</Option>
                    <Option value="nao">Não</Option>
                    <Option value="nao sei">Não sei</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item 
                  name="updatePet"
                  label="Você está ciente que deverá nos atualizar sobre o pet?"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite',
                    },
                  ]}
                >
                  <Select placeholder='selecione'>
                    <Option value={true}>Sim</Option>
                    <Option value={false}>Não</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={23} xs={23} sm={23} lg={23}>
                <Form.Item 
                  name="move"
                  label="Pretende se mudar, mesmo que seja a longo prazo?"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite',
                    },
                  ]}
                >
                  <Select placeholder='selecione'>
                    <Option value="sim">Sim</Option>
                    <Option value="nao">Não</Option>
                    <Option value="talvez">Talvez</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={30} xs={23} sm={23} lg={30}>
                <Form.Item 
                  name="agree"
                  label="Você concorda que as respostas são verdadeiras ?"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, digite',
                    },
                  ]}
                >
                  <Select placeholder='selecione'>
                    <Option value="sim">Sim</Option>
                    <Option value="nao">Não</Option>
                  </Select>
                </Form.Item>
              </Col>
    
            <Form.Item>
              <Button
                type="primary"
                className="primary-button"
                htmlType="submit"
              >
                Enviar Aplicação
              </Button>
            </Form.Item>
      
        </Form>
      )}
    </div>
  );
};

export default ApplicationForm;
