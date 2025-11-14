import { toNumber } from '@Utils/xmlHelper'
import convertedJSON from '@Utils/convertedJson'

import type { AmmoType, ISharedShell } from '@Types/Modules'

export default function ReturnShells(shellTypeName: string, nationDir: string): ISharedShell {
   const { convertedComponentJSON, fileName } = convertedJSON(nationDir, 'shells')
   let shellsData: ISharedShell = {} as ISharedShell
   if (convertedComponentJSON[fileName]) {
      const shells = convertedComponentJSON[fileName] as ISharedShell
      for (const [shellName, shellData] of Object.entries(shells as Record<string, any>)) {
         if (shellTypeName === shellName) {
            shellsData = {
               caliber: toNumber(shellData.caliber) || 0,
               damage: {
                  armor: toNumber(shellData.damage.armor) || 0,
                  devices: toNumber(shellData.damage.devices) || 0,
               },
               effects: shellData.effects as string,
               icon: shellData.icon as string,
               id: toNumber(shellData.id) || 0,
               isTracer: shellData.isTracer as boolean,
               kind: shellData.kind as AmmoType,
               normalizationAngle: toNumber(shellData.normalizationAngle) || 0,
               price: toNumber(shellData.price) || 0,
               ricochetAngle: toNumber(shellData.ricochetAngle) || 0,
               userString: shellData.userString as string,
               armorSpalls: null,
               explosionRadius: null,
               mechanics: null,
            }
            if (shellData.armorSpalls && shellData.explosionRadius && shellData.mechanics) {
               shellsData.armorSpalls = {
                  coneAngle: toNumber(shellData.armorSpalls?.coneAngle) || 0,
                  damage: {
                     armor: toNumber(shellData.armorSpalls?.damage.armor) || 0,
                     devices: toNumber(shellData.armorSpalls?.damage.devices) || 0,
                  },
                  impactRadius: toNumber(shellData.armorSpalls?.impactRadius) || 0,
               }
               shellsData.explosionRadius = toNumber(shellData.explosionRadius) || 0
               shellsData.mechanics = shellData.mechanics as string
            }
         }
      }
   }
   return shellsData
}
