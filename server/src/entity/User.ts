import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
@Entity()
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    @Field(() => ID)
    user_id: number;

    @Column({
        unique: true
    })
    @Field()
    username: string;

    @Column({
        unique: true
    })
    @Field()
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'bigint',
        default: 0
    })
    tokenVersion: number;

    @Column({
        type: 'timestamp',
        default: () => 'current_timestamp'
    })
    data_of_creation: Date

}