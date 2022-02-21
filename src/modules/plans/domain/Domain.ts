export class Plan {
    constructor(
       public readonly id: string,
       public readonly totalClasses: number,
       public readonly durationInMonths: number,
       public readonly frequency: string,
    ) { }

    public checkFrequency(frequency: string) {
        // if (!frequency) {
        //     throw new InvalidRequest
        // }
        // if (
        //     frequency !== FREQUENCY.ONE
        //     && frequency !== FREQUENCY.TWO
        //     && frequency !== FREQUENCY.THREE
        //     && frequency !== FREQUENCY.NONE
        // ) {
        //     throw new FrequencyError
        // }
        // return this
    }

    public checkDuration(duration: number) {
     
    }

    public checkClasses(classes: number) {
     
    }

    }