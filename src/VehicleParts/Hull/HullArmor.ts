import { toStringArray, toNumber, toNumberArray } from '@Utils/xmlHelper'
import { IHull } from '@Types/Modules'

export function ReturnHull(rawJSON: any) {
   const hullData: IHull = {
      ammoRackHealth: { maxHealth: 0, maxRegenHealth: 0, repairCost: 0 },
      armor: [],
      weight: 0,
   }
   if (rawJSON?.hull) {
      const primaryArmors = toStringArray(rawJSON.hull?.primaryArmor)
      for (const armors of primaryArmors) {
         hullData.armor.push(rawJSON.hull.armor[armors])
      }
      for (const [key, value] of Object.entries(rawJSON.hull.ammoBayHealth)) {
         hullData.ammoRackHealth[key as keyof IHull['ammoRackHealth']] = toNumber(value) || 0
      }
      hullData.weight = toNumber(rawJSON.hull.weight) || 0
   }
   return hullData
}
