import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import Project from "./Project";
import UserTeamConnection from "./UserTeamConnection";

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
    data_of_creation: Date;

    @Field(() => [Project])
    @OneToMany(() => Project, project => project.user)
    projects: Project[];

    @Field(() => [UserTeamConnection])
    @OneToMany(() => UserTeamConnection, con => con.user)
    cons: UserTeamConnection[];

    //oneToManyTeam

    /* @Field(() => [UserTeamConnection])
     @OneToMany(() => UserTeamConnection, con => con.user)
     teams: UserTeamConnection[];*/

}