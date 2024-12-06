import {Service} from "../domain/Service";
import {StatusNotFoundError} from "./errors/StatusNotFoundError";
import {ServiceRepository} from "../../db/repositories/interfaces/ServiceRepository";
import {injectable} from "tsyringe";

@injectable()
export class ServiceService{
    serviceRepository: ServiceRepository;

    constructor(serviceRepository: ServiceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public createService = async (name: string, description: string): Promise<Service> => {
        const service = new Service(name, description);
        await this.serviceRepository.save(service);
        return service;
    }

    public getServices = async (): Promise<Service[]> => {
        return this.serviceRepository.getAll();
    }

    private getServiceById = async (id: string): Promise<Service | null> => {
        return this.serviceRepository.findOne(id);
    }

    public getServiceByIdOrError = async (id: string): Promise<Service> => {
        const service = await this.getServiceById(id);
        if (service === null) throw new StatusNotFoundError("Service not found.");

        return service;
    }

    public changeServiceStatus = async (id: string, status: string): Promise<void> => {
        switch (status) {
            case "BLOCKED":
                await this.blockService(id);
                break;
            case "ACTIVE":
                await this.activateService(id);
                break;
            default:
                throw new StatusNotFoundError("Invalid service status.");
        }
    }

    private blockService = async (id: string): Promise<void> => {
        const service = await this.getServiceByIdOrError(id);
        service.block();
        await this.serviceRepository.save(service);
    }

    private activateService = async (id: string): Promise<void> => {
        const service = await this.getServiceByIdOrError(id);
        service.activate();
        await this.serviceRepository.save(service);
    }
}