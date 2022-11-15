import http from './http'

interface ILoginParams {
    username: string | number;
    password: string | number;
}

interface IEmail {
    username: string;
}

interface IResetPsd {
    code: number;
    psd: string;
    token: string;
}

interface IClassList {
    classType: string;
    page: number;
}

interface IDetail {
    classId:number;
    userName?:string
}

// 注册
export const LoginApi = (params: ILoginParams) => http.post('/login', params).then((res) => res.data);

export const RegisterApi = (params: ILoginParams) => http.post('/register', params).then((res) => res.data);

export const FindPsdApi = (params: IEmail) => http.post('/findpsd', params).then((res) => res.data);

export const RestePsdApi = (params: IResetPsd) => http.post("/resetpsd", params).then((res) => res.data);

export const ClassListApi = (params: any) => http.get("/classlist", params).then((res) => res.data)

export const HotApi = () => http.get("/hot").then((res) => res.data)

export const RecordApi = () => http.get("/records").then((res) => res.data)

export const DelRecordApi = (params:any) => http.get("/delete",params)

export const DetailApi = (params:any) => http.get("/detail",params).then((res) => res.data)

export const TipApi = (params:any) => http.get("/tip",params).then((res) => res.data)