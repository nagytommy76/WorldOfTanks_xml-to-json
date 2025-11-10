import fs from 'fs'
import path from 'path'
import xmlParser from '@Utils/xmlParser'
import { toNumber, toStringArray } from '@Utils/xmlHelper'

import { IFuelTank } from '@Types/Modules'

const fuelTanksFilePath = path.join('./XML/components/fuelTanks.xml')
const xmlFuelTanksString = fs.readFileSync(fuelTanksFilePath, 'utf-8')

const convertedFuelTanksJSON = xmlParser.parse(xmlFuelTanksString)
const fileName = path.basename(fuelTanksFilePath)

export default function ReturnFuelTanks(rawJson: any): IFuelTank {
   const fuelTank: IFuelTank = {} as IFuelTank
   const vehicleFuelTanks = rawJson.fuelTanks
   if (convertedFuelTanksJSON[fileName] && vehicleFuelTanks) {
      const sharedFuelTanks = convertedFuelTanksJSON[fileName].shared
      const fuelTankType = Object.keys(vehicleFuelTanks)[0] || []
      const fuelTankData = sharedFuelTanks[fuelTankType as string]
      fuelTank.maxHealth = toNumber(fuelTankData.maxHealth) || 0
      fuelTank.maxRegenHealth = toNumber(fuelTankData.maxRegenHealth) || 0
      fuelTank.price = toNumber(fuelTankData.price) || 0
      fuelTank.repairCost = toNumber(fuelTankData.repairCost) || 0
      fuelTank.weight = toNumber(fuelTankData.weight) || 0
      fuelTank.tags = toStringArray(fuelTankData.tags?.tag) || []
   }
   return fuelTank
}
