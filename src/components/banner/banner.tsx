import React, { useRef } from "react";
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './banner.scss'

const Banner = (props: any) => {
    const banner = useRef<any>(null)

    const contentStyle: React.CSSProperties | undefined = {
        height: '400px',
        width: '100%',
        color: '#fff',
        lineHeight: '660px',
        textAlign: 'center',
        background: '#364d79',
    };

    const p = () => {
        banner.current.prev()
    }

    const n = () => {
        banner.current.next();
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
            effect="fade"
            autoplay={true}
            arrows={true}
            prevArrow={left}
            nextArrow={right}
            ref={banner}
        >
            {props.banner
                ?
                props.banner.map((v: string) => {
                    return (
                        <div key={v}>
                            <img src={v} alt="" style={contentStyle} />
                        </div>
                    )
                }
                )
                :
                <></>
               
            }
        </Carousel>
    )
}

export default Banner;