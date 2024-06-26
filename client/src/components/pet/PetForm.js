import { Button, Col, Form, Input, Row, Select, Upload, Checkbox } from "antd";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

function PetForm({ onFinish, initivalValues }) {

  const [showIllnessType, setShowIllnessType] = React.useState(false);
  const [showFivQuestion, setShowFivQuestion] = React.useState(false);
  const [showVermQuestion, setShowVermQuestion] = React.useState(false);


  const handleIllnessChange = (value) => {
    setShowIllnessType(value === true);
  };

  const handlePetTypeChange = (value) => {
    setShowFivQuestion(value === 'gato');
    setShowVermQuestion(value === 'cachorro');
  };

  const [image = "", setImage] = React.useState("");

  const validatePositiveNumber = (_, value) => {
    if (value >= 0) {
      return Promise.resolve();
    }
    return Promise.reject('O valor não pode ser negativo');
  };

  const onFileSelect = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      console.log(reader.result);
      setImage(reader.result);
      console.log(image)
    };
  };

  const onFinishHandler = async (values) => {
    await onFinish({ ...values, image });
  };

  return (
    <Form
      layout="vertical"
       onFinish={onFinishHandler}
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
          <Form.Item label="Porte" name="petSize"
          rules={[{ required: true, message: 'Por favor, selecione o porte do pet' }]}
          >
            <Select placeholder="Porte">
              <Option value="pequeno">Pequeno</Option>
              <Option value="médio">Médio</Option>
              <Option value="grande">Grande</Option>
            </Select>
        </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Idade" name="ageRange"
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
          <Form.Item label="Idade em meses/anos" name="age"
          rules={[
            { required: true, message: 'Por favor, insira a idade do pet' },
            {
              validator: validatePositiveNumber,
            }
          ]}
          >
            <Input placeholder="Idade" type="number"/>
        </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Tipo" name="petType"
          rules={[{ required: true, message: 'Por favor, insira o tipo do pet' }]}
          >
            <Select placeholder="Tipo" onChange={handlePetTypeChange}>
              <Option value="gato">gato</Option>
              <Option value="cachorro">cachorro</Option>
              <Option value="outro">outro</Option>
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
              <Option value='por conta do adotante'>Por conta do adotante</Option>
              <Option value='custeado pela adote'>Custeado pela adote</Option>
            </Select>          
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Vacinado ?" name="vaccine"
            rules={[{ required: true, message: 'Por favor, insira resposta' }]}
            >
            <Select placeholder="Vacina">
              <Option value='por conta do adotante'>Por conta do adotante</Option>
              <Option value='custeado pela adote'>Custeado pela adote</Option>
            </Select>          
          </Form.Item>
        </Col>
        {showFivQuestion && (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="Fiv ?" name="fiv"
              rules={[{ required: true, message: 'Por favor, insira resposta' }]}
              >
              <Select placeholder="Fiv">
                <Option value={true}>Positivo</Option>
                <Option value={false}>Negativo</Option>
              </Select>          
            </Form.Item>
          </Col>
        )}
        {showVermQuestion && (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item label="Vermífugo e antipugas ?" name="verm"
              rules={[{ required: true, message: 'Por favor, insira resposta' }]}
              >
              <Select placeholder="Vermífugo e antipugas">
                <Option value='positivo'>Por conta do adotante</Option>
                <Option value='negativo'>Custeado pela adote</Option>
              </Select>          
            </Form.Item>
          </Col>
        )}
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="O pet possui alguma deficiência?" name="illness"
            rules={[{ required: true, message: 'Por favor, selecione a doença do pet' }]}
            >
              <Select placeholder="Deficiência" onChange={handleIllnessChange}>
                <Option value={false}>Não</Option>
                <Option value={true}>Sim</Option>
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

        <Col span={23} xs={23} sm={23} lg={23}>
          <Form.Item label="Foto do Pet" name="urlPic">
            <div>
              <label htmlFor="urlPic" className="cursor-pointer" />
              <input
                type="file"
                onChange={onFileSelect}
                className="file-input border-0"
                id="file-input"
              />
            </div>
          </Form.Item>
        </Col>

        {image && (
          <img
            src={image}
            alt="profile pic"
            style={{ width: '15%', height: '15%', float: 'left', marginRight: '10px' }}
          />
        )}
      
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