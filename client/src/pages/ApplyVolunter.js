import React from "react";
import Layout from "../components/Layout";
import VolunterForm from "../components/VolunterForm";


function ApplyVolunter() {

    const onFinish = values => {
        console.log('sucess', values)
    }

  return (
    <Layout>
    <h1 className="page-title">Apply Volunter</h1>
    <hr />

    <VolunterForm 
    onFinish={onFinish} 
    />
  </Layout>
  )
}

export default ApplyVolunter