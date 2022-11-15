import { memo } from 'react'
import './bottom.scss'

const Bottom = memo(() => {
    return (
        <div className='bottom'>
            <div className="container">
                <div className="items-box">
                    <div className="bottom-item">
                        <h1>案例介绍</h1>
                        <p>玻璃刻字</p>
                        <p>汽轮机叶片打磨</p>
                        <p>锅具打磨</p>
                        <p>机器人离线编程</p>
                    </div>
                    <div className="bottom-item">
                        <h1>解决方案</h1>
                        <p>汽轮机叶片打磨</p>
                        <p>叶片自动化钎焊</p>
                        <p>崮德轮胎打标</p>
                    </div>
                </div>
                <div className="items-box">
                    <div className="bottom-item">
                        <h1>产品中心</h1>
                        <p>离线编程软件</p>
                        <p>力控执行器</p>
                        <p>上位机软件</p>
                    </div>
                    <div className="bottom-item">
                        <h1>关于我们</h1>
                        <p>公司简介</p>
                        <p>团队介绍</p>
                        <p>发展历程</p>
                        <p>公司荣誉</p>
                    </div>
                </div>
                <h1 className='b'>商务合作：<span>Robotics@wahaha.com.cn</span></h1>
                <h2 className='b'><span>娃哈哈集团</span><span>娃哈哈智能机器人</span></h2>
            </div>
          <div className="icp">
          <h2 className='b'>
                <span>CopyRight</span>
                <span>2019-2021</span>
                <span>浙江娃哈哈智能机器人有限公司</span>
                <span>浙ICP备1545613-5135</span>
            </h2>
          </div>
        </div>
    )
})

export default Bottom