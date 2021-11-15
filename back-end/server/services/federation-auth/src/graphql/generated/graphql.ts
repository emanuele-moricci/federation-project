import IPrismaContext from "@config/prismaConfig";
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  _Any: any;
};








/** A list of all the available authentication methods for the platform */
export enum AuthType {
  Password = 'PASSWORD',
  MfaCodes = 'MFA_CODES',
  Webauthn = 'WEBAUTHN'
}

export type Country = {
  __typename?: 'Country';
  countryId: Scalars['ID'];
  users?: Maybe<Array<Maybe<User>>>;
};


export type Language = {
  __typename?: 'Language';
  languageId: Scalars['ID'];
  users?: Maybe<Array<Maybe<User>>>;
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

export type Profile = {
  __typename?: 'Profile';
  profileId: Scalars['ID'];
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  _entities: Array<Maybe<_Entity>>;
  _service: _Service;
  /** Get all Users query */
  User?: Maybe<Array<Maybe<User>>>;
  /** Get me query */
  me?: Maybe<User>;
};


export type Query_EntitiesArgs = {
  representations: Array<Scalars['_Any']>;
};


export type QueryUserArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

/** A list of all the available roles that a user can have */
export enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

/** The Security Model: stores every detail about a user's security methods and data. */
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

/** The User Model: stores a user's most important data. */
export type User = {
  __typename?: 'User';
  /** user country */
  country?: Maybe<Country>;
  /** user language */
  language?: Maybe<Language>;
  /** user profile */
  profile?: Maybe<Profile>;
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
  /** user security settings */
  security?: Maybe<Security>;
  /** user firstname */
  firstname: Scalars['String'];
  /** user lastname */
  lastname: Scalars['String'];
  /** created at */
  created_at: Scalars['DateTime'];
  /** updated at */
  updated_at: Scalars['DateTime'];
  /** deleted row */
  deleted: Scalars['Boolean'];
};


export type _Entity = User | Security | Country | Language | Profile;

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
  /** The country id. */
  countryId: Scalars['Int'];
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
  Country: ResolverTypeWrapper<Country>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Language: ResolverTypeWrapper<Language>;
  Mutation: ResolverTypeWrapper<{}>;
  Profile: ResolverTypeWrapper<Profile>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Role: Role;
  Security: ResolverTypeWrapper<Security>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  User: ResolverTypeWrapper<User>;
  _Any: ResolverTypeWrapper<Scalars['_Any']>;
  _Entity: ResolversTypes['User'] | ResolversTypes['Security'] | ResolversTypes['Country'] | ResolversTypes['Language'] | ResolversTypes['Profile'];
  _Service: ResolverTypeWrapper<_Service>;
  loginInput: LoginInput;
  loginPayload: ResolverTypeWrapper<LoginPayload>;
  registerInput: RegisterInput;
  registerPayload: ResolverTypeWrapper<RegisterPayload>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Country: Country;
  ID: Scalars['ID'];
  DateTime: Scalars['DateTime'];
  Language: Language;
  Mutation: {};
  Profile: Profile;
  Query: {};
  Int: Scalars['Int'];
  Security: Security;
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  User: User;
  _Any: Scalars['_Any'];
  _Entity: ResolversParentTypes['User'] | ResolversParentTypes['Security'] | ResolversParentTypes['Country'] | ResolversParentTypes['Language'] | ResolversParentTypes['Profile'];
  _Service: _Service;
  loginInput: LoginInput;
  loginPayload: LoginPayload;
  registerInput: RegisterInput;
  registerPayload: RegisterPayload;
}>;

export type AuthDirectiveArgs = {  };

export type AuthDirectiveResolver<Result, Parent, ContextType = IPrismaContext, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ExtendsDirectiveArgs = {  };

export type ExtendsDirectiveResolver<Result, Parent, ContextType = IPrismaContext, Args = ExtendsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type RateLimitDirectiveArgs = {   limit?: Scalars['Int'];
  duration?: Scalars['Int']; };

export type RateLimitDirectiveResolver<Result, Parent, ContextType = IPrismaContext, Args = RateLimitDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CountryResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = ResolversObject<{
  countryId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type LanguageResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Language'] = ResolversParentTypes['Language']> = ResolversObject<{
  languageId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  login?: Resolver<Maybe<ResolversTypes['loginPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, never>>;
  register?: Resolver<Maybe<ResolversTypes['registerPayload']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, never>>;
}>;

export type ProfileResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = ResolversObject<{
  profileId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _entities?: Resolver<Array<Maybe<ResolversTypes['_Entity']>>, ParentType, ContextType, RequireFields<Query_EntitiesArgs, 'representations'>>;
  _service?: Resolver<ResolversTypes['_Service'], ParentType, ContextType>;
  User?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryUserArgs, 'take'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
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
  country?: Resolver<Maybe<ResolversTypes['Country']>, ParentType, ContextType>;
  language?: Resolver<Maybe<ResolversTypes['Language']>, ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  security?: Resolver<Maybe<ResolversTypes['Security']>, ParentType, ContextType>;
  firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface _AnyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['_Any'], any> {
  name: '_Any';
}

export type _EntityResolvers<ContextType = IPrismaContext, ParentType extends ResolversParentTypes['_Entity'] = ResolversParentTypes['_Entity']> = ResolversObject<{
  __resolveType: TypeResolveFn<'User' | 'Security' | 'Country' | 'Language' | 'Profile', ParentType, ContextType>;
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
  Country?: CountryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Language?: LanguageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Security?: SecurityResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  _Any?: GraphQLScalarType;
  _Entity?: _EntityResolvers<ContextType>;
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
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  extends?: ExtendsDirectiveResolver<any, any, ContextType>;
  rateLimit?: RateLimitDirectiveResolver<any, any, ContextType>;
}>;


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = IPrismaContext> = DirectiveResolvers<ContextType>;