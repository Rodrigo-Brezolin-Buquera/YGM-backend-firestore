import { invalid } from "moment";
import { InvalidRequest, InvalidName, InvalidDate, CustomError } from "../../../common/customError/customError";
import { isValidDate } from "../../../common/services/DateCheck";
import { closedContracts, currentContract } from "./Types";

export class Contract {
    constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly closedContracts: closedContracts,
      public readonly currentContract: currentContract
    ) {}
  
    public checkId(id:string) {
      if(!id){
        throw new InvalidRequest
      }
      return this;
    }

    public checkName(name:string) {
      if(!name){
        throw new InvalidRequest
      }
      // testar esse daqui
      if(!isNaN(parseFloat(name))) {
        throw new InvalidName
      }
      if(name.length < 5){
        throw new InvalidName
      }
      if(!name.includes(" ")){
        throw new InvalidName
      }
      return this;
    }
  
    public checkClosedContracts(contracts: closedContracts[]) {
      if( contracts.length !== 0 ) {
        contracts.forEach((contract)=> {
          if(!contract.plan) {
            throw new CustomError("plano inválido", 400)
          }
          // verificar se o plan segue o modelo correto

          isValidDate(contract.ended)
           
        })
      }
      return this;
    }
   
    public checkCurrentContract(contract: currentContract) {
     if(contract.availableClasses < 0){
       throw new InvalidRequest 
     }
     // verificar se o plan segue o modelo correto
     if(!contract.plan){
      throw new CustomError("plano inválido", 400)
    }
    isValidDate(contract.ends)
    isValidDate(contract.started)

    if(contract.checkins.length !==0){
      contract.checkins.forEach((checkin)=>{
        if(!checkin.id){
          throw new CustomError("checkin sem id", 400)
        }
      })
    }
      return this;
    }

  }
  