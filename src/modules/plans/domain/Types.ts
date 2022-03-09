export enum FREQUENCY {
    ONE = "1x",
    TWO = "2x",
    THREE = "3x",
    NONE = "---"
 }
 
 export enum TYPE {
    MONTHLY = "Mensal",
    QUARTERLY = "Trimestral",
    SEMIANNUAL = "Semestral",
    SINGLE = "Avulsa",
    APP = "Gympass"
 }




export interface planDTO {
    type: string
    frequency: string;
    availableClasses: number;
    durationInMonths: number
}
