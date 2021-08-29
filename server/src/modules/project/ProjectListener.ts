import { Arg, Ctx, Resolver, Subscription, UseMiddleware } from 'type-graphql';
import MyContext from '../../types/MyContext';


export const EDIT_PROJECT = 'EDIT_PROJECT';

@Resolver()
export default class ProjectListenerResolver {

    @Subscription(() => String, {
        topics: [EDIT_PROJECT],
        filter: ({ args, payload, context }) => {
            return (args.project_id === payload.project_id && context.user_id !== null) /*&& payload.user_id !== context.user_id;*/
        }
    })
    projectListener(
        @Arg('project_id') project_id: number,
        @Ctx() ctx: MyContext
    ): string {
        if (!ctx.user_id) {
            throw Error('Access denied! You need to be authorized to perform this action!');
        }

        return 'hello';
    }

}