import { toNumber, toNumberArray, toStringArray } from '@Utils/xmlHelper'
import { ITurrets } from '@Types/Modules'

import ReturnGuns from './Guns'

function returnMainArmor(primaryArmor: string, armorArray: { [key: string]: string }): number[] {
   const mainArmor = toStringArray(primaryArmor)
   const primaryArmorValues: string[] = []
   mainArmor.map((armor) => {
      primaryArmorValues.push(armorArray[armor])
   })
   return toNumberArray(primaryArmorValues)
}

export default function ReturnTurrets(rawJSON: any): ITurrets[] {
   const turretData: ITurrets[] = []
   if (rawJSON?.turrets0) {
      for (const [key, value] of Object.entries(rawJSON.turrets0 as Record<string, any>)) {
         const guns = ReturnGuns(value.guns || [])
         console.log(guns[0])
         const primaryArmorValues = returnMainArmor(value.primaryArmor as string, value.armor)
         const chassisHealth = toNumber(rawJSON.hull.maxHealth) || 0
         const turretHealt = toNumber(value.maxHealth) || 0
         const vehicleMaxHealtWithTurret = chassisHealth + turretHealt
         // console.log(key)
         turretData.push({
            id: key,
            name: key,
            armor: primaryArmorValues,
            price: toNumber(value.price) || 0,
            level: toNumber(value.level) || 0,
            weight: toNumber(value.weight) || 0,
            traverse: toNumber(value.rotationSpeed) || 0,
            viewRange: toNumber(value.circularVisionRadius) || 0,

            ringHealth: {
               maxHealth: toNumber(value.turretRotatorHealth?.maxHealth) || 0,
               maxRegenHealth: toNumber(value.turretRotatorHealth?.maxRegenHealth) || 0,
               repairCost: toNumber(value.turretRotatorHealth?.repairCost) || 0,
            },
            viewportHealth: {
               maxHealth: toNumber(value.surveyingDeviceHealth?.maxHealth) || 0,
               maxRegenHealth: toNumber(value.surveyingDeviceHealth?.maxRegenHealth) || 0,
               repairCost: toNumber(value.surveyingDeviceHealth?.repairCost) || 0,
            },
            hp: vehicleMaxHealtWithTurret,
            guns,
         })
      }
   }

   return turretData
}
