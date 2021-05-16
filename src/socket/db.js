class UsersList {
  constructor({ list }) {
    this.users = list;
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getUsersWithoutClient = this.getUsersWithoutClient.bind(this);
  }

  addUser (user) {
    this.users = [...this.users, user];
  }

  removeUser (userId) {
    this.users = this.users.filter(user => user.userId !== userId);
  }

  getUsers () {
    return this.users;
  }

  getUsersWithoutClient (userId) {
    return this.users.filter(user => user.userId !== userId);
  }
}

export const usersList = new UsersList({ list: [] });