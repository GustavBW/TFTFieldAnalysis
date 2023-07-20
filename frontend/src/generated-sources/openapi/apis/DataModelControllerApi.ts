/* tslint:disable */
/* eslint-disable */
/**
 * 
 * 
 *
 * 
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  DetailedResponseListDataPointDTO,
  DetailedResponseListInteger,
  DetailedResponseListString,
  DetailedResponseMapIntegerListDataPointDTO,
  DetailedResponseModelDTO,
  DetailedResponseModelMetaDataDTO,
  DetailedResponseString,
} from '../models';
import {
    DetailedResponseListDataPointDTOFromJSON,
    DetailedResponseListDataPointDTOToJSON,
    DetailedResponseListIntegerFromJSON,
    DetailedResponseListIntegerToJSON,
    DetailedResponseListStringFromJSON,
    DetailedResponseListStringToJSON,
    DetailedResponseMapIntegerListDataPointDTOFromJSON,
    DetailedResponseMapIntegerListDataPointDTOToJSON,
    DetailedResponseModelDTOFromJSON,
    DetailedResponseModelDTOToJSON,
    DetailedResponseModelMetaDataDTOFromJSON,
    DetailedResponseModelMetaDataDTOToJSON,
    DetailedResponseStringFromJSON,
    DetailedResponseStringToJSON,
} from '../models';

export interface DeleteModelRequest {
    modelId: number;
}

export interface GetEdgeSetForPointsRequest {
    points: Array<number>;
    modelId: number;
    includedNamespaces?: Array<string>;
    includedTags?: Array<string>;
}

export interface GetMetadataOfModelRequest {
    modelId: number;
}

export interface GetModelRequest {
    modelId: number;
}

export interface GetNamespacesOfModelRequest {
    modelId: number;
}

export interface GetPointsInModelRequest {
    modelId: number;
    namespaces?: Array<string>;
    pointIds?: Array<number>;
    tags?: Array<string>;
}

export interface GetTagsInModelRequest {
    modelId: number;
}

/**
 * 
 */
export class DataModelControllerApi extends runtime.BaseAPI {

    /**
     * Create a new empty model.
     */
    async createModelRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DetailedResponseModelDTO>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/model/create`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DetailedResponseModelDTOFromJSON(jsonValue));
    }

    /**
     * Create a new empty model.
     */
    async createModel(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DetailedResponseModelDTO> {
        const response = await this.createModelRaw(initOverrides);
        return await response.value();
    }

    /**
     * Delete model permanently.
     */
    async deleteModelRaw(requestParameters: DeleteModelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DetailedResponseString>> {
        if (requestParameters.modelId === null || requestParameters.modelId === undefined) {
            throw new runtime.RequiredError('modelId','Required parameter requestParameters.modelId was null or undefined when calling deleteModel.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/model/{modelId}/delete`.replace(`{${"modelId"}}`, encodeURIComponent(String(requestParameters.modelId))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DetailedResponseStringFromJSON(jsonValue));
    }

    /**
     * Delete model permanently.
     */
    async deleteModel(requestParameters: DeleteModelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DetailedResponseString> {
        const response = await this.deleteModelRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieves all model ids currently in registry.
     */
    async getAllModelsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DetailedResponseListInteger>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/model/all`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DetailedResponseListIntegerFromJSON(jsonValue));
    }

    /**
     * Retrieves all model ids currently in registry.
     */
    async getAllModels(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DetailedResponseListInteger> {
        const response = await this.getAllModelsRaw(initOverrides);
        return await response.value();
    }

    /**
     * Query edges for points, resulting edge lists are sorted based on occurrence value in descending order.
     */
    async getEdgeSetForPointsRaw(requestParameters: GetEdgeSetForPointsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DetailedResponseMapIntegerListDataPointDTO>> {
        if (requestParameters.points === null || requestParameters.points === undefined) {
            throw new runtime.RequiredError('points','Required parameter requestParameters.points was null or undefined when calling getEdgeSetForPoints.');
        }

        if (requestParameters.modelId === null || requestParameters.modelId === undefined) {
            throw new runtime.RequiredError('modelId','Required parameter requestParameters.modelId was null or undefined when calling getEdgeSetForPoints.');
        }

        const queryParameters: any = {};

        if (requestParameters.points) {
            queryParameters['points'] = requestParameters.points;
        }

        if (requestParameters.includedNamespaces) {
            queryParameters['includedNamespaces'] = requestParameters.includedNamespaces;
        }

        if (requestParameters.includedTags) {
            queryParameters['includedTags'] = requestParameters.includedTags;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/model/{modelId}/edges`.replace(`{${"modelId"}}`, encodeURIComponent(String(requestParameters.modelId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DetailedResponseMapIntegerListDataPointDTOFromJSON(jsonValue));
    }

    /**
     * Query edges for points, resulting edge lists are sorted based on occurrence value in descending order.
     */
    async getEdgeSetForPoints(requestParameters: GetEdgeSetForPointsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DetailedResponseMapIntegerListDataPointDTO> {
        const response = await this.getEdgeSetForPointsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * The metadata for the model.
     */
    async getMetadataOfModelRaw(requestParameters: GetMetadataOfModelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DetailedResponseModelMetaDataDTO>> {
        if (requestParameters.modelId === null || requestParameters.modelId === undefined) {
            throw new runtime.RequiredError('modelId','Required parameter requestParameters.modelId was null or undefined when calling getMetadataOfModel.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/model/{modelId}/metadata`.replace(`{${"modelId"}}`, encodeURIComponent(String(requestParameters.modelId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DetailedResponseModelMetaDataDTOFromJSON(jsonValue));
    }

    /**
     * The metadata for the model.
     */
    async getMetadataOfModel(requestParameters: GetMetadataOfModelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DetailedResponseModelMetaDataDTO> {
        const response = await this.getMetadataOfModelRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieves ALL data associated with a given model. Do not automate. Only retrieve the data from a model you need.
     */
    async getModelRaw(requestParameters: GetModelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DetailedResponseModelDTO>> {
        if (requestParameters.modelId === null || requestParameters.modelId === undefined) {
            throw new runtime.RequiredError('modelId','Required parameter requestParameters.modelId was null or undefined when calling getModel.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/model/{modelId}`.replace(`{${"modelId"}}`, encodeURIComponent(String(requestParameters.modelId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DetailedResponseModelDTOFromJSON(jsonValue));
    }

    /**
     * Retrieves ALL data associated with a given model. Do not automate. Only retrieve the data from a model you need.
     */
    async getModel(requestParameters: GetModelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DetailedResponseModelDTO> {
        const response = await this.getModelRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * String[n] | String[0] - All namespaces in model.
     */
    async getNamespacesOfModelRaw(requestParameters: GetNamespacesOfModelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DetailedResponseListString>> {
        if (requestParameters.modelId === null || requestParameters.modelId === undefined) {
            throw new runtime.RequiredError('modelId','Required parameter requestParameters.modelId was null or undefined when calling getNamespacesOfModel.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/model/{modelId}/namespaces`.replace(`{${"modelId"}}`, encodeURIComponent(String(requestParameters.modelId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DetailedResponseListStringFromJSON(jsonValue));
    }

    /**
     * String[n] | String[0] - All namespaces in model.
     */
    async getNamespacesOfModel(requestParameters: GetNamespacesOfModelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DetailedResponseListString> {
        const response = await this.getNamespacesOfModelRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Query model DataPoints which conforms to provided parameters.
     */
    async getPointsInModelRaw(requestParameters: GetPointsInModelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DetailedResponseListDataPointDTO>> {
        if (requestParameters.modelId === null || requestParameters.modelId === undefined) {
            throw new runtime.RequiredError('modelId','Required parameter requestParameters.modelId was null or undefined when calling getPointsInModel.');
        }

        const queryParameters: any = {};

        if (requestParameters.namespaces) {
            queryParameters['namespaces'] = requestParameters.namespaces;
        }

        if (requestParameters.pointIds) {
            queryParameters['pointIds'] = requestParameters.pointIds;
        }

        if (requestParameters.tags) {
            queryParameters['tags'] = requestParameters.tags;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/model/{modelId}/points`.replace(`{${"modelId"}}`, encodeURIComponent(String(requestParameters.modelId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DetailedResponseListDataPointDTOFromJSON(jsonValue));
    }

    /**
     * Query model DataPoints which conforms to provided parameters.
     */
    async getPointsInModel(requestParameters: GetPointsInModelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DetailedResponseListDataPointDTO> {
        const response = await this.getPointsInModelRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * String[n] | String[0] - Retrieve all tags of any points in model as one List.
     */
    async getTagsInModelRaw(requestParameters: GetTagsInModelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<DetailedResponseListString>> {
        if (requestParameters.modelId === null || requestParameters.modelId === undefined) {
            throw new runtime.RequiredError('modelId','Required parameter requestParameters.modelId was null or undefined when calling getTagsInModel.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/v1/model/{modelId}/tags`.replace(`{${"modelId"}}`, encodeURIComponent(String(requestParameters.modelId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => DetailedResponseListStringFromJSON(jsonValue));
    }

    /**
     * String[n] | String[0] - Retrieve all tags of any points in model as one List.
     */
    async getTagsInModel(requestParameters: GetTagsInModelRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<DetailedResponseListString> {
        const response = await this.getTagsInModelRaw(requestParameters, initOverrides);
        return await response.value();
    }

}