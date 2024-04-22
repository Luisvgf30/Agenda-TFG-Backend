export interface IUsers {
    login(res: any, email: string): Promise<void>;
    saveUser(res: any, username: string, password: string): Promise<void> 
    // findAllUsers(res: any): Promise<void>;
    // deleteUser(res: any, email: string): Promise<void>;
    // updateUser(res: any, email: string, password: string, rol: string, carrito: null | undefined): Promise<void>;
}