export interface MulXMLModifier {
   name: string
   value: string
}
interface IFieldModXML {
   id: number
   locName: string
   imgName?: string
   modifiers: {
      mul?: MulXMLModifier | MulXMLModifier[]
      add?: MulXMLModifier | MulXMLModifier[]
   }
   kpi: {
      mul?: MulXMLModifier | MulXMLModifier[]
      add?: MulXMLModifier | MulXMLModifier[]
   }
}

export type XMLFieldMods = {
   [roleName: string]: IFieldModXML
}

// ─────────────────────────────────────────────────────────────────────────────
// RAW TREE TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface RawAction {
   type: string
   value: string | number
}

export interface RawVehicleFilter {
   include?: {
      vehicle?: {
         minLevel?: number | string
         maxLevel?: number | string
      }
   }
}

export interface RawStep {
   id: string
   level: string
   price: string
   action: RawAction
   unlocks?: string // got 1 string e.g: '4' or 2 strings: '5 402' -> split them -> convert Number[]
   vehicleFilter?: RawVehicleFilter
}

export interface RawTree {
   id: number | string
   rootStep: number | string
   steps: {
      step: RawStep[] // always array due to isArray config
   }
}
