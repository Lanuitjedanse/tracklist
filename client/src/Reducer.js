export function reducer(state = {}, action) {
    if (action.type === "SHOW_WANNABES") {
        state = {
            ...state,
            users: action.friendsList,
        };
    } else if (action.type === "SHOW_FRIENDS") {
        state = {
            ...state,
            users: state.users.map((friend) => {
                if (friend.id === action.id) {
                    return {
                        ...friend,
                        accepted: true,
                    };
                } else {
                    return friend;
                }
            }),
        };
    } else if (action.type === "END_FRIENDSHIP") {
        state = {
            ...state,
            users: state.users.map((friend) => {
                if (friend.id === action.id) {
                    return {
                        ...friend,
                        accepted: null,
                    };
                } else {
                    return friend;
                }
            }),
        };
    }
    return state;
}

//  if (action.type === "SHOW_WANNABES") {
//      state = {
//          ...state,
//          users: state.users.map((user) => {
//              if (user.id === action.id) {
//                  return {
//                      ...user,
//                      accepted: false,
//                  };
//              } else {
//                  return user;
//              }
//          }),
//      };
//  } else if (action.type === "SHOW_FRIENDS") {
//      state = {
//          ...state,
//          users: state.users.map((user) => {
//              if (user.id === action.id) {
//                  return {
//                      ...user,
//                      accepted: true,
//                  };
//              } else {
//                  return user;
//              }
//          }),
//      };
//  } else if (action.type === "END_FRIENDSHIP") {
//      state = {
//          ...state,
//          users: state.users.map((user) => {
//              if (user.id === action.id) {
//                  return {
//                      ...user,
//                      accepted: false,
//                  };
//              } else {
//                  return user;
//              }
//          }),
//      };
//  }
//  return state;
