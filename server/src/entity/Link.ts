import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Card from './Card';

@ObjectType()
@Entity()
export default class Link extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    link_id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    url: string;

    @Field(() => Card)
    @ManyToOne(() => Card, card => card.links, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'card_id' })
    card: Card;

}