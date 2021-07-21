import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import Card from '../entity/Card';
import Project from '../entity/Project';
import Team from '../entity/Team';
import UserTeamConnection from '../entity/UserTeamConnection';
import { getManager } from 'typeorm';

interface Arguments {
    team_id?: number,
    project_id: number
    card_id: number,
}
const isCardAccessible: MiddlewareFn<MyContext> = async ({ context, args }, next) => {

    const user_id = context.payload.user_id;
    const { project_id, card_id, team_id } = args as Arguments;

    if (team_id) {

        const result = await getManager()
            .createQueryBuilder()
            .select('t2.project_id', 'project_id')
            .select('t4.role', 'role')
            .from(Card, 't1')
            .innerJoin(Project, 't2', 't2.project_id=t1.project_id')
            .innerJoin(Team, 't3', 't2.team_id=t3.team_id')
            .innerJoin(UserTeamConnection, 't4', 't3.team_id=t4.team_id')
            .where('t1.card_id= :card_id', { card_id })
            .andWhere('t4.user_id= :user_id', { user_id })
            .andWhere('t2.project_id= :project_id', { project_id })
            .andWhere('t4.confirmed=true')
            .getRawOne();

        if (!result) {
            throw new Error('Access denied! You dont have permission to perform this action!');
        }

        context.payload.role = result.role;

        return next();
    }


    if (!team_id) {

        const result = await getManager()
            .createQueryBuilder()
            .select('t2.project_id', 'project_id')
            .from(Card, 't1')
            .innerJoin(Project, 't2', 't2.project_id=t1.project_id')
            .where('t1.card_id= :card_id', { card_id })
            .andWhere('t2.project_id= :project_id', { project_id })
            .andWhere('t2.user_id= :user_id', { user_id })
            .getRawOne();

        if (!result) {
            throw new Error('Access denied! You dont have permission to perform this action!');
        }

        return next();
    }

    return next();
}

export default isCardAccessible;


/*

const card = await Card.findOne({ where: { card_id } });

    if (!card) {
        //either project doesnt exist or
        throw new Error('Card doesnt exist!');
    }

    if (Number(card.project_id) !== project_id) {
        throw new Error('Access denied! You dont have permission to perform this action!');
    }

*/