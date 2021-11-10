import { getAllGroups, createGroup } from '@services/groupService';

describe('groupService tests', () => {
  it('should return every group', async () => {
    const groups = await getAllGroups({});
    expect(groups).toBeDefined();
    expect(groups.length).toBeGreaterThan(0);
  });

  it('should create a group', async () => {
    const name = 'Test Group';
    const bio = 'A test profile';
    const group = await createGroup({ name, bio });

    expect(group.name).toEqual(name);
    expect(group.bio).toEqual(bio);
  });
});
