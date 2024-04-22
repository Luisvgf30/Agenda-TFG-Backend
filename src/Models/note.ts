import { types } from './types';

export const Note = {
    properties: {
        id: {
            type: types.TEXT
        },
        note_desc: {
            type: types.TEXT
        },
        note_date: {
            type: types.DATE
        }
        
    },
    required: ["id", "note_desc", "note_date"]
}

export default Note;