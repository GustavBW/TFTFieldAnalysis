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
import type { DataPointDTO } from './DataPointDTO';
import {
    DataPointDTOFromJSON,
    DataPointDTOFromJSONTyped,
    DataPointDTOToJSON,
} from './DataPointDTO';
import type { ResponseDetails } from './ResponseDetails';
import {
    ResponseDetailsFromJSON,
    ResponseDetailsFromJSONTyped,
    ResponseDetailsToJSON,
} from './ResponseDetails';

/**
 * Base generic detailed response.
 * @export
 * @interface DetailedResponseListDataPointDTO
 */
export interface DetailedResponseListDataPointDTO {
    /**
     * Response data.
     * @type {Array<DataPointDTO>}
     * @memberof DetailedResponseListDataPointDTO
     */
    data?: Array<DataPointDTO>;
    /**
     * 
     * @type {ResponseDetails}
     * @memberof DetailedResponseListDataPointDTO
     */
    details?: ResponseDetails;
}

/**
 * Check if a given object implements the DetailedResponseListDataPointDTO interface.
 */
export function instanceOfDetailedResponseListDataPointDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function DetailedResponseListDataPointDTOFromJSON(json: any): DetailedResponseListDataPointDTO {
    return DetailedResponseListDataPointDTOFromJSONTyped(json, false);
}

export function DetailedResponseListDataPointDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): DetailedResponseListDataPointDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(DataPointDTOFromJSON)),
        'details': !exists(json, 'details') ? undefined : ResponseDetailsFromJSON(json['details']),
    };
}

export function DetailedResponseListDataPointDTOToJSON(value?: DetailedResponseListDataPointDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(DataPointDTOToJSON)),
        'details': ResponseDetailsToJSON(value.details),
    };
}
