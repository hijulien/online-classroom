import { useRef } from "react";
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './hotTeacher.scss'

interface ITeacher {
    name: string;
    positionName: string;
    cont: string
    imgSrc: string
}
const HotTeacher = (props:any) => {
    const carousel = useRef<any>(null)

    const p = () => {
        carousel.current.prev()
    }

    const n = () => {
        carousel.current.next();
    }

    const left =
        <>
            <LeftOutlined onClick={p} />
        </>

    const right =
        <>
            <RightOutlined onClick={n} />
        </>
    return (
        <Carousel
            dots={false}
            autoplay
            arrows={true}
            prevArrow={left}
            nextArrow={right}
            ref={carousel}
        >
            {
                props
                    ?
                    props.teacher?.map((v:ITeacher[], i:number) => (
                        <div className="teacher-box" key={`${i}lll`}>
                            <div className="teacher tl">
                                <img src={`${v[0].imgSrc}`} alt="" />
                                <div className="teacher-info">
                                    <p className="name">{v[0].name}<span>{v[0].positionName}</span></p>
                                    <p className="cont">{v[0].cont}</p>
                                </div>
                            </div>
                            <div className="teacher tr">
                                <img src={`${v[1].imgSrc}`} alt="" />
                                <div className="teacher-info">
                                    <p className="name">{v[1].name}<span>{v[1].positionName}</span></p>
                                    <p className="cont">{v[1].cont}</p>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <></>
            }

        </Carousel>
    )
}

export default HotTeacher;