import { Button, Col, Form, Input, Row, TimePicker, Checkbox, Select, DatePicker } from "antd";
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
        {/* <Col span={8} xs={24} sm={24} lg={8}>
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
        </Col> */}
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
          <Form.Item label="Rede Social"
            required
            name="socialMedia"
            rules={[{ required: true }]}
          >
            <Input placeholder="Rede Social"  />
          </Form.Item>
        </Col>
      </Row>

      <hr />
      <h1 className="card-title mt-3">Informações Voluntariado</h1>
      <Row gutter={20}>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Como você lidaria em uma situação de resgate de animal ?"
            required
            name="situation"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Situacao de Resgate" rows={3}/>
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Como você se sente trabalhando em equipe ?"
            required
            name="group"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Trabalho em equipe" rows={3}/>
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Motivo para fazer parte do projeto AdoteVL ?"
            required
            name="reason"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Motivo" rows={3} />
          </Form.Item>
        </Col>

        <Col span={24} xs={24} sm={24} lg={24}>
          <Form.Item label="Assinale a opção para as atividades em que deseja voluntariar"
            required
            name="activities"
            rules={[{ required: true }]}
          >
              <Checkbox.Group>
                <Checkbox value="postagem redes sociais">Postagem redes sociais</Checkbox>
                <Checkbox value="retirar doacoes">Retirar doações</Checkbox>
                <Checkbox value="recepcionar visitantes">Recepcionar visitantes</Checkbox>
                <Checkbox value="apoio feira adocao">Apoio feira de adoção</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Col>

        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Horários disponíveis"
            required
            name="timings"
            rules={[{ type: 'array', required: true }]}
          >
            <TimePicker.RangePicker 
              format="HH:mm" 
              placeholder={['Hora de início', 'Hora de fim']}
              className="largerTimePicker"
              />
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