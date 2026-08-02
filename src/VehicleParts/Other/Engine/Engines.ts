import { toNumber, toStringArray } from '@Utils/xmlHelper'
import convertedJSON from '@Utils/convertedJson'

import { IEngines } from '@Types/Modules'

import ReturnEngineName from './ReturnEngineNames'

export default async function ReturnEngines(
   rawJson: any,
   nationDir: string,
   tank_id: number | undefined,
   engineIds?: number[],
): Promise<IEngines[]> {
   const { convertedComponentJSON, fileName } = convertedJSON(nationDir, 'engines')
   let engineNameMap = undefined
   if (tank_id && engineIds) {
      engineNameMap = await ReturnEngineName(tank_id, engineIds)
   }
   const enginesArray: IEngines[] = []
   const vehicleEngines = rawJson.engines
   if (convertedComponentJSON[fileName] && vehicleEngines) {
      const detailedEngines = rawJson.physics.detailed.engines
      const sharedEngines = convertedComponentJSON[fileName].shared

      for (const engineName of Object.keys(vehicleEngines)) {
         const engine = sharedEngines[engineName] as IEngines
         enginesArray.push({
            level: toNumber(engine.level) || 0,
            maxHealth: toNumber(engine.maxHealth) || 0,
            maxRegenHealth: toNumber(engine.maxRegenHealth) || 0,
            name: engineNameMap?.get(engineName) ?? engineName,
            power: toNumber(detailedEngines[engineName].smplEnginePower) || toNumber(engine.power) || 0,
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
