import { Response } from 'express';
import { Request } from 'express';

interface MyContext {
    res: Response,
    req: Request,
    payload: {
        user_id: number
    }
}

export default MyContext;