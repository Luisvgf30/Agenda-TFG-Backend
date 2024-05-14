import { types } from './types';

export const Task = {
    properties: {
        id: {
            type: types.TEXT
        },
        task_name: {
            type: types.TEXT
        },
        task_desc: {
            type: types.TEXT
        },
        state: {
            type: types.TEXT
        },
        limit_date: {
            type: types.DATE
        },
        initial_date: {
            type: types.DATE
        },
        username:{
            type: types.TEXT
        }
        
    },
    required: ["id", "task_name", "task_desc"]
}

export default Task;