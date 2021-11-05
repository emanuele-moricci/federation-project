import {
  createProfile,
  getProfileById,
  joinGroup,
} from '@services/profileService';

describe('profileService tests', () => {
  it('should return a profile', async () => {
    const profileId = 1;
    const profile = await getProfileById(profileId);
    expect(profile?.profileId).toEqual(profileId);
  });

  it('should create a profile', async () => {
    const bio = 'A test profile';
    const username = 'tst_prof';
    const phone = '+39 101 010 101';
    const address = 'Via test, 4';
    const banner = 'test';
    const profile = await createProfile({
      bio,
      username,
      phone,
      address,
      banner,
    });

    expect(profile.bio).toEqual(bio);
    expect(profile.username).toEqual(username);
    expect(profile.phone).toEqual(phone);
    expect(profile.address).toEqual(address);
    expect(profile.banner).toEqual(banner);
  });

  it('should join a group', async () => {
    const profileId = 1;
    const groupId = 5;
    const profile = await joinGroup(profileId, groupId);

    expect(profile.profileId).toEqual(profileId);
  });
});
