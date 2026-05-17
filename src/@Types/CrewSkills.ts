export type DescriptionArgs = {
   situationalParam: string
   paramName: string
   measureType: string
   value: string
}

export type XMLSkills = {
   vsePerk: number
   crewLevelIncrease?: number
   UISettings: {
      tooltipSection: string
      typeName: string
      descr: {
         arg: DescriptionArgs | DescriptionArgs[]
      }
      params: {
         param: {
            name: string
            situationalParam: string
            value: number
         }[]
      }
      kpi: {
         add?: {
            name: string
            situationalKpi: string
            value: number
         }[]
         mul?: {
            name: string
            value: number
         }[]
      }
   }
}

export type XMLCrewSKills = {
   [skillName: string]: XMLSkills
}
