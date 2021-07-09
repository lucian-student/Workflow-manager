import { Field, InputType } from "type-graphql";
import CardInput from "../shared/CardInput";
import TodoInput from "../../todo/shared/TodoInput";
import LinkInput from "../../link/shared/LinkInput";

@InputType()
export default class CreateCardInput extends CardInput {

    @Field(() => [TodoInput])
    todos: TodoInput[];

    @Field(() => [LinkInput])
    links: LinkInput[];

}