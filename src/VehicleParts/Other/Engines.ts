import { toNumber, toStringArray } from '@Utils/xmlHelper'
import convertedJSON from '@Utils/convertedJson'

import { IEngines } from '@Types/Modules'

export default function ReturnEngines(rawJson: any, nationDir: string): IEngines[] {
   const { convertedComponentJSON, fileName } = convertedJSON(nationDir, 'engines')

   const enginesArray: IEngines[] = []
   const vehicleEngines = rawJson.engines
   if (convertedComponentJSON[fileName] && vehicleEngines) {
      const sharedEngines = convertedComponentJSON[fileName].shared
      for (const engineName of Object.keys(vehicleEngines)) {
         const engine = sharedEngines[engineName] as IEngines
         enginesArray.push({
            level: toNumber(engine.level) || 0,
            maxHealth: toNumber(engine.maxHealth) || 0,
            maxRegenHealth: toNumber(engine.maxRegenHealth) || 0,
            name: engineName,
            power: toNumber(engine.power) || 0,
            price: toNumber(engine.price) || 0,
            realPower: toNumber(engine.realPower) || 0,
            repairCost: toNumber(engine.repairCost) || 0,
            rpm_max: toNumber(engine.rpm_max) || 0,
            rpm_min: toNumber(engine.rpm_min) || 0,
            userString: engine.userString,
            tags: toStringArray(engine.tags) || [],
            weight: toNumber(engine.weight) || 0,
            wwsoundNPC: engine.wwsoundNPC,
            wwsoundPC: engine.wwsoundPC,
            fireStartingChance: toNumber(engine.fireStartingChance) || 0,
         })
      }
   }
   return enginesArray
}
