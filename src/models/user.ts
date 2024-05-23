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
        },
        email: {
            type: types.TEXT
        },
        tasks: {
            type: types.ARRAY,
            items: {
                type: types.TASK
            }
        },
        notes: {
            type: types.ARRAY,
            items: {
                type: types.NOTE
            }
        },
        events: {
            type: types.ARRAY,
            items: {
                type: types.EVENT
            }
        }
        
    },
    required: ["id", "username", "password", "email"]
}

export default User;