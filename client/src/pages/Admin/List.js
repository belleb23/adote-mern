import React from 'react'
import Layout from "../../components/Layout";
import { Tabs } from 'antd';
import Userslist from "./Userslist";
import VolunteersList from "./VolunteersList";

function List() {
  return (
    <Layout>
      <h1 className="page-title">Usuários</h1>
      <hr />

      <Tabs>

      <Tabs.TabPane tab="Voluntários" key={0}>
            <VolunteersList />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Adotantes" key={1}>
            <Userslist/>
        </Tabs.TabPane>


      </Tabs>

    </Layout>
  )
}

export default List