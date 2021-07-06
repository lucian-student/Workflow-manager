import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Project from './Project';
import Card from './Card';

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
    order_index:number;

    //oneToMany cards

    @Field(() => [Card])
    @OneToMany(() => Card, card => card.list)
    cards: Card[];

    //many to one project
    @Field(() => ID)
    @Column({
        type: 'bigint'
    })
    project_id: number;

    @Field(() => Project)
    @ManyToOne(() => Project, project => project.lists, { onDelete: 'CASCADE',nullable:false })
    @JoinColumn({ name: 'project_id' })
    project: Project;

}