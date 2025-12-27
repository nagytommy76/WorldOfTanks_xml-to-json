import { toNumber } from '@/src/utils/xmlHelper'
import { ISiegeMode, IHydropneumatic } from '@Types/Modules'

export default function ReturnSiegeMode(rawJSON: any) {
   let siegeMode: any | null = {}
   if (rawJSON?.siege_mode) {
      for (const [key, siegeValue] of Object.entries(rawJSON.siege_mode)) {
         siegeMode[key] = toNumber(siegeValue) || siegeValue || 0
      }

      return siegeMode
   } else {
      siegeMode = null

      return siegeMode
   }
}

export function ReturnHydropneumatic(rawJSON: any) {
   let hydropneumatic: IHydropneumatic | null = { depression: 0, elevation: 0 }
   if (rawJSON.hull_aiming?.pitch) {
      hydropneumatic.depression = toNumber(rawJSON.hull_aiming.pitch.wheelsCorrectionAngles.pitchMin) || 0
      hydropneumatic.elevation = toNumber(rawJSON.hull_aiming.pitch.wheelsCorrectionAngles.pitchMax) || 0
   } else {
      hydropneumatic = null
   }
   return hydropneumatic
}
