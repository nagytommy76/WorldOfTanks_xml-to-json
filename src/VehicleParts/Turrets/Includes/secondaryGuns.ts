import { toNumber } from '@Utils/xmlHelper'
import type { ISecondaryGuns } from '@Types/Modules'
import convertedJSON from '@Utils/convertedJson'

/**
 * @description Return secondary guns for Taschenratte yet.
 */
export default function returnSecondaryGuns(secondaryGuns: any, nationDir: string): any[] | null {
   if (!secondaryGuns) return null

   const { convertedComponentJSON: convertedGunJSON, fileName: gunFileName } = convertedJSON(
      nationDir,
      'guns',
   )
   const { convertedComponentJSON: convertedShellsJSON, fileName: shellsFileName } = convertedJSON(
      nationDir,
      'shells',
   )
   if (convertedGunJSON[gunFileName] && convertedShellsJSON[shellsFileName]) {
      const rawGuns = convertedGunJSON[gunFileName]
      const rawShells = convertedShellsJSON[shellsFileName]
      // Taschenratte turret -> secondaryGuns -> _8_cm_8H62_2
      // Japan J53_Ho_Ri_Shugo  _12_cm_Shisei_Funshinhou
      // console.log('GUNS: ', secondaryGuns)
      const secondGuns = Object.entries(secondaryGuns as Record<string, ISecondaryGuns>).map(
         ([key, value]) => {
            const data: any = {
               name: key,
               reloadTime: toNumber(value.reloadTime),
               burst: {
                  count: toNumber(value.burst?.count),
                  rate: toNumber(value.burst?.rate),
               },
               aimingTime: toNumber(value.aimingTime),
               shotDispersionRadius: toNumber(value.shotDispersionRadius),
               shotDispersionFactors: {
                  turretRotation: toNumber(value.shotDispersionFactors.turretRotation),
                  afterShot: toNumber(value.shotDispersionFactors.afterShot),
                  whileGunDamaged: toNumber(value.shotDispersionFactors.whileGunDamaged),
               },
               invisibilityFactorAtShot: toNumber(value.invisibilityFactorAtShot),
            }

            // guns.xml -> _8_cm_8H62_2
            const shellsName = Object.keys(rawGuns.shared[key].shots)[0]

            const shells = {
               name: shellsName,
               id: toNumber(rawShells[shellsName].id),
               icon: rawShells[shellsName].icon,
               kind: rawShells[shellsName].kind,
               mechanics: rawShells[shellsName].mechanics,
               caliber: toNumber(rawShells[shellsName].caliber),
               explosionRadius: toNumber(rawShells[shellsName].explosionRadius),
               damage: {
                  armor: toNumber(rawShells[shellsName].damage.armor),
                  devices: toNumber(rawShells[shellsName].damage.devices),
               },
            }

            data['shells'] = [shells]

            return data
         },
      )
      return secondGuns
   }
   return null
}
