const bcrypt = require('bcryptjs');


export async function encryptPassword(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

export async function comparePasswords(enteredPassword: string, hashedPassword: string): Promise<boolean> {
    try {
        const match = await bcrypt.compare(enteredPassword, hashedPassword);
        return match;
    } catch (error) {
        throw error;
    }
}
