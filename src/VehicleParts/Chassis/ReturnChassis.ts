import { toNumber, toNumberArray } from '@Utils/xmlHelper'
import { IChassis } from '@Types/Modules'

import ReturnWheelAngles from './WheelAngles'
import EffectiveTerrain from './EffectiveTerrain'

export function ReturnChassis(rawJSON: any): IChassis[] {
   const chassis: IChassis[] = [] as IChassis[]
   if (rawJSON?.chassis) {
      const physicsChassis = rawJSON.physics.detailed.chassis as { [chassisName: string]: any } | undefined
      for (const [key, value] of Object.entries(rawJSON.chassis as Record<string, any>)) {
         const effectiveTerrainResistance = EffectiveTerrain(rawJSON.physics.detailed.chassis, key)
         const wheelAngle = ReturnWheelAngles(physicsChassis, key)
         const chassisName = key.split('_').slice(1)[1] || key

         chassis.push({
            price: toNumber(value.price) || 0,
            armor: value.armor?.leftTrack || value.trackPairParams?.armor?.leftTrack,
            level: toNumber(value.level) || 0,
            weight: toNumber(value.weight) || 0,
            terrainResistance: toNumberArray(value.terrainResistance),
            effectiveTerrainResistance:
               effectiveTerrainResistance === undefined
                  ? toNumberArray(value.terrainResistance)
                  : effectiveTerrainResistance,
            rotationSpeed: toNumber(value.rotationSpeed) || 0,
            maxHealth: toNumber(value.maxHealth) || 0,
            maxRegenHealth: toNumber(value.maxRegenHealth) || 0,
            repairTime: toNumber(value.repairTime) || 0,
            wheelAngle: wheelAngle || null,
            dispersion: {
               vehicleMovement: toNumber(value.shotDispersionFactors?.vehicleMovement) || 0,
               vehicleRotation: toNumber(value.shotDispersionFactors?.vehicleRotation) || 0,
            },
            id: key,
            name: chassisName,
            rotatesInPlace: value.rotationIsAroundCenter === 'true',
            wheeled: wheelAngle != null,
         })
      }
   }

   return chassis
}
