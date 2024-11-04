export interface APIResponseModel {
    message: string,
    result: boolean,
    data: any | null,
    error: string,
}

export interface ISlide {
    id: number,
    documentId: string,
    company_name: string,
    slide_image: Image,
    image_title: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface IProject {
    id: number,
    documentId: string,
    project_image: Image,
    project_title: string,
    project_type: string,
    industry: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface Image {
    id: number;
    documentId: string;
    name: string;
    url: string;
    alternativeText?: string;
    caption?: string;
    width?: number | null;
    height?: number | null;
    formats?: any;
    createdAt: Date;
    updatedAt: Date;
}