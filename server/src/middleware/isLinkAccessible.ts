import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import Link from "../entity/Link";
import Project from '../entity/Project';
import Team from '../entity/Team';
import UserTeamConnection from '../entity/UserTeamConnection';
import { getManager } from 'typeorm';

interface Arguments {
    project_id: number
    link_id: number,
    team_id?: number
}
const isLinkAccessible: MiddlewareFn<MyContext> = async ({ context, args }, next) => {

    const user_id = context.payload.user_id;
    const { project_id, link_id, team_id } = args as Arguments;

    
    if (team_id) {

        const result = await getManager()
            .createQueryBuilder()
            .select('t2.project_id', 'project_id')
            .select('t4.role', 'role')
            .from(Link, 't1')
            .innerJoin(Project, 't2', 't2.project_id=t1.project_id')
            .innerJoin(Team, 't3', 't2.team_id=t3.team_id')
            .innerJoin(UserTeamConnection, 't4', 't3.team_id=t4.team_id')
            .where('t1.link_id= :link_id', { link_id })
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
            .from(Link, 't1')
            .innerJoin(Project, 't2', 't2.project_id=t1.project_id')
            .where('t1.link_id= :link_id', { link_id })
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

export default isLinkAccessible;


/*
 const link = await Link.findOne({ where: { link_id } });

    if (!link) {
        //either project doesnt exist or
        throw new Error('Link doesnt exist!');
    }

    if (Number(link.project_id) !== project_id) {
        throw new Error('Access denied! You dont have permission to perform this action!');
    }

*/