import {
  getAllUsers,
  getUserById,
  getUsersByLanguageId,
  getUserByEmailAndPassword,
  createUser,
} from '@services/userService';

describe('userService tests', () => {
  it('should get all users', async () => {
    const users = await getAllUsers({});

    expect(users.length).toBeGreaterThan(0);
  });

  it('should get a user', async () => {
    const userId = 2;
    const users = await getUserById(userId);

    expect(users?.userId).toEqual(userId);
  });

  it('should get every user with the ENG language', async () => {
    const languageId = 1;
    const users = await getUsersByLanguageId(languageId);

    users.forEach(u => expect(u.languageId).toEqual(languageId));
  });

  it('should get a user by email and password', async () => {
    const email = 'user@test.com';
    const password = 'User!120';
    const user = await getUserByEmailAndPassword(email, password);

    expect(user.email).toEqual(email);
    expect(user.password).toEqual('');
  });

  it('should create a user', async () => {
    const email = 'jest@test.com';
    const password = 'Jest!120';
    const languageId = 3;
    const firstname = '';
    const lastname = '';
    const user = await createUser({
      userId: 3,
      email: email,
      password: password,
      languageId: languageId,
      firstname: firstname,
      lastname: lastname,
    });

    expect(user.email).toEqual(email);
    expect(user.password).toEqual('');
    expect(user.languageId).toEqual(languageId);
    expect(user.firstname).toEqual(firstname);
    expect(user.lastname).toEqual(lastname);
  });
});
