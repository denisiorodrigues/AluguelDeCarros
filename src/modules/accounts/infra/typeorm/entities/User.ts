import { v4 as uuidV4 } from "uuid";
import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm";

@Entity("users")
class User {
    @PrimaryColumn()
    id : string;

    @Column()
    name : string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    driver_license: string;

    @Column()
    admin: boolean;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id){
            this.id = uuidV4();
        }

        if(!this.avatar){
            this.avatar = "empty";
        }
    }
}

export { User }