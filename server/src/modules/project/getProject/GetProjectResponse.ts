import { Field, ObjectType } from 'type-graphql';
import Project from '../../../entity/Project';

@ObjectType()
export default class GetProjectResponse {

    @Field(() => Project)
    project: Project

    @Field({ nullable: true })
    role?: number
}