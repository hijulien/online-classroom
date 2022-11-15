import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home";
import Detail from "../pages/detail/detail";
import User from "../pages/user/user";
import Record from "../pages/recore/record";
import VideoPlay from "../pages/videoPlay/videoPlay";
import NotFound from "../pages/notFound/notFound";
import 'antd/dist/antd.css';

import Head from "../components/head/head";

const MyRouter: React.FC = () => {
    return (
        <>
            <Router>
                <Head />
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route index element={<Home />}></Route>
                    <Route path="/detail" element={<Detail />}></Route>
                    <Route path="/play" element={<VideoPlay />}></Route>
                    <Route path="/user"
                        element={
                            localStorage.getItem("token")
                                ?
                                <User />
                                :
                                <Navigate to='/' />
                        }
                    ></Route>
                    <Route path="/record" element={<Record />}></Route>
                    <Route path="/test" element={<Head />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </Router>
        </>
    )
}

export default MyRouter;