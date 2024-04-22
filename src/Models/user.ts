import { types } from './types';

export const User = {
    properties: {
        id: {
            type: types.TEXT
        },
        username: {
            type: types.TEXT
        },
        password: {
            type: types.TEXT
        }
    },
    required: ["id", "username", "password"]
}

export default User;