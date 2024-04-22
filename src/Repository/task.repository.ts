export interface ITasks {
    saveTask(res: any, task_name: string, task_desc: string): Promise<void> 
    findAllTasks(res: any): Promise<void>;
    deleteTask(res: any, task_name: string): Promise<void>;
    updateTask(res: any): Promise<void>;
}