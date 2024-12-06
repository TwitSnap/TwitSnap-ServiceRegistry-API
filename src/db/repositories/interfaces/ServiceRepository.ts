import { Service } from "../../../services/domain/Service";

export interface ServiceRepository {
    /**
     * Retrieves a `Service` entity by its unique identifier.
     *
     * @param id - The unique identifier of the Service.
     * @returns A promise that resolves to the `Service` entity if found, or `null` if not found.
     */
    findOne: (id: string) => Promise<Service | null>;

    /**
     * Saves a new or existing `Service` entity to the storage.
     *
     * @param user - The `Service` entity to be saved.
     * @returns A promise that resolves to the saved `Service` entity.
     */
    save: (service: Service) => Promise<Service>;

    /**
     * Retrieves all `Service` entities from the storage.
     *
     * @returns A promise that resolves to an array of `Service` entities.
     */
    getAll: () => Promise<Service[]>;
}
