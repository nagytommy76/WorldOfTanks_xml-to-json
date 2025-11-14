import convertedJSON from '@Utils/convertedJson'
import { toNumber, toNumberArray } from '@Utils/xmlHelper'
import type { IShells } from '@/src/@Types/Modules'

import ReturnShells from '../Shells'

export default function ShellsData(value: any, nationDir: string, tankGunName: string) {
   const { convertedComponentJSON, fileName } = convertedJSON(nationDir, 'guns')

   const restGunData: { level: number; maxAmmo: number; weight: number; shells: IShells[] } = {
      level: 0,
      maxAmmo: 0,
      weight: 0,
      shells: [],
   }

   if (value['#text'] === 'shared' && convertedComponentJSON) {
      const sharedGun = convertedComponentJSON[fileName]
      for (const [gunName, guns] of Object.entries(sharedGun.shared as Record<string, any>)) {
         if (tankGunName === gunName) {
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
                  name: shellNames,
               })
            }
         }
      }
   }

   return restGunData
}
