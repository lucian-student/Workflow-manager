import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Project from './Project';
import Card from './Card';
import Message from './Message';
import Link from './Link';
import Todo from './Todo';

@ObjectType()
@Entity()
export default class List extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    list_id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    order_index: number;

    //oneToMany cards

    @Field(() => [Card])
    @OneToMany(() => Card, card => card.list)
    cards: Card[];

    /*@Field(() => [Message])
    @OneToMany(() => Message, message => message.list)
    messages: Message[];

    @Field(() => [Link])
    @OneToMany(() => Link, link => link.list)
    links: Link[];

    @Field(() => [Todo])
    @OneToMany(() => Todo, todo => todo.list)
    todos: Todo[];*/

    //many to one project
    @Index()
    @Field(() => ID)
    @Column({
        type: 'bigint'
    })
    project_id: number;

    @Field(() => Project)
    @ManyToOne(() => Project, project => project.lists, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'project_id' })
    project: Project;

}