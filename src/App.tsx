import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/home";
import Detail from "./pages/detail/detail";
import User from "./pages/user/user";
import Record from "./pages/recore/record";
import VideoPlay from "./pages/videoPlay/videoPlay";
import NotFound from "./pages/notFound/notFound";
import 'antd/dist/antd.css';

import Head from "./components/head/head";

function App() {
  return (
    <div className="App">
        <Router>
                <Head />
                <Routes>
                    <Route path='/wsxy' element={<Home />}></Route>
                    <Route index element={<Home />}></Route>
                    <Route path="/wsxy/detail" element={<Detail />}></Route>
                    <Route path="/wsxy/play" element={<VideoPlay />}></Route>
                    <Route path="/wsxy/user"
                        element={
                            localStorage.getItem("token")
                                ?
                                <User />
                                :
                                <Navigate to='/wsxy/' />
                        }
                    ></Route>
                    <Route path="/wsxy/record" element={<Record />}></Route>
                    <Route path="/wsxy/test" element={<Head />}></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </Router>
    </div>
  );
}

export default App;
