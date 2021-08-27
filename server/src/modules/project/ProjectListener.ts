import { Arg, Resolver, Subscription, UseMiddleware } from 'type-graphql';


export const EDIT_PROJECT = 'EDIT_PROJECT';

@Resolver()
export default class ProjectListenerResolver {

    @Subscription(() => String, {
        topics: [EDIT_PROJECT],
        filter: ({ args, payload, context }) => {
            /* console.log(payload.user_id);
             console.log(context.user_id);*/
            return args.project_id === payload.project_id && context.user_id !== payload.user_id;
        }
    })
    projectListener(
        @Arg('project_id') project_id: number
    ): string {
        return 'hello';
    }

}