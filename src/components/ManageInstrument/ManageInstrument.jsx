import { Button, Image, Layout, Modal, Popconfirm, Select } from "antd";
import { CheckOutlined, DribbbleOutlined } from "@ant-design/icons";
import { useState } from "react";
import a from "../../assets/a.jpg"
import b from "../../assets/羽毛球.png"
import c from "../../assets/足球.png"
import d from "../../assets/排球.png"
const { Content } = Layout
const items = [{
    icon: <Image src={c} style={{ width: 50, height: 50 }}/>,
    name: "李宁足球",
    number: 80,
    leave: 10
}, {
    icon: <Image src={d} style={{ width: 50, height: 50 }}/>,
    name: "红双喜排球",
    number: 50,
    leave: 10
}]
export const ManageInstrument = () => {
    let [state, setState] = useState(0);
    let [item, setItem] = useState({});

    // noinspection JSValidateTypes
    return (
        <>
            {state === 0 ? <Content style={{
                height: 350,
                display: "flex",
                flexFlow: "column",
                justifyContent: "start",
                alignItems: "stretch"
            }}>
                {items.map((value, index) => {
                    return <div key={index} style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        margin: "10px 0 5px 0",
                        border: "1px solid"
                    }}>
                        {value?.icon ?? <Image src={a} style={{ width: 50, height: 50 }}></Image>}
                        <div style={{
                            display: "flex",
                            flexFlow: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <div>{value.name}</div>
                            <div>总数量：{value.number+"个"}</div>
                            <div>剩余量：{value.leave+"个"}</div>
                        </div>
                        <Button style={{ textAlign: "center" }} onClick={() => {
                            setState(1);
                            setItem(value);
                        }}>管理</Button>
                    </div>
                })}
            </Content> : <Content style={{
                height: 350,
                display: "flex",
                flexFlow: "column",
                justifyContent: "space-evenly",
                alignItems: "stretch"
            }}>
                <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                    {item.icon}
                    <span style={{ textAlign: "center" }}>{item.name}</span>
                </div>
                <div style={{
                    display: "grid",
                    gridTemplate: "repeat(2,1fr)/repeat(4,1fr)",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <span style={{ textAlign: "center" }}>总数量</span>
                    <Select placeholder={"1个"} defaultValue={"1个"} options={(() => {
                        let a = [];
                        for (let i = 0; i < item.number; i++) {
                            a.push(i + 1)
                        }
                        return a.map((v) => {
                            return { value: v.toString()+"个", label: v.toString()+"个" }
                        })
                    })()}></Select>
                    <span style={{ textAlign: "center" }}>剩余量</span>
                    <Select placeholder={"0"} defaultValue={"0"} options={[
                        { value: "0", label: "0个" }
                        , {
                            value: "1",
                            label: "1个"
                        }
                        , {
                            value: "2",
                            label: "2个"
                        }
                        , {
                            value: "3",
                            label: "3个"
                        }
                        , {
                            value: "4",
                            label: "4个"
                        }
                    ]}>
                    </Select>
                    <span style={{ textAlign: "center" }}>状态</span>
                    <Select placeholder={"可借用"} defaultValue={"可借用"}
                            options={[{ value: "可借用", label: "可借用" }, {
                                value: "不可借用",
                                label: "不可借用"
                            }]}>
                    </Select>
                    <span style={{ textAlign: "center" }}>最大借用期限</span>
                    <Select placeholder={"1"} defaultValue={"1"} options={[
                        {
                            value: "1",
                            label: "1天"
                        }
                        , {
                            value: "2",
                            label: "2天"
                        }
                        , {
                            value: "3",
                            label: "3天"
                        }
                        , {
                            value: "4",
                            label: "4天"
                        }
                        , {
                            value: "5",
                            label: "5天"
                        },
                    ]}>
                    </Select>

                </div>
                <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                    <Popconfirm
                        title="是否确认修改"
                        okText="确认"
                        cancelText="取消"
                        icon={<CheckOutlined/>}
                    > <Button onClick={() => {
                    }}>确认修改</Button>
                    </Popconfirm>
                </div>
            </Content>}
        </>
    );
}
