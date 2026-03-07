/**
 * @description Modifier values from XML -> kpi -> mul -> name/value
 */
export interface IModifier {
   name: string
   value: number | string
}

export interface EquipmentOptions {
   id: number
   icon: string
   price: number
   name: string
   description: string
}

export interface IEquipment {
   id: number
   icon: string
   price: number
   name: string
   description: string

   modifiers: IModifier[]
   nationFilter?: string
}
