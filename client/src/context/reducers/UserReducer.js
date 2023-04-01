const UserReducer = (state, action) => {
  switch (action.type) {
    case 'setSession':
      return {
        ...state,
        isLoading: false,
        session: action.payload,
      };
    case 'unsetSession':
      return {
        ...state,
        isLoading: false,
        session: {},
      };
    case 'signIn':
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        session: action.payload.session,
      };
    case 'signOut':
      return {
        ...state,
        isLoading: false,
        user: {},
        session: {},
      };

    default:
      return state;
  }
};

export default UserReducer;
