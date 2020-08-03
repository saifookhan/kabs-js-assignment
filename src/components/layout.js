import React from "react";
import { Layout, Breadcrumb } from "antd";

import TableMain from "./Table/table";

const { Header, Content, Footer } = Layout;
function LayoutMain(props) {
  return (
    <div>
      <Layout className="layout">
        <Header></Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Tasks</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">
            <TableMain />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Saif Imran (github.com/saifookhan)
        </Footer>
      </Layout>
    </div>
  );
}

export default LayoutMain;
