import React from 'react'
import { Form, Button, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";


function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async (values) => {
    try{
      dispatch(showLoading());
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    }catch (error){
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  }


  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
         <h1 className="card-title">Adote um Vira Lata</h1>
         <Form layout="vertical" onFinish={onRegister}>
            <Form.Item label="Nome" name="name" >
              <Input placeholder="Nome" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Senha" name="password">
              <Input placeholder="Senha" type="password" />
            </Form.Item>

            <Button
              className="primary-button my-2 full-width-button"
              htmlType="submit"
            >
              CADASTRAR
            </Button>
            <Link to="/login" className="anchor mt-2">
              Já tem conta? Login
            </Link>
        </Form>
      </div>
    </div>
  )
}

export default Register