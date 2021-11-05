export interface IProfileRef {
  __typename: 'Profile';
  profileId: string;
}

export interface IGroupRef {
  __typename: 'Group';
  groupId: string;
}

// [ADD NEW REFERENCE TYPES ABOVE] <- DO NOT REMOVE - Needed for the generator to create refs types seamlessly
