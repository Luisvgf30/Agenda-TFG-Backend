export interface IEvents {
    saveEvent(res: any, username: string, event_name: string, event_desc: string, event_date: Date): Promise<void> 
    findAllEvents(res: any, username: string): Promise<void>;
    deleteEvent(res: any, username: string, event_name: string): Promise<void>;
    updateEvent(res: any, username: string,  old_event_name: string, new_event_name: string, new_event_desc: string, new_event_date: Date): Promise<void>;
}