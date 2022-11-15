export interface IValues {
    username: string | number;
    password: string | number;
}

export interface IEmail {
    username: string
}

export interface IResetPsd {
    code: number;
    psd: string;
    token: string;
}