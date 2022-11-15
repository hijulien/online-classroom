import { IClassList } from '../home/interface';

interface ISection {
    section: string;
    current: number;
    duration: number;
    videoSrc: string;
}

export interface IChapter {
    chapters: ISection[]
}

interface ICourseInfo extends IClassList {
    banner?: string;
    describe?: string;
    range?: string;
    header?: string;
    catalogue?: IChapter[];
    scoreList?: number[];
}

export interface IDetail {
    courseInfo: ICourseInfo;
    tipList?: IClassList[]
}