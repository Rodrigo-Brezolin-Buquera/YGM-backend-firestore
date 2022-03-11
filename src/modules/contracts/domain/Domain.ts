
export class Contract {
    constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly closedContracts: any,
      public readonly currentContract: any

    ) {}
  
   
  
  
    public checkName() {
     
      return this;
    }
  
   
  }
  