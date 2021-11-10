import { getSecurityByUserId } from '@services/securityService';

describe('securityService tests', () => {
  it('should get the users security', async () => {
    const userId = 2;
    const security = await getSecurityByUserId(userId);

    expect(security?.userId).toEqual(userId);
  });
});
