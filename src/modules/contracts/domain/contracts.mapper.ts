import { AddContractDTO, ContractIdDTO, CreateContractDTO, EditContractDTO } from "./contracts.DTO";
import { Contract } from "./contracts.Entity";

export class ContractsMapper {

    public static toModelContract(obj: any): Contract {
        const result = new Contract(
          obj.id,
          obj.name,
          obj.closedContracts,
          obj.currentContract
        );
        return result;
      }

      public static toModelFireStoreContract(obj: Contract): any {
            return {
                id: obj.id,
                name: obj.name,
                closedContracts: obj.closedContracts,
                currentContract: obj.currentContract
            }
      }

      public static toModelContractIdDTO(obj: any): ContractIdDTO {
        return { id:  obj.id }        
      }

      public static toModelCreateContractDTO(obj: any): CreateContractDTO {
        return { 
            email: obj.email,
            name: obj.name,
            plan: obj.plan,
            date: obj.date,
          };       
      }

      public static toModelEditContractDTO(obj: any): EditContractDTO {
        return { 
            id: obj.params.id,
            name: obj.body.name,
            plan: obj.body.plan,
            availableClasses: obj.body.availableClasses,
            endDate: obj.body.endDate,
            startDate: obj.body.startDate,
            active: obj.body.active,
          };     
      }

      public static toModelAddContractDTO(obj: any): AddContractDTO {
        return { 
            id: obj.params.id,
            plan: obj.body.plan,
            date: obj.body.date,
          };    
      }

    } 