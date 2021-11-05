import {
  CreateProfilePayload,
  CreateProfileInput,
} from '@src/graphql/generated/graphql';
import { createProfile } from '@src/services/profileService';

const resolver = {
  Mutation: {
    createProfile: async (
      _,
      { input }: { input: CreateProfileInput }
    ): Promise<CreateProfilePayload> => {
      const { profileId } = await createProfile(input);

      return { profileId };
    },
  },
};

export default resolver;
