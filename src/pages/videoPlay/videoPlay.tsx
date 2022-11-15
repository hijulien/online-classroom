import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import Player from 'xgplayer';
import { Drawer, List } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import './videoPlay.scss'
import { IPlay } from './interface';

const VideoPlay = () => {

    const location = useLocation();

    const [params] = useSearchParams();

    console.log("location", location);

    const [data, setData] = useState({
        course: params.get("course"),
        sidebarVisiable: false,
        chapterIndex: Number(params.get("ci")),
        sectionIndex: Number(params.get("si")),
        catalogue: location.state,
    } as IPlay)

    // const [visible, setVisible] = useState(false);

    const chap = useRef<any>()

    const onClose = () => {
        setData({
            ...data,
            sidebarVisiable: false
        })
    };

    const change = (ci:number,si:number,newSrc: string) => {
        setData({
            ...data,
            chapterIndex: ci,
            sectionIndex: si,
        })
        console.log(newSrc);
    }

    useEffect(() => {

        let player = new Player({
            id: 'player',
            url: 'https://qiaoji-video.s3.ap-southeast-1.amazonaws.com/1-1.mp4',
            videoInit: true,
            fitVideoSize: 'auto',
            lastPlayTime: 20,
            width: "100%",
            height: "100%",
        });

        function score() {
            if (player.duration - player.currentTime <= 30) {
                console.log("可以点赞了");
                player.off("timeupdate", score)
            }
        }

        player.on("timeupdate", score);
        return () => {
            player.destroy();
            console.log("销毁play");
        }
    }, [])

    useEffect(() => {
        data.sidebarVisiable ? chap.current.style.right = "378px" : chap.current.style.right = 0
    }, [data.sidebarVisiable])

    useEffect(() => console.log(data.chapterIndex,data.sectionIndex),[data])

    return (
        <div className='play'>
            <div className="box">
                <h2>{data.course}
                    /
                    {data.sectionIndex + 1}
                    -
                    {data.chapterIndex + 1}
                    {data.catalogue[data.sectionIndex].chapters[data.chapterIndex].section}
                </h2>
                <div id="player"></div>
            </div>
            <div
                className="chapter-btn"
                ref={chap}
                onMouseOver={() => setData({
                    ...data,
                    sidebarVisiable:true
                })}
            >
                <UnorderedListOutlined />
                <p>章节</p>
            </div>
            <Drawer
                title="课程名字"
                placement="right"
                onClose={onClose}
                visible={data.sidebarVisiable}
                mask={false}
                autoFocus={false}
            >
                {
                    data.catalogue.map((v: any, si: number) => (
                        <List
                            key={`cata${si}`}
                            header={<h2>{v.chapter}</h2>}
                            dataSource={v.chapters}
                            size="small"
                            split={false}
                            renderItem={(item: any, ci: number) => {
                                return (
                                    <List.Item>
                                        <p
                                            onClick={() => {
                                                change(ci,si,item.videoSrc)
                                            }}
                                        > {si + 1}、{item.section}</p>
                                    </List.Item>
                                )
                            }
                            }
                        >
                        </List>
                    ))
                }
            </Drawer>
            {
                data.sidebarVisiable ?
                    <>
                        <div className="musk" onMouseOver={() => onClose()}>
                        </div>
                    </>
                    :
                    <></>
            }
        </div >
    )
}

export default VideoPlay
