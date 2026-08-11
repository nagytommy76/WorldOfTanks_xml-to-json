import BaseEquipment from '@/Classes/BaseEquipment'
import type { DeviceTypes } from '@Types/Devices'
import type { EquipmentOptions } from '@Types/Equipment'
//https://api.worldoftanks.eu/wot/encyclopedia/provisions/?application_id=fefeeb22948e9ab6ed8c62a09515d476&type=optionalDevice
export default class Devices extends BaseEquipment {
   /**
    * @param {string} currencyName: crystal: Bond, equipCoin: components
    */
   price: { [currencyName: string]: number }
   /**
    * @param {string} deviceType booster, deluxe, modernized, tiers, trophy
    */
   deviceType: DeviceTypes
   /**
    * @param {number} vehicleLevel min and max, max is optional ( minLevel: TIER 5, maxLevel: TIER 11 )
    */
   vehicleLevel?: { min: number; max?: number }
   /**
    * @param {string} vehicleIncludeFilterTags if vehicleIncludeFilterTags (aimingStabilizer_class1_user aimingStabilizer_class2_user) installed cant be mounted
    */
   vehicleIncludeFilterTags?: string[]
   /**
    * @param {string} vehicleExcludeFilterTags can't be installed on wheeled and light tanks (deluxeStereoscope)
    */
   vehicleExcludeFilterTags?: string[]
   /**
    * @param {string} incompatibleTags if category ( turbocharger, healthReserve, coatedOptics etc ) installed cant be mounted
    */
   incompatibleTags?: string[]
   /**
    * @param {string} tags equipment name | Bounty, Bond or tiered device etc | effect on... firepover
    */
   tags?: string[]
   /**
    * @param {string} archeType Group of devices (extraHealthReserve)
    */
   archeType: string
   /**
    * @param {string[]} categories ONLY For TIERS_DEVICES slot (firepower mobility stealth survivability)
    */
   categories?: string[]
   /**
    * @param weight weight of device in kg
    */
   weight?: number

   constructor({
      icon,
      id,
      name,
      price,
      vehicleLevel,
      displayName,
      deviceType,
      archeType,
   }: Pick<EquipmentOptions, 'id' | 'icon' | 'name' | 'displayName'> & {
      price: { [currencyName: string]: number }
      vehicleLevel?: { min: number; max?: number }
      displayName: string
      deviceType: DeviceTypes
      archeType: string
   }) {
      super({ icon, id, name, displayName })
      this.price = price
      this.vehicleLevel = vehicleLevel
      this.displayName = displayName
      this.deviceType = deviceType
      this.archeType = archeType
   }

   private convertStringToStringArray(string: string) {
      if (!string) return
      const stringArray = string.split(' ')
      return stringArray
   }

   setVehicleIncludeFilterTags(vehicleFilterTags: string) {
      if (!vehicleFilterTags) return
      this.vehicleIncludeFilterTags = this.convertStringToStringArray(vehicleFilterTags)
   }
   setVehicleExcludeFilterTags(vehicleFilterTags: string) {
      if (!vehicleFilterTags) return
      this.vehicleExcludeFilterTags = this.convertStringToStringArray(vehicleFilterTags)
   }
   setIncompatibleTags(incompatibleTags: { installed: string }) {
      if (!incompatibleTags) return
      this.incompatibleTags = this.convertStringToStringArray(incompatibleTags.installed)
   }
   setTagsArray(tags: string) {
      if (!tags) return
      this.tags = this.convertStringToStringArray(tags)
   }
   setTiersCategories(categories: string) {
      const categoriesArray = this.convertStringToStringArray(categories)
      this.categories = categoriesArray
   }
   setWeight(weight: number) {
      this.weight = weight
   }
}
