import { AddContractDTO, ContractIdDTO, CreateContractDTO, EditContractDTO } from "./contracts.DTO";
import { Contract } from "./contracts.Entity";
import { CurrentContract } from "./contracts.Types";

export class ContractsMapper {

    public static toContract(obj: any): Contract {
        const result = new Contract(
          obj.id,
          obj.name,
          obj.closedContracts,
          obj.currentContract
        );
        return result;
      }

      public static toFireStoreContract(obj: Contract): any {
            return {
                id: obj.id,
                name: obj.name,
                closedContracts: obj.closedContracts,
                currentContract: obj.currentContract
            }
      }


      public static toContractIdDTO(req: any): ContractIdDTO {
        return { id:  req.params.id }        
      }

      public static toCreateContractDTO(req: any): CreateContractDTO {
        return { 
            email: req.body.email,
            name: req.body.name,
            plan: req.body.plan,
            date: req.body.date,
          };       
      }

      public static toEditContractDTO(req: any): EditContractDTO {
        return { 
            id: req.params.id,
            name: req.body.name,
            plan: req.body.plan,
            availableClasses: req.body.availableClasses,
            endDate: req.body.endDate,
            startDate: req.body.startDate,
            active: req.body.active,
          };     
      }

      public static toAddContractDTO(req: any): AddContractDTO {
        return { 
            id: req.params.id,
            plan: req.body.plan,
            date: req.body.date,
          };    
      }

    } 