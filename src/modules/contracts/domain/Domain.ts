
import { CustomError } from "../../../common/customError/customError";
import { isValidDate } from "../../../common/services/moment";
import { closedContracts, currentContract } from "./Types";

export class Contract {
    constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly closedContracts: closedContracts[],
      public readonly currentContract: currentContract
    ) {}
  
    public checkId() {
      if(!this.id){
        throw CustomError.invalidRequest
      }
      return this;
    }

    public checkName() {
      if(!this.name){
        throw CustomError.invalidRequest
      }
    
      if(this.name.length < 5){
        throw CustomError.invalidName()
      }
      if(!this.name.includes(" ")){
        throw CustomError.invalidName()
      }
      return this;
    }
  
    public checkClosedContracts() {
      if( this.closedContracts.length !== 0 ) {
        this.closedContracts.forEach((contract)=> {
          if(!contract.plan) {
            throw new CustomError("plano inválido", 400)
          }
          // verificar se o plan segue o modelo correto

          isValidDate(contract.ended)
           
        })
      }
      return this;
    }
   
    public checkCurrentContract() {
     if(this.currentContract.availableClasses < 0){
       throw CustomError.invalidClassQuantity()
     }
     // verificar se o plan segue o modelo correto
     if(!this.currentContract.plan){
      throw new CustomError("plano inválido", 400)
    }
    isValidDate(this.currentContract.ends)
    isValidDate(this.currentContract.started)

    if(this.currentContract.checkins.length !==0){
      this.currentContract.checkins.forEach((checkin)=>{
        if(!checkin.id){
          throw new CustomError("Check-in sem id", 400)
        }
      })
    }
      return this;
    }

  }
  