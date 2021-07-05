import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import List from './List';
import Link from './Link';
import Todo from './Todo';
import Message from './Message';

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
    @Field(() => List)
    @ManyToOne(() => List, project => project.cards, { onDelete: 'CASCADE',nullable:false })
    @JoinColumn({ name: 'list_id' })
    list: List;

}