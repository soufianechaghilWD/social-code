export const initialState = {
    user: null,
    userInfo: null
};
const reducer = (state, action) => {
switch (action.type) {
  case "SET__USER":
    return {
      ...state,
      user: action.user
    }
  case "SET__USERINFO":
    return {
      ...state,
      userInfo: action.userInfo
    }
  default:
    return state;
}
};

export default reducer;