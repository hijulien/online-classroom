import { IChapter } from "../detail/interface"
export interface ICatalogue {
    section: string;
    chapters: ISection[]
}

export interface ISection {
    chapter: string;
    videoSrc: string;
    current: number;
    time: number
}

export interface ICurrentVideo {
    sectionIndex: number;
    chapterIndex: number;
}

export interface IPlay {
    course:string;
    sidebarVisiable:boolean;
    sectionIndex: number;
    chapterIndex: number;
    catalogue: IChapter[];
}