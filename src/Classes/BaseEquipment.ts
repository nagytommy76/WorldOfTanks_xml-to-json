import type { EquipmentOptions, IModifier, IAggregateModifier } from '@Types/Equipment'
import type { IKpiAggregateMul } from '@Types/Devices'

export default class BaseEquipment {
   id: number
   icon: string
   name: string
   /**
    * @param {string} displayName long name of the equipment from WG API "Improved Configuration"
    */
   displayName: string

   modifiers?: IModifier[]
   aggregateModifiers?: IAggregateModifier[]

   constructor({
      icon,
      id,
      name,
      displayName,
   }: Pick<EquipmentOptions, 'id' | 'icon' | 'name' | 'displayName'>) {
      this.id = id
      this.icon = icon
      this.name = name
      this.displayName = displayName
   }

   setModifiers(modifier: IModifier[] | IModifier) {
      const normalizedModifier = Array.isArray(modifier) ? modifier : [modifier]
      this.modifiers = []
      this.modifiers.push(
         ...normalizedModifier.map((m) => ({
            name: m.name,
            value: Number(m.value),
         })),
      )
   }

   setAggregateModifiers(aggregateModifiers: IKpiAggregateMul) {
      this.aggregateModifiers = []
      this.aggregateModifiers.push(
         ...aggregateModifiers.mul.map((m) => ({
            name: m.name,
            value: Number(m.value),
            specValue: m.specValue ? Number(m.specValue) : undefined,
            vehicleTypes: m.vehicleTypes ? m.vehicleTypes.split(' ') : undefined,
         })),
      )
   }
}
