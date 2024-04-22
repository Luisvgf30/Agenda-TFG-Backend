export interface IEvents {
    saveEvent(res: any, event_name: string, event_desc: string, event_date: Date): Promise<void> 
    findAllEvents(res: any): Promise<void>;
    deleteEvent(res: any, event_name: string): Promise<void>;
    updateEvent(res: any): Promise<void>;
}