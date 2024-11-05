export interface APIResponseModel {
    message: string,
    result: boolean,
    data: any | null,
    error: string,
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
    company_logo: Image,
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
    slide_image: Image,
    image_title: string,
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