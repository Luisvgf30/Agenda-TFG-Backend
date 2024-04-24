export interface IUsers {
    login(res: any, username: string, password: string): Promise<void>;
    saveUser(res: any, username: string, email: string, password: string): Promise<void> 
    updateUser(res: any, email: string, password: string, rol: string, carrito: null | undefined): Promise<void>;
}