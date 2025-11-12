import type { ITankData } from '@Types/Modules'

import { ReturnHull } from '@VehicleParts/Hull/HullArmor'
import { ReturnChassis } from '@VehicleParts/Chassis/ReturnChassis'
import ReturnTurrets from '@VehicleParts/Turrets/Turrets'
import ReturnSpeedLimits from '@VehicleParts/Other/SpeedLimits'
import ReturnCamoValues from '@VehicleParts/Other/Camo'
import GetCrewData from '@VehicleParts/Other/Crew'
import ReturnEngines from '@VehicleParts/Other/Engines'
import ReturnFuelTanks from '@VehicleParts/Other/FuelTank'
import ReturnRadios from '@VehicleParts/Other/Radio'
import ReturnOtherData from '@VehicleParts/Other/OtherData'
import ReturnSiegeMode from '@VehicleParts/Other/SiegeMode'

export default function ReturnSingleVehicle(
   convertedRawJSON: any,
   fileName: string,
   shortName: string,
   nation: string = 'ussr',
   nationDir: string = 'ussr'
): ITankData {
   const hullData = ReturnHull(convertedRawJSON[fileName])
   const chassisData = ReturnChassis(convertedRawJSON[fileName])
   const turretsData = ReturnTurrets(convertedRawJSON[fileName], nationDir)

   const crew = GetCrewData(convertedRawJSON[fileName])
   const camo = ReturnCamoValues(convertedRawJSON[fileName])
   const speedLimits = ReturnSpeedLimits(convertedRawJSON[fileName])
   const engines = ReturnEngines(convertedRawJSON[fileName], nationDir)
   const fuelTank = ReturnFuelTanks(convertedRawJSON[fileName], nationDir)
   const radios = ReturnRadios(convertedRawJSON[fileName], nationDir)

   const { hydropneumatic, siegeMode } = ReturnSiegeMode(convertedRawJSON[fileName])
   const otherData = ReturnOtherData(convertedRawJSON[fileName])

   const Vehicle: ITankData = {
      ...otherData,
   } as ITankData

   Vehicle.stats = {
      camo: camo,
      chassis: chassisData,
      engines: engines,
      fuelTank: fuelTank,
      hull: hullData,
      radios: radios,
      speedLimit: speedLimits,
      turrets: turretsData,
   }
   if (hydropneumatic) {
      Vehicle.stats.hydropneumatic = hydropneumatic
   }
   if (siegeMode) {
      Vehicle.stats.siegeMode = siegeMode
   }
   Vehicle.name = shortName
   Vehicle.nation = nation
   Vehicle.crew = crew

   return Vehicle
}
