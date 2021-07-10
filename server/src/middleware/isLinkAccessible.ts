import MyContext from "../types/MyContext";
import { MiddlewareFn } from "type-graphql";
import Link from "../entity/Link";

interface Arguments {
    project_id: number
    link_id: number
}
const isLinkAccessible: MiddlewareFn<MyContext> = async ({ context, args }, next) => {

    const { project_id, link_id } = args as Arguments;

    const link = await Link.findOne({ where: { link_id } });

    if (!link) {
        //either project doesnt exist or 
        throw new Error('Link doesnt exist!');
    }

    if (Number(link.project_id) !== project_id) {
        throw new Error('Access denied! You dont have permission to perform this action!');
    }

    /* if (Number(link.link_id) !== link_id) {
         throw new Error('Access denied! You dont have permission to perform this action!');
    }*/

    // context.payload.curr_link = link;

    return next();
}

export default isLinkAccessible;