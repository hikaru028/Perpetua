export interface APIResponseModel {
    message: string,
    result: boolean,
    data: any | null,
    error: string,
}

export interface IProject {
    id: number,
    documentId: string,
    project_image: ProjectImage,
    project_title: string,
    project_type: string,
    industry: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface ProjectImage {
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