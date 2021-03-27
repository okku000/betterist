import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: "Query";
  currentDailyObjective: DailyObjective;
  previousDailyObjective: DailyObjective;
  hello: Scalars["String"];
  monthlyObjectivesInthisMonth: Array<MonthlyObjective>;
  me?: Maybe<User>;
};

export type DailyObjective = {
  __typename?: "DailyObjective";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  user: User;
  objectives: Array<Objective>;
};

export type User = {
  __typename?: "User";
  id: Scalars["Float"];
  username: Scalars["String"];
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type Objective = {
  __typename?: "Objective";
  id: Scalars["Float"];
  title: Scalars["String"];
  isComplete: Scalars["Boolean"];
  monthlyObjective: MonthlyObjective;
  user: User;
  dailyObjective: DailyObjective;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type MonthlyObjective = {
  __typename?: "MonthlyObjective";
  id: Scalars["Float"];
  title: Scalars["String"];
  user: User;
  objectives: Objective;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createBetterist: Betterist;
  createDailyObjective: DailyObjective;
  createMonthlyObjective: MonthlyObjective;
  createObjectives?: Maybe<Array<Objective>>;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars["Boolean"];
  changePassword: UserResponse;
  forgotPassword: Scalars["Boolean"];
};

export type MutationCreateMonthlyObjectiveArgs = {
  title: Scalars["String"];
};

export type MutationRegisterArgs = {
  options: RegisterInput;
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  usernameOrEmail: Scalars["String"];
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars["String"];
  token: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type Betterist = {
  __typename?: "Betterist";
  id: Scalars["Float"];
  evaluator: User;
  submitter: User;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type RegisterInput = {
  username: Scalars["String"];
  password: Scalars["String"];
  email: Scalars["String"];
};

export type RegularErrorFragment = { __typename?: "FieldError" } & Pick<
  FieldError,
  "field" | "message"
>;

export type RegularUserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username"
>;

export type RegularUserResponseFragment = { __typename?: "UserResponse" } & {
  errors?: Maybe<Array<{ __typename?: "FieldError" } & RegularErrorFragment>>;
  user?: Maybe<{ __typename?: "User" } & RegularUserFragment>;
};

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars["String"];
  newPassword: Scalars["String"];
}>;

export type ChangePasswordMutation = { __typename?: "Mutation" } & {
  changePassword: { __typename?: "UserResponse" } & RegularUserResponseFragment;
};

export type CreateBetteristMutationVariables = Exact<{ [key: string]: never }>;

export type CreateBetteristMutation = { __typename?: "Mutation" } & {
  createBetterist: { __typename?: "Betterist" } & {
    evaluator: { __typename?: "User" } & Pick<User, "id" | "username">;
  };
};

export type CreateObjectivesMutationVariables = Exact<{ [key: string]: never }>;

export type CreateObjectivesMutation = { __typename?: "Mutation" } & {
  createObjectives?: Maybe<
    Array<
      { __typename?: "Objective" } & Pick<
        Objective,
        "id" | "title" | "isComplete"
      >
    >
  >;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "forgotPassword"
>;

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login: { __typename?: "UserResponse" } & RegularUserResponseFragment;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type MonthlyObjectivesInthisMonthQueryVariables = Exact<{
  [key: string]: never;
}>;

export type MonthlyObjectivesInthisMonthQuery = { __typename?: "Query" } & {
  monthlyObjectivesInthisMonth: Array<
    { __typename?: "MonthlyObjective" } & Pick<MonthlyObjective, "id" | "title">
  >;
};

export type RegisterMutationVariables = Exact<{
  options: RegisterInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "UserResponse" } & RegularUserResponseFragment;
};

export type CurerntDailyObjectiveQueryVariables = Exact<{
  [key: string]: never;
}>;

export type CurerntDailyObjectiveQuery = { __typename?: "Query" } & {
  currentDailyObjective: { __typename?: "DailyObjective" } & {
    objectives: Array<
      { __typename?: "Objective" } & Pick<
        Objective,
        "id" | "title" | "isComplete"
      >
    >;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & RegularUserFragment>;
};

export type PreviousDailyObjectiveQueryVariables = Exact<{
  [key: string]: never;
}>;

export type PreviousDailyObjectiveQuery = { __typename?: "Query" } & {
  previousDailyObjective: { __typename?: "DailyObjective" } & {
    objectives: Array<
      { __typename?: "Objective" } & Pick<
        Objective,
        "id" | "title" | "isComplete"
      >
    >;
  };
};

export const RegularErrorFragmentDoc = gql`
  fragment RegularError on FieldError {
    field
    message
  }
`;
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    username
  }
`;
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on UserResponse {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($token: String!, $newPassword: String!) {
    changePassword(token: $token, newPassword: $newPassword) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useChangePasswordMutation() {
  return Urql.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument);
}
export const CreateBetteristDocument = gql`
  mutation CreateBetterist {
    createBetterist {
      evaluator {
        id
        username
      }
    }
  }
`;

export function useCreateBetteristMutation() {
  return Urql.useMutation<
    CreateBetteristMutation,
    CreateBetteristMutationVariables
  >(CreateBetteristDocument);
}
export const CreateObjectivesDocument = gql`
  mutation CreateObjectives {
    createObjectives {
      id
      title
      isComplete
    }
  }
`;

export function useCreateObjectivesMutation() {
  return Urql.useMutation<
    CreateObjectivesMutation,
    CreateObjectivesMutationVariables
  >(CreateObjectivesDocument);
}
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export function useForgotPasswordMutation() {
  return Urql.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument);
}
export const LoginDocument = gql`
  mutation Login($usernameOrEmail: String!, $password: String!) {
    login(usernameOrEmail: $usernameOrEmail, password: $password) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
export const MonthlyObjectivesInthisMonthDocument = gql`
  query MonthlyObjectivesInthisMonth {
    monthlyObjectivesInthisMonth {
      id
      title
    }
  }
`;

export function useMonthlyObjectivesInthisMonthQuery(
  options: Omit<
    Urql.UseQueryArgs<MonthlyObjectivesInthisMonthQueryVariables>,
    "query"
  > = {}
) {
  return Urql.useQuery<MonthlyObjectivesInthisMonthQuery>({
    query: MonthlyObjectivesInthisMonthDocument,
    ...options,
  });
}
export const RegisterDocument = gql`
  mutation Register($options: RegisterInput!) {
    register(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const CurerntDailyObjectiveDocument = gql`
  query CurerntDailyObjective {
    currentDailyObjective {
      objectives {
        id
        title
        isComplete
      }
    }
  }
`;

export function useCurerntDailyObjectiveQuery(
  options: Omit<
    Urql.UseQueryArgs<CurerntDailyObjectiveQueryVariables>,
    "query"
  > = {}
) {
  return Urql.useQuery<CurerntDailyObjectiveQuery>({
    query: CurerntDailyObjectiveDocument,
    ...options,
  });
}
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUser
    }
  }
  ${RegularUserFragmentDoc}
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
export const PreviousDailyObjectiveDocument = gql`
  query PreviousDailyObjective {
    previousDailyObjective {
      objectives {
        id
        title
        isComplete
      }
    }
  }
`;

export function usePreviousDailyObjectiveQuery(
  options: Omit<
    Urql.UseQueryArgs<PreviousDailyObjectiveQueryVariables>,
    "query"
  > = {}
) {
  return Urql.useQuery<PreviousDailyObjectiveQuery>({
    query: PreviousDailyObjectiveDocument,
    ...options,
  });
}
