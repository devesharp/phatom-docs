export interface IParam {
    "name": string;
    "description": string;
    "required": boolean;
    "example": any;
    "type": string;
}

export interface IResponse {
    statusCode: string;
    type: string;
    description: string;
    schemas: any[];
}

export interface ISection {
    group: string,
    description: string,
    routes: {
        method: string,
        name: string,
        description: string,
        path: string,
        pathParams: IParam[],
        query: IParam[],
        headers: IParam[],
        requestBody: string,
        responses: IResponse[]
    }[]
}

export interface API {
    menu: {
        group: string;
        items: {
            name: string;
            path: string;
            description: string;
            method: string;
        }[]
    }[];
    sections: ISection[]
}
