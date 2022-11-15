import React, { useState, useEffect, ReactNode } from "react";
import { Link } from 'react-router-dom';
import Banner from "../../components/banner/banner";
import HotTeacher from "../../components/hotTeacher/hotTeacher";
import Bottom from "../../components/bottom/bottom";
import { ClassListApi, HotApi } from "../../utils/api";
import './home.scss';
import {
    Button,
    Input,
    Form,
    Select,
    Radio,
    Pagination,
    Rate,
    RadioChangeEvent,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { IHot, ITypeSearch, IData } from "./interface";
import { log } from "console";

const Home: React.FC = () => {

    const { Search } = Input;

    const { Option } = Select;

    const [data, setData] = useState<IData>({
        radio: 'hot',
        currentPageNum: 1,
        lessonNum: 0
    })

    const [hot, setHot] = useState<IHot | null>(null);

    const onSearch = (value: string) => {
        console.log(value);
    }

    const typeSearch = (values: ITypeSearch) => {
        console.log(values);
    };

    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };

    const radioOnChange = (e: RadioChangeEvent) => {
        setData({
            ...data,
            radio: e.target.value
        })
    }

    const pageOnChange = (page: number) => {
        setData({
            ...data,
            currentPageNum: page
        })
    }

    const firstPage = () => {
        setData({
            ...data,
            currentPageNum: 1
        })
    }

    const lastPage = () => {
        setData({
            ...data,
            currentPageNum: Math.ceil(data.lessonNum / 12)
        })
    }

    const pageBtnRender = (page: number, type: ReactNode, originalElement: ReactNode) => {
        if (type === 'prev') {
            return (
                <>
                    <Button type="primary" shape="round">
                        上一页
                    </Button>
                </>
            );
        }
        if (type === 'next') {
            return (
                <>
                    <Button type="primary" shape="round">
                        下一页
                    </Button>
                </>
            );
        }
        return originalElement;
    }

    useEffect(
        () => {
            const result = async () => {
                const response = await ClassListApi({
                    "classType": "hot",
                    "page": data.currentPageNum + 1
                })
                setData(data => {
                    return {
                        ...data,
                        classList: response.classList,
                        lessonNum: response.total
                    }
                });
            }
            result()
            console.log("getclasslist",document.cookie);
        }, [data.currentPageNum,data.radio]);

    useEffect(() => {
        const result = async () => {
            const response = await HotApi()
            setHot(response)
        }
        result()
    }, []);

    useEffect(() => {
        if (data.radio === 'hot' && data.classList?.length === 12) {
            const newClassList = data.classList;
            newClassList.pop();
            setData(data => {
                return {
                    ...data,
                    classList: newClassList
                }
            })
        }
    }, [data])


    return (
        <>
            <Banner
                banner={hot?.banner}
            />
            <div className="search-box container .clearfloat">
                <div className="search fillet">
                    <Search placeholder="搜索课程" onSearch={onSearch} bordered={false} style={{ width: 200, borderRadius: "16px" }} />
                </div>
                <div className="class-type">
                    <Form
                        form={form}
                        onFinish={typeSearch}
                        layout="inline"
                        name="control-hooks">
                        <Form.Item
                            className="fillet"
                            name="classType"
                        >
                            <Select
                                style={{ width: 200 }}
                                bordered={false}
                                placeholder="选择课程分类"
                            >
                                <Option value="likong">力控</Option>
                                <Option value="yepian">叶片</Option>
                                <Option value="guoju">锅具</Option>
                                <Option value="qianliao">钎料</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            className="fillet"
                            name="classPrice"
                        >
                            <Select
                                style={{ width: 200 }}
                                bordered={false}
                                placeholder="课程价格"
                            >
                                <Option value={100}>一百元以下</Option>
                                <Option value={300}>三百元以下</Option>
                                <Option value={500}>五百元以下</Option>
                                <Option value={501}>五百元以上</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                shape="round">
                                搜索
                            </Button>
                            <Button
                                onClick={onReset}
                                htmlType="button"
                                type="primary"
                                shape="round">
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className="search-radio fillet">
                    <Radio.Group
                        defaultValue="hot"
                        onChange={radioOnChange}
                        buttonStyle="solid"
                    >
                        <Radio.Button
                            value="hot"
                            defaultChecked={true}
                            style={{ border: 'none' }}
                        >
                            热门推荐
                        </Radio.Button>
                        <Radio.Button
                            value="latestOnline"
                            style={{ border: 'none' }}
                        >
                            最新上线
                        </Radio.Button>
                        <Radio.Button
                            value="learningTimes"
                            style={{ border: 'none' }}
                        >
                            学习次数
                        </Radio.Button>
                    </Radio.Group>
                </div>
                <div className="inner"></div>
            </div>
            <div className="classList container">
                {data.radio === "hot"
                    ?
                    <>
                        <div className="hot-key class-item">
                            <h2>热搜关键词:</h2>
                            {
                                hot?.hotKey.map((v: string, i: number) => (
                                    <p key={`${v}${i}`}>{v}</p>
                                ))
                            }
                        </div>
                        {data.classList
                            ?
                            data.classList.map((v: any, i: number) => (
                                <div className="class-item" key={`${v}${i}`}>
                                    <Link
                                        to={`/detail?courseId=${v.courseId}`
                                        }
                                        state={v}
                                        >
                                        <div className="img-box">
                                            <img src={`${v.imgSrc}`} alt="" />
                                        </div>
                                        <div className="desc-box">
                                            <h3>{v.course}</h3>
                                            <p>{v.author}</p>
                                            <Rate disabled allowHalf defaultValue={v.stars} />
                                            <div className="info">
                                                <span className="views"><EyeOutlined />{v.viewTimes}</span>
                                                <span>{v.commentNum}评论</span>
                                                <span className="price">
                                                    {v.price == 0
                                                        ?
                                                        (<>免费</>)
                                                        :
                                                        (<>{v.price}元</>)
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                            )
                            :
                            <>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                            </>
                        }
                    </>
                    :
                    <>
                        {data.classList
                            ?
                            data.classList.map((v: any, i: number) => (
                                <div className="class-item" key={`${v}${i}`}>
                                    <Link
                                        onClick={() => localStorage.setItem("lessoninfo", JSON.stringify(v))}
                                        to={`/detail?courseId=${v.courseId}`}>
                                        <div className="img-box">
                                            <img src={`${v.imgSrc}`} alt="" />
                                        </div>
                                        <div className="desc-box">
                                            <h3>{v.lesson}</h3>
                                            <p>{v.author}</p>
                                            <Rate disabled allowHalf defaultValue={v.stars} />
                                            <div className="info">
                                                <span className="views"><EyeOutlined />{v.viewTimes}</span>
                                                <span>{v.commentNum}评论</span>
                                                <span className="price">
                                                    {v.price == 0
                                                        ?
                                                        (<>免费</>)
                                                        :
                                                        (<>{v.price}元</>)
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                            )
                            :
                            <>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                                <div className="class-item"></div>
                            </>
                        }
                    </>
                }




                <div className="page">
                    <Form
                        layout="inline"
                    >
                        <Form.Item>
                            <Button type="primary" shape="round" onClick={firstPage}>
                                首页
                            </Button>
                        </Form.Item>
                        <Form.Item>

                            <Pagination
                                current={data.currentPageNum}
                                onChange={pageOnChange}
                                total={data.lessonNum}
                                defaultPageSize={12}
                                showSizeChanger={false}
                                itemRender={pageBtnRender}
                                hideOnSinglePage={true}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" shape="round" onClick={lastPage}>
                                尾页
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <p className="page-number">共{data ? Math.ceil(data.lessonNum / 12) : 0}页</p>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <div className="teachers container">
                <HotTeacher teacher={hot?.hotTeacher}></HotTeacher>
            </div>
            <div className="support container">
                <div className="title">
                    <h1>
                        <div className="hr"></div>
                        课程支持
                        <div className="hr" style={{ "right": "0" }}></div>
                    </h1>
                </div>
                <div className="items">
                    {hot
                        ?
                        hot.support.map((v, i) => (
                            <div className="item" key={`sup${i}`}>
                                <img src={v} alt="" />
                            </div>
                        ))
                        :
                        null
                    }
                </div>
            </div>
            <Bottom></Bottom>
        </>
    )
}

export default Home;