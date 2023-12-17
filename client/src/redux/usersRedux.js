
// action name creator
const reducerName = 'users';
const createActionName = (name) => `app/${reducerName}/${name}`;

const LOG_IN = createActionName('LOG_IN');


//action creator
export const logIn = payload => ({ payload, type: LOG_IN });





const userReducer = (statePart = null, action) => {
    switch (action.type) {
        case LOG_IN:
            return action.payload;
        default:
            return statePart;
    }
};

export default userReducer;