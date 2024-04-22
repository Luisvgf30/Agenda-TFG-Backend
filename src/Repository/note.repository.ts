export interface INotes {
    saveNote(res: any, note_desc: string): Promise<void> 
    findAllNotes(res: any): Promise<void>;
    deleteNote(res: any, id: string): Promise<void>;
    updateNote(res: any): Promise<void>;
}