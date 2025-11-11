import { toNumber, toStringArray } from '@Utils/xmlHelper'

import { IRadios } from '@Types/Modules'

import convertedJSON from '@Utils/convertedJson'

export default function ReturnRadios(rawJSON: any, nationDir: string): IRadios[] {
   const { convertedComponentJSON, fileName } = convertedJSON(nationDir, 'radios')

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
         name: radioTypes as string,
         rice: toNumber(radioData.rice) || 0,
         repairCost: toNumber(radioData.repairCost) || 0,
         tags: toStringArray(radioData.tags?.tag) || [],
         userString: radioData.userString,
         weight: toNumber(radioData.weight) || 0,
      })
   }

   return radiosData
}
