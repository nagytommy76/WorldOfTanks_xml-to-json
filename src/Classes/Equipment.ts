import type { EquipmentOptions } from '@Types/Equipment'
import BaseEquipment from '@/Classes/BaseEquipment'

/**
 * @param {number} id provision_id from WG API
 * @param {string} icon icon name (use for find icons in public/icons folder (largeMedkit.jpg))
 * @param {number} price credit price
 * @param {string} name full name of the equipment (Manual Fire Extinguisher from WG API)
 * @param {string} description description of the equipment from WG API
 */
export default class Equipment extends BaseEquipment {
   price: number
   description: string

   nationFilter?: string

   constructor({ description, price, icon, id, name }: EquipmentOptions) {
      super({ icon, id, name })
      this.price = price
      this.description = description
   }
}
