import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Team from './Team';
import User from './User';

@ObjectType()
@Entity()
export default class UserTeamConnection extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    con_id: number;

    @Column({ default: false })
    confirmed: boolean

    @Column()
    role: number;
    //manytomany user

    @Field(() => ID)
    @Column({
        type: 'bigint'
    })
    user_id: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.cons, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Field(() => ID)
    @Column({
        type: 'bigint'
    })
    team_id: number;

    @Field(() => Team)
    @ManyToOne(() => Team, team => team.cons, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'team_id' })
    team: Team;

}