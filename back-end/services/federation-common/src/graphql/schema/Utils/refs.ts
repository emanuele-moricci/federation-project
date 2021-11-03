export interface ILanguageRef {
  __typename: 'Language';
  languageId: string;
}

export interface ICountryRef {
  __typename: 'Country';
  countryId: string;
}

// [ADD NEW REFERENCE TYPES ABOVE] <- DO NOT REMOVE - Needed for the generator to create refs types seamlessly
