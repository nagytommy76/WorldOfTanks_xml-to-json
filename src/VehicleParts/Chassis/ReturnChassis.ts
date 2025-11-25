import { toNumber, toNumberArray } from '@Utils/xmlHelper'
import { IChassis } from '@Types/Modules'

export function ReturnChassis(rawJSON: any): IChassis[] {
   const chassis: IChassis[] = [] as IChassis[]
   if (rawJSON?.chassis) {
      // FOR: WheelAngle in case of wheeled vehicles: EBR105 Lyny6*6 etc
      const physicsChassis = rawJSON.physics.chassis as { [chassisName: string]: any } | undefined
      for (const [key, value] of Object.entries(rawJSON.chassis as Record<string, any>)) {
         let wheelAngle: null | number = null
         if (physicsChassis && physicsChassis[key] && physicsChassis[key].axleSteeringLockAngles) {
            wheelAngle = toNumberArray(physicsChassis[key].axleSteeringLockAngles)[0]
         }
         const chassisName = key.split('_').slice(1)[1] || key
         chassis.push({
            price: toNumber(value.price) || 0,
            armor: value.armor?.leftTrack || value.trackPairParams?.armor?.leftTrack,
            level: toNumber(value.level) || 0,
            weight: toNumber(value.weight) || 0,
            terrainResistance: toNumberArray(value.terrainResistance),
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
            wheeled: false, // TODO: Find the isWheeled property if it exists
         })
      }
   }

   return chassis
}
