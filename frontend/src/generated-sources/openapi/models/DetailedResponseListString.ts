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
import type { ResponseDetails } from './ResponseDetails';
import {
    ResponseDetailsFromJSON,
    ResponseDetailsFromJSONTyped,
    ResponseDetailsToJSON,
} from './ResponseDetails';

/**
 * Base generic detailed response.
 * @export
 * @interface DetailedResponseListString
 */
export interface DetailedResponseListString {
    /**
     * Response data.
     * @type {Array<string>}
     * @memberof DetailedResponseListString
     */
    data?: Array<string>;
    /**
     * 
     * @type {ResponseDetails}
     * @memberof DetailedResponseListString
     */
    details?: ResponseDetails;
}

/**
 * Check if a given object implements the DetailedResponseListString interface.
 */
export function instanceOfDetailedResponseListString(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function DetailedResponseListStringFromJSON(json: any): DetailedResponseListString {
    return DetailedResponseListStringFromJSONTyped(json, false);
}

export function DetailedResponseListStringFromJSONTyped(json: any, ignoreDiscriminator: boolean): DetailedResponseListString {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : json['data'],
        'details': !exists(json, 'details') ? undefined : ResponseDetailsFromJSON(json['details']),
    };
}

export function DetailedResponseListStringToJSON(value?: DetailedResponseListString | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': value.data,
        'details': ResponseDetailsToJSON(value.details),
    };
}
