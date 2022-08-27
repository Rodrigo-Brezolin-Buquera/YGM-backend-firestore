export interface PlanDTO {
    type: string
    frequency: string;
    availableClasses: number,
    durationInMonths: number,
    token: string,
    monthlyPayment: string
}

export interface EditPlanDTO {
    id: string,
    type: string
    frequency: string;
    availableClasses: number,
    durationInMonths: number,
    token: string,
    monthlyPayment: string
}

export interface PlanIdDTO {
    id: string,
    token: string  
}