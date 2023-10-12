import { Button, Image, Layout, Modal, Popconfirm } from "antd";
import { useContext, useDebugValue, useImperativeHandle, useState } from "react";
import { Context } from "../ManageDetail/ManageDetail.jsx";
import a from "../../assets/a.jpg"
import { useNavigate } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import b from "../../assets/羽毛球.png"
import c from "../../assets/足球.png"
import d from "../../assets/排球.png"
import useSWR from "swr";
const { Content } = Layout;

const items = [{
    icon: <Image src={a} style={{ width: 50, height: 50 }}/>, name: "九一篮球", user: "张三 11111111", state: 1
},
    {
        icon: <Image src={d} style={{ width: 50, height: 50 }}/>, name: "红双喜排球", user: "张三 11111111", state: 0
    }
    // { icon: <Image src={d} style={{ width: 50, height: 50 }}/>, user: "软件2102韩天宇", name: "红双喜排球", state: 1 },
    // { icon: <Image src={c} style={{ width: 50, height: 50 }}/>, user: "软件2102梁磊辉", name: "李宁足球", state: 1 },
    // { icon: <Image src={b} style={{ width: 50, height: 50 }}/>, user: "软件2102段其甲", name: "尤里克利羽毛球", state: 1 }
]
export const ManageLend = () => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    let navigate = useNavigate();
    const handleOk = () => {
        setIsModalOpen(false);
        // setTimeout(()=>{navigate("/")
        //     navigate("/ManageDetail/借还管理")},0)
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    let s = useContext(Context);
    let [item, setItem] = useState({});
    let [state, setState] = useState(0);
    let value = s !== "" && state === 0 ? 1 : state;
    return (
        <>
            {(((state) => {
                switch (state) {
                    case 0:
                        return <Content
                            style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 350 }}>
                            {/*<Popover content={<div>*/}
                            {/*<QRCode value={"https://baidu.com" || '-'}/>*/}
                            {/*</div>}>*/}
                            <Button>请扫描借用码或归还码完成借还操作</Button>
                            {/*</Popover>*/}
                        </Content>
                    case 1:
                        return <Content style={{
                            padding: "0 12 12 12",
                            display: "flex",
                            flexFlow: "column",
                            justifyContent: "start",
                            height: 350
                        }}>
                            {items.map((item, index) => {
                                return <div key={index} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                    margin: "10px 0 5px 0",
                                    border: "1px solid",
                                    height: 57
                                }}>
                                    {item.icon}
                                    <div style={{
                                        display: "flex",
                                        flexFlow: "column",
                                        justifyContent: "center",
                                        alignItems: "start"
                                    }}>
                                        <span>{"器材：" + item.name}</span>
                                        <span>{"用户：" + item.user}</span>
                                    </div>
                                    <Button onClick={() => {
                                        setState(2);
                                        setItem(item)
                                    }}>{item.state === 1 ? "点击借出" : "点击归还"}</Button>
                                </div>;
                            })}
                        </Content>
                    case 2:
                        return <Content
                            style={{
                                display: "flex",
                                flexFlow: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                height: 350
                            }}
                        >
                            <div style={{
                                width: "50%",
                                height: "50%",
                                display: "flex",
                                flexFlow: "column",
                                alignItems: "center",
                                justifyContent: "space-around",
                                border: "1px solid"
                            }}>
                                {item.icon}
                                <div style={{
                                    display: "flex",
                                    flexFlow: "column",
                                    justifyContent: "center",
                                    alignItems: "start"
                                }}>
                                    <span>{"器材：" + item.name}</span>
                                    <span>{"用户：" + item.user}</span>
                                    <span>{item.state === 1 ? "借用时间：3天" : "归还时间：2023年5月1日"}</span>
                                    {/*<span>{"状态："+""}</span>*/}
                                </div>

                                <Popconfirm
                                    title="是否确认借出"
                                    okText="确认"
                                    cancelText="取消"
                                    icon={<CheckOutlined/>}
                                > <Button onClick={() => {
                                }}>{item.state === 1 ? "点击借出" : "点击归还"}</Button>
                                </Popconfirm>
                            </div>
                        </Content>
                }
            })(value))}
        </>);
}
