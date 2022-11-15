import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { WalletOutlined, FieldTimeOutlined, EyeOutlined } from '@ant-design/icons';
import './detail.scss';
import { IClassList } from '../home/interface';
import { IDetail } from "./interface";
import { DetailApi, TipApi } from '../../utils/api';
import {
    Space,
    Divider,
    Progress,
    Button,
    Rate,
    message,
    Avatar
} from 'antd';

const Detail = () => {

    console.log("组件执行");

    const location = useLocation()

    const params: any = location.state

    const [data, setData] = useState<IDetail>({
        courseInfo: params
    })

    const toTip = (v: IClassList) => {
        setData({
            courseInfo: v
        })
    }

    const navigate = useNavigate();

    useEffect(() => {
        const result = async () => {
            const detail = await DetailApi({
                courseId: `${data.courseInfo.courseId}`
            })

            const tip = await TipApi({})

            setData({
                courseInfo: {
                    ...params,
                    ...detail
                },
                ...tip
            });
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
        result();
    }, [data.courseInfo.course])

    useEffect(() => console.log(data), [data])

    return (
        <div className="detail container">
            <div className="top">
                <h1>{data.courseInfo.course}</h1>
                <Space
                    size="middle"
                    align="center"
                    split={<Divider type="vertical"
                        style={{ "borderLeft": "1px solid #d9d9d9", "height": "60px" }}
                    />}
                >
                    <div className="head-img" onClick={() => navigate(`/play?courseId=9527&id=250`)}>
                        <Avatar size={64} src={data.courseInfo.header} />
                        <div className="item" style={{ "marginLeft": "18px" }}>
                            <p style={{ "marginTop": "8px" }}>授课老师</p>
                            <p>{data.courseInfo.author}</p>
                        </div>
                    </div>
                    <div className="item">
                        <p>课程评分</p>
                        <div>
                            <Rate disabled allowHalf defaultValue={data.courseInfo.stars} />
                            ({data.courseInfo.commentNum}人评价)
                        </div>
                    </div>
                    <div className="item">
                        <p>课程类别</p>
                        <p>{data.courseInfo.courseType}</p>
                    </div>
                    <div className="item">
                        <p>观看人数</p>
                        <p>{data.courseInfo.viewTimes}</p>
                    </div>
                </Space>
            </div>
            <div className="main container">
                <div className="body">
                    <div className="cover-img">
                        <img src={data.courseInfo.banner} alt="" />
                    </div>
                    <div className="desc">
                        <h3>课程简介</h3>
                        <p>{data.courseInfo.describe}</p>
                    </div>
                    <div className="fit">
                        <h3>适合人群</h3>
                        <p>{data.courseInfo.range}</p>
                    </div>
                    <div className="chapter">
                        <h3>课程目录</h3>
                        <div className="list-box">
                            {data.courseInfo.catalogue?.map((v: any, i: number) => (
                                <section key={`qv${i}`}>
                                    <h3><span>section{i + 1}</span>{v.title}</h3>
                                    {v.chapters.map((v1: any, i1: number) => (
                                        <div className="chapter-child" key={`m${i1}`}>
                                            <div className="item item0">
                                                <p>
                                                    {<WalletOutlined style={{ "marginRight": "20px" }} />}{v1.chapter}
                                                </p>
                                            </div>
                                            <div className="item item1">
                                                <Progress percent={
                                                    Math.round((v1.duration - 800) / v1.duration * 100)
                                                } style={{ width: "80%" }} />
                                                {v1.duration
                                                    ?
                                                    <>
                                                        <span className="time"><FieldTimeOutlined />
                                                            {Math.floor(v1.duration / 3600) == 0
                                                                ?
                                                                null
                                                                :
                                                                Math.floor(v1.duration / 3600)
                                                            }'{Math.floor(v1.duration / 60) % 60}'
                                                            {Math.floor(v1.duration % 60)}
                                                        </span>
                                                    </>
                                                    :
                                                    <>
                                                        <span className="time"><FieldTimeOutlined />0</span>
                                                    </>
                                                }
                                            </div>
                                            <div className="item item2">
                                                {
                                                    localStorage.getItem("token")
                                                        ?
                                                        <Button
                                                            shape="round"
                                                            type="primary"
                                                        // href={`/play?courseId=${data.courseInfo.courseId}&si=${i}&ci=${i1}`}
                                                        ><Link
                                                            to={`/play?courseId=${data.courseInfo.courseId}&course=${data.courseInfo.course}&ci=${i}&si=${i1}`}
                                                            state={data.courseInfo.catalogue}
                                                        >
                                                                {v1.duration
                                                                    ?
                                                                    <>继续学习</>
                                                                    :
                                                                    <>开始学习</>}
                                                            </Link>
                                                        </Button>
                                                        :
                                                        <Button
                                                            shape="round"
                                                            type="primary"
                                                            onClick={() => message.warn("请先点击右上角登录")}
                                                        >
                                                            <>开始学习</>
                                                        </Button>
                                                }

                                            </div>
                                        </div>
                                    ))}
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="side">
                    <div className="evaluate">
                        <span className="title">课程评价</span>
                        <div className="number">
                            <div className="star">
                                <p>平均得分</p>
                                <Rate disabled allowHalf defaultValue={data.courseInfo.stars} />
                            </div>
                            <div className="mark">
                                <h1>{Math.round(data.courseInfo.stars)}</h1>
                            </div>
                        </div>
                        <div className="percent">
                            {data.courseInfo.scoreList?.map((v: number, i: number) => (
                                <div className="item" key={`per${i}`}>
                                    <div className="cont">
                                        <p>{i}星</p>
                                        <p>{v}</p>
                                    </div>
                                    <Progress
                                        percent={Math.round(v / data.courseInfo.scoreList!.reduce((a: number, b: number) =>
                                            a + b) * 100)}
                                        showInfo={false}
                                        style={{ width: "100%", marginBottom: "5px" }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="recommend">
                        <span className="title">推荐课程</span>
                        {data.tipList?.map((v: any, i: number) => (
                            <Link
                                key={`v${i}`}
                                to={`/detail?courseId=${v.courseId}`}
                                state={v}
                                onClick={() => toTip(v)}
                            >
                                <div className="item"
                                >
                                    <div className="img-box">
                                        <img src={`${v.imgSrc}`} alt="" />
                                    </div>
                                    <div className="desc">
                                        <div className="author">
                                            <h3>{v.course}</h3>
                                            <p>{v.author}</p>
                                            <Rate
                                                disabled
                                                allowHalf
                                                defaultValue={v.stars}
                                                style={{ marginTop: "10px" }}
                                            />
                                        </div>
                                        <div className="info">
                                            <span className="views"><EyeOutlined />
                                                {Math.floor(v.viewTimes)}
                                            </span>
                                            <span className="content">
                                                {v.commentNum}评论
                                            </span>
                                            <span className="price">
                                                {v.price == 0
                                                    ?
                                                    <>免费</>
                                                    :
                                                    <>{v.price}元</>
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;