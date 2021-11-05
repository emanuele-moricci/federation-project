export interface IGroupRef {
  __typename: 'Group';
  groupId: string;
}

export interface IProfileRef {
  __typename: 'Profile';
  profileId: string;
}

// [ADD NEW REFERENCE TYPES ABOVE] <- DO NOT REMOVE - Needed for the generator to create refs types seamlessly
