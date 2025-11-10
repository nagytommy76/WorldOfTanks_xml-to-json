import { toNumber } from '@/src/utils/xmlHelper'

import { ISpeedLimit } from '@Types/Modules'

export default function ReturnSpeedLimits(rawJSON: any): ISpeedLimit {
   const speedLimits: ISpeedLimit = { backward: 0, forward: 0 }
   if (rawJSON?.speedLimits) {
      speedLimits.forward = toNumber(rawJSON.speedLimits.forward) || 0
      speedLimits.backward = toNumber(rawJSON.speedLimits.backward) || 0
   }
   return speedLimits
}
