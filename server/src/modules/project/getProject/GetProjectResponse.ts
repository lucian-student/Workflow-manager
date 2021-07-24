import { Field, ID, ObjectType } from 'type-graphql';
import Project from '../../../entity/Project';

@ObjectType()
export default class GetProjectResponse {

    @Field(() => Project)
    project: Project

    @Field(() => ID)
    project_id: number

    @Field({ nullable: true })
    role?: number
}