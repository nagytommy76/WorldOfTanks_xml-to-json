import { toNumber, toNumberArray, toStringArray } from '@Utils/xmlHelper'
import { ITurrets } from '@Types/Modules'

function returnMainArmor(primaryArmor: string, armor: string) {
   const mainArmor = toStringArray(primaryArmor)
   mainArmor.map((armor) => {})
}

export default function ReturnTurrets(rawJSON: any): ITurrets[] {
   const turretData: ITurrets[] = []
   if (rawJSON?.turrets0) {
      for (const [key, value] of Object.entries(rawJSON.turrets0 as Record<string, any>)) {
         // turretData.push({
         //    armor: returnMainArmor(value.primaryArmor as string) || [],
         // })
      }
   }

   return turretData
}
