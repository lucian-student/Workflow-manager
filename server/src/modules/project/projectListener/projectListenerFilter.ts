import Project from '../../../entity/Project';
import { getManager } from 'typeorm';
import Team from "../../../entity/Team";
import UserTeamConnection from "../../../entity/UserTeamConnection";
import jwt from 'jsonwebtoken';
import User from '../../../entity/User';
import { Arguments, Context } from '../ProjectListener';

export default async function projectListenerFilter({ args, payload, context }: { args: Arguments, context: Context, payload: any }): Promise<boolean> {
    if (context.subscribtionToken === null) {
        return false;
    }

    if (args.project_id !== payload.project_id) {
        return false;
    }

    let userData = null;

    //here check if jwt is valid
    try {
        userData = jwt.verify(context.subscribtionToken, process.env.SECRET3!) as { user: string, tokenVersion: string };
    } catch (err) {
        console.log(err.message);
        return false;
    }

    //console.log(userData);
    // check if tokenVersion correct

    const user = await User.findOne({ where: { user_id: Number(userData.user) } });

    //console.log(user);
    if (!user) {
        return false;
    }

    if (String(user.tokenVersion) !== userData.tokenVersion) {
        return false;
    }

    let access: boolean = true;
    // check access to subscribtion
    if (args.team_id) {
        const result = await getManager()
            .createQueryBuilder()
            .select('t1.project_id', 'project_id')
            .addSelect('t3.role', 'role')
            .from(Project, 't1')
            .innerJoin(Team, 't2', 't2.team_id=t1.team_id')
            .innerJoin(UserTeamConnection, 't3', 't3.team_id=t2.team_id')
            .where('t3.user_id= :user_id', { user_id: Number(userData.user) })
            .andWhere('t1.project_id= :project_id', { project_id: payload.project_id })
            .andWhere('t3.confirmed=true')
            .getRawOne();

        if (!result) {
            access = false;
        }
    } else {
        access = false;
    }

    return (access) /*&& payload.user_id !== Number(userData.user_id);*/
}