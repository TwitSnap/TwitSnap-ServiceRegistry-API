import {Column, PrimaryColumn} from "typeorm";
import {Helpers} from "../../utils/helpers";

export enum ServiceStatus {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED"
}

export class Service{
    @PrimaryColumn("uuid", { default: () => "uuid_generate_v4()" })
    public readonly id: string;

    @Column({ nullable: false })
    public name: string;

    @Column({ nullable: false })
    public description: string;

    @Column({ nullable: false })
    public creationDate: Date;

    @Column({ nullable: false })
    public status: ServiceStatus;

    @Column({ nullable: false })
    public apiKey: string;


    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.creationDate = new Date();
        this.status = ServiceStatus.ACTIVE;
        this.apiKey = Helpers.getSecureApiKey(32);
    }

    public block(): void {
        this.status = ServiceStatus.BLOCKED;
    }

    public activate(): void {
        this.status = ServiceStatus.ACTIVE;
    }

    public isActive(): boolean {
        return this.status === ServiceStatus.ACTIVE;
    }
}