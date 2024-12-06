import { TypeORMRepository } from "../TypeORMRepository";
import { StandardDatabaseError } from "../../../../errors/StandardDatabaseError";
import {Service} from "../../../../../services/domain/Service";
import {ServiceRepository} from "../../../interfaces/ServiceRepository";

export class TypeORMServiceRepository extends TypeORMRepository<Service> implements ServiceRepository {
    constructor() {
        super(Service);
    }

    /**
     * @inheritDoc
     */
    public findOne = async (id: string): Promise<Service | null> => {
        try {
            return await this.typeOrmRepository.createQueryBuilder("service")
            .where("service.id = :id", { id })
            .getOne();
        } catch (error: any) {
            throw new StandardDatabaseError(error.message);
        }
    };

    /**
     * @inheritDoc
     */
    public save = async (service: Service): Promise<Service> => {
        try {
            return await this.typeOrmRepository.save(service);
        } catch (error: any) {
            throw new StandardDatabaseError(error.message);
        }
    };

    /**
     * @inheritDoc
     */
    public getAll = async (): Promise<Service[]> => {
        try {
            return await this.typeOrmRepository.find();
        } catch (error: any) {
            throw new StandardDatabaseError(error.message);
        }
    }

    /**
     * @inheritDoc
     */
    public findOneByApiKey = async (apiKey: string): Promise<Service | null> => {
        try {
            return await this.typeOrmRepository.createQueryBuilder("service")
            .where("service.api_key = :apiKey", { apiKey })
            .getOne();
        } catch (error: any) {
            throw new StandardDatabaseError(error.message);
        }
    }
}
