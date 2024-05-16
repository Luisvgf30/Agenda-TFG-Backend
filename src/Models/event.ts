import { types } from './types';

export const Event = {
    properties: {
        id: {
            type: types.TEXT
        },
        event_name: {
            type: types.TEXT
        },
        event_desc: {
            type: types.TEXT
        },
        event_date: {
            type: types.DATE
        },
        username:{
            type: types.TEXT
        }
        
    },
    required: ["id", "task_name", "task_desc"]
}

export default Event;