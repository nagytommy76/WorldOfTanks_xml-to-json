import type { ITankData, JSONData } from '@Types/Modules'

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
import ReturnSiegeMode, { ReturnHydropneumatic } from '@VehicleParts/Other/SiegeMode'
import MetaData from '@VehicleParts/Other/MetaData'

import Mechanics from '@VehicleParts/Mechanics/Mechanics'

const TIER_XI_VEHICLES = [
   'Ch67_BZ_79',
   'F135_AS_XX_40_t',
   'F136_AMX_67_Imbattable',
   'G185_Leopard_120_Verbessert',
   'G187_Taschenratte',
   'G188_LeKpz_Borkenkafer',
   'G189_Hirschkafer',
   'Pl37_CS_67_Szakal',
   'S36_Strv_107_12',
   'GB147_FV4025_Contriver',
   'GB152_AT_FV230_Breaker',
   'A179_Black_Rock',
   'A182_T803',
   'A183_XM69_Hacker',
   'R228_KR_1',
   'R230_Object_432U',
]

export default function ReturnSingleVehicle(
   convertedRawJSON: any,
   fileName: string,
   baseName: string,
   nation: string = 'ussr',
   nationDir: string = 'ussr',
   fetchedJSONByNation: JSONData
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

   const siegeMode = ReturnSiegeMode(convertedRawJSON[fileName])
   const hydropneumatic = ReturnHydropneumatic(convertedRawJSON[fileName])
   const otherData = ReturnOtherData(fileName, nation)
   const metaData = MetaData(baseName, fetchedJSONByNation)

   const Vehicle: ITankData = {
      ...otherData,
   } as ITankData

   if (TIER_XI_VEHICLES.includes(fileName.split('.')[0])) {
      Vehicle.mechanics = Mechanics(convertedRawJSON[fileName].mechanics, fileName)
   }

   Vehicle.id = metaData?.tank_id || null
   Vehicle.tankDetails = Object.keys(metaData).length > 0 ? metaData : null
   Vehicle.crew = crew
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
   return Vehicle
}
