export interface ITasks {
    saveTask(res: any, username: string, task_name: string, task_desc: string, limit_date: Date, document: string): Promise<void> 
    findAllTasks(res: any, username: string): Promise<void>;
    deleteTask(res: any, username: string, task_name: string): Promise<void>;
    updateTask(res: any): Promise<void>;
}