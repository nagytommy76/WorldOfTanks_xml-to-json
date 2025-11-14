import { toNumber, toNumberArray } from '@Utils/xmlHelper'

import { IGuns, IDualGun } from '@Types/Modules'

import burstClip from './Includes/burstClip'
import ShellsData from './Includes/ShellsData'

export default function ReturnGuns(gun: any, nationDir: string): IGuns[] {
   const gunsData: IGuns[] = []

   for (const [key, value] of Object.entries(gun as Record<string, any>)) {
      const { burst, clip } = burstClip(value)
      const restshellData = ShellsData(value, nationDir, key)

      const autoreload = { reloadTime: toNumberArray(value.autoreload?.reloadTime) }
      const twinGun = {
         afterShotDelay: toNumber(value.twinGun?.afterShotDelay) || 0,
         twinGunReloadTime: toNumber(value.twinGun?.twinGunReloadTime) || 0,
      }
      const dualGun: IDualGun = {
         chargeTime: toNumber(value.dualGun?.chargeTime) || 0,
         shootImpulse: toNumber(value.dualGun?.shootImpulse) || 0,
         reloadLockTime: toNumber(value.dualGun?.reloadLockTime) || 0,
         reloadTimes: toNumberArray(value.dualGun?.reloadTimes) || [],
         rateTime: toNumber(value.dualGun?.rateTime) || 0,
         chargeThreshold: toNumber(value.dualGun?.chargeThreshold) || 0,
         afterShotDelay: toNumber(value.dualGun?.afterShotDelay) || 0,
         preChargeIndication: toNumber(value.dualGun?.preChargeIndication) || 0,
      }

      gunsData.push({
         accuracy: toNumber(value.shotDispersionRadius) || 0,
         aimTime: toNumber(value.aimingTime) || 0,
         arc: toNumberArray(value.turretYawLimits || []),
         autoreload: autoreload.reloadTime.length > 0 ? autoreload : null,
         burst,
         clip,
         depression: toNumber(value.depressionAngle) || 0,
         dispersion: {
            afterShot: toNumber(value.shotDispersionFactors?.afterShot) || 0,
            turretRotation: toNumber(value.shotDispersionFactors?.turretRotation) || 0,
            whileDamaged: toNumber(value.shotDispersionFactors?.whileGunDamaged) || 0,
         },
         dualAccuracy: null,
         dualGun,
         elevation: toNumber(value.elevation) || 0,
         elevationLimits: {
            elevation: toNumberArray(value.pitchLimits?.minPitch || []),
            depression: toNumberArray(value.pitchLimits?.maxPitch || []),
         },
         gunArc: toNumberArray(value.turretYawLimits || []),
         id: key,
         name: key,
         reloadTime: toNumber(value.reloadTime) || 0,
         twinGun,
         //   From guns.xml file
         ...restshellData,
      })
   }
   return gunsData
}
