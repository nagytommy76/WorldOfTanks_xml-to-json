import fs from 'fs'
import path from 'path'
import xmlParser from '@Utils/xmlParser'
import { toNumber, toStringArray } from '@Utils/xmlHelper'

import { IRadios } from '@Types/Modules'

const radioFilePath = path.join('./XML/components/radios.xml')
const xmlRadiosString = fs.readFileSync(radioFilePath, 'utf-8')

const convertedFuelTanksJSON = xmlParser.parse(xmlRadiosString)
const fileName = path.basename(radioFilePath)

export default function ReturnRadios(rawJSON: any): IRadios[] {
   const radiosData: IRadios[] = []
   const vehicleRadios = rawJSON.radios
   if (convertedFuelTanksJSON[fileName] && vehicleRadios) {
      const sharedRadios = convertedFuelTanksJSON[fileName].shared
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
      console.log(radiosData)
   }

   return radiosData
}
