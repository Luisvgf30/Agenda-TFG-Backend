export function getFormattedDate(): string {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0');  
    const year = date.getFullYear();
    const hours = '00';
    const minutes = '00';

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function getFormattedDate2(inputDate: Date): string {
    const day = String(inputDate.getDate()).padStart(2, '0');  
    const month = String(inputDate.getMonth() + 1).padStart(2, '0'); 
    const year = inputDate.getFullYear();  
    const hours = String(inputDate.getHours()).padStart(2, '0');  
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');  

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}
