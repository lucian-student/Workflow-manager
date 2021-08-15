import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Project from './Project';
import UserTeamConnection from './UserTeamConnection';

@ObjectType()
@Entity()
export default class Team extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    team_id: number;

    @Field()
    @Column()
    name: string;

    @Field(() => [Project])
    @OneToMany(() => Project, project => project.team)
    projects: Project[];

    @Field(() => [UserTeamConnection])
    @OneToMany(() => UserTeamConnection, con => con.team)
    cons: UserTeamConnection[];

    @Field()
    @Column()
    description: string;

    @Field()
    @Column({
        type: 'timestamp',
        default: () => 'current_timestamp'
    })
    last_active: Date;

    @Field({ nullable: true })
    user_count: number

    @Field({ nullable: true })
    project_count: number
    //Many to one user
}