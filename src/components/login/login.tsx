import { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import Verification from '../verification/verification';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import './login.scss';
import { IValues,IEmail,IResetPsd } from './interface';
import { LoginApi, RegisterApi, FindPsdApi, RestePsdApi } from '../../utils/api';

const Login = (props: any) => {

    const { flags, setFlags,setRecords } = props;

    const [isSend, setIsSend] = useState(false);

    const login = (values: IValues) => {
        if (flags.isVeri) {
            LoginApi(values).then((res: any) => {
                message.success("登录成功")
                console.log("获取响应", res);
                setFlags({ ...flags, isLogin: true });
                localStorage.setItem('token', res.token);
                localStorage.setItem('username', res.username);
                localStorage.setItem('useremail', res.useremail);
                localStorage.setItem('records', JSON.stringify(res.records));
                window.location.reload()
            });
        }
    }

    const register = (values: IValues) => {
        if (flags.isVeri) {
            RegisterApi(values).then((res: any) => {
                message.success("注册成功")
                setFlags({
                    ...flags, 
                    isRegister: false,
                    isVeri: false
                })
            });
        }
    }

    const onFinish = (values: IValues) => {
        if (!flags.isVeri) {
            setFlags({ ...flags, veriVisible: true })
        }
        flags.isRegister ? register(values) : login(values);
    };

    const findPsd = (values: IEmail) => {
        FindPsdApi(values).then((res: any) => {
            message.success("发送成功")
            setIsSend(true);
        })
    }

    const resetPsd = (values: IResetPsd) => {
        RestePsdApi(values).then((res: any) => {
            message.success("重置成功")
            setIsSend(false);
            setFlags({ ...flags, findVisible: false })
        })
    }

    const changeStatus = (item:string,status:boolean) => {
        setFlags({ ...flags, item: status })
    }

    const closeVeri = () => {
        setFlags({ ...flags, veriVisible: false })
    }

    const openFindPsd = () => {
        setFlags({ ...flags, findVisible: true })
    }

    const closeFindPsd = () => {
        setFlags({ ...flags, findVisible: false })
    }

    return (
        <div className="login">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: '请输入邮箱!' },
                    { pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, message: '请输入正确邮箱格式' }]}
                >
                    <Input prefix={<MailOutlined />} placeholder="邮箱" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' },
                    { pattern: /^[0-9A-Za-z]{6,14}$/, message: "6到14位字符数字组合" }
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                <Form.Item>
                    {flags.isRegister ? null : (<a className="login-form-forgot" href="#" onClick={openFindPsd}>忘记密码</a>)}
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        {flags.isRegister ? "注册" : "登录"}
                    </Button>
                    注册登录即表示同意<a href="">用户协议</a>、<a href="">隐私政策</a>
                </Form.Item>
            </Form>
            <Modal
                title="请完成安全验证"
                visible={flags.veriVisible}
                onCancel={closeVeri}
                maskClosable={false}
                footer={null}
                width="350px"
                transitionName=""
                maskTransitionName=""
            >
                <Verification
                    flags={flags}
                    setFlags={setFlags}
                />
            </Modal>
            <Modal
                title="找回密码"
                visible={flags.findVisible}
                onCancel={closeFindPsd}
                maskClosable={false}
                footer={null}
                width="350px"
                transitionName=""
                maskTransitionName=""
            >
                {isSend
                    ?
                    (<>
                        <Form
                            onFinish={resetPsd}
                            initialValues={{}}
                        >
                            <Form.Item
                                name="code"
                                rules={[
                                    { required: true, message: '请输入验证码!' },
                                    { pattern: /^\d{6}$/, message: "请输入六位验证码" }
                                ]}
                            >
                                <Input prefix={<MailOutlined />} placeholder="验证码" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码!' },
                                { pattern: /^[0-9A-Za-z]{6,14}$/, message: "6到14位字符数字组合" }
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"
                                />

                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block={true}>
                                    重置密码
                                </Button>
                            </Form.Item>
                        </Form>
                    </>)
                    :
                    (<>
                        <Form
                            onFinish={findPsd}
                        >
                            <p>我们会向您的邮箱发送一封重置密码邮件</p>
                            <Form.Item
                                name="username"
                                rules={[
                                    { required: true, message: '请输入邮箱!' },
                                    { pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, message: '请输入正确邮箱格式' }]}
                            >
                                <Input prefix={<MailOutlined />} placeholder="邮箱" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block={true}>
                                    发送邮件
                                </Button>
                                <p>
                                    已有巧迹Smartrack账号？立即
                                    <span
                                        onClick={closeFindPsd}
                                        className='f-login'
                                    >
                                        登录
                                    </span>
                                </p>
                            </Form.Item>
                        </Form>
                    </>)
                }
            </Modal>
        </div>
    );
};

export default Login;