import { toNumber, toStringArray } from '@Utils/xmlHelper'
import convertedJSON from '@Utils/convertedJson'

import { IFuelTank } from '@Types/Modules'

export default function ReturnFuelTanks(rawJson: any, nationDir: string): IFuelTank {
   const { convertedComponentJSON, fileName } = convertedJSON(nationDir, 'fuelTanks')
   const fuelTank: IFuelTank = {} as IFuelTank
   const vehicleFuelTanks = rawJson.fuelTanks
   if (convertedComponentJSON[fileName] && vehicleFuelTanks) {
      const sharedFuelTanks = convertedComponentJSON[fileName].shared
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
