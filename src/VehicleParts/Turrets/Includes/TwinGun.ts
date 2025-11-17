import { toNumber } from '@/src/utils/xmlHelper'
import type { ITwinGun } from '@/src/@Types/Modules'

export default function ReturnTwinGun(gunTwinGun: ITwinGun): ITwinGun {
   const twinGun = {} as ITwinGun
   if (gunTwinGun) {
      twinGun.afterShotDelay = toNumber(gunTwinGun.afterShotDelay) || 0
      twinGun.twinGunReloadTime = toNumber(gunTwinGun.twinGunReloadTime) || 0
   }

   return twinGun
}
