import { Button, Card, Divider, Image, Layout, Modal, Popconfirm, Select, Space, Tag, theme } from "antd";
import React, { useState } from "react";

const { Content } = Layout;
import a from "../../assets/a.jpg"
import b from "../../assets/羽毛球.png"
import c from "../../assets/足球.png"
import d from "../../assets/排球.png"
import { useNavigate } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";

const items = []

items.push({
    icon: <Image src={a} style={{ width: 50, height: 50 }}></Image>,
    number: 1,
    state:"待领取",
    name:"九一篮球"
})
items.push({
    icon: <Image src={b} style={{ width: 50, height: 50 }}></Image>,
    number: 2,
    state:"待领取",
    name:"尤利克斯羽毛球"
})
items.push({
    icon: <Image src={c} style={{ width: 50, height: 50 }}></Image>,
    number: 3,
    state:"待归还",
    name:"李宁足球"
})
items.push({
    icon: <Image src={d} style={{ width: 50, height: 50 }}></Image>,
    number: 4,
    state:"待领取",
    name:"红双喜排球"
})
export const ManageUserContent = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [s, setS] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    let navigate = useNavigate();
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        navigate("/manage")

    };
    const handleCancel = () => {
        setIsModalOpen(false);
        navigate("/manage")
    };
    return (
        <>
            <Content
                style={{
                    padding: "0 12px 12px 12px",
                    margin: 0,
                    background: colorBgContainer,
                    height: 350
                    // height:"100%"
                }}>
                {s === 0 ? <div style={{
                    display: "flex",
                    justifyContent: "center",
                    flexFlow: "column",
                    alignItems: "center",
                    height: "100%"
                }}>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        width: "100%"
                    }}>
                        <Image src={a} style={{ width: 80, height: 80 }}/>
                        <Card
                            // title={"XX球"}
                            style={{ height: 150 }}>
                            <p>九一篮球</p>
                            <p>借用用户：张三</p>
                            <p>学/工号：11111111</p>
                        </Card>
                    </div>
                    <div style={{ display: "grid", alignSelf:"stretch",gridTemplate: "3fr 1fr/repeat(3,1fr)" }}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                        }}>
                            <div><span style={{ fontSize: 12 }}>借用数量</span></div>
                            <Select placeholder={"1个"}
                                    options={[{ value: "1", label: "1个" }, { value: "2", label: "2个" }, {
                                        value: "3",
                                        label: "3个"
                                    }]}></Select>
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                        }}>
                            <div style={{ fontSize: 12 }}>状态</div>
                            <Select placeholder={"待领取"} options={[{ value: "1", label: "待领取" }, {
                                value: "2",
                                label: "待归还"
                            }, { value: "3", label: "已完成" }]}></Select>
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                        }}>
                            <div style={{ fontSize: 12 }}>借用天数</div>
                            <Select placeholder={"1天"} options={[{ value: "1", label: "1天" }, {
                                value: "2",
                                label: "2天"
                            }, { value: "3", label: "3天" }]}></Select>
                        </div>
                        <div style={{
                            gridColumn: "2/3",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Popconfirm
                                title="是否确认修改"
                                okText="确认"
                                cancelText="取消"
                                icon={<CheckOutlined/>}
                            > <Button style={{ marginRight: 10,width:"5rem" }}
                            >修改</Button>
                            </Popconfirm>
                        </div>

                    </div>
                </div> : <div style={{
                    display: "flex",
                    justifyContent: "start",
                    flexFlow: "column",
                    alignItems: "stretch",
                    height: "100%"
                }}>
                    <div style={{display:"flex"}}>
                        <Tag style={{marginTop:3,justifySelf:"start"}}>用户借还信息：</Tag>
                        <Tag style={{marginTop:3,justifySelf:"end"}}>用户名：张三</Tag>
                        <Tag style={{marginTop:3,justifySelf:"end"}}>学号：11111111</Tag>
                    </div>

                    {items.map((e, index) => {
                        return <div key={index} style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            margin: "10px 0 5px 0",
                            border: "1px solid"
                        }}>
                            {e?.icon ?? <Image src={a} style={{ width: 50, height: 50 }}></Image>}
                            <div style={{
                                display: "flex",
                                flexFlow: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <div>{e.name}</div>
                                <div>数量：{e.number+"个"}</div>
                                <div>状态：{e.state}</div>
                            </div>
                            <Button style={{ textAlign: "center" }} onClick={() => {
                                setS(0);
                            }}>管理</Button>
                        </div>
                    })}
                </div>}
            </Content>
        </>
    );
}
