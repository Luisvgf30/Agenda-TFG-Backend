export interface INotes {
    saveNote(res: any,username:string, note_desc: string): Promise<void> 
    findAllNotes(res: any, username: string): Promise<void>;
    deleteNote(res: any, username: string, id: string): Promise<void>;
}