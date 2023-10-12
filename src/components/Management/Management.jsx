
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Tag, Layout, Menu, theme, Input, Card, Button, Image } from "antd";
import { NotificationOutlined, UserOutlined, DribbbleOutlined, InfoOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import DQJ from "/src/assets/3.jpg"
import LLH from "/src/assets/2.jpg"
import HTY from "/src/assets/4.jpg"
import ZEM from "/src/assets/1.jpg"
const { Header, Content, Sider } = Layout;
let item = [UserOutlined, DribbbleOutlined, InfoOutlined].map((icon, index) => {
    return {
        key: index === 0 ? "用户管理" : index === 1 ? "器材管理" : index === 2 ? "借还管理" : "",
        icon: React.createElement(icon),
        label: index === 0 ? "用户管理" : index === 1 ? "器材管理" : index === 2 ? "借还管理" : "",
    };
});
const { Search } = Input;
export const Management = () => {
    let navigate = useNavigate();
    const [users, setUsers] = useState([
        { "user": "张三", "schoolNumber": "11111111","icon":<Image style={{width:50,height:50}} src={ZEM}/> }
        ,{ "user": "李四", "schoolNumber": "22222222","icon":<Image style={{width:50,height:50}} src={LLH}/>  }
        ,{ "user": "王五", "schoolNumber": "33333333","icon":<Image style={{width:50,height:50}} src={HTY}/>  }
        ,{"user":"杨六","schoolNumber":"44444444","icon":<Image style={{width:50,height:50}} src={DQJ}/> }]);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{overflowY:"scroll"}}>
            <Header style={{
                backgroundColor: "rgb(39,65,218)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",color:"white"
            }}>
                <span style={{fontSize:"20px"}}>管理</span>
                <Search style={{width:'350px'}} placeholder={"请搜索"} onSearch={(element)=>setUsers([users[0]])}></Search>
            </Header>
            <Layout style={{maxHeight:"60%"}}>
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
                            height: '100%',
                            borderRight: 0,
                        }}
                        theme={"light"}
                        items={item}
                        onClick={(item)=>{
                            navigate("/ManageDetail/"+item.key,{state:item.key})}}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            overflowY: "auto",
                            maxHeight:"400px",
                        }}
                    >
                        {users.map((e, index) => <div key={index} style={{border:"solid 1px"}}>
                            <div style={{ height:100,display: "flex", justifyContent: "space-around", alignItems: "center",justifyItems:"center",flexShrink:"1" }}>
                                {e.icon}
                                <div
                                    style={{display:"flex",alignSelf:"stretch",justifyContent:"space-around",alignItems:"center",flexFlow:"column",flexShrink:"1",paddingBottom:3}}
                                >
                                    <span>{"用户名:" + e.user}</span>
                                    <span>{"学工号:" + e.schoolNumber}</span>
                                    <Button style={{display:"flex",justifyContent:"end"}} onClick={()=>{navigate("/manageDetail/用户管理",{state:"用户管理"})}}>点击查看用户信息</Button>
                                </div>
                            </div>
                        </div>)}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};


