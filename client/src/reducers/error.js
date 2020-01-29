const defaultError = {};

export default function errorReducer(error = defaultError, action) {
    switch (action.type) {
        case 'error':
            return error = action.payload;
        default:
            return error;
    }
}