import { toNumber } from '@/src/utils/xmlHelper'
import { ICamo } from '@Types/Modules'

export default function ReturnCamoValues(rawJSON: any) {
   const camoValues: ICamo = { moving: 0, stationary: 0, camoBonus: 0, firePenalty: 0 }
   if (rawJSON?.invisibility) {
      camoValues.moving = toNumber(rawJSON.invisibility?.moving) || 0
      camoValues.stationary = toNumber(rawJSON.invisibility?.still) || 0
      camoValues.camoBonus = toNumber(rawJSON.invisibility?.camouflageBonus) || 0
      camoValues.firePenalty = toNumber(rawJSON.invisibility?.firePenalty) || 0
   }
   return camoValues
}
