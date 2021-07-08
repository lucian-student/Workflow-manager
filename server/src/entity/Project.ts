import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import User from './User';
import Team from './Team';
import List from './List';
import Card from './Card';
import Link from './Link';
import Message from './Message';
import Todo from './Todo';

@ObjectType()
@Entity()
export default class Project extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    project_id: number;

    @Field(() => ID, { nullable: true })
    @Column({
        nullable: true,
        type: 'bigint'
    })
    user_id: number | null;

    @Field(() => User, { nullable: true })
    @ManyToOne(() => User, user => user.projects, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: User | null;

    @Field(() => ID, { nullable: true })
    @Column({
        nullable: true,
        type: 'bigint'
    })
    team_id: number | null;


    @Field(() => Team, { nullable: true })
    @ManyToOne(() => Team, team => team.projects, { nullable: true })
    @JoinColumn({ name: 'team_id' })
    team: Team | null;


    @Field(() => [List])
    @OneToMany(() => List, list => list.project)
    lists: List[];

    @Field()
    @Column()
    status: string;

    @Field()
    @Column()
    deadline: Date;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column({
        type: 'timestamp',
        default: () => 'current_timestamp'
    })
    last_updated: Date;

    @OneToMany(() => Card, card => card.project)
    cards: Card[];

    @OneToMany(() => Link, link => link.project)
    links: Link[];

    @OneToMany(() => Message, message => message.project)
    messages: Message[];

    @OneToMany(() => Todo, todo => todo.project)
    todos: Todo[];
}
