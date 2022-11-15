export interface IClassList {
    courseId: number;
    course: string;
    courseType:string,
    author: string;
    imgSrc: string;
    viewTimes: number;
    commentNum: number;
    stars: number;
}

export interface ITeacher {
    name: string;
    positionName: string;
    cont: string
    imgSrc: string
}

export interface IHot {
    hotKey: string[];
    hotTeacher: ITeacher[][];
    banner:string[];
    support:string[]
}

export interface ITypeSearch {
    type?:string;
    price?:number
}

export interface IData {
    classList?:IClassList[];
    radio:string;
    currentPageNum:number;
    lessonNum:number
}