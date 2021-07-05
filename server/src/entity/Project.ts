import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import User from './User';
import Team from './Team';
import List from './List';


@ObjectType()
@Entity()
export default class Project extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    project_id: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.projects, { onDelete: 'CASCADE',nullable:false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Field(() => Team, { nullable: true })
    @ManyToOne(() => Team, team => team.projects, { nullable: true })
    @JoinColumn({ name: 'team_id' })
    team: Team | null;


    @Field(() => [List])
    @OneToMany(() => List, list => list.project)
    lists: List[];

    @Field()
    @Column()
    status: string;

    @Field()
    @Column()
    deadline: Date;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    @Column({
        type: 'timestamp',
        default: () => 'current_timestamp'
    })
    last_updated: Date;

}
