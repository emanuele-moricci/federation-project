const authGuard = ({ userData }): boolean => {
  return userData && Object.keys(userData).length > 0
    ? userData.userId !== null
    : false;
};

export default authGuard;
