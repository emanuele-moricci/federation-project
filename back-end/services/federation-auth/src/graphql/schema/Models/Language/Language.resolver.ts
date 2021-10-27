// import { Language } from '@src/graphql/generated/graphql'; TODO: FIX

import {
  getAllLanguages,
  getLanguageById,
} from '@src/services/languageService';
import { getUsersByLanguageId } from '@src/services/userService';

interface ILanguageRef {
  __typename: 'Language';
  languageId: number;
}

const resolver = {
  Query: {
    Language: async (_source, _args, _context, _info): Promise<any[]> => {
      return await getAllLanguages();
    },
  },
  Language: {
    _resolveReference: async ({ languageId }: ILanguageRef): Promise<any> => {
      return getLanguageById(languageId);
    },
    users({ languageId }: any): Promise<any[]> {
      return getUsersByLanguageId(languageId);
    },
  },
};

export default resolver;
