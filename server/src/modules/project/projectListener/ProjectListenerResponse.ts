import { ObjectType, Field } from 'type-graphql';
import Project from "../../../entity/Project";

@ObjectType()
export default class ProjectListenerResponse {

    @Field()
    project_id: number;

    @Field()
    user_id: number

    @Field()
    topic: string

    @Field(() => Project, { nullable: true })
    editProject?: Project
}