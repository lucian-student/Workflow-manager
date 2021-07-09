import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Card from './Card';
import Project from './Project';

@ObjectType()
@Entity()
export default class Todo extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    todo_id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    @Field(() => Boolean)
    @Column({
        default: false
    })
    done: boolean

    @Field(() => ID)
    @Column({
        type: 'bigint'
    })
    card_id: number;

    @Field(() => Card)
    @ManyToOne(() => Card, card => card.todos, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'card_id' })
    card: Card;

    @Field(() => ID)
    @Column({
        nullable: false,
        type: 'bigint'
    })
    project_id: number;

    @ManyToOne(() => Project, project => project.todos, { nullable: false })
    @JoinColumn({ name: 'project_id' })
    project: Project;
}