import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Login from "../login/login";
import { IFlags } from './interface'
import './head.scss';
import logo from '../../assets/logo.png';
import {
    Menu,
    Modal,
    Dropdown,
    Button,
    Space,
    Divider,
    message,
    Avatar
} from 'antd';

const Head = () => {

    interface IRecords {
        className: string;
        classId: number
    }

    const [flags, setFlags] = useState<IFlags>({
        modalVisible: false,
        isLogin: false,
        isVeri: false,
        isRegister: false,
        findVisible: false,
        loginVisible: false,
        veriVisible: false
    })

    const [records, setRecords] = useState<any>(null);

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        setFlags({
            modalVisible: false,
            isLogin: false,
            isVeri: false,
            isRegister: false,
            findVisible: false,
            loginVisible: false,
            veriVisible: false
        });
        navigate("/")
        message.success("退出成功")
    }

    const showModal = () => {
        setFlags({
            ...flags,
            modalVisible: true
        });
    };

    const closeModal = () => {
        setFlags({
            ...flags,
            modalVisible: false
        });
    };

    const location = useLocation();

    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }, [location])

    const headDrop = (
        <Menu>
            <Menu.Item key="personal">
                <span onClick={() => navigate('/user')}>个人中心</span>
            </Menu.Item>
            <Menu.Item key="logout">
                <span onClick={logOut}>退出登录</span>
            </Menu.Item>
        </Menu>
    )

    const cardHeaderLogin =
        <>
            <h3>欢迎回来</h3>
            <p>还没有账号？请先<span onClick={() => {
                setFlags({ ...flags, isRegister: !flags.isRegister })
            }}>注册</span></p>
        </>

    const cardHeaderRegister =
        <>
            <h3>注册账号</h3>
            <p>已有账号？请直接<span onClick={() => {
                setFlags({ ...flags, isRegister: !flags.isRegister })
            }}>登录</span></p>
        </>

    const tr = () => {
        setFlags({
            ...flags,
            isLogin: true
        });
        const r: any = localStorage.getItem("records")
        setRecords(JSON.parse(r))
    }

    useEffect(() => {
        localStorage.getItem("token")
            ?
            tr()
            :
            setFlags({
                ...flags,
                isLogin: false
            });
    }, [localStorage.getItem("token")])

    return (
        <>
            <nav>
                <div className="container">
                    <div className="logo" onClick={() => navigate("/")}>
                        <img src={logo} alt="" />
                    </div>
                    <div className="nav">
                        <h1>在线课堂</h1>
                    </div>
                    {flags.isLogin
                        ?
                        <div className="logined" id="kkk">
                            <Space
                                align="center"
                                split={<Divider
                                    type="vertical"
                                    style={{ "borderLeft": "1px solid black" }}
                                />}
                                size={"middle"}>
                                <Dropdown
                                    overlay={
                                        records
                                            ?
                                            <Menu key="records">
                                                <Menu.Item key="h34">
                                                    <p className="recent-stu">
                                                        最近学习
                                                    </p>
                                                </Menu.Item>
                                                {
                                                    records
                                                        ?
                                                        records.map((v: any, i: number) => (
                                                            <Menu.Item key={`re${i}`}>
                                                                <Link
                                                                    to={{ pathname: '/detail' }}
                                                                    state={{ ...v }}
                                                                >
                                                                    <span className="record-item">
                                                                        {v.lesson}
                                                                    </span>
                                                                </Link>
                                                            </Menu.Item>
                                                        ))
                                                        :
                                                        <></>
                                                }
                                                <Menu.Item key="h35">
                                                    <Link to="/record">
                                                        <p className="record-more">
                                                            查看更多
                                                        </p>
                                                    </Link>
                                                </Menu.Item>
                                            </Menu>
                                            :
                                            <Menu key="l00">
                                                <Menu.Item key="j55">
                                                    <span>最近未学习</span>
                                                </Menu.Item>
                                            </Menu>
                                    }
                                    placement="bottom"
                                    getPopupContainer={() => document.querySelector(".logined") as HTMLElement}
                                >
                                    <p>学习记录</p>
                                </Dropdown>
                                <Dropdown overlay={headDrop} placement="bottom">
                                    <Avatar
                                        size={40}
                                        style={{ backgroundColor: '#ccc' }}
                                    >
                                        {localStorage.getItem("username")?.slice(0, 1)}
                                    </Avatar>
                                </Dropdown>
                            </Space>
                        </div>
                        :
                        <>
                            <div className="login">
                                <Button type="primary" onClick={showModal}>
                                    登录/注册
                                </Button>
                                <Modal
                                    title={flags.isRegister
                                        ?
                                        cardHeaderRegister
                                        :
                                        cardHeaderLogin
                                    }
                                    visible={flags.modalVisible}
                                    onCancel={closeModal}
                                    footer={null}
                                    maskClosable={false}
                                    transitionName=""
                                    maskTransitionName=""
                                    width="320px"
                                    centered={true}
                                >
                                    <Login
                                        flags={flags}
                                        setFlags={setFlags}
                                        setRecords={setRecords}
                                    />
                                </Modal>
                            </div>
                        </>
                    }
                </div>
            </nav>
        </>
    )
}

export default Head