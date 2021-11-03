export interface IUserRef {
  __typename: 'User';
  userId: string;
  languageId: string;
}

export interface ILanguageRef {
  __typename: 'Language';
  languageId: string;
}

export interface ICountryRef {
  __typename: 'Country';
  countryId: string;
}

export interface ISecurityRef {
  __typename: 'Security';
  securityId: string;
}

// [ADD NEW REFERENCE TYPES ABOVE] <- DO NOT REMOVE - Needed for the generator to create refs types seamlessly
