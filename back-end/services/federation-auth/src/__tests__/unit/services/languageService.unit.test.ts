import { getAllLanguages, getLanguageById } from '@services/languageService';

describe('languageService tests', () => {
  it('should get all languages', async () => {
    const languages = await getAllLanguages();

    expect(languages.length).toBeGreaterThan(0);
  });

  it('should get the italian language', async () => {
    const language = await getLanguageById(2);

    expect(language?.code).toEqual('it');
  });
});
