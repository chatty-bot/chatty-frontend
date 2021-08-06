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


import { IntentTO } from './intent-to';
import { MetricsTO } from './metrics-to';
import { TextClassificationDatasetEntity } from './text-classification-dataset-entity';
import { TrainingEntity } from './training-entity';

/**
 * 
 * @export
 * @interface ClassifierDomainObject
 */
export interface ClassifierDomainObject {
    /**
     * 
     * @type {string}
     * @memberof ClassifierDomainObject
     */
    classifierName: string;
    /**
     * 
     * @type {Array<MetricsTO>}
     * @memberof ClassifierDomainObject
     */
    metrics: Array<MetricsTO>;
    /**
     * 
     * @type {Array<IntentTO>}
     * @memberof ClassifierDomainObject
     */
    intents: Array<IntentTO>;
    /**
     * 
     * @type {Array<TextClassificationDatasetEntity>}
     * @memberof ClassifierDomainObject
     */
    datasets: Array<TextClassificationDatasetEntity>;
    /**
     * 
     * @type {Array<TrainingEntity>}
     * @memberof ClassifierDomainObject
     */
    trainings: Array<TrainingEntity>;
}

