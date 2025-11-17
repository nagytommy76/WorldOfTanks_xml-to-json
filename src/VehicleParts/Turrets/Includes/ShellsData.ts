import convertedJSON from '@Utils/convertedJson'
import { toNumber, toNumberArray } from '@Utils/xmlHelper'
import type { IDualAccuracy, IShells } from '@/src/@Types/Modules'

import ReturnShells from '../Shells'
import RetunDualAccuracy from './DualAccuracy'

interface IRestGunData {
   level: number
   maxAmmo: number
   weight: number
   shells: IShells[]
   dualAccuracy: IDualAccuracy | null
}

export default function ShellsData(value: any, nationDir: string, tankGunName: string) {
   const { convertedComponentJSON, fileName } = convertedJSON(nationDir, 'guns')

   const restGunData: IRestGunData = {} as IRestGunData

   if (value['#text'] === 'shared' && convertedComponentJSON) {
      const sharedGun = convertedComponentJSON[fileName]
      for (const [gunName, guns] of Object.entries(sharedGun.shared as Record<string, any>)) {
         if (tankGunName === gunName) {
            const dualAccuracy = RetunDualAccuracy(guns.dualAccuracy)

            restGunData['level'] = toNumber(guns.level) || 0
            restGunData['maxAmmo'] = toNumber(guns.maxAmmo) || 0
            restGunData['weight'] = toNumber(guns.weight) || 0
            restGunData.dualAccuracy = Object.keys(dualAccuracy).length > 0 ? dualAccuracy : null

            for (const shellNames of Object.keys(guns.shots)) {
               const shells = ReturnShells(shellNames, nationDir)
               if (restGunData.shells === undefined) restGunData.shells = []
               restGunData.shells.push({
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
