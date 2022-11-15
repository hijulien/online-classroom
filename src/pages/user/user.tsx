import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Avatar, Input } from 'antd';
import { FormOutlined, LoadingOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './user.scss';

const User = () => {

    const navigate = useNavigate();

    const [flags, setFlags] = useState(false)

    return (
        <div className="user">
            <div className="info">
                <div className="head">
                    <Avatar
                        size={80}
                        style={{ backgroundColor: '#ccc' }}
                    >
                        {localStorage.getItem("username")?.slice(0, 1)}
                    </Avatar>

                    <p>
                        <Input.Group compact>
                            <Input
                                style={{ width: 140 }}
                                maxLength={8}
                                // bordered={false}
                                defaultValue={localStorage.getItem("username") || ""}
                                // placeholder={localStorage.getItem("username") || ""}
                            />
                            <FormOutlined />
                        </Input.Group>
                    </p>


                    <p>{localStorage.getItem("username")} <FormOutlined onClick={() => setFlags(!flags)} /></p>
                </div>
                <div className="mail">
                    <div className="cont">
                        <h2>电子邮箱</h2>
                        <p>{localStorage.getItem("useremail")}</p>
                    </div>
                    <div className="change">
                        <Button type="primary">编辑</Button>
                    </div>
                </div>
                <div className="hr"></div>
                <div className="psd">
                    <div className="cont">
                        <h2>登录密码</h2>
                        <p>登录密码作为你安全登录的保障</p>
                    </div>
                    <div className="change">
                        <Button type="primary">修改</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default User;

//  <Input.Group compact>
// <Input
//     style={{ width: 140 }}
//     maxLength={8}
//     bordered={false}
//     placeholder={localStorage.getItem("username") || ""}
// />
// <Button type="primary">提交</Button>
// </Input.Group> 