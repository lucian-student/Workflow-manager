import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Card from './Card';
import Project from './Project';

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

    @Field(() => ID)
    @Column({
        type: 'bigint'
    })
    card_id: number;

    @Field(() => Card)
    @ManyToOne(() => Card, card => card.messages, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'card_id' })
    card: Card;

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

}