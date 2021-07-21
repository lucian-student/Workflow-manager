import { ID, Ctx, Mutation, Resolver, UseMiddleware, Arg } from "type-graphql";
import isAuth from "../../middleware/isAuth";
import Team from "../../entity/Team";
import MyContext from "../../types/MyContext";
import { getManager } from "typeorm";
import UserTeamConnection from "../../entity/UserTeamConnection";

@Resolver()
export default class LeaveTeamResolver {

    @UseMiddleware(isAuth)
    @Mutation(() => ID)
    async leaveTeam(
        @Ctx() ctx: MyContext,
        @Arg('team_id') team_id: number
    ): Promise<number> {

        const user_id = ctx.payload.user_id;

        await getManager().transaction('SERIALIZABLE', async (transactionalEntityManager) => {
            //if ur the only owner delete team
            const checkTeamMembers = await transactionalEntityManager
                .createQueryBuilder()
                .select()
                .from(Team, 't1')
                .where('t1.team_id= :team_id', { team_id })
                .andWhere('t2.role=1')
                .innerJoinAndSelect(UserTeamConnection, 't2', 't2.team_id=t1.team_id')
                .getRawMany();

            console.log(checkTeamMembers);

            if (checkTeamMembers.length === 0) {
                throw Error('Team is corrupted or team doesnt exist!');
            }

            if (checkTeamMembers.length === 1 && Number(checkTeamMembers[0].t2_user_id) === user_id) {

                const result = await getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(Team)
                    .where('team_id= :team_id', { team_id })
                    .execute();

                if (!result.affected) {
                    throw Error('Project doesnt exist!');
                }

                if (result.affected === 0) {
                    throw Error('Project doesnt exist!');
                }

            } else {

                const result = await getManager()
                    .createQueryBuilder()
                    .delete()
                    .from(UserTeamConnection)
                    .where('team_id= :team_id', { team_id })
                    .andWhere('user_id= :user_id', { user_id })
                    .execute();

                if (!result.affected) {
                    throw Error('Project doesnt exist!');
                }

                if (result.affected === 0) {
                    throw Error('Project doesnt exist!');
                }

            }
        });

        return team_id;
    }

}