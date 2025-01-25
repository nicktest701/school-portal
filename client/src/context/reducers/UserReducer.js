const UserReducer = (state, action) => {
  switch (action.type) {
    case 'setSchoolInfo':
      return {
        ...state,
        school_info: action.payload,
      };
    case 'setLoading':
      return {
        ...state,
        isPending: true,
      };
    case 'setSession':
      return {
        ...state,
        session: action.payload,
      };
    case 'unsetSession':
      return {
        ...state,
        session: {},
      };

    default:
      return state;
  }
};

export default UserReducer;
