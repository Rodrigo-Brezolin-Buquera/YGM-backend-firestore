export interface ChangeEntity {
    key: string,
    value: UpdateAction, 
    collection: string
}

export enum UpdateAction  {
 ADD= 1,
 SUBTRACT= -1
}