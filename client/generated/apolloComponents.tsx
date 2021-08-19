import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Card = {
  __typename?: 'Card';
  card_id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  order_index: Scalars['Float'];
  deadline: Scalars['DateTime'];
  todos: Array<Todo>;
  messages: Array<Message>;
  links: Array<Link>;
  list_id: Scalars['ID'];
  list: List;
  project_id: Scalars['ID'];
};

export type CardInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  deadline: Scalars['DateTime'];
};

export type CreateCardInput = {
  name: Scalars['String'];
  description: Scalars['String'];
  deadline: Scalars['DateTime'];
  todos: Array<TodoInput>;
  links: Array<LinkInput>;
};

export type CreateProjectInput = {
  status: Scalars['String'];
  deadline: Scalars['DateTime'];
  name: Scalars['String'];
  description: Scalars['String'];
};


export type DeleteCardResponse = {
  __typename?: 'DeleteCardResponse';
  list_id: Scalars['ID'];
  card_id: Scalars['ID'];
};

export type DeleteLinkResponse = {
  __typename?: 'DeleteLinkResponse';
  list_id: Scalars['ID'];
  link_id: Scalars['ID'];
  card_id: Scalars['ID'];
};

export type DeleteMessageResponse = {
  __typename?: 'DeleteMessageResponse';
  list_id: Scalars['ID'];
  message_id: Scalars['ID'];
  card_id: Scalars['ID'];
};

export type DeleteTodoResponse = {
  __typename?: 'DeleteTodoResponse';
  todo_id: Scalars['ID'];
  list_id: Scalars['ID'];
  card_id: Scalars['ID'];
};

export type EditProjectInput = {
  status: Scalars['String'];
  deadline: Scalars['DateTime'];
  name: Scalars['String'];
  description: Scalars['String'];
};

export type GetProjectResponse = {
  __typename?: 'GetProjectResponse';
  project: Project;
  project_id: Scalars['ID'];
  role?: Maybe<Scalars['Float']>;
};

export type GetTeamsResponse = {
  __typename?: 'GetTeamsResponse';
  teams: Array<Team>;
  user_id: Scalars['ID'];
};

export type GetUserTeamConnectionsResponse = {
  __typename?: 'GetUserTeamConnectionsResponse';
  user_id: Scalars['ID'];
  cons: Array<UserTeamConnection>;
};

export type Link = {
  __typename?: 'Link';
  link_id: Scalars['ID'];
  name: Scalars['String'];
  url: Scalars['String'];
  card_id: Scalars['ID'];
  card: Card;
  project_id: Scalars['ID'];
};

export type LinkInput = {
  name: Scalars['String'];
  url: Scalars['String'];
};

export type LinkResponse = {
  __typename?: 'LinkResponse';
  list_id: Scalars['ID'];
  link: Link;
};

export type List = {
  __typename?: 'List';
  list_id: Scalars['ID'];
  name: Scalars['String'];
  order_index: Scalars['Float'];
  cards: Array<Card>;
  project_id: Scalars['ID'];
  project: Project;
};

export type ListInput = {
  name: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  user: User;
  access_token: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  message_id: Scalars['ID'];
  content: Scalars['String'];
  user_id: Scalars['ID'];
  user: User;
  card_id: Scalars['ID'];
  card: Card;
  project_id: Scalars['ID'];
  data_of_creation: Scalars['DateTime'];
  username?: Maybe<Scalars['String']>;
};

export type MessageInput = {
  content: Scalars['String'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  list_id: Scalars['ID'];
  message: Message;
};

export type MoveCardResponse = {
  __typename?: 'MoveCardResponse';
  card_id: Scalars['ID'];
  old_list_id: Scalars['ID'];
  list_id: Scalars['ID'];
  order_index: Scalars['Float'];
};

export type MoveListResponse = {
  __typename?: 'MoveListResponse';
  order_index: Scalars['Float'];
  list_id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCard: Card;
  deleteCard: DeleteCardResponse;
  editCard: Card;
  moveCard: MoveCardResponse;
  createLink: LinkResponse;
  deleteLink: DeleteLinkResponse;
  editLink: LinkResponse;
  createList: List;
  deleteList: Scalars['ID'];
  editList: List;
  moveList: MoveListResponse;
  createMessage: MessageResponse;
  deleteMessage: DeleteMessageResponse;
  editMessage: MessageResponse;
  createProject: Project;
  deleteProject: Scalars['ID'];
  editProject: Project;
  lastViewedProject: Scalars['Boolean'];
  createTeam: Team;
  deleteTeam: Scalars['ID'];
  lastActiveTeam: Scalars['Boolean'];
  leaveTeam: Scalars['ID'];
  createTodo: TodoResponse;
  deleteTodo: DeleteTodoResponse;
  doneTodo: TodoResponse;
  editTodo: TodoResponse;
  login?: Maybe<LoginResponse>;
  logout: Scalars['Boolean'];
  register: RegisterResponse;
  revokeRefreshToken: Scalars['Boolean'];
};


export type MutationCreateCardArgs = {
  team_id?: Maybe<Scalars['Float']>;
  list_id: Scalars['Float'];
  project_id: Scalars['Float'];
  data: CreateCardInput;
};


export type MutationDeleteCardArgs = {
  team_id?: Maybe<Scalars['Float']>;
  project_id: Scalars['Float'];
  card_id: Scalars['Float'];
};


export type MutationEditCardArgs = {
  team_id?: Maybe<Scalars['Float']>;
  project_id: Scalars['Float'];
  card_id: Scalars['Float'];
  data: CardInput;
};


export type MutationMoveCardArgs = {
  team_id?: Maybe<Scalars['Float']>;
  card_id: Scalars['Float'];
  project_id: Scalars['Float'];
  end_index: Scalars['Float'];
  list_id: Scalars['Float'];
};


export type MutationCreateLinkArgs = {
  team_id?: Maybe<Scalars['Float']>;
  project_id: Scalars['Float'];
  card_id: Scalars['Float'];
  data: LinkInput;
};


export type MutationDeleteLinkArgs = {
  team_id?: Maybe<Scalars['Float']>;
  project_id: Scalars['Float'];
  link_id: Scalars['Float'];
};


export type MutationEditLinkArgs = {
  team_id?: Maybe<Scalars['Float']>;
  project_id: Scalars['Float'];
  link_id: Scalars['Float'];
  data: LinkInput;
};


export type MutationCreateListArgs = {
  team_id?: Maybe<Scalars['Float']>;
  data: ListInput;
  project_id: Scalars['Float'];
};


export type MutationDeleteListArgs = {
  team_id?: Maybe<Scalars['Float']>;
  list_id: Scalars['Float'];
  project_id: Scalars['Float'];
};


export type MutationEditListArgs = {
  team_id?: Maybe<Scalars['Float']>;
  data: ListInput;
  list_id: Scalars['Float'];
  project_id: Scalars['Float'];
};


export type MutationMoveListArgs = {
  team_id?: Maybe<Scalars['Float']>;
  end_index: Scalars['Float'];
  list_id: Scalars['Float'];
  project_id: Scalars['Float'];
};


export type MutationCreateMessageArgs = {
  team_id?: Maybe<Scalars['Float']>;
  card_id: Scalars['Float'];
  project_id: Scalars['Float'];
  data: MessageInput;
};


export type MutationDeleteMessageArgs = {
  team_id?: Maybe<Scalars['Float']>;
  message_id: Scalars['Float'];
  project_id: Scalars['Float'];
};


export type MutationEditMessageArgs = {
  team_id?: Maybe<Scalars['Float']>;
  message_id: Scalars['Float'];
  project_id: Scalars['Float'];
  data: MessageInput;
};


export type MutationCreateProjectArgs = {
  team_id?: Maybe<Scalars['Float']>;
  data: CreateProjectInput;
};


export type MutationDeleteProjectArgs = {
  team_id?: Maybe<Scalars['Float']>;
  project_id: Scalars['Float'];
};


export type MutationEditProjectArgs = {
  team_id?: Maybe<Scalars['Float']>;
  project_id: Scalars['Float'];
  data: EditProjectInput;
};


export type MutationLastViewedProjectArgs = {
  team_id?: Maybe<Scalars['Float']>;
  project_id: Scalars['Float'];
};


export type MutationCreateTeamArgs = {
  data: TeamInput;
};


export type MutationDeleteTeamArgs = {
  team_id: Scalars['Float'];
};


export type MutationLastActiveTeamArgs = {
  team_id: Scalars['Float'];
};


export type MutationLeaveTeamArgs = {
  team_id: Scalars['Float'];
};


export type MutationCreateTodoArgs = {
  team_id?: Maybe<Scalars['Float']>;
  card_id: Scalars['Float'];
  project_id: Scalars['Float'];
  data: TodoInput;
};


export type MutationDeleteTodoArgs = {
  team_id?: Maybe<Scalars['Float']>;
  project_id: Scalars['Float'];
  todo_id: Scalars['Float'];
};


export type MutationDoneTodoArgs = {
  team_id?: Maybe<Scalars['Float']>;
  project_id: Scalars['Float'];
  todo_id: Scalars['Float'];
  done: Scalars['Boolean'];
};


export type MutationEditTodoArgs = {
  team_id?: Maybe<Scalars['Float']>;
  project_id: Scalars['Float'];
  todo_id: Scalars['Float'];
  data: TodoInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationRevokeRefreshTokenArgs = {
  user_id: Scalars['Float'];
};

export type Project = {
  __typename?: 'Project';
  project_id: Scalars['ID'];
  user_id?: Maybe<Scalars['ID']>;
  user?: Maybe<User>;
  team_id?: Maybe<Scalars['ID']>;
  team?: Maybe<Team>;
  lists: Array<List>;
  status: Scalars['String'];
  deadline: Scalars['DateTime'];
  name: Scalars['String'];
  description: Scalars['String'];
  last_updated: Scalars['DateTime'];
  team_name?: Maybe<Scalars['String']>;
};

export type ProjectInput = {
  status: Scalars['String'];
  deadline: Scalars['DateTime'];
  name: Scalars['String'];
  description: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getCard?: Maybe<Card>;
  getProject: GetProjectResponse;
  getProjects: Array<Project>;
  getTeam?: Maybe<Team>;
  getTeams: GetTeamsResponse;
  hello: Scalars['String'];
  me?: Maybe<User>;
  getUserTeamConnection?: Maybe<UserTeamConnection>;
  getUserTeamConnections: GetUserTeamConnectionsResponse;
};


export type QueryGetCardArgs = {
  team_id?: Maybe<Scalars['Float']>;
  card_id: Scalars['Float'];
  project_id: Scalars['Float'];
};


export type QueryGetProjectArgs = {
  team_id?: Maybe<Scalars['Float']>;
  project_id: Scalars['Float'];
};


export type QueryGetProjectsArgs = {
  team_id?: Maybe<Scalars['Float']>;
  search?: Maybe<Scalars['String']>;
  sort_option: Scalars['String'];
};


export type QueryGetTeamArgs = {
  team_id: Scalars['Float'];
};


export type QueryGetUserTeamConnectionArgs = {
  team_id: Scalars['Float'];
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  confirm_password: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  user: User;
  access_token: Scalars['String'];
};

export type Team = {
  __typename?: 'Team';
  team_id: Scalars['ID'];
  name: Scalars['String'];
  projects: Array<Project>;
  cons: Array<UserTeamConnection>;
  description: Scalars['String'];
  last_active: Scalars['DateTime'];
  user_count?: Maybe<Scalars['Float']>;
  project_count?: Maybe<Scalars['Float']>;
};

export type TeamInput = {
  name: Scalars['String'];
  description: Scalars['String'];
};

export type Todo = {
  __typename?: 'Todo';
  todo_id: Scalars['ID'];
  name: Scalars['String'];
  done: Scalars['Boolean'];
  card_id: Scalars['ID'];
  card: Card;
  project_id: Scalars['ID'];
};

export type TodoInput = {
  name: Scalars['String'];
};

export type TodoResponse = {
  __typename?: 'TodoResponse';
  todo: Todo;
  list_id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  user_id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  projects: Array<Project>;
  cons: Array<UserTeamConnection>;
  messages: Array<Message>;
};

export type UserTeamConnection = {
  __typename?: 'UserTeamConnection';
  con_id: Scalars['ID'];
  confirmed: Scalars['Boolean'];
  role: Scalars['Float'];
  user_id: Scalars['ID'];
  user: User;
  team_id: Scalars['ID'];
  team: Team;
  username?: Maybe<Scalars['String']>;
  teamname?: Maybe<Scalars['String']>;
};

export type CreateCardMutationVariables = Exact<{
  data: CreateCardInput;
  list_id: Scalars['Float'];
  project_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type CreateCardMutation = (
  { __typename?: 'Mutation' }
  & { createCard: (
    { __typename?: 'Card' }
    & Pick<Card, 'card_id' | 'name' | 'deadline' | 'project_id' | 'list_id' | 'order_index'>
    & { links: Array<(
      { __typename?: 'Link' }
      & Pick<Link, 'link_id' | 'name' | 'url' | 'card_id' | 'project_id'>
    )>, messages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'message_id' | 'content' | 'user_id' | 'card_id' | 'project_id' | 'data_of_creation' | 'username'>
    )>, todos: Array<(
      { __typename?: 'Todo' }
      & Pick<Todo, 'todo_id' | 'name' | 'done' | 'card_id' | 'project_id'>
    )> }
  ) }
);

export type DeleteCardMutationVariables = Exact<{
  card_id: Scalars['Float'];
  project_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type DeleteCardMutation = (
  { __typename?: 'Mutation' }
  & { deleteCard: (
    { __typename?: 'DeleteCardResponse' }
    & Pick<DeleteCardResponse, 'card_id' | 'list_id'>
  ) }
);

export type EditCardMutationVariables = Exact<{
  data: CardInput;
  card_id: Scalars['Float'];
  project_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type EditCardMutation = (
  { __typename?: 'Mutation' }
  & { editCard: (
    { __typename?: 'Card' }
    & Pick<Card, 'project_id' | 'card_id' | 'list_id' | 'name' | 'description' | 'deadline'>
  ) }
);

export type MoveCardMutationVariables = Exact<{
  list_id: Scalars['Float'];
  project_id: Scalars['Float'];
  end_index: Scalars['Float'];
  card_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type MoveCardMutation = (
  { __typename?: 'Mutation' }
  & { moveCard: (
    { __typename?: 'MoveCardResponse' }
    & Pick<MoveCardResponse, 'list_id' | 'old_list_id' | 'card_id' | 'order_index'>
  ) }
);

export type GetCardQueryVariables = Exact<{
  project_id: Scalars['Float'];
  card_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type GetCardQuery = (
  { __typename?: 'Query' }
  & { getCard?: Maybe<(
    { __typename?: 'Card' }
    & Pick<Card, 'card_id' | 'name' | 'deadline' | 'project_id' | 'list_id' | 'order_index'>
    & { links: Array<(
      { __typename?: 'Link' }
      & Pick<Link, 'link_id' | 'name' | 'url' | 'card_id' | 'project_id'>
    )>, messages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'message_id' | 'content' | 'user_id' | 'card_id' | 'project_id' | 'data_of_creation' | 'username'>
    )>, todos: Array<(
      { __typename?: 'Todo' }
      & Pick<Todo, 'todo_id' | 'name' | 'done' | 'card_id' | 'project_id'>
    )> }
  )> }
);

export type CreateLinkMutationVariables = Exact<{
  data: LinkInput;
  card_id: Scalars['Float'];
  project_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type CreateLinkMutation = (
  { __typename?: 'Mutation' }
  & { createLink: (
    { __typename?: 'LinkResponse' }
    & Pick<LinkResponse, 'list_id'>
    & { link: (
      { __typename?: 'Link' }
      & Pick<Link, 'link_id' | 'name' | 'url' | 'card_id' | 'project_id'>
    ) }
  ) }
);

export type DeleteLinkMutationVariables = Exact<{
  link_id: Scalars['Float'];
  project_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type DeleteLinkMutation = (
  { __typename?: 'Mutation' }
  & { deleteLink: (
    { __typename?: 'DeleteLinkResponse' }
    & Pick<DeleteLinkResponse, 'list_id' | 'link_id' | 'card_id'>
  ) }
);

export type EditLinkMutationVariables = Exact<{
  data: LinkInput;
  link_id: Scalars['Float'];
  project_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type EditLinkMutation = (
  { __typename?: 'Mutation' }
  & { editLink: (
    { __typename?: 'LinkResponse' }
    & Pick<LinkResponse, 'list_id'>
    & { link: (
      { __typename?: 'Link' }
      & Pick<Link, 'link_id' | 'name' | 'url' | 'card_id' | 'project_id'>
    ) }
  ) }
);

export type CreateListMutationVariables = Exact<{
  data: ListInput;
  project_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type CreateListMutation = (
  { __typename?: 'Mutation' }
  & { createList: (
    { __typename?: 'List' }
    & Pick<List, 'project_id' | 'list_id' | 'name' | 'order_index'>
    & { cards: Array<(
      { __typename?: 'Card' }
      & Pick<Card, 'card_id' | 'name' | 'deadline' | 'project_id' | 'list_id' | 'order_index'>
      & { links: Array<(
        { __typename?: 'Link' }
        & Pick<Link, 'link_id' | 'name' | 'url' | 'card_id' | 'project_id'>
      )>, messages: Array<(
        { __typename?: 'Message' }
        & Pick<Message, 'message_id' | 'content' | 'user_id' | 'card_id' | 'project_id' | 'data_of_creation' | 'username'>
      )>, todos: Array<(
        { __typename?: 'Todo' }
        & Pick<Todo, 'todo_id' | 'name' | 'done' | 'card_id' | 'project_id'>
      )> }
    )> }
  ) }
);

export type DeleteListMutationVariables = Exact<{
  project_id: Scalars['Float'];
  list_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type DeleteListMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteList'>
);

export type EditListMutationVariables = Exact<{
  project_id: Scalars['Float'];
  list_id: Scalars['Float'];
  data: ListInput;
  team_id?: Maybe<Scalars['Float']>;
}>;


export type EditListMutation = (
  { __typename?: 'Mutation' }
  & { editList: (
    { __typename?: 'List' }
    & Pick<List, 'project_id' | 'list_id' | 'name' | 'order_index'>
  ) }
);

export type MoveListMutationVariables = Exact<{
  list_id: Scalars['Float'];
  project_id: Scalars['Float'];
  end_index: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type MoveListMutation = (
  { __typename?: 'Mutation' }
  & { moveList: (
    { __typename?: 'MoveListResponse' }
    & Pick<MoveListResponse, 'order_index' | 'list_id'>
  ) }
);

export type CreateMessageMutationVariables = Exact<{
  data: MessageInput;
  project_id: Scalars['Float'];
  card_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & { createMessage: (
    { __typename?: 'MessageResponse' }
    & Pick<MessageResponse, 'list_id'>
    & { message: (
      { __typename?: 'Message' }
      & Pick<Message, 'message_id' | 'content' | 'user_id' | 'card_id' | 'project_id' | 'data_of_creation' | 'username'>
    ) }
  ) }
);

export type DeleteMessageMutationVariables = Exact<{
  message_id: Scalars['Float'];
  project_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type DeleteMessageMutation = (
  { __typename?: 'Mutation' }
  & { deleteMessage: (
    { __typename?: 'DeleteMessageResponse' }
    & Pick<DeleteMessageResponse, 'message_id' | 'list_id' | 'card_id'>
  ) }
);

export type EditMessageMutationVariables = Exact<{
  data: MessageInput;
  message_id: Scalars['Float'];
  project_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type EditMessageMutation = (
  { __typename?: 'Mutation' }
  & { editMessage: (
    { __typename?: 'MessageResponse' }
    & Pick<MessageResponse, 'list_id'>
    & { message: (
      { __typename?: 'Message' }
      & Pick<Message, 'message_id' | 'content' | 'user_id' | 'card_id' | 'project_id' | 'data_of_creation' | 'username'>
    ) }
  ) }
);

export type CreateProjectMutationVariables = Exact<{
  data: CreateProjectInput;
  team_id?: Maybe<Scalars['Float']>;
}>;


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'project_id' | 'name' | 'deadline' | 'status' | 'description' | 'user_id' | 'team_id' | 'last_updated' | 'team_name'>
  ) }
);

export type DeleteProjectMutationVariables = Exact<{
  project_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type DeleteProjectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteProject'>
);

export type EditProjectMutationVariables = Exact<{
  data: EditProjectInput;
  project_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type EditProjectMutation = (
  { __typename?: 'Mutation' }
  & { editProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'project_id' | 'name' | 'deadline' | 'status' | 'description' | 'user_id' | 'team_id'>
  ) }
);

export type LastViewedProjectMutationVariables = Exact<{
  project_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type LastViewedProjectMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'lastViewedProject'>
);

export type GetProjectQueryVariables = Exact<{
  project_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type GetProjectQuery = (
  { __typename?: 'Query' }
  & { getProject: (
    { __typename?: 'GetProjectResponse' }
    & Pick<GetProjectResponse, 'project_id' | 'role'>
    & { project: (
      { __typename?: 'Project' }
      & Pick<Project, 'project_id' | 'name' | 'deadline' | 'status' | 'description' | 'user_id' | 'team_id'>
      & { lists: Array<(
        { __typename?: 'List' }
        & Pick<List, 'project_id' | 'list_id' | 'name' | 'order_index'>
        & { cards: Array<(
          { __typename?: 'Card' }
          & Pick<Card, 'card_id' | 'name' | 'deadline' | 'project_id' | 'list_id' | 'order_index'>
          & { links: Array<(
            { __typename?: 'Link' }
            & Pick<Link, 'link_id' | 'name' | 'url' | 'card_id' | 'project_id'>
          )>, messages: Array<(
            { __typename?: 'Message' }
            & Pick<Message, 'message_id' | 'content' | 'user_id' | 'card_id' | 'project_id' | 'data_of_creation' | 'username'>
          )>, todos: Array<(
            { __typename?: 'Todo' }
            & Pick<Todo, 'todo_id' | 'name' | 'done' | 'card_id' | 'project_id'>
          )> }
        )> }
      )> }
    ) }
  ) }
);

export type GetProjectsQueryVariables = Exact<{
  sort_option: Scalars['String'];
  search?: Maybe<Scalars['String']>;
  team_id?: Maybe<Scalars['Float']>;
}>;


export type GetProjectsQuery = (
  { __typename?: 'Query' }
  & { getProjects: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'project_id' | 'name' | 'deadline' | 'status' | 'description' | 'user_id' | 'team_id' | 'last_updated' | 'team_name'>
  )> }
);

export type CreateTeamMutationVariables = Exact<{
  data: TeamInput;
}>;


export type CreateTeamMutation = (
  { __typename?: 'Mutation' }
  & { createTeam: (
    { __typename?: 'Team' }
    & Pick<Team, 'team_id' | 'name' | 'description' | 'last_active' | 'user_count' | 'project_count'>
  ) }
);

export type LastActiveTeamMutationVariables = Exact<{
  team_id: Scalars['Float'];
}>;


export type LastActiveTeamMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'lastActiveTeam'>
);

export type GetTeamQueryVariables = Exact<{
  team_id: Scalars['Float'];
}>;


export type GetTeamQuery = (
  { __typename?: 'Query' }
  & { getTeam?: Maybe<(
    { __typename?: 'Team' }
    & Pick<Team, 'team_id' | 'name' | 'description' | 'last_active'>
    & { cons: Array<(
      { __typename?: 'UserTeamConnection' }
      & Pick<UserTeamConnection, 'con_id' | 'user_id' | 'username' | 'team_id' | 'confirmed' | 'role'>
    )> }
  )> }
);

export type GetTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamsQuery = (
  { __typename?: 'Query' }
  & { getTeams: (
    { __typename?: 'GetTeamsResponse' }
    & { teams: Array<(
      { __typename?: 'Team' }
      & Pick<Team, 'team_id' | 'name' | 'description' | 'last_active' | 'user_count' | 'project_count'>
    )> }
  ) }
);

export type CreateTodoMutationVariables = Exact<{
  data: TodoInput;
  project_id: Scalars['Float'];
  card_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type CreateTodoMutation = (
  { __typename?: 'Mutation' }
  & { createTodo: (
    { __typename?: 'TodoResponse' }
    & Pick<TodoResponse, 'list_id'>
    & { todo: (
      { __typename?: 'Todo' }
      & Pick<Todo, 'todo_id' | 'name' | 'done' | 'card_id' | 'project_id'>
    ) }
  ) }
);

export type DeleteTodoMutationVariables = Exact<{
  project_id: Scalars['Float'];
  todo_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type DeleteTodoMutation = (
  { __typename?: 'Mutation' }
  & { deleteTodo: (
    { __typename?: 'DeleteTodoResponse' }
    & Pick<DeleteTodoResponse, 'todo_id' | 'list_id' | 'card_id'>
  ) }
);

export type DoneTodoMutationVariables = Exact<{
  done: Scalars['Boolean'];
  project_id: Scalars['Float'];
  todo_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type DoneTodoMutation = (
  { __typename?: 'Mutation' }
  & { doneTodo: (
    { __typename?: 'TodoResponse' }
    & Pick<TodoResponse, 'list_id'>
    & { todo: (
      { __typename?: 'Todo' }
      & Pick<Todo, 'todo_id' | 'name' | 'done' | 'card_id' | 'project_id'>
    ) }
  ) }
);

export type EditTodoMutationVariables = Exact<{
  data: TodoInput;
  project_id: Scalars['Float'];
  todo_id: Scalars['Float'];
  team_id?: Maybe<Scalars['Float']>;
}>;


export type EditTodoMutation = (
  { __typename?: 'Mutation' }
  & { editTodo: (
    { __typename?: 'TodoResponse' }
    & Pick<TodoResponse, 'list_id'>
    & { todo: (
      { __typename?: 'Todo' }
      & Pick<Todo, 'todo_id' | 'name' | 'done' | 'card_id' | 'project_id'>
    ) }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'access_token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'user_id' | 'email' | 'username'>
    ) }
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterResponse' }
    & Pick<RegisterResponse, 'access_token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'user_id' | 'username' | 'email'>
    ) }
  ) }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'user_id' | 'username' | 'email'>
  )> }
);


export const CreateCardDocument = gql`
    mutation CreateCard($data: CreateCardInput!, $list_id: Float!, $project_id: Float!, $team_id: Float) {
  createCard(
    data: $data
    list_id: $list_id
    project_id: $project_id
    team_id: $team_id
  ) {
    card_id
    name
    deadline
    project_id
    list_id
    order_index
    links {
      link_id
      name
      url
      card_id
      project_id
    }
    messages {
      message_id
      content
      user_id
      card_id
      project_id
      data_of_creation
      username
    }
    todos {
      todo_id
      name
      done
      card_id
      project_id
    }
  }
}
    `;
export type CreateCardMutationFn = Apollo.MutationFunction<CreateCardMutation, CreateCardMutationVariables>;

/**
 * __useCreateCardMutation__
 *
 * To run a mutation, you first call `useCreateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCardMutation, { data, loading, error }] = useCreateCardMutation({
 *   variables: {
 *      data: // value for 'data'
 *      list_id: // value for 'list_id'
 *      project_id: // value for 'project_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useCreateCardMutation(baseOptions?: Apollo.MutationHookOptions<CreateCardMutation, CreateCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCardMutation, CreateCardMutationVariables>(CreateCardDocument, options);
      }
export type CreateCardMutationHookResult = ReturnType<typeof useCreateCardMutation>;
export type CreateCardMutationResult = Apollo.MutationResult<CreateCardMutation>;
export type CreateCardMutationOptions = Apollo.BaseMutationOptions<CreateCardMutation, CreateCardMutationVariables>;
export const DeleteCardDocument = gql`
    mutation DeleteCard($card_id: Float!, $project_id: Float!, $team_id: Float) {
  deleteCard(card_id: $card_id, project_id: $project_id, team_id: $team_id) {
    card_id
    list_id
  }
}
    `;
export type DeleteCardMutationFn = Apollo.MutationFunction<DeleteCardMutation, DeleteCardMutationVariables>;

/**
 * __useDeleteCardMutation__
 *
 * To run a mutation, you first call `useDeleteCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCardMutation, { data, loading, error }] = useDeleteCardMutation({
 *   variables: {
 *      card_id: // value for 'card_id'
 *      project_id: // value for 'project_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useDeleteCardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCardMutation, DeleteCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCardMutation, DeleteCardMutationVariables>(DeleteCardDocument, options);
      }
export type DeleteCardMutationHookResult = ReturnType<typeof useDeleteCardMutation>;
export type DeleteCardMutationResult = Apollo.MutationResult<DeleteCardMutation>;
export type DeleteCardMutationOptions = Apollo.BaseMutationOptions<DeleteCardMutation, DeleteCardMutationVariables>;
export const EditCardDocument = gql`
    mutation EditCard($data: CardInput!, $card_id: Float!, $project_id: Float!, $team_id: Float) {
  editCard(
    data: $data
    card_id: $card_id
    project_id: $project_id
    team_id: $team_id
  ) {
    project_id
    card_id
    list_id
    name
    description
    deadline
  }
}
    `;
export type EditCardMutationFn = Apollo.MutationFunction<EditCardMutation, EditCardMutationVariables>;

/**
 * __useEditCardMutation__
 *
 * To run a mutation, you first call `useEditCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCardMutation, { data, loading, error }] = useEditCardMutation({
 *   variables: {
 *      data: // value for 'data'
 *      card_id: // value for 'card_id'
 *      project_id: // value for 'project_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useEditCardMutation(baseOptions?: Apollo.MutationHookOptions<EditCardMutation, EditCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCardMutation, EditCardMutationVariables>(EditCardDocument, options);
      }
export type EditCardMutationHookResult = ReturnType<typeof useEditCardMutation>;
export type EditCardMutationResult = Apollo.MutationResult<EditCardMutation>;
export type EditCardMutationOptions = Apollo.BaseMutationOptions<EditCardMutation, EditCardMutationVariables>;
export const MoveCardDocument = gql`
    mutation MoveCard($list_id: Float!, $project_id: Float!, $end_index: Float!, $card_id: Float!, $team_id: Float) {
  moveCard(
    list_id: $list_id
    project_id: $project_id
    end_index: $end_index
    card_id: $card_id
    team_id: $team_id
  ) {
    list_id
    old_list_id
    card_id
    order_index
  }
}
    `;
export type MoveCardMutationFn = Apollo.MutationFunction<MoveCardMutation, MoveCardMutationVariables>;

/**
 * __useMoveCardMutation__
 *
 * To run a mutation, you first call `useMoveCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveCardMutation, { data, loading, error }] = useMoveCardMutation({
 *   variables: {
 *      list_id: // value for 'list_id'
 *      project_id: // value for 'project_id'
 *      end_index: // value for 'end_index'
 *      card_id: // value for 'card_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useMoveCardMutation(baseOptions?: Apollo.MutationHookOptions<MoveCardMutation, MoveCardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveCardMutation, MoveCardMutationVariables>(MoveCardDocument, options);
      }
export type MoveCardMutationHookResult = ReturnType<typeof useMoveCardMutation>;
export type MoveCardMutationResult = Apollo.MutationResult<MoveCardMutation>;
export type MoveCardMutationOptions = Apollo.BaseMutationOptions<MoveCardMutation, MoveCardMutationVariables>;
export const GetCardDocument = gql`
    query GetCard($project_id: Float!, $card_id: Float!, $team_id: Float) {
  getCard(project_id: $project_id, card_id: $card_id, team_id: $team_id) {
    card_id
    name
    deadline
    project_id
    list_id
    order_index
    links {
      link_id
      name
      url
      card_id
      project_id
    }
    messages {
      message_id
      content
      user_id
      card_id
      project_id
      data_of_creation
      username
    }
    todos {
      todo_id
      name
      done
      card_id
      project_id
    }
  }
}
    `;

/**
 * __useGetCardQuery__
 *
 * To run a query within a React component, call `useGetCardQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCardQuery({
 *   variables: {
 *      project_id: // value for 'project_id'
 *      card_id: // value for 'card_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useGetCardQuery(baseOptions: Apollo.QueryHookOptions<GetCardQuery, GetCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCardQuery, GetCardQueryVariables>(GetCardDocument, options);
      }
export function useGetCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCardQuery, GetCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCardQuery, GetCardQueryVariables>(GetCardDocument, options);
        }
export type GetCardQueryHookResult = ReturnType<typeof useGetCardQuery>;
export type GetCardLazyQueryHookResult = ReturnType<typeof useGetCardLazyQuery>;
export type GetCardQueryResult = Apollo.QueryResult<GetCardQuery, GetCardQueryVariables>;
export const CreateLinkDocument = gql`
    mutation CreateLink($data: LinkInput!, $card_id: Float!, $project_id: Float!, $team_id: Float) {
  createLink(
    data: $data
    card_id: $card_id
    project_id: $project_id
    team_id: $team_id
  ) {
    link {
      link_id
      name
      url
      card_id
      project_id
    }
    list_id
  }
}
    `;
export type CreateLinkMutationFn = Apollo.MutationFunction<CreateLinkMutation, CreateLinkMutationVariables>;

/**
 * __useCreateLinkMutation__
 *
 * To run a mutation, you first call `useCreateLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLinkMutation, { data, loading, error }] = useCreateLinkMutation({
 *   variables: {
 *      data: // value for 'data'
 *      card_id: // value for 'card_id'
 *      project_id: // value for 'project_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useCreateLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateLinkMutation, CreateLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLinkMutation, CreateLinkMutationVariables>(CreateLinkDocument, options);
      }
export type CreateLinkMutationHookResult = ReturnType<typeof useCreateLinkMutation>;
export type CreateLinkMutationResult = Apollo.MutationResult<CreateLinkMutation>;
export type CreateLinkMutationOptions = Apollo.BaseMutationOptions<CreateLinkMutation, CreateLinkMutationVariables>;
export const DeleteLinkDocument = gql`
    mutation DeleteLink($link_id: Float!, $project_id: Float!, $team_id: Float) {
  deleteLink(link_id: $link_id, project_id: $project_id, team_id: $team_id) {
    list_id
    link_id
    card_id
  }
}
    `;
export type DeleteLinkMutationFn = Apollo.MutationFunction<DeleteLinkMutation, DeleteLinkMutationVariables>;

/**
 * __useDeleteLinkMutation__
 *
 * To run a mutation, you first call `useDeleteLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLinkMutation, { data, loading, error }] = useDeleteLinkMutation({
 *   variables: {
 *      link_id: // value for 'link_id'
 *      project_id: // value for 'project_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useDeleteLinkMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLinkMutation, DeleteLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLinkMutation, DeleteLinkMutationVariables>(DeleteLinkDocument, options);
      }
export type DeleteLinkMutationHookResult = ReturnType<typeof useDeleteLinkMutation>;
export type DeleteLinkMutationResult = Apollo.MutationResult<DeleteLinkMutation>;
export type DeleteLinkMutationOptions = Apollo.BaseMutationOptions<DeleteLinkMutation, DeleteLinkMutationVariables>;
export const EditLinkDocument = gql`
    mutation EditLink($data: LinkInput!, $link_id: Float!, $project_id: Float!, $team_id: Float) {
  editLink(
    data: $data
    link_id: $link_id
    project_id: $project_id
    team_id: $team_id
  ) {
    link {
      link_id
      name
      url
      card_id
      project_id
    }
    list_id
  }
}
    `;
export type EditLinkMutationFn = Apollo.MutationFunction<EditLinkMutation, EditLinkMutationVariables>;

/**
 * __useEditLinkMutation__
 *
 * To run a mutation, you first call `useEditLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editLinkMutation, { data, loading, error }] = useEditLinkMutation({
 *   variables: {
 *      data: // value for 'data'
 *      link_id: // value for 'link_id'
 *      project_id: // value for 'project_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useEditLinkMutation(baseOptions?: Apollo.MutationHookOptions<EditLinkMutation, EditLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditLinkMutation, EditLinkMutationVariables>(EditLinkDocument, options);
      }
export type EditLinkMutationHookResult = ReturnType<typeof useEditLinkMutation>;
export type EditLinkMutationResult = Apollo.MutationResult<EditLinkMutation>;
export type EditLinkMutationOptions = Apollo.BaseMutationOptions<EditLinkMutation, EditLinkMutationVariables>;
export const CreateListDocument = gql`
    mutation CreateList($data: ListInput!, $project_id: Float!, $team_id: Float) {
  createList(data: $data, project_id: $project_id, team_id: $team_id) {
    project_id
    list_id
    name
    order_index
    cards {
      card_id
      name
      deadline
      project_id
      list_id
      order_index
      links {
        link_id
        name
        url
        card_id
        project_id
      }
      messages {
        message_id
        content
        user_id
        card_id
        project_id
        data_of_creation
        username
      }
      todos {
        todo_id
        name
        done
        card_id
        project_id
      }
    }
  }
}
    `;
export type CreateListMutationFn = Apollo.MutationFunction<CreateListMutation, CreateListMutationVariables>;

/**
 * __useCreateListMutation__
 *
 * To run a mutation, you first call `useCreateListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createListMutation, { data, loading, error }] = useCreateListMutation({
 *   variables: {
 *      data: // value for 'data'
 *      project_id: // value for 'project_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useCreateListMutation(baseOptions?: Apollo.MutationHookOptions<CreateListMutation, CreateListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateListMutation, CreateListMutationVariables>(CreateListDocument, options);
      }
export type CreateListMutationHookResult = ReturnType<typeof useCreateListMutation>;
export type CreateListMutationResult = Apollo.MutationResult<CreateListMutation>;
export type CreateListMutationOptions = Apollo.BaseMutationOptions<CreateListMutation, CreateListMutationVariables>;
export const DeleteListDocument = gql`
    mutation DeleteList($project_id: Float!, $list_id: Float!, $team_id: Float) {
  deleteList(project_id: $project_id, list_id: $list_id, team_id: $team_id)
}
    `;
export type DeleteListMutationFn = Apollo.MutationFunction<DeleteListMutation, DeleteListMutationVariables>;

/**
 * __useDeleteListMutation__
 *
 * To run a mutation, you first call `useDeleteListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteListMutation, { data, loading, error }] = useDeleteListMutation({
 *   variables: {
 *      project_id: // value for 'project_id'
 *      list_id: // value for 'list_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useDeleteListMutation(baseOptions?: Apollo.MutationHookOptions<DeleteListMutation, DeleteListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteListMutation, DeleteListMutationVariables>(DeleteListDocument, options);
      }
export type DeleteListMutationHookResult = ReturnType<typeof useDeleteListMutation>;
export type DeleteListMutationResult = Apollo.MutationResult<DeleteListMutation>;
export type DeleteListMutationOptions = Apollo.BaseMutationOptions<DeleteListMutation, DeleteListMutationVariables>;
export const EditListDocument = gql`
    mutation EditList($project_id: Float!, $list_id: Float!, $data: ListInput!, $team_id: Float) {
  editList(
    project_id: $project_id
    list_id: $list_id
    data: $data
    team_id: $team_id
  ) {
    project_id
    list_id
    name
    order_index
  }
}
    `;
export type EditListMutationFn = Apollo.MutationFunction<EditListMutation, EditListMutationVariables>;

/**
 * __useEditListMutation__
 *
 * To run a mutation, you first call `useEditListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editListMutation, { data, loading, error }] = useEditListMutation({
 *   variables: {
 *      project_id: // value for 'project_id'
 *      list_id: // value for 'list_id'
 *      data: // value for 'data'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useEditListMutation(baseOptions?: Apollo.MutationHookOptions<EditListMutation, EditListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditListMutation, EditListMutationVariables>(EditListDocument, options);
      }
export type EditListMutationHookResult = ReturnType<typeof useEditListMutation>;
export type EditListMutationResult = Apollo.MutationResult<EditListMutation>;
export type EditListMutationOptions = Apollo.BaseMutationOptions<EditListMutation, EditListMutationVariables>;
export const MoveListDocument = gql`
    mutation MoveList($list_id: Float!, $project_id: Float!, $end_index: Float!, $team_id: Float) {
  moveList(
    list_id: $list_id
    project_id: $project_id
    end_index: $end_index
    team_id: $team_id
  ) {
    order_index
    list_id
  }
}
    `;
export type MoveListMutationFn = Apollo.MutationFunction<MoveListMutation, MoveListMutationVariables>;

/**
 * __useMoveListMutation__
 *
 * To run a mutation, you first call `useMoveListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveListMutation, { data, loading, error }] = useMoveListMutation({
 *   variables: {
 *      list_id: // value for 'list_id'
 *      project_id: // value for 'project_id'
 *      end_index: // value for 'end_index'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useMoveListMutation(baseOptions?: Apollo.MutationHookOptions<MoveListMutation, MoveListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveListMutation, MoveListMutationVariables>(MoveListDocument, options);
      }
export type MoveListMutationHookResult = ReturnType<typeof useMoveListMutation>;
export type MoveListMutationResult = Apollo.MutationResult<MoveListMutation>;
export type MoveListMutationOptions = Apollo.BaseMutationOptions<MoveListMutation, MoveListMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($data: MessageInput!, $project_id: Float!, $card_id: Float!, $team_id: Float) {
  createMessage(
    data: $data
    project_id: $project_id
    card_id: $card_id
    team_id: $team_id
  ) {
    message {
      message_id
      content
      user_id
      card_id
      project_id
      data_of_creation
      username
    }
    list_id
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *      project_id: // value for 'project_id'
 *      card_id: // value for 'card_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($message_id: Float!, $project_id: Float!, $team_id: Float) {
  deleteMessage(
    message_id: $message_id
    project_id: $project_id
    team_id: $team_id
  ) {
    message_id
    list_id
    card_id
  }
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      message_id: // value for 'message_id'
 *      project_id: // value for 'project_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const EditMessageDocument = gql`
    mutation EditMessage($data: MessageInput!, $message_id: Float!, $project_id: Float!, $team_id: Float) {
  editMessage(
    data: $data
    message_id: $message_id
    project_id: $project_id
    team_id: $team_id
  ) {
    message {
      message_id
      content
      user_id
      card_id
      project_id
      data_of_creation
      username
    }
    list_id
  }
}
    `;
export type EditMessageMutationFn = Apollo.MutationFunction<EditMessageMutation, EditMessageMutationVariables>;

/**
 * __useEditMessageMutation__
 *
 * To run a mutation, you first call `useEditMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMessageMutation, { data, loading, error }] = useEditMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *      message_id: // value for 'message_id'
 *      project_id: // value for 'project_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useEditMessageMutation(baseOptions?: Apollo.MutationHookOptions<EditMessageMutation, EditMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditMessageMutation, EditMessageMutationVariables>(EditMessageDocument, options);
      }
export type EditMessageMutationHookResult = ReturnType<typeof useEditMessageMutation>;
export type EditMessageMutationResult = Apollo.MutationResult<EditMessageMutation>;
export type EditMessageMutationOptions = Apollo.BaseMutationOptions<EditMessageMutation, EditMessageMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($data: CreateProjectInput!, $team_id: Float) {
  createProject(data: $data, team_id: $team_id) {
    project_id
    name
    deadline
    status
    description
    user_id
    team_id
    last_updated
    team_name
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($project_id: Float!, $team_id: Float) {
  deleteProject(project_id: $project_id, team_id: $team_id)
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      project_id: // value for 'project_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const EditProjectDocument = gql`
    mutation EditProject($data: EditProjectInput!, $project_id: Float!, $team_id: Float) {
  editProject(data: $data, project_id: $project_id, team_id: $team_id) {
    project_id
    name
    deadline
    status
    description
    user_id
    team_id
  }
}
    `;
export type EditProjectMutationFn = Apollo.MutationFunction<EditProjectMutation, EditProjectMutationVariables>;

/**
 * __useEditProjectMutation__
 *
 * To run a mutation, you first call `useEditProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProjectMutation, { data, loading, error }] = useEditProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *      project_id: // value for 'project_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useEditProjectMutation(baseOptions?: Apollo.MutationHookOptions<EditProjectMutation, EditProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProjectMutation, EditProjectMutationVariables>(EditProjectDocument, options);
      }
export type EditProjectMutationHookResult = ReturnType<typeof useEditProjectMutation>;
export type EditProjectMutationResult = Apollo.MutationResult<EditProjectMutation>;
export type EditProjectMutationOptions = Apollo.BaseMutationOptions<EditProjectMutation, EditProjectMutationVariables>;
export const LastViewedProjectDocument = gql`
    mutation LastViewedProject($project_id: Float!, $team_id: Float) {
  lastViewedProject(project_id: $project_id, team_id: $team_id)
}
    `;
export type LastViewedProjectMutationFn = Apollo.MutationFunction<LastViewedProjectMutation, LastViewedProjectMutationVariables>;

/**
 * __useLastViewedProjectMutation__
 *
 * To run a mutation, you first call `useLastViewedProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLastViewedProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lastViewedProjectMutation, { data, loading, error }] = useLastViewedProjectMutation({
 *   variables: {
 *      project_id: // value for 'project_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useLastViewedProjectMutation(baseOptions?: Apollo.MutationHookOptions<LastViewedProjectMutation, LastViewedProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LastViewedProjectMutation, LastViewedProjectMutationVariables>(LastViewedProjectDocument, options);
      }
export type LastViewedProjectMutationHookResult = ReturnType<typeof useLastViewedProjectMutation>;
export type LastViewedProjectMutationResult = Apollo.MutationResult<LastViewedProjectMutation>;
export type LastViewedProjectMutationOptions = Apollo.BaseMutationOptions<LastViewedProjectMutation, LastViewedProjectMutationVariables>;
export const GetProjectDocument = gql`
    query GetProject($project_id: Float!, $team_id: Float) {
  getProject(project_id: $project_id, team_id: $team_id) {
    project_id
    role
    project {
      project_id
      name
      deadline
      status
      description
      user_id
      team_id
      lists {
        project_id
        list_id
        name
        order_index
        cards {
          card_id
          name
          deadline
          project_id
          list_id
          order_index
          links {
            link_id
            name
            url
            card_id
            project_id
          }
          messages {
            message_id
            content
            user_id
            card_id
            project_id
            data_of_creation
            username
          }
          todos {
            todo_id
            name
            done
            card_id
            project_id
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      project_id: // value for 'project_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
      }
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
export const GetProjectsDocument = gql`
    query GetProjects($sort_option: String!, $search: String, $team_id: Float) {
  getProjects(sort_option: $sort_option, search: $search, team_id: $team_id) {
    project_id
    name
    deadline
    status
    description
    user_id
    team_id
    last_updated
    team_name
  }
}
    `;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *      sort_option: // value for 'sort_option'
 *      search: // value for 'search'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($data: TeamInput!) {
  createTeam(data: $data) {
    team_id
    name
    description
    last_active
    user_count
    project_count
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const LastActiveTeamDocument = gql`
    mutation LastActiveTeam($team_id: Float!) {
  lastActiveTeam(team_id: $team_id)
}
    `;
export type LastActiveTeamMutationFn = Apollo.MutationFunction<LastActiveTeamMutation, LastActiveTeamMutationVariables>;

/**
 * __useLastActiveTeamMutation__
 *
 * To run a mutation, you first call `useLastActiveTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLastActiveTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lastActiveTeamMutation, { data, loading, error }] = useLastActiveTeamMutation({
 *   variables: {
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useLastActiveTeamMutation(baseOptions?: Apollo.MutationHookOptions<LastActiveTeamMutation, LastActiveTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LastActiveTeamMutation, LastActiveTeamMutationVariables>(LastActiveTeamDocument, options);
      }
export type LastActiveTeamMutationHookResult = ReturnType<typeof useLastActiveTeamMutation>;
export type LastActiveTeamMutationResult = Apollo.MutationResult<LastActiveTeamMutation>;
export type LastActiveTeamMutationOptions = Apollo.BaseMutationOptions<LastActiveTeamMutation, LastActiveTeamMutationVariables>;
export const GetTeamDocument = gql`
    query GetTeam($team_id: Float!) {
  getTeam(team_id: $team_id) {
    team_id
    name
    description
    last_active
    cons {
      con_id
      user_id
      username
      team_id
      confirmed
      role
    }
  }
}
    `;

/**
 * __useGetTeamQuery__
 *
 * To run a query within a React component, call `useGetTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamQuery({
 *   variables: {
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useGetTeamQuery(baseOptions: Apollo.QueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
      }
export function useGetTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
        }
export type GetTeamQueryHookResult = ReturnType<typeof useGetTeamQuery>;
export type GetTeamLazyQueryHookResult = ReturnType<typeof useGetTeamLazyQuery>;
export type GetTeamQueryResult = Apollo.QueryResult<GetTeamQuery, GetTeamQueryVariables>;
export const GetTeamsDocument = gql`
    query GetTeams {
  getTeams {
    teams {
      team_id
      name
      description
      last_active
      user_count
      project_count
    }
  }
}
    `;

/**
 * __useGetTeamsQuery__
 *
 * To run a query within a React component, call `useGetTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeamsQuery(baseOptions?: Apollo.QueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
      }
export function useGetTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
        }
export type GetTeamsQueryHookResult = ReturnType<typeof useGetTeamsQuery>;
export type GetTeamsLazyQueryHookResult = ReturnType<typeof useGetTeamsLazyQuery>;
export type GetTeamsQueryResult = Apollo.QueryResult<GetTeamsQuery, GetTeamsQueryVariables>;
export const CreateTodoDocument = gql`
    mutation CreateTodo($data: TodoInput!, $project_id: Float!, $card_id: Float!, $team_id: Float) {
  createTodo(
    data: $data
    project_id: $project_id
    card_id: $card_id
    team_id: $team_id
  ) {
    todo {
      todo_id
      name
      done
      card_id
      project_id
    }
    list_id
  }
}
    `;
export type CreateTodoMutationFn = Apollo.MutationFunction<CreateTodoMutation, CreateTodoMutationVariables>;

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      data: // value for 'data'
 *      project_id: // value for 'project_id'
 *      card_id: // value for 'card_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useCreateTodoMutation(baseOptions?: Apollo.MutationHookOptions<CreateTodoMutation, CreateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument, options);
      }
export type CreateTodoMutationHookResult = ReturnType<typeof useCreateTodoMutation>;
export type CreateTodoMutationResult = Apollo.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<CreateTodoMutation, CreateTodoMutationVariables>;
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($project_id: Float!, $todo_id: Float!, $team_id: Float) {
  deleteTodo(project_id: $project_id, todo_id: $todo_id, team_id: $team_id) {
    todo_id
    list_id
    card_id
  }
}
    `;
export type DeleteTodoMutationFn = Apollo.MutationFunction<DeleteTodoMutation, DeleteTodoMutationVariables>;

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      project_id: // value for 'project_id'
 *      todo_id: // value for 'todo_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useDeleteTodoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTodoMutation, DeleteTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, options);
      }
export type DeleteTodoMutationHookResult = ReturnType<typeof useDeleteTodoMutation>;
export type DeleteTodoMutationResult = Apollo.MutationResult<DeleteTodoMutation>;
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<DeleteTodoMutation, DeleteTodoMutationVariables>;
export const DoneTodoDocument = gql`
    mutation DoneTodo($done: Boolean!, $project_id: Float!, $todo_id: Float!, $team_id: Float) {
  doneTodo(
    done: $done
    project_id: $project_id
    todo_id: $todo_id
    team_id: $team_id
  ) {
    todo {
      todo_id
      name
      done
      card_id
      project_id
    }
    list_id
  }
}
    `;
export type DoneTodoMutationFn = Apollo.MutationFunction<DoneTodoMutation, DoneTodoMutationVariables>;

/**
 * __useDoneTodoMutation__
 *
 * To run a mutation, you first call `useDoneTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDoneTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [doneTodoMutation, { data, loading, error }] = useDoneTodoMutation({
 *   variables: {
 *      done: // value for 'done'
 *      project_id: // value for 'project_id'
 *      todo_id: // value for 'todo_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useDoneTodoMutation(baseOptions?: Apollo.MutationHookOptions<DoneTodoMutation, DoneTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DoneTodoMutation, DoneTodoMutationVariables>(DoneTodoDocument, options);
      }
export type DoneTodoMutationHookResult = ReturnType<typeof useDoneTodoMutation>;
export type DoneTodoMutationResult = Apollo.MutationResult<DoneTodoMutation>;
export type DoneTodoMutationOptions = Apollo.BaseMutationOptions<DoneTodoMutation, DoneTodoMutationVariables>;
export const EditTodoDocument = gql`
    mutation EditTodo($data: TodoInput!, $project_id: Float!, $todo_id: Float!, $team_id: Float) {
  editTodo(
    data: $data
    project_id: $project_id
    todo_id: $todo_id
    team_id: $team_id
  ) {
    todo {
      todo_id
      name
      done
      card_id
      project_id
    }
    list_id
  }
}
    `;
export type EditTodoMutationFn = Apollo.MutationFunction<EditTodoMutation, EditTodoMutationVariables>;

/**
 * __useEditTodoMutation__
 *
 * To run a mutation, you first call `useEditTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editTodoMutation, { data, loading, error }] = useEditTodoMutation({
 *   variables: {
 *      data: // value for 'data'
 *      project_id: // value for 'project_id'
 *      todo_id: // value for 'todo_id'
 *      team_id: // value for 'team_id'
 *   },
 * });
 */
export function useEditTodoMutation(baseOptions?: Apollo.MutationHookOptions<EditTodoMutation, EditTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditTodoMutation, EditTodoMutationVariables>(EditTodoDocument, options);
      }
export type EditTodoMutationHookResult = ReturnType<typeof useEditTodoMutation>;
export type EditTodoMutationResult = Apollo.MutationResult<EditTodoMutation>;
export type EditTodoMutationOptions = Apollo.BaseMutationOptions<EditTodoMutation, EditTodoMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      user_id
      email
      username
    }
    access_token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    user {
      user_id
      username
      email
    }
    access_token
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    user_id
    username
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;