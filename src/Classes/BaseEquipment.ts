import type { EquipmentOptions, IModifier } from '@Types/Equipment'

export default class BaseEquipment {
   id: number
   icon: string
   name: string

   modifiers?: IModifier[]

   constructor({ icon, id, name }: Pick<EquipmentOptions, 'id' | 'icon' | 'name'>) {
      this.id = id
      this.icon = icon
      this.name = name
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
}
