import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, Index } from 'typeorm';
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

    @Field()
    @Column({ default: false })
    confirmed: boolean

    @Field()
    @Column()
    role: number;
    //manytomany user

    @Index()
    @Field(() => ID)
    @Column({
        type: 'bigint'
    })
    user_id: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.cons, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Index()
    @Field(() => ID)
    @Column({
        type: 'bigint'
    })
    team_id: number;

    @Field(() => Team)
    @ManyToOne(() => Team, team => team.cons, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'team_id' })
    team: Team;

    @Field({ nullable: true })
    username: string
}