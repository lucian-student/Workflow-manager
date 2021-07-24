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

export type Mutation = {
  __typename?: 'Mutation';
  createCard: Card;
  deleteCard: Scalars['ID'];
  editCard: Card;
  moveCard: Scalars['Boolean'];
  createLink: Link;
  deleteLink: Scalars['ID'];
  editLink?: Maybe<Link>;
  createList: List;
  deleteList: Scalars['ID'];
  editList: List;
  moveList: Scalars['Boolean'];
  createMessage: Message;
  deleteMessage: Scalars['ID'];
  editMessage: Message;
  createProject: Project;
  deleteProject: Scalars['ID'];
  editProject: Project;
  createTeam: Team;
  deleteTeam: Scalars['ID'];
  leaveTeam: Scalars['ID'];
  createTodo: Todo;
  deleteTodo: Scalars['ID'];
  editTodo?: Maybe<Todo>;
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


export type MutationCreateTeamArgs = {
  data: TeamInput;
};


export type MutationDeleteTeamArgs = {
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
  hello: Scalars['String'];
  me?: Maybe<User>;
  getUserTeamConnection?: Maybe<UserTeamConnection>;
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
  search?: Maybe<Scalars['String']>;
  sort_option: Scalars['String'];
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
};

export type TeamInput = {
  name: Scalars['String'];
  description: Scalars['String'];
};

export type Todo = {
  __typename?: 'Todo';
  todo_id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  done: Scalars['Boolean'];
  card_id: Scalars['ID'];
  card: Card;
  project_id: Scalars['ID'];
};

export type TodoInput = {
  name: Scalars['String'];
  description: Scalars['String'];
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
};

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
        & Pick<Todo, 'todo_id' | 'name' | 'description' | 'done' | 'card_id' | 'project_id'>
      )> }
    )> }
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
            & Pick<Todo, 'todo_id' | 'name' | 'description' | 'done' | 'card_id' | 'project_id'>
          )> }
        )> }
      )> }
    ) }
  ) }
);

export type GetProjectsQueryVariables = Exact<{
  sort_option: Scalars['String'];
  search?: Maybe<Scalars['String']>;
}>;


export type GetProjectsQuery = (
  { __typename?: 'Query' }
  & { getProjects: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'project_id' | 'name' | 'deadline' | 'status' | 'description' | 'user_id' | 'team_id' | 'last_updated' | 'team_name'>
  )> }
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
        description
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
            description
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
    query GetProjects($sort_option: String!, $search: String) {
  getProjects(sort_option: $sort_option, search: $search) {
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