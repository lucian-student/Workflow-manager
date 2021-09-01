import { Root, Arg, Ctx, Resolver, Subscription } from 'type-graphql';
import MyContext from '../../types/MyContext';
import projectListenerFilter from './projectListener/projectListenerFilter';
import ProjectListenerResponse from './projectListener/ProjectListenerResponse';

// project consts
export const EDIT_PROJECT = 'EDIT_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';
//card consts
export const DELETE_CARD = 'DELETE_CARD';
export const EDIT_CARD = 'EDIT_CARD';
export const CREATE_CARD = 'CREATE_CARD';
export const MOVE_CARD = 'MOVE_CARD';
//link consts
export const CREATE_LINK = 'CREATE_LINK';
export const DELETE_LINK = 'DELETE_LINK';
export const EDIT_LINK = 'EDIT_LINK';
//list consts
export const CREATE_LIST = 'CREATE_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const MOVE_LIST = 'MOVE_LIST';
export const EDIT_LIST = 'EDIT_LIST';
//message consts
export const CREATE_MESSAGE = 'CREATE_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const EDIT_MESSAGE = 'EDIT_MESSAGE';
//todo consts
export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DONE_TODO = 'DONE_TODO';

export interface Arguments {
    team_id?: number,
    project_id: number
}

export interface Context {
    subscribtionToken: string
}

@Resolver()
export default class ProjectListenerResolver {

    @Subscription(() => ProjectListenerResponse, {
        topics: [EDIT_PROJECT],
        filter: async (filterData: { args: Arguments, context: Context, payload: any }) => {
            return await projectListenerFilter(filterData);
        }
    })
    projectListener(
        @Arg('project_id') project_id: number,
        @Ctx() ctx: MyContext,
        @Root() data: ProjectListenerResponse,
        @Arg('team_id', { nullable: true }) team_id?: number
    ): ProjectListenerResponse {

        return data;
    }

}