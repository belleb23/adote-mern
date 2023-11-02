import React from 'react';
import { Form, Button, TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

function FormTeste() {
  dayjs.extend(customParseFormat);

  const onFinish = (values) => {
    const { timeRange } = values;

    // Verifique se o valor é uma matriz e contém dois elementos
    if (Array.isArray(timeRange) && timeRange.length === 2) {
      const [startTime, endTime] = timeRange;

      // Formate as datas usando Day.js
      const formattedStartTime = dayjs(timeRange[0]).format('HH:mm');
      const formattedEndTime = dayjs(timeRange[1]).format('HH:mm');  

      console.log('Horário de Início formatado:', formattedStartTime);
      console.log('Horário de Término formatado:', formattedEndTime);
    }
  };

  return (
    <Form name="timepicker-form" onFinish={onFinish}>
      <Form.Item
        label="Intervalo de Tempo"
        name="timeRange"
        rules={[{ type: 'array', required: true, message: 'Por favor, selecione o intervalo de tempo!' }]}
      >
        <TimePicker.RangePicker format="HH:mm" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormTeste;
