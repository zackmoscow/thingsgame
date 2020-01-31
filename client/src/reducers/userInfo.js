export default function userInfoReducer(userInfo = {}, action) {
    switch (action.type) {
        case 'userInfo':
            return userInfo = action.payload;
        default:
            return userInfo
    }
}