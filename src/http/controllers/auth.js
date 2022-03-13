import { AuthModel } from '../models/index.js';

const USER_NOT_FOUND_RESPONSE = {
  isError: true,
  errorMessage: 'User not found',
  errorCode: 403,
};

function Auth() {
  let idCounter = 2;

  function createGuestResponse() {
    idCounter = idCounter + 1;

    return ({
      isLogin: false,
      user: {
        createdAt: Date.now(),
        role: 'guest',
        name: '',
        login: '',
        id: `${idCounter}`,
      },
    });
  }

  this.init = async (request, response) => {
    try {
      const users = await AuthModel.get();

      const targetUser = users.find(auth => auth.user.id === request.body.userId);

      if (targetUser) {
        response.json({ user: targetUser });
        return;
      }

      response.json({ user: createGuestResponse() });
    } catch (error) {
      console.log('=== AuthModel init error ===', error);
      response.json({ user: createGuestResponse() });
    }
  };

  this.logIn = async (request, response) => {
    try {
      const users = await AuthModel.get();
      const targetUser = users.find(auth => auth.user.id === request.body.userId);

      if (targetUser) {
        response.json({ user: targetUser });
        return;
      }

      response.json(USER_NOT_FOUND_RESPONSE);
    } catch (error) {
      console.log('=== AuthModel logIn error ===', error);
      response.json(USER_NOT_FOUND_RESPONSE);
    }
  };

  this.logOut = (request, response) => {
    response.json({ user: createGuestResponse() });
  }

  return this;
}

export const AuthController = new Auth();