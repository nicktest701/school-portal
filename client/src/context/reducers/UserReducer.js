const UserReducer = (state, action) => {
  switch (action.type) {
    case 'setLoading':
      return {
        ...state,
        isLoading: true,
      };
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
        isLoading: false,
        user: action.payload.user,
        session: action.payload.session,
      };
    case 'signOut':
      return {
        isLoading: false,
        user: {},
        session: {},
      };

    default:
      return state;
  }
};

export default UserReducer;
