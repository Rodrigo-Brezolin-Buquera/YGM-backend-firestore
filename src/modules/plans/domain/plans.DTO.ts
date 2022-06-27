export interface PlanDTO {
    type: string
    frequency: string;
    availableClasses: number,
    durationInMonths: number,
    token: string
}

export interface PlanIdDTO {
    id: string,
    token: string  
}