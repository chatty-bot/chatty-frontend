// tslint:disable
/**
 * Data Collection API
 * Class informations that are required for communication between the WoZ Frontend and the Backend
 *
 * The version of the OpenAPI document: 0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Charset } from './charset';

/**
 * 
 * @export
 * @interface MediaType
 */
export interface MediaType {
    /**
     * 
     * @type {string}
     * @memberof MediaType
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof MediaType
     */
    type?: string;
    /**
     * 
     * @type {string}
     * @memberof MediaType
     */
    subtype?: string;
    /**
     * 
     * @type {string}
     * @memberof MediaType
     */
    extension?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof MediaType
     */
    parameters?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof MediaType
     */
    quality?: string;
    /**
     * 
     * @type {number}
     * @memberof MediaType
     */
    qualityAsNumber?: number;
    /**
     * 
     * @type {string}
     * @memberof MediaType
     */
    version?: string;
    /**
     * 
     * @type {Charset}
     * @memberof MediaType
     */
    charset?: Charset;
    /**
     * 
     * @type {boolean}
     * @memberof MediaType
     */
    textBased?: boolean;
}


