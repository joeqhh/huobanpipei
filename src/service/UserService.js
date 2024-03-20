let currentUser = null;

export const setCurrentUserState = (user) => {
  currentUser = user;
};

export const getCurrentUserState = () => {
  return currentUser;
};
