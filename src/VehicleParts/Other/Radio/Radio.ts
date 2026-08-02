import { toNumber, toStringArray } from '@Utils/xmlHelper'

import { IRadios } from '@Types/Modules'

import convertedJSON from '@Utils/convertedJson'
import ReturnRadioName from './ReturnRadioNames'

export default async function ReturnRadios(
   rawJSON: any,
   nationDir: string,
   tank_id: number | undefined,
   radioIds?: number[],
): Promise<IRadios[]> {
   const { convertedComponentJSON, fileName } = convertedJSON(nationDir, 'radios')
   let radionNames = new Map<string, string>()
   if (tank_id && radioIds) {
      radionNames = await ReturnRadioName(tank_id, radioIds)
   }

   const radiosData: IRadios[] = []
   const vehicleRadios = rawJSON.radios
   if (convertedComponentJSON[fileName] && vehicleRadios) {
      const sharedRadios = convertedComponentJSON[fileName].shared
      const radioTypes = Object.keys(vehicleRadios)[0] || []
      const radioData = sharedRadios[radioTypes as string]

      radiosData.push({
         distance: toNumber(radioData.distance) || 0,
         level: toNumber(radioData.level) || 0,
         maxHealth: toNumber(radioData.maxHealth) || 0,
         maxRegenHealth: toNumber(radioData.maxRegenHealth) || 0,
         name: radionNames?.get(radioTypes as string) ?? (radioTypes as string),
         price: toNumber(radioData.price) || 0,
         repairCost: toNumber(radioData.repairCost) || 0,
         tags: toStringArray(radioData.tags?.tag) || [],
         userString: radioData.userString,
         weight: toNumber(radioData.weight) || 0,
      })
   }

   return radiosData
}
