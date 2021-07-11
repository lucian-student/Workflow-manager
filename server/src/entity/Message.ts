import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, Index, Tree } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Card from './Card';
import Project from './Project';
import User from './User';

@ObjectType()
@Entity()
export default class Message extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    message_id: number;

    @Field()
    @Column()
    content: string;

    @Index()
    @Field(() => ID)
    @Column({
        type: 'bigint',
        nullable: true
    })
    user_id: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.messages, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Index()
    @Field(() => ID)
    @Column({
        type: 'bigint'
    })
    card_id: number;

    @Field(() => Card)
    @ManyToOne(() => Card, card => card.messages, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'card_id' })
    card: Card;

    @Index()
    @Field(() => ID)
    @Column({
        nullable: false,
        type: 'bigint'
    })
    project_id: number;

    @ManyToOne(() => Project, project => project.messages, { nullable: false })
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @Field()
    @Column({
        type: 'timestamp',
        default: () => 'current_timestamp'
    })
    data_of_creation: Date;

    @Field({ nullable: true })
    username: string
}