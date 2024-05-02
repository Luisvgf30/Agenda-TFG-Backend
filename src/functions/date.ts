export function getFormattedDate(): string {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');  // Obtener día y agregar cero al inicio si es necesario
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Obtener mes (los meses en JavaScript se cuentan desde 0)
    const year = date.getFullYear();  // Obtener año
    const hours = '00';
    const minutes = '00';

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function getFormattedDate2(inputDate: Date): string {
    const day = String(inputDate.getDate()).padStart(2, '0');  // Obtener día y agregar cero al inicio si es necesario
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');  // Obtener mes (los meses en JavaScript se cuentan desde 0)
    const year = inputDate.getFullYear();  // Obtener año
    const hours = String(inputDate.getHours()).padStart(2, '0');  // Obtener horas y agregar cero al inicio si es necesario
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');  // Obtener minutos y agregar cero al inicio si es necesario

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}
