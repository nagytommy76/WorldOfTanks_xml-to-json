import { toNumber } from '@/src/utils/xmlHelper'
import { ISiegeMode, IHydropneumatic } from '@Types/Modules'

export default function ReturnSiegeMode(rawJSON: any) {
   let siegeMode: ISiegeMode | null = { switchOffTime: 0, switchOnTime: 0 }
   if (rawJSON?.siegeMode) {
      siegeMode.switchOffTime = toNumber(rawJSON.siege_mode?.switchOffTime) || 0
      siegeMode.switchOnTime = toNumber(rawJSON.siege_mode?.switchOnTime) || 0

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
