import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import List from './List';
import Link from './Link';
import Todo from './Todo';
import Message from './Message';
import Project from './Project';

@ObjectType()
@Entity()
export default class Card extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    card_id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    order_index: number;

    @Field()
    @Column()
    deadline: Date;

    //oneToMany Todo
    @Field(() => [Todo])
    @OneToMany(() => Todo, todo => todo.card)
    todos: Todo[];
    //oneToMany Message
    @Field(() => [Message])
    @OneToMany(() => Message, message => message.card)
    messages: Message[];

    //oneToMany Link
    @Field(() => [Link])
    @OneToMany(() => Link, link => link.card)
    links: Link[];

    //many to one list
    @Index()
    @Field(() => ID)
    @Column({
        type: 'bigint'
    })
    list_id: number;

    @Field(() => List)
    @ManyToOne(() => List, list => list.cards, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'list_id' })
    list: List;

    @Index()
    @Field(() => ID)
    @Column({
        nullable: false,
        type: 'bigint'
    })
    project_id: number;

    @ManyToOne(() => Project, project => project.cards, { nullable: false })
    @JoinColumn({ name: 'project_id' })
    project: Project;


    /*done_todo_count: number,
    todo_count: number,
    message_count: number,
    link_count: number*/

    @Field()
    done_todo_count: number;

    @Field()
    todo_count: number;

    @Field()
    message_count: number;

    @Field()
    link_count: number;
}