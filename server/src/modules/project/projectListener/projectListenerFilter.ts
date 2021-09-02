import Project from '../../../entity/Project';
import { getManager } from 'typeorm';
import Team from "../../../entity/Team";
import UserTeamConnection from "../../../entity/UserTeamConnection";
import jwt from 'jsonwebtoken';
import User from '../../../entity/User';
import ProjectListenerResponse from './ProjectListenerResponse';
import { Arguments, Context, DELETE_PROJECT } from '../ProjectListener';


export default async function projectListenerFilter({ args, payload, context }: { args: Arguments, context: Context, payload: ProjectListenerResponse }): Promise<boolean> {
    if (context.subscribtionToken === null) {
        console.log('check 1')
        return false;
    }

    if (args.project_id !== payload.project_id) {
        console.log('check 2')
        return false;
    }

    let userData = null;

    //here check if jwt is valid
    try {
        userData = jwt.verify(context.subscribtionToken, process.env.SECRET3!) as { user: string, tokenVersion: string };
    } catch (err) {
        console.log(err.message);
        console.log('check 3')
        return false;
    }

    //check wheter it is user who send it
    /*if (payload.user_id !== Number(userData.user)) {
        return false;
    }*/

    //console.log(userData);
    // check if tokenVersion correct

    const user = await User.findOne({ where: { user_id: Number(userData.user) } });

    //console.log(user);
    if (!user) {
        console.log('check 4')
        return false;
    }

    if (String(user.tokenVersion) !== userData.tokenVersion) {
        console.log('check 5')
        return false;
    }

    let access: boolean = true;
    // check access to subscribtion
    if (args.team_id && payload.topic !== DELETE_PROJECT) {
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
            console.log('check 6')
            access = false;
        }
    } else if (payload.topic !== DELETE_PROJECT) {
        console.log('check 7')
        access = false;
    }

    if (payload.topic === DELETE_PROJECT) {
        const connection = await UserTeamConnection.findOne({ where: { user_id: payload.user_id, team_id: args.team_id, confirmed: true } });

        if (!connection) {
            console.log('check 8')
            access = false;
        }
    }

    console.log(access);
    return (access);
}