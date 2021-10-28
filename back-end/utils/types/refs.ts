export interface ILanguageRef {
  __typename: "Language";
  languageId: string;
}

export interface IUserRef {
  __typename: "User";
  userId: string;
  languageId: string;
}

export interface ISecurityRef {
  __typename: "Security";
  securityId: string;
}
