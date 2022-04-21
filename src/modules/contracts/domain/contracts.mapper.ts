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

      public static toModelContractIdDTO(req: any): ContractIdDTO {
        return { id:  req.params.id }        
      }

      public static toModelCreateContractDTO(req: any): CreateContractDTO {
        return { 
            email: req.body.email,
            name: req.body.name,
            plan: req.body.plan,
            date: req.body.date,
          };       
      }

      public static toModelEditContractDTO(req: any): EditContractDTO {
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

      public static toModelAddContractDTO(req: any): AddContractDTO {
        return { 
            id: req.params.id,
            plan: req.body.plan,
            date: req.body.date,
          };    
      }

    } 