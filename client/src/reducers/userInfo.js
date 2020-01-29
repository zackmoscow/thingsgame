const defaultUserInfo = {};

export default function userInfoReducer(userInfo = defaultUserInfo, action) {
    switch (action.type) {
        case 'userInfo':
            return userInfo = action.payload;
        default:
            return userInfo
    }
}