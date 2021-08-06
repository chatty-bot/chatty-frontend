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


import { TrainingType } from './training-type';

/**
 * 
 * @export
 * @interface MetricsTO
 */
export interface MetricsTO {
    /**
     * 
     * @type {number}
     * @memberof MetricsTO
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof MetricsTO
     */
    classifierId?: number;
    /**
     * 
     * @type {number}
     * @memberof MetricsTO
     */
    intentId?: number;
    /**
     * 
     * @type {string}
     * @memberof MetricsTO
     */
    intentName: string;
    /**
     * 
     * @type {TrainingType}
     * @memberof MetricsTO
     */
    trainingType: TrainingType;
    /**
     * 
     * @type {number}
     * @memberof MetricsTO
     */
    precision: number;
}

