import { Button, Col, Form, Input, Row, Select, Upload, Checkbox } from "antd";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

function PetForm({ onFinish, initivalValues }) {

  const [showIllnessType, setShowIllnessType] = React.useState(false);
  
  const handleIllnessChange = (value) => {
    setShowIllnessType(value === true);
  };

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
      <h1 className="card-title mt-3"></h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Nome" name="name"
            required
            rules={[{ required: true, message: 'Por favor, insira o nome do pet' }]}
          >
            <Input placeholder="Nome" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Tamanho" name="petSize"
          rules={[{ required: true, message: 'Por favor, selecione o tamanho do pet' }]}
          >
            <Select placeholder="Tamanho">
              <Option value="pequeno">Pequeno</Option>
              <Option value="médio">Médio</Option>
              <Option value="grande">Grande</Option>
            </Select>
        </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Idade" name="age"
          rules={[{ required: true, message: 'Por favor, selecione a idade do pet' }]}
          >
            <Select placeholder="Idade">
              <Option value="filhote">Filhote</Option>
              <Option value="adulto">Adulto</Option>
              <Option value="idoso">Idoso</Option>
            </Select>
        </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Idade em meses/anos" name="ageNumber"
          rules={[{ required: true, message: 'Por favor, insira a idade do pet' }]}
          >
            <Input placeholder="Idade" type="number"/>
        </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Tipo" name="petType"
          rules={[{ required: true, message: 'Por favor, insira o tipo do pet' }]}
          >
            <Select placeholder="Tipo">
              <Option value="gato">gato</Option>
              <Option value="cachorroo">cachorro</Option>
              <Option value="cachorroo">outro</Option>
            </Select>
        </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Raça" name="race"
            rules={[{ required: true, message: 'Por favor, selecione a raça do pet' }]}
            >
              <Input placeholder="Raça"/>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Sexo" name="sex"
            rules={[{ required: true, message: 'Por favor, selecione o sexo do pet' }]}
            >
            <Select placeholder="Sexo">
              <Option value="macho">Macho</Option>
              <Option value="fêmea">Fêmea</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Castrado ?" name="castration"
            rules={[{ required: true, message: 'Por favor, insira resposta' }]}
            >
            <Select placeholder="Castrado">
              <Option value={true}>Sim</Option>
              <Option value={false}>Nao</Option>
            </Select>          
          </Form.Item>
        </Col>
        <Col span={16} xs={24} sm={24} lg={16}>
          <Form.Item label="Vacinas recebidas" name="vaccine"
            rules={[{ required: true, message: 'Por favor, selecione as vacinas recebidas' }]}
            >
              <Checkbox.Group>
                <Checkbox value="v1">Vacina 1</Checkbox>
                <Checkbox value="v2">Vacina 2</Checkbox>
                <Checkbox value="v3">Vacina 3</Checkbox>
                <Checkbox value="v4">Vacina 4</Checkbox>
                <Checkbox value="no">Nenhuma</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="O pet possui alguma deficiência?" name="illness"
            rules={[{ required: true, message: 'Por favor, selecione a doença do pet' }]}
            >
              <Select placeholder="Deficiência" onChange={handleIllnessChange}>
                <Option value={true}>Sim</Option>
                <Option value={false}>Nao</Option>
              </Select> 
          </Form.Item>
        </Col>
        {showIllnessType && (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="Qual deficiência?" name="illnessType"
              rules={[{ required: true, message: 'Por favor, selecione a doença do pet' }]}
              >
              <Input placeholder="Deficiência"/>
            </Form.Item>
          </Col>
        )}
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Descrição" name="description"
            required
            rules={[{ required: true, message: 'Por favor, insira a descrição do pet' }]}
          >
            <Input placeholder="Descrição" />
          </Form.Item>
        </Col>

        {/* <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Foto" name="profilePic"
             required rules={[{ required: true, message: 'Por favor, insira a foto do pet' }]}
          >
            <Upload listType="picture">
              <Button className="upload-button" icon={<UploadOutlined />}>Carregar Imagem</Button>
            </Upload>
          </Form.Item>
        </Col> */}

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Imagem URL" name="urlPic"
            required
            rules={[{ required: true, message: 'Por favor, insira a url do pet' }]}
          >
            <Input placeholder="Url" />
          </Form.Item>
        </Col>
      
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          SALVAR
        </Button>
      </div>
    </Form>
  );
}

export default PetForm;