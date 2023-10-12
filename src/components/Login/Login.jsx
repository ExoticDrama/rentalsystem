import door from "../../assets/img_1.png"
import picture from "../../assets/img_2.png"

const width = "30rem"
const height = "20rem"
export const Login = () => {
    let navigate = useNavigate();
    return (
        <>
            <div style={{ display: "flex", flexFlow: "column", alignItems: "center",justifyContent:"center" ,height: "100%", width: "100%" }}>
                <Carousel style={{ width: width, height: height, margin: "0 0 0 0" }} autoplay={true}
                          dotPosition={"top"}>
                    <div><Image style={{ width: width, height: height }} src={door}>
                    </Image></div>
                    <div><Image src={picture} style={{ width: width, height: height }}>
                    </Image></div>
                </Carousel>
                <div>
                    <Form onFinish={(value) => {
                        if (value.username === "root")
                            navigate("/manage")
                        else
                            navigate("/main")
                    }}
                          name="basic"
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 16 }}
                          style={{ maxWidth: 600 }}
                          initialValues={{ remember: true }}
                          autoComplete="off"
                    >
                        <Form.Item
                            label="账号"
                            name="username"
                            rules={[{ required: true, message: '请输入你的账号！' }]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入你的密码！' }]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        <div style={{
                            padding: "0 2.5rem 0 0"
                        }}><Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>保持登录</Checkbox>
                        </Form.Item>
                        </div>
                        <div style={{ padding: "0 2.5rem 0 0" }}><Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                        </div>
                    </Form></div>
            </div>

        </>
    );
}
import React from 'react';
import { Button, Carousel, Checkbox, Form, Image, Input } from 'antd';
import { useNavigate } from "react-router-dom";
