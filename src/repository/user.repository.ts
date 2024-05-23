export interface IUsers {
    login(res: any, username: string, password: string): Promise<void>;
    saveUser(res: any, username: string, email: string, password: string): Promise<void> 
    updateUser(res: any, email: string, username: string, password: string): Promise<void>;
    findByUsername(res: any, username: string): Promise<void>;
}