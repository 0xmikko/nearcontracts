import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Contract} from "./contract";

@Entity()
export class Account {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    owner: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @OneToMany((type) => Contract, (contract) => contract.owner)
    ownerContracts: Contract[];

    @OneToMany((type) => Contract, (contract) => contract.partner)
    partnerContracts: Contract[];
}
