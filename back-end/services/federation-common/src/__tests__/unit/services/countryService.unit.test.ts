import { getAllCountries, getCountryById } from '@services/countryService';

describe('countryService tests', () => {
  it('should get all countries', async () => {
    const countries = await getAllCountries({});

    expect(countries.length).toBeGreaterThan(0);
  });

  it('should get the italian country', async () => {
    const country = await getCountryById(2);

    expect(country?.alpha2).toEqual('AD');
  });
});
