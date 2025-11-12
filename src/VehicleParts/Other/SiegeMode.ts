import { toNumber } from '@/src/utils/xmlHelper'
import { ISiegeMode, IHydropneumatic } from '@Types/Modules'

export default function ReturnSiegeMode(rawJSON: any) {
   if (rawJSON?.siegeMode && rawJSON.hull_aiming?.pitch) {
      const siegeMode: ISiegeMode | null = { switchOffTime: 0, switchOnTime: 0 }
      const hydropneumatic: IHydropneumatic | null = { depression: 0, elevation: 0 }

      siegeMode.switchOffTime = toNumber(rawJSON.siege_mode?.switchOffTime) || 0
      siegeMode.switchOnTime = toNumber(rawJSON.siege_mode?.switchOnTime) || 0

      hydropneumatic.depression = toNumber(rawJSON.hull_aiming.pitch.wheelsCorrectionAngles.pitchMin) || 0
      hydropneumatic.elevation = toNumber(rawJSON.hull_aiming.pitch.wheelsCorrectionAngles.pitchMax) || 0
      return { siegeMode, hydropneumatic }
   } else {
      const siegeMode: ISiegeMode | null = null
      const hydropneumatic: IHydropneumatic | null = null
      return { siegeMode, hydropneumatic }
   }
}
