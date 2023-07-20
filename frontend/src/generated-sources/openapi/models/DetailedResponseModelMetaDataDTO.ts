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

import { exists, mapValues } from '../runtime';
import type { ModelMetaDataDTO } from './ModelMetaDataDTO';
import {
    ModelMetaDataDTOFromJSON,
    ModelMetaDataDTOFromJSONTyped,
    ModelMetaDataDTOToJSON,
} from './ModelMetaDataDTO';
import type { ResponseDetails } from './ResponseDetails';
import {
    ResponseDetailsFromJSON,
    ResponseDetailsFromJSONTyped,
    ResponseDetailsToJSON,
} from './ResponseDetails';

/**
 * Base generic detailed response.
 * @export
 * @interface DetailedResponseModelMetaDataDTO
 */
export interface DetailedResponseModelMetaDataDTO {
    /**
     * 
     * @type {ModelMetaDataDTO}
     * @memberof DetailedResponseModelMetaDataDTO
     */
    data?: ModelMetaDataDTO;
    /**
     * 
     * @type {ResponseDetails}
     * @memberof DetailedResponseModelMetaDataDTO
     */
    details?: ResponseDetails;
}

/**
 * Check if a given object implements the DetailedResponseModelMetaDataDTO interface.
 */
export function instanceOfDetailedResponseModelMetaDataDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function DetailedResponseModelMetaDataDTOFromJSON(json: any): DetailedResponseModelMetaDataDTO {
    return DetailedResponseModelMetaDataDTOFromJSONTyped(json, false);
}

export function DetailedResponseModelMetaDataDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): DetailedResponseModelMetaDataDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : ModelMetaDataDTOFromJSON(json['data']),
        'details': !exists(json, 'details') ? undefined : ResponseDetailsFromJSON(json['details']),
    };
}

export function DetailedResponseModelMetaDataDTOToJSON(value?: DetailedResponseModelMetaDataDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': ModelMetaDataDTOToJSON(value.data),
        'details': ResponseDetailsToJSON(value.details),
    };
}
