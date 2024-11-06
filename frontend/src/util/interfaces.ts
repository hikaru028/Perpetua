export interface APIResponseModel {
    message: string,
    result: boolean,
    data: any | null,
    error: string,
}

export interface IMember {
    id: number,
    documentId: string,
    full_name: string,
    role: string,
    location: string,
    email: string,
    country: string,
    portrait_image: IImage,
}

export interface IClient {
    id: number,
    documentId: string,
    company_name: string,
    representative: string,
    address: string,
    phone: string,
    website_URL: string,
    testimonial: [
        {
            type: string,
            children: [
                {
                    text: string,
                    type: string
                }
            ]
        }
    ],
    company_logo: IImage,
}

export interface IService {
    image: string,
    title: string,
    description: string,
}

export interface ISlide {
    id: number,
    documentId: string,
    company_name: string,
    slide_image: IImage,
    image_title: string,
}

export interface IProject {
    id: number,
    documentId: string,
    project_image: IImage,
    project_title: string,
    project_type: string,
    industry: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface IImage {
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

export interface IArticle {
    id: number;
    documentId: string;
    title: string;
    content: ArticleContent[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    type: string;
    author: string;
    thumbnail_image: IImage;
    media: IImage[] | null;
}

export interface ArticleContent {
    type: string;
    children: ArticleContentChild[];
}

export interface ArticleContentChild {
    text: string;
    type: string;
}