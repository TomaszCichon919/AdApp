
// action name creator
const reducerName = 'users';
const createActionName = (name) => `app/${reducerName}/${name}`;

const LOG_IN = createActionName('LOG_IN');

const LOG_OUT = createActionName('LOG_OUT');


//action creator
export const logIn = payload => ({ payload, type: LOG_IN });
export const logOut = () => ({
    type:   LOG_OUT,
  });





const userReducer = (statePart = null, action) => {
    switch (action.type) {
        case LOG_IN:
            return action.payload;
            case LOG_OUT:
                return null;
       
        default:
            return statePart;
    }
};

export default userReducer;