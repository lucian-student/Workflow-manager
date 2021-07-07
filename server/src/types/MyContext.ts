import { Response } from 'express';
import { Request } from 'express';
import Project from '../entity/Project';

interface MyContext {
    res: Response,
    req: Request,
    payload: {
        user_id: number,
        type_of_project?: string,
        curr_project?: Project
    }
}

export default MyContext;