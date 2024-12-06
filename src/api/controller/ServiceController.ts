import {Controller} from "./Controller";
import {ServiceService} from "../../services/application/ServiceService";
import {HttpResponseSender} from "./HttpResponseSender";
import {NextFunction, Request, Response} from "express";

export class ServiceController extends Controller{
    private serviceService: ServiceService;

    constructor(serviceService: ServiceService, httpResponseSender: HttpResponseSender) {
        super(httpResponseSender);
        this.serviceService = serviceService;
    }

    /**
     * Registers a new service with the provided name and description.
     *
     * @param req - The request object containing service name and description.
     * @param res - The response object to send.
     * @param next - The next function for error handling.
     */
    public createService = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const name = this.getFieldOrBadRequestError(req, 'name') as string;
            const description = this.getFieldOrBadRequestError(req, 'description') as string;

            await this.serviceService.createService(name, description);
            return this.createdResponse(res, {message: 'Service registered successfully.'});
        } catch (error) {
            next(error);
        }
    }

    /**
     * Get all services.
     *
     * @param req - The request object.
     * @param res - The response object to send.
     * @param next - The next function for error handling.
     */
    public getServices = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const services = await this.serviceService.getServices();
            return this.okResponse(res, services);
        } catch (error) {
            next(error);
        }
    }

        /**
     * Get a service based on the provided service ID.
     *
     * @param req - The request object containing service ID.
     * @param res - The response object to send.
     * @param next - The next function for error handling.
     */
    public getService = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = this.getParamOrBadRequestError(req, 'id') as string;

            const service = await this.serviceService.getServiceByIdOrError(id);
            return this.okResponse(res, service);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Change the status of a service based on the provided service ID.
     *
     * @param req - The request object containing service ID and status.
     * @param res - The response object to send.
     * @param next - The next function for error handling.
     */
    public changeServiceStatus = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = this.getFieldOrBadRequestError(req, 'id') as string;
            const status = this.getFieldOrBadRequestError(req, 'status') as string;

            await this.serviceService.changeServiceStatus(id, status);
            return this.okResponse(res, {message: 'Service status changed successfully.'});
        } catch (error) {
            next(error);
        }
    }
}