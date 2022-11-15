import  {  useState, useEffect, useRef } from "react";
import { Slider, message } from 'antd';
import veri0 from '../../assets/veri0.jpg';
import veri1 from '../../assets/veri1.jpg';
import veri2 from '../../assets/veri2.jpg';
import veri3 from '../../assets/veri3.jpg';
import veri4 from '../../assets/veri4.jpg';
import './verification.scss';

const Verification = (props:any) => {

    const {flags,setFlags} = props;

    const veriImg = [veri0, veri1, veri2, veri3, veri4]

    const [src, setSrc] = useState();

    const [flag, setFlag] = useState(true);

    const [dist, setDist] = useState<any>();

    const musk: any = useRef();

    const slider = useRef(null)

    let timer: number;

    const pass = () => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
            message.success("验证成功");
            setFlags({...flags,isVeri:true,veriVisible:false})
        }, 1000)
    }

    const sect:any = useRef(null);
    const moveSect = (value: number): void => {
        sect.current.style.left = `${value}%`;
        Math.abs(value - dist) < 5 ? pass() : console.log();
        ;
    }

    useEffect(() => {
        const index: number = Math.floor(Math.random() * 100);
        const imgIndex: number = Math.floor(Math.random() * 4);
        setSrc(veriImg[imgIndex]);
        setDist(index)
        musk.current.style.backgroundPosition = `center center`
        setFlag(false);
    }, [])
    return (
        <div className="veri">
            <h2>请完成安全验证</h2>
            <img src={src} alt="验证图片" />
            <div className="sect-box">
                <div className="sect img-sect" ref={sect} style={{ "background": `url(${src}) no-repeat`, "backgroundPosition": `${dist}% -120px` }}></div>
                <div className="sect" ref={musk} style={{ "left": `${dist}%` }}></div>
            </div>
            <Slider
                ref={slider}
                defaultValue={0}
                tooltipVisible={false}
                disabled={flag}
                onChange={(value) => {
                    moveSect(value);
                }}
            />
        </div>
    )
}

export default Verification;