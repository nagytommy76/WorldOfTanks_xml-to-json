import { toNumber } from '@Utils/xmlHelper'

import { IRocketAcceleration } from '@Types/Modules'

export default function ReturnRocketBoosers(rocketBoosers: any): IRocketAcceleration | null {
   if (!rocketBoosers) return null

   const modifications = Object.values(rocketBoosers.kpi)[0] as {
      name: string
      value: string
   }[]

   const booser = {
      deployTime: toNumber(rocketBoosers.deployTime) || 0,
      reloadTime: toNumber(rocketBoosers.reloadTime) || 0,
      reuseCount: toNumber(rocketBoosers.reuseCount) || 0,
      duration: toNumber(rocketBoosers.duration) || 0,
      vehicleEnginePower: toNumber(modifications[0].value) || 0,
      vehicleForwardMaxSpeed: toNumber(modifications[1].value) || 0,
      vehicleBackwardMaxSpeed: toNumber(modifications[2].value) || 0,
      vehicleAllGroundRotationSpeed: toNumber(modifications[3].value) || 0,
   } as IRocketAcceleration

   return booser
}
