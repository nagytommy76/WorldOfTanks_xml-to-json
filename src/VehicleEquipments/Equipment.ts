/**
 * @description Modifier values from XML -> kpi -> mul -> name/value
 */
interface IModifier {
   name: string
   value: number | string
}

interface EquipmentOptions {
   id: number
   icon: string
   price: number
   name: string
   description: string
}

/**
 * @param {number} id provision_id from WG API
 * @param {string} icon icon name (use for find icons in public/icons folder (largeMedkit.jpg))
 * @param {number} price credit price
 * @param {string} name full name of the equipment (Manual Fire Extinguisher from WG API)
 * @param {string} description description of the equipment from WG API
 */
export default class Equipment {
   id: number
   icon: string
   price: number
   name: string
   description: string

   modifiers: IModifier[] = []
   nationFilter?: string

   constructor({ description, icon, id, name, price }: EquipmentOptions) {
      this.id = id
      this.icon = icon
      this.price = price
      this.name = name
      this.description = description
   }

   setModifiers(modifier: IModifier[] | IModifier) {
      const normalizedModifier = Array.isArray(modifier) ? modifier : [modifier]
      this.modifiers.push(
         ...normalizedModifier.map((m) => ({
            name: m.name,
            value: Number(m.value),
         })),
      )
   }
}
