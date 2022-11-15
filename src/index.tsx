import React from 'react';
import './index.scss';

import App from './App';
import * as ReactDOMClient from 'react-dom/client';
import 'antd/dist/antd.variable.min.css';

import { ConfigProvider } from 'antd';

ConfigProvider.config({
  theme: {
    primaryColor: '#40a9ff',
  },
});


const container = document.getElementById('root');

const root = ReactDOMClient.createRoot(container as HTMLElement); 

root.render(<App/>);


// ReactDOM.render(
//   <React.StrictMode>
//     <MyRouter/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
