import { toNumber, toNumberArray } from '@Utils/xmlHelper'

import type { IGuns } from '@Types/Modules'

import burstClip from './Includes/burstClip'
import ShellsData from './Includes/ShellsData'
import ReturnDualGuns from './Includes/DualGuns'
import ReturnTwinGun from './Includes/TwinGun'

export default function ReturnGuns(gun: any, nationDir: string): IGuns[] {
   const gunsData: IGuns[] = []

   for (const [key, value] of Object.entries(gun as Record<string, any>)) {
      const { burst, clip } = burstClip(value)
      const restshellData = ShellsData(nationDir, key)

      const autoreload = { reloadTime: toNumberArray(value.autoreload?.reloadTime) }
      const dualGun = ReturnDualGuns(value.dualGun)
      const twinGun = ReturnTwinGun(value.twinGun)

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
         dualGun: Object.keys(dualGun).length > 0 ? dualGun : null,
         elevation: toNumber(value.elevation) || 0,
         elevationLimits: {
            elevation: toNumberArray(value.pitchLimits?.minPitch || []),
            depression: toNumberArray(value.pitchLimits?.maxPitch || []),
         },
         gunArc: toNumberArray(value.turretYawLimits || []),
         id: key,
         name: key,
         reloadTime: toNumber(value.reloadTime) || 0,
         twinGun: Object.keys(twinGun).length > 0 ? twinGun : null,
         //   From guns.xml file
         ...restshellData,
      })
   }
   return gunsData
}
