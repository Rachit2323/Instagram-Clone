
const initialState = {
  message: '',
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      return { ...state, message: action.payload, error: '' };
    case 'SIGNUP_ERROR':
      return { ...state, error: action.payload, message: '' };
    default:
      return state;
  }
};

export default authReducer;
