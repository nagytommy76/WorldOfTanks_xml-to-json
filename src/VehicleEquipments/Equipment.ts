/**
 * @param {number} id provision_id from WG API
 * @param {string} icon icon name (use for find icons in public/icons folder (largeMedkit.jpg))
 * @param {number} price credit price
 * @param {string} name full name of the equipment (Manual Fire Extinguisher from WG API)
 * @param {string} description description of the equipment from WG API
 * @param {string} tag XML name of the equipment (largeMedkit, handExtinguishers ration_poland)
 */
export default class Equipment {
   id: number
   icon: string
   price: number
   name: string
   tag: string
   description: string
   declare test: number

   constructor(id: number, icon: string, price: number, name: string, description: string, tag: string) {
      this.id = id
      this.icon = icon
      this.price = price
      this.name = name
      this.description = description
      this.tag = tag
   }

   setTest() {
      this.test = 1
   }
}
