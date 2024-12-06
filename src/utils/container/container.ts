import { container } from "tsyringe";
import "reflect-metadata";
import {DatabaseConnector} from "../../db/connectors/DatabaseConnector";
import {Logger} from "../logger/Logger";
import {ServiceRepository} from "../../db/repositories/interfaces/ServiceRepository";
import {LoggingStrategy} from "../logger/LoggingStrategy";
import {WinstonLoggerStrategy} from "../logger/WinstonLoggerStrategy";
import {TypeORMDatabaseConnectorStrategy} from "../../db/connectors/TypeORMDatabaseConnectorStrategy";
import {DatabaseConnectorStrategy} from "../../db/connectors/DatabaseConnectorStrategy";
import {DataSource} from "typeorm";
import {LOGGING, LOG_DEBUG, LOG_ERROR, LOG_INFO} from "../config";
import {ServiceController} from "../../api/controller/ServiceController";
import {TypeORMServiceRepository} from "../../db/repositories/impls/TypeORM/service/TypeORMServiceRepository";

// ? Register all dependencies
container.register<LoggingStrategy>("LoggingStrategy", { useClass: WinstonLoggerStrategy});
container.register<boolean>("logging", {useValue: (LOGGING === "true") });
container.register<boolean>("logDebug", {useValue: (LOG_DEBUG === "true") });
container.register<boolean>("logError", {useValue: (LOG_ERROR === "true") });
container.register<boolean>("logInfo", {useValue: (LOG_INFO === "true") });

// ? register interfaces implementations
container.register<DatabaseConnectorStrategy<DataSource, DataSource>>("DatabaseConnectorStrategy", TypeORMDatabaseConnectorStrategy);
container.register<ServiceRepository>("ServiceRepository", TypeORMServiceRepository);

// ? Get instances
export const logger = container.resolve(Logger);
export const databaseConnector = container.resolve(DatabaseConnector<DataSource, DataSource>);
export const serviceController = container.resolve(ServiceController);