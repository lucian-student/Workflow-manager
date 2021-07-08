import { Response } from 'express';
import { Request } from 'express';
import Card from '../entity/Card';
import Link from '../entity/Link';
import List from '../entity/List';
import Message from '../entity/Message';
import Project from '../entity/Project';
import Todo from '../entity/Todo';

interface MyContext {
    res: Response,
    req: Request,
    payload: {
        user_id: number,
        type_of_project?: string,
        curr_project?: Project,
        curr_list?: List,
        curr_card?: Card,
        curr_todo?: Todo,
        curr_link?: Link,
        curr_message?: Message
    }
}

export default MyContext;