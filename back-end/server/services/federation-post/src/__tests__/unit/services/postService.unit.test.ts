import {
  getAllPosts,
  getPostById,
  getPostsByProfileId,
  getPostsByGroupId,
  createPost,
} from '@services/postService';

describe('postService tests', () => {
  it('should return every post', async () => {
    const posts = await getAllPosts({});
    expect(posts).toBeDefined();
    expect(posts.length).toBeGreaterThan(0);
  });

  it('should get a post by id', async () => {
    const postId = 1;
    const post = await getPostById(postId);
    expect(post).toBeDefined();
    expect(post?.postId).toBe(postId);
  });

  it('should get posts by profile id', async () => {
    const profileId = 1;
    const posts = await getPostsByProfileId(profileId, {});
    expect(posts).toBeDefined();
    expect(posts.length).toBeGreaterThan(0);
  });

  it('should get posts by group id', async () => {
    const groupId = 1;
    const posts = await getPostsByGroupId(groupId, {});
    expect(posts).toBeDefined();
    expect(posts.length).toBeGreaterThan(0);
  });

  it('should create a post', async () => {
    const profileId = 1;
    const groupId = 1;
    const title = 'test title';
    const description = 'test description';
    const post = await createPost({
      profileId,
      groupId,
      title,
      description,
    });
    expect(post).toBeDefined();
    expect(post.profileId).toEqual(profileId);
    expect(post.groupId).toEqual(groupId);
    expect(post.title).toEqual(title);
    expect(post.description).toEqual(description);
  });
});
