import fs from 'fs'
import path from 'path'
import xmlParser from '@Utils/xmlParser'
import { toNumber, toStringArray } from '@Utils/xmlHelper'

import { IEngines } from '@Types/Modules'

const enginesFilePath = path.join('./XML/components/engines.xml')
const xmlEnginesString = fs.readFileSync(enginesFilePath, 'utf-8')

const convertedEnginesJSON = xmlParser.parse(xmlEnginesString)
const fileName = path.basename(enginesFilePath)

export default function ReturnEngines(rawJson: any): IEngines[] {
   const enginesArray: IEngines[] = []
   const vehicleEngines = rawJson.engines
   if (convertedEnginesJSON[fileName] && vehicleEngines) {
      const sharedEngines = convertedEnginesJSON[fileName].shared
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
