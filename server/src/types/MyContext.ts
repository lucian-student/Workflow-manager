import { Response } from 'express';
import { Request } from 'express'

interface MyContext {
    res: Response,
    req: Request,
    payload: {
        user_id: number,
        type_of_project?: string,
        role?: number
    }
}

export default MyContext;