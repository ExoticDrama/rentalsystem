import { Col, Layout, Menu, Row, Tag, theme, Tooltip } from "antd";
import React, { createContext, useContext, useState } from "react";
import { NotificationOutlined, UserOutlined, DribbbleOutlined, InfoOutlined } from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Search from "antd/es/input/Search.js";

const { Header, Sider } = Layout;
const item = [UserOutlined, DribbbleOutlined, InfoOutlined].map((icon, index) => {
    return {
        key: index === 0 ? "用户管理" : index === 1 ? "器材管理" : index === 2 ? "借还管理" : "",
        icon: React.createElement(icon),
        label: index === 0 ? "用户管理" : index === 1 ? "器材管理" : index === 2 ? "借还管理" : "",
    };
});
export let Context = createContext("");
export const ManageDetail = () => {
    let { state } = useLocation();
    let [s, setS] = useState("");
    let navigate = useNavigate();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (<>
        <Context.Provider value={s}>
            <Layout style={{overflowY:"auto"}}>
                <Header style={{
                    width: "100%", background: "rgb(39,65,218)", padding: "0",color:"white"
                }}>
                    <Row align={"middle"}>
                        <Col span={5} style={{ textAlign: "center" }}>管理</Col>
                        <Col span={9} style={{ textAlign: "center" }}>{state}</Col>
                        {
                            <Col flex="auto" span={9}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Search placeholder={"请搜索"}
                                            onSearch={(element) => {
                                                setS(element)
                                            }}></Search>
                                </div>
                            </Col>}
                    </Row>
                </Header>
                <Layout style={{ height: "60%" }}>
                    <Sider
                        width={150}
                        style={{
                            background: colorBgContainer,
                        }}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{
                                height: '100%', borderRight: 0
                            }}
                            theme={"light"}
                            onClick={(item) => {
                                navigate("/ManageDetail/" + item.key, { state: item.key })
                            }}
                            items={item}
                        />
                    </Sider>
                    <Layout
                        style={{
                            padding: '0 12px 12px',
                        }}
                    >
                        <Outlet/>
                    </Layout>
                </Layout>
            </Layout>
        </Context.Provider>

    </>);
}
