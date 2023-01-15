import {promises as fs} from "fs";
import { OpenAPIV3_1} from "openapi-types";
import yaml from 'js-yaml';
import {API} from "./swagger.interface";

function generateBody(swagger: OpenAPIV3_1.Document, request: OpenAPIV3_1.RequestBodyObject) {
    let body = [];

    Object.entries(request?.content ?? {}).map(([key, value]) => {
        let schema = {
            type: key,
            schemas: []
        };

        if (request.content[key].schema['oneOf']) {
            request.content[key].schema['oneOf'].map((v) => {
                if (v['$ref']) {
                    const ref = v['$ref'].replace('#/components/schemas/', '');
                    schema.schemas.push(swagger.components.schemas[ref]);
                }else {
                    schema.schemas.push(v);
                }
            });
        } else {
            schema.schemas.push(request.content[key].schema);
        }
        body.push(schema);
    });
    
    return body;
}

function generateParams(swagger: OpenAPIV3_1.Document, request: OpenAPIV3_1.ParameterObject[], type: string) {
    let headers = [];

    request.forEach(params => {
        if (params.in == type) {
            headers.push({
                name: params.name,
                description: params.description ?? '',
                required: params.required ?? false,
                example: params?.example,
                type: (params.schema as any)['type'] ?? 'string',
            });
        }
    })

    return headers;
}

function generateResponses(swagger: OpenAPIV3_1.Document, request: OpenAPIV3_1.ResponsesObject) {
    let responses = [];

    Object.entries(request).map(([statusCode, response]) => {
        Object.entries(response.content).map(([key, value]) => {
            let responseSingle = {
                statusCode,
                type: key,
                description: response.description ?? '',
                schemas: []
            };

            if (response.content[key].schema['oneOf']) {
                response.content[key].schema['oneOf'].map((v) => {
                    if (v['$ref']) {
                        const ref = v['$ref'].replace('#/components/schemas/', '');
                        responseSingle.schemas.push(swagger.components.schemas[ref]);
                    }else {
                        responseSingle.schemas.push(v);
                    }
                });
            }

            responses.push(responseSingle);
        });

    });

    return responses;
}

export async function Swagger(file: string): API {

    // Load
    const fileContents = await fs.readFile(file, 'utf8');
    const swagger = yaml.load(fileContents) as OpenAPIV3_1.Document;

    //
    const response: Partial<API> = {};

    // Generate Menu
    const menu: {[key: string]: API['menu'][0]|any } = {};

    Object.entries(swagger.paths as any).map(([key, value]) => {
        Object.entries(value).map(([key2, value2]) => {
            (value2.tags ?? ['default']).map((tag) => {
                const tagName = tag?.name ?? tag;

                if (!menu[tagName]) {
                    menu[tagName] = {
                        'group': tagName,
                        'items': []
                    };
                }

                menu[tagName].items.push({
                    name: value2.summary ?? key,
                    path: key,
                    description: value2.description ?? '',
                    method: key2,
                });
            });
        });
    });
    response.menu = Object.entries(menu).map(([key, v]) => v);

    const routes: {[key: string]: API['sections'][0]|any } = {};

    Object.entries(swagger.paths).map(([path, value]) => {
        Object.entries(value).map(([method, value2]) => {
            (value2.tags ?? ['default']).map((tag) => {
                const tagName = tag?.name ?? tag;

                if (!routes[tagName]) {
                    routes[tagName] = {
                        'group': tagName,
                        'description': tag?.description ?? '',
                        routes: []
                    };
                }

                routes[tagName].routes.push({
                    method: method,
                    name: value2.summary,
                    description: value2.description,
                    path: path,
                    pathParams: generateParams(swagger, value2.parameters, 'path'),
                    headers: generateParams(swagger, value2.parameters, 'header'),
                    query: generateParams(swagger, value2.parameters, 'query'),
                    requestBody: generateBody(swagger, value2.requestBody),
                    responses: generateResponses(swagger, value2.responses),
                });
            });
        });
    });

    response.sections = Object.entries(routes).map(([key, v]) => v);

    return response as API;
}