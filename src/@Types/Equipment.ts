/**
 * @description Modifier values from XML -> kpi -> mul -> name/value
 */
export interface IModifier {
   name: string
   value: number | string
   specValue?: number
}

export interface IAggregateModifier extends IModifier {
   specValue?: number
   vehicleTypes?: string[]
}

export interface EquipmentOptions {
   id: number
   icon: string
   price: number
   name: string
   description: string
   displayName: string
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
