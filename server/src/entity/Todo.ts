import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Card from './Card';

@ObjectType()
@Entity()
export default class Todo extends BaseEntity{

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

    @Field(() => Card)
    @ManyToOne(() => Card, card => card.todos,{onDelete:'CASCADE',nullable:false})
    @JoinColumn({ name: 'card_id' })
    card: Card;

}