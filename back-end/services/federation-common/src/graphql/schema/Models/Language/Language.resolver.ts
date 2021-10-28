import { Language } from "@prisma/client";

import {
  getAllLanguages,
  getLanguageById,
} from "@src/services/languageService";

interface ILanguageRef {
  __typename: "Language";
  languageId: string;
}

interface IUserRef {
  __typename: "User";
  userId: string;
  languageId: string;
}

const resolver = {
  Query: {
    Language: async (_source, _args, _context, _info): Promise<Language[]> => {
      return await getAllLanguages();
    },
  },
  Language: {
    __resolveReference: async ({
      languageId,
    }: ILanguageRef): Promise<Language | null> =>
      await getLanguageById(parseInt(languageId)),
  },
};

export default resolver;
