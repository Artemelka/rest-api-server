export const GUEST = {
  createdAt: Date.now(),
  id: '',
  login: '',
  name: '',
  role: 'guest',
};

export const USER = {
  createdAt: Date.now(),
  role: 'user',
  name: 'Artemelka',
  login: 'artemelka.ru@gmail.com',
  id: '1',
};

export const ADMIN = {
  createdAt: Date.now(),
  role: 'admin',
  name: 'Artemelka-admin',
  login: 'admin@artemelka.ru',
  id: '2',
}

export const GUEST_RESPONSE = {
  isLogin: false,
  user: GUEST,
};

export const USER_RESPONSE = {
  isLogin: true,
  user: USER,
};

export const ADMIN_RESPONSE = {
  isLogin: true,
  user: ADMIN,
};

export const INITIAL_STATE = [
  USER_RESPONSE,
  ADMIN_RESPONSE,
];

function Auth() {
  let state = INITIAL_STATE;
  let idCounter = 2;

  function setState(nextState) {
    state = [...state, nextState];
  }

  function createGuest() {
    idCounter = idCounter + 1;

    return ({
      createdAt: Date.now(),
      role: 'guest',
      name: '',
      login: '',
      id: `${idCounter}`,
    });
  }

  this.init = (request, response) => {
    const targetUser = state.find(auth => auth.user.id === request.body.userId);

    if (targetUser) {
      response.json({ user: targetUser });
    }

    const newGuest = {
      isLogin: false,
      user: createGuest(),
    };

    setState(newGuest);

    response.json({ user: newGuest });
  };

  this.logIn = (request, response) => {
    const targetUser = state.find(auth => auth.user.id === request.body.userId);

    if (targetUser) {
      response.json({ user: targetUser });
    }

    response.json({
      isError: true,
      errorMessage: 'User not found',
      errorCode: 403,
    });
  };

  this.logOut = (request, response) => {
    response.json({ user: GUEST_RESPONSE });
  }

  return this;
}

export const AuthController = new Auth();