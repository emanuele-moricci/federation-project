import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { IPrismaContext } from 'src/config/prisma/IPrismaContext';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};






export enum AuthType {
  Password = 'PASSWORD',
  MfaCodes = 'MFA_CODES',
  Webauthn = 'WEBAUTHN'
}


/** The Model that represents the Language DB Table */
export type Language = {
  __typename?: 'Language';
  /** language id */
  languageId: Scalars['ID'];
  /** language code */
  code: Scalars['String'];
  /** language name */
  name: Scalars['String'];
  /** language native */
  native: Scalars['String'];
  /** user security settings */
  users?: Maybe<Array<Maybe<User>>>;
  /** created at */
  created_at: Scalars['DateTime'];
  /** updated at */
  updated_at: Scalars['DateTime'];
  /** deleted row */
  deleted: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** login */
  login?: Maybe<LoginPayload>;
  /** register */
  register?: Maybe<RegisterPayload>;
};


export type MutationLoginArgs = {
  input?: Maybe<LoginInput>;
};


export type MutationRegisterArgs = {
  input?: Maybe<RegisterInput>;
};

export type Query = {
  __typename?: 'Query';
  _service: _Service;
  /** Get me query */
  me?: Maybe<User>;
  /** Get all Users query */
  User?: Maybe<Array<Maybe<User>>>;
  /** Get all Languages query */
  Language?: Maybe<Array<Maybe<Language>>>;
};


export type QueryUserArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

export enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

/** The Model that represents the Security DB Table */
export type Security = {
  __typename?: 'Security';
  /** security id */
  securityId: Scalars['ID'];
  /** security auth type */
  type: AuthType;
  /** security secret */
  secret: Scalars['String'];
  /** security recovery */
  recovery: Scalars['String'];
  /** security auxiliary */
  auxiliary: Scalars['String'];
  /** security metadata */
  metadata: Scalars['String'];
  /** security user */
  user?: Maybe<User>;
  /** id of the user */
  userId: Scalars['Int'];
  /** created at */
  created_at: Scalars['DateTime'];
  /** updated at */
  updated_at: Scalars['DateTime'];
  /** deleted row */
  deleted: Scalars['Boolean'];
};

/** The Model that represents the User DB Table */
export type User = {
  __typename?: 'User';
  /** user id */
  userId: Scalars['ID'];
  /** user email */
  email: Scalars['String'];
  /** user password */
  password: Scalars['String'];
  /** user auth token */
  token?: Maybe<Scalars['String']>;
  /** is user active now? */
  active: Scalars['Boolean'];
  /** user role */
  role: Role;
  /** user language */
  language?: Maybe<Language>;
  /** id of the language */
  languageId: Scalars['Int'];
  /** user security settings */
  security?: Maybe<Security>;
  /** user firstname */
  firstname: Scalars['String'];
  /** user lastname */
  lastname: Scalars['String'];
  /** user handle */
  username?: Maybe<Scalars['String']>;
  /** user phone */
  phone?: Maybe<Scalars['String']>;
  /** user address */
  address?: Maybe<Scalars['String']>;
  /** user avatar */
  avatar?: Maybe<Scalars['String']>;
  /** user banner */
  banner?: Maybe<Scalars['String']>;
  /** created at */
  created_at: Scalars['DateTime'];
  /** updated at */
  updated_at: Scalars['DateTime'];
  /** deleted row */
  deleted: Scalars['Boolean'];
};

export type _Service = {
  __typename?: '_Service';
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied */
  sdl?: Maybe<Scalars['String']>;
};

/** Login input */
export type LoginInput = {
  /** The user email. */
  email: Scalars['String'];
  /** The user password. */
  password: Scalars['String'];
};

/** Login payload */
export type LoginPayload = {
  __typename?: 'loginPayload';
  /** The user token. */
  token: Scalars['String'];
};

/** Register input */
export type RegisterInput = {
  /** The user email. */
  email: Scalars['String'];
  /** The user password. */
  password: Scalars['String'];
  /** The language id. */
  languageId: Scalars['Int'];
  /** The user first name. */
  firstname: Scalars['String'];
  /** The user last name. */
  lastname: Scalars['String'];
};

/** Register payload */
export type RegisterPayload = {
  __typename?: 'registerPayload';
  /** The user token. */
  token: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthType: AuthType;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Language: ResolverTypeWrapper<Language>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Role: Role;
  Security: ResolverTypeWrapper<Security>;
  User: ResolverTypeWrapper<User>;
  _Service: ResolverTypeWrapper<_Service>;
  loginInput: LoginInput;
  loginPayload: ResolverTypeWrapper<LoginPayload>;
  registerInput: RegisterInput;
  registerPayload: ResolverTypeWrapper<RegisterPayload>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  DateTime: Scalars['DateTime'];
  Language: Language;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Mutation: {};
  Query: {};
  Int: Scalars['Int'];
  Security: Security;
  User: User;
  _Service: _Service;
  loginInput: LoginInput;
  loginPayload: LoginPayload;
  registerInput: RegisterInput;
  registerPayload: RegisterPayload;
}>;

export type ExtendsDirectiveArgs = {  };

export type ExtendsDirectiveResolver<Result, Parent, ContextType = IPrismaContext, Args = ExtendsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type LanguageResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Language'] = ResolversParentTypes['Language']> = ResolversObject<{
  languageId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  native?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  login?: Resolver<Maybe<ResolversTypes['loginPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, never>>;
  register?: Resolver<Maybe<ResolversTypes['registerPayload']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, never>>;
}>;

export type QueryResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _service?: Resolver<ResolversTypes['_Service'], ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  User?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryUserArgs, never>>;
  Language?: Resolver<Maybe<Array<Maybe<ResolversTypes['Language']>>>, ParentType, ContextType>;
}>;

export type SecurityResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Security'] = ResolversParentTypes['Security']> = ResolversObject<{
  securityId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['AuthType'], ParentType, ContextType>;
  secret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  recovery?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  auxiliary?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['Language']>, ParentType, ContextType>;
  languageId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  security?: Resolver<Maybe<ResolversTypes['Security']>, ParentType, ContextType>;
  firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  banner?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _ServiceResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['_Service'] = ResolversParentTypes['_Service']> = ResolversObject<{
  sdl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoginPayloadResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['loginPayload'] = ResolversParentTypes['loginPayload']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RegisterPayloadResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['registerPayload'] = ResolversParentTypes['registerPayload']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = IPrismaContext> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  Language?: LanguageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Security?: SecurityResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  _Service?: _ServiceResolvers<ContextType>;
  loginPayload?: LoginPayloadResolvers<ContextType>;
  registerPayload?: RegisterPayloadResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = IPrismaContext> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = IPrismaContext> = ResolversObject<{
  extends?: ExtendsDirectiveResolver<any, any, ContextType>;
}>;


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = IPrismaContext> = DirectiveResolvers<ContextType>;