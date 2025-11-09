import fs from 'fs'
import path from 'path'
import xmlParser from '@Utils/xmlParser'
import { toNumber, toNumberArray, toStringArray } from '@Utils/xmlHelper'

import { IGuns } from '@Types/Modules'

const filePath = path.join('./XML/components/guns.xml')
const xmlString = fs.readFileSync(filePath, 'utf-8')

const convertedGunJSON = xmlParser.parse(xmlString)

export default function ReturnGuns(gun: any): IGuns[] {
   const gunsData: IGuns[] = []
   for (const [key, value] of Object.entries(gun as Record<string, any>)) {
      if (value['#text'] === 'shared' && convertedGunJSON) {
         console.log(value['#text'])
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
         shells: [], // Needs to be implemented
         twinGun: null,
         //   From guns.xml file
         level: 0,
         maxAmmo: 0,
         weight: 0,
      })
   }
   return gunsData
}
