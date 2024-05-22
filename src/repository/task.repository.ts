export interface ITasks {
    saveTask(res: any,  username: string, task_name: string, task_desc: string, limit_date: Date, task_level: string,): Promise<void> 
    findAllTasks(res: any, username: string): Promise<void>;
    deleteTask(res: any, username: string, task_name: string): Promise<void>;
    updateTask(res: any, username: string, old_task_name: string, new_task_name: string, new_task_desc: string, new_limit_date: Date, estado: string ,task_level: string): Promise<void>;
}