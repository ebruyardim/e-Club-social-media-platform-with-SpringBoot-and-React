class Auth {
  constructor() {
    this.authenticated = false;
    this.admin = false;
  }

  isAuthenticated() {
    if (Number.isNaN(parseInt(JSON.parse(localStorage.getItem("userId"))))) {
      this.authenticated = false;
    } else {
      this.authenticated = true;
    }
    return this.authenticated;
  }

  isAdmin() {
    if (Number.isNaN(parseInt(JSON.parse(localStorage.getItem("adminId"))))) {
      this.admin = false;
    } else {
      this.admin = true;
    }
    return this.admin;
  }
}

export default new Auth();
