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



/**
 * 
 * @export
 * @interface ClassifierDataSampleTO
 */
export interface ClassifierDataSampleTO {
    /**
     * 
     * @type {number}
     * @memberof ClassifierDataSampleTO
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof ClassifierDataSampleTO
     */
    userId?: number;
    /**
     * 
     * @type {number}
     * @memberof ClassifierDataSampleTO
     */
    classifierId?: number;
    /**
     * 
     * @type {string}
     * @memberof ClassifierDataSampleTO
     */
    label: string;
    /**
     * 
     * @type {string}
     * @memberof ClassifierDataSampleTO
     */
    text: string;
}


