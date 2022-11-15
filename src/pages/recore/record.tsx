import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Input, message } from 'antd';
import { RecordApi, DelRecordApi } from '../../utils/api';
import { AudioOutlined } from '@ant-design/icons';
import './record.scss'

interface IRecord {
    name: string,
    className: string,
    classId: string,
    current: number,
    all: number,
    imgSrc: string
}

const { Search } = Input;
const Record = () => {

    const data: any = localStorage.getItem("records")

    const list = JSON.parse(data)

    const [recordList, setRecordList] = useState(list);

    const params = useParams();

    const onSearch = (value: any) => console.log(value);

    const delSuccess = (id: number) => {
        setRecordList(recordList.filter((v: any) => v.lessonId != id));
        localStorage.setItem("records", JSON.stringify(list.filter((v: any) => v.lessonId != id)))
        message.success("删除成功");
    }

    const delFail = () => {
        message.error("删除失败")
    }

    const remove = async (e: any) => {

        await DelRecordApi(e.target.id).then(
            (res) => {
                res.status == 200
                    ?
                    delSuccess(e.target.id)
                    :
                    delFail()
            },
            (err) => {
                console.log(err);
            }
        )
    }

    useEffect(() => {
        const result = async () => {
            const datas = await RecordApi();
            setRecordList(recordList.concat(datas))
        }
        result();
    }, [])

    // useEffect(() => {
    //     console.log(recordList);
    // }, [recordList])

    return (
        <div className='record'>
            <div className="banner">
                <h1>学习是一种信仰</h1>
            </div>
            <div className="container">
                <div className="title">
                    <p>学习记录</p>
                    <div className="search">
                        <Search placeholder="搜索课程" onSearch={onSearch} bordered={false} style={{ width: 200, borderRadius: "16px", border: "none" }} />
                    </div>
                </div>
                <div className="record-list">
                    {
                        recordList?.map((v: any, i: number) => (
                            <div key={`v${i}`} className="item">
                                <div className="img">
                                    <Link
                                        to={{ pathname: '/detail' }}
                                        state={{ ...v }}
                                    >
                                        <img src={v.imgSrc} alt="" />
                                    </Link>
                                </div>
                                <div className="cont">
                                    <div>
                                        <h2>{v.lesson}</h2>
                                        <p className='name'>{v.author}</p>
                                        <p>已学习{v.current}/{v.chapters}</p>
                                    </div>
                                </div>
                                <div className='delete'>
                                    <p onClick={remove} id={v.lessonId}>删除</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Record