import { toNumber } from '@/src/utils/xmlHelper'
import type { IDualAccuracy } from '@/src/@Types/Modules'

export default function RetunDualAccuracy(dualAccuracy: any) {
   const dualAccuracyData = {} as IDualAccuracy
   if (dualAccuracy) {
      dualAccuracyData.afterShotDispersionRadius = toNumber(dualAccuracy.afterShotDispersionRadius) || 0
      dualAccuracyData.coolingDelay = toNumber(dualAccuracy.coolingDelay) || 0
   }
   return dualAccuracyData
}
