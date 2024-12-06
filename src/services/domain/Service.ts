import {Column, PrimaryColumn} from "typeorm";
import {Helpers} from "../../utils/helpers";

export enum ServiceStatus {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED"
}

export class Service{
    @PrimaryColumn("uuid", { default: () => "uuid_generate_v4()" })
    private readonly id: string;

    @Column({ nullable: false })
    private name: string;

    @Column({ nullable: false })
    private description: string;

    @Column({ nullable: false })
    private creationDate: Date;

    @Column({ nullable: false })
    private status: ServiceStatus;

    @Column({ nullable: false })
    private apiKey: string;


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
}