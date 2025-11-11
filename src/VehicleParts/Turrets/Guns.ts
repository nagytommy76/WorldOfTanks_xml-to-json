import { toNumber, toNumberArray } from '@Utils/xmlHelper'
import convertedJSON from '@Utils/convertedJson'

import { IGuns, IShells } from '@Types/Modules'

import ReturnShells from './Shells'

export default function ReturnGuns(gun: any, nationDir: string): IGuns[] {
   const { convertedComponentJSON, fileName } = convertedJSON(nationDir, 'guns')
   const gunsData: IGuns[] = []
   for (const [key, value] of Object.entries(gun as Record<string, any>)) {
      const restGunData: { level: number; maxAmmo: number; weight: number; shells: IShells[] } = {
         level: 0,
         maxAmmo: 0,
         weight: 0,
         shells: [],
      }
      if (value['#text'] === 'shared' && convertedComponentJSON) {
         const sharedGun = convertedComponentJSON[fileName]
         for (const [gunName, guns] of Object.entries(sharedGun.shared as Record<string, any>)) {
            if (key === gunName) {
               restGunData['level'] = toNumber(guns.level) || 0
               restGunData['maxAmmo'] = toNumber(guns.maxAmmo) || 0
               restGunData['weight'] = toNumber(guns.weight) || 0

               for (const shellNames of Object.keys(guns.shots)) {
                  const shells = ReturnShells(shellNames, nationDir)
                  restGunData['shells'].push({
                     ...shells,
                     defaultPortion: toNumber(guns.shots[shellNames].defaultPortion) || 0,
                     speed: toNumber(guns.shots[shellNames].speed) || 0,
                     gravity: toNumber(guns.shots[shellNames].gravity) || 0,
                     maxDistance: toNumber(guns.shots[shellNames].maxDistance) || 0,
                     piercingPower: toNumberArray(guns.shots[shellNames].piercingPower || []),
                  })
               }
            }
         }
      }
      gunsData.push({
         accuracy: toNumber(value.shotDispersionRadius) || 0,
         aimTime: toNumber(value.aimingTime) || 0,
         arc: toNumberArray(value.turretYawLimits || []),
         autoreload: null,
         burst: null,
         clip: null,
         depression: toNumber(value.depressionAngle) || 0,
         dispersion: {
            afterShot: toNumber(value.shotDispersionFactors?.afterShot) || 0,
            turretRotation: toNumber(value.shotDispersionFactors?.turretRotation) || 0,
            whileDamaged: toNumber(value.shotDispersionFactors?.whileGunDamaged) || 0,
         },
         dualAccuracy: null,
         dualGun: null,
         elevation: toNumber(value.elevation) || 0,
         elevationLimits: {
            elevation: toNumberArray(value.pitchLimits?.minPitch || []),
            depression: toNumberArray(value.pitchLimits?.maxPitch || []),
         },
         gunArc: toNumberArray(value.turretYawLimits || []),
         id: key,
         name: key,
         reloadTime: toNumber(value.reloadTime) || 0,
         twinGun: null,
         //   From guns.xml file
         ...restGunData,
      })
   }
   return gunsData
}
