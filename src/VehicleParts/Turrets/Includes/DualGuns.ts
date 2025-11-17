import { toNumber, toNumberArray } from '@/src/utils/xmlHelper'
import type { IDualGun } from '@/src/@Types/Modules'

export default function ReturnDualGuns(gunDualGun: IDualGun): IDualGun {
   const dualGun = {} as IDualGun

   if (gunDualGun) {
      dualGun.chargeTime = toNumber(gunDualGun.chargeTime) || 0
      dualGun.shootImpulse = toNumber(gunDualGun.shootImpulse) || 0
      dualGun.reloadLockTime = toNumber(gunDualGun.reloadLockTime) || 0
      dualGun.reloadTimes = toNumberArray(gunDualGun.reloadTimes) || []
      dualGun.rateTime = toNumber(gunDualGun.rateTime) || 0
      dualGun.chargeThreshold = toNumber(gunDualGun.chargeThreshold) || 0
      dualGun.afterShotDelay = toNumber(gunDualGun.afterShotDelay) || 0
      dualGun.preChargeIndication = toNumber(gunDualGun.preChargeIndication) || 0
   }

   return dualGun
}
