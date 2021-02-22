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

    if (action.type === "SHOW_MESSAGES") {
        state = {
            ...state,
            messages: action.messages,
        };
    }
    if (action.type === "SEND_MESSAGE") {
        state = {
            ...state,
            text: action.text,
        };
    }
    if (action.type === "SHOW_NEW_MESSAGE") {
        state = {
            ...state,
            messages: [...state.messages, action.newMessage],
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
