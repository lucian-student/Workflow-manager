import { InputType, Field } from "type-graphql";
import ProjectInput from "../shared/ProjectInput";
import { IsNotEmpty } from 'class-validator';

@InputType()
export default class EditProjectInput extends ProjectInput { }