interface Credentials {
  username: string,
  password: string
};

interface SignInUserSuccess {
  username: string,
  token: string
};

interface SignInUserFailure {
  response: {
    data: {
      errorMessage: string
    }     
  }
};

export {
  Credentials,
  SignInUserFailure,
  SignInUserSuccess
};