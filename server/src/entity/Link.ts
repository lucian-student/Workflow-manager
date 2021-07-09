import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Card from './Card';
import Project from './Project';

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

    @Field(() => ID)
    @Column({
        type: 'bigint'
    })
    card_id: number;

    @Field(() => Card)
    @ManyToOne(() => Card, card => card.links, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'card_id' })
    card: Card;

    @Field(() => ID)
    @Column({
        nullable: false,
        type: 'bigint'
    })
    project_id: number;

    @ManyToOne(() => Project, project => project.links, { nullable: true })
    @JoinColumn({ name: 'project_id' })
    project: Project;
}