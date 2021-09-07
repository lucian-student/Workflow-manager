import Project from '../../../entity/Project';
import { getManager } from 'typeorm';
import Team from "../../../entity/Team";
import UserTeamConnection from "../../../entity/UserTeamConnection";
import jwt from 'jsonwebtoken';
import User from '../../../entity/User';
import ListenerResponse from '../../shared/ListenerResponse';
import { Context, DELETE_CARD, DELETE_LIST } from '../../project/ProjectListener';
import { Arguments } from '../CardListener';
import Card from '../../../entity/Card';

export default async function projectListenerFilter({ args, payload, context }: { args: Arguments, context: Context, payload: ListenerResponse }): Promise<boolean> {

    if (context.subscribtionToken === null) {
        console.log('check 1')
        return false;
    }

    if (args.project_id !== payload.project_id) {
        console.log('check 2')
        return false;
    }

    //check for card_id

    if (payload.card_id) {
        if (Number(payload.card_id) !== args.card_id) {
            console.log('check 3');
            return false;
        }
    }

    let userData = null;

    //here check if jwt is valid
    try {
        userData = jwt.verify(context.subscribtionToken, process.env.SECRET3!) as { user: string, tokenVersion: string };
    } catch (err) {
        console.log(err.message);
        console.log('check 4')
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
        console.log('check 5')
        return false;
    }

    if (String(user.tokenVersion) !== userData.tokenVersion) {
        console.log('check 6')
        return false;
    }

    let access: boolean = true;
    // check access to subscribtion
    if (args.team_id && (payload.topic !== DELETE_CARD && payload.topic !== DELETE_LIST)) {
        const result = await getManager()
            .createQueryBuilder()
            .select('t2.project_id', 'project_id')
            .select('t4.role', 'role')
            .from(Card, 't1')
            .innerJoin(Project, 't2', 't2.project_id=t1.project_id')
            .innerJoin(Team, 't3', 't2.team_id=t3.team_id')
            .innerJoin(UserTeamConnection, 't4', 't3.team_id=t4.team_id')
            .where('t1.card_id= :card_id', { card_id: args.card_id })
            .andWhere('t4.user_id= :user_id', { user_id: Number(userData.user) })
            .andWhere('t2.project_id= :project_id', { project_id: args.project_id })
            .andWhere('t4.confirmed=true')
            .getRawOne();
        if (!result) {
            console.log('check 7')
            access = false;
        }
    } else if (payload.topic !== DELETE_CARD && payload.topic !== DELETE_LIST) {
        console.log('check 8')
        access = false;
    }

    if (payload.topic === DELETE_CARD || payload.topic === DELETE_LIST) {
        const connection = await UserTeamConnection.findOne({ where: { user_id: payload.user_id, team_id: args.team_id, confirmed: true } });

        if (!connection) {
            console.log('check 9')
            access = false;
        }
    }

    console.log(access);
    return (access);
}