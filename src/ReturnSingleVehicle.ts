import type { ITankData, JSONData } from '@Types/Modules'

import fetchModuleNames from '@/src/utils/fetchModuleNames'

import { ReturnHull } from '@VehicleParts/Hull/HullArmor'
import { ReturnChassis } from '@VehicleParts/Chassis/ReturnChassis'
import ReturnTurrets from '@VehicleParts/Turrets/Turrets'
import ReturnSpeedLimits from '@VehicleParts/Other/SpeedLimits'
import ReturnCamoValues from '@VehicleParts/Other/Camo'
import GetCrewData from '@VehicleParts/Other/Crew'
import ReturnEngines from '@VehicleParts/Other/Engine/Engines'
import ReturnFuelTanks from '@VehicleParts/Other/FuelTank'
import ReturnRadios from '@VehicleParts/Other/Radio/Radio'
import ReturnOtherData from '@VehicleParts/Other/OtherData'
import ReturnSiegeMode, { ReturnHydropneumatic } from '@VehicleParts/Other/SiegeMode'
import MetaData from '@VehicleParts/Other/MetaData'
import ReturnRocketBoosters from '@VehicleParts/Other/RocketBooster'
import ReturnSupplyRoles from '@VehicleParts/Roles'

import Mechanics from '@VehicleParts/Mechanics/Mechanics'

const VEHICLES_WITH_MECHANICS = [
   'Ch67_BZ_79',
   'Ch70_PTZ_78',
   'J52_STK_2',
   'F135_AS_XX_40_t',
   'F136_AMX_67_Imbattable',
   'F143_Fauteur',
   'G185_Leopard_120_Verbessert',
   'G187_Taschenratte',
   'G188_LeKpz_Borkenkafer',
   'G189_Hirschkafer',
   'Pl37_CS_67_Szakal',
   'S36_Strv_107_12',
   'GB147_FV4025_Contriver',
   'GB152_AT_FV230_Breaker',
   'GB158_Executor',
   'R228_KR_1',
   'R230_Object_432U',
   'A179_Black_Rock',
   'A182_T803',
   'A183_XM69_Hacker',
   'A187_Ares_75',
   'A188_Ares_MTB',
   'A189_Ares_90',
   'A190_Ares_85',
   'A191_Ares_90_C',
   'A195_Gorilla',
]

export default async function ReturnSingleVehicle(
   convertedRawJSON: any,
   fileName: string,
   baseName: string,
   nation: string = 'ussr',
   nationDir: string = 'ussr',
   fetchedJSONByNation: JSONData,
): Promise<ITankData> {
   const metaData = MetaData(baseName, fetchedJSONByNation)
   const modules = await fetchModuleNames(metaData?.tank_id?.toString())
   const tankId = metaData?.tank_id || undefined

   const chassisData = await ReturnChassis(
      convertedRawJSON[fileName],
      tankId,
      tankId && modules ? modules[tankId].suspensions : undefined,
   )
   const turretsData = await ReturnTurrets(
      convertedRawJSON[fileName],
      nationDir,
      tankId,
      tankId && modules ? modules[tankId].turrets : undefined,
      tankId && modules ? modules[tankId].guns : undefined,
   )
   const engines = await ReturnEngines(
      convertedRawJSON[fileName],
      nationDir,
      tankId,
      tankId && modules ? modules[tankId].engines : undefined,
   )
   const radios = await ReturnRadios(
      convertedRawJSON[fileName],
      nationDir,
      tankId,
      tankId && modules ? modules[tankId].radios : undefined,
   )

   const hullData = ReturnHull(convertedRawJSON[fileName])
   const fuelTank = ReturnFuelTanks(convertedRawJSON[fileName], nationDir)
   const speedLimits = ReturnSpeedLimits(convertedRawJSON[fileName])
   const camo = ReturnCamoValues(convertedRawJSON[fileName])
   const crew = GetCrewData(convertedRawJSON[fileName])

   const siegeMode = ReturnSiegeMode(convertedRawJSON[fileName])
   const hydropneumatic = ReturnHydropneumatic(convertedRawJSON[fileName])
   const otherData = ReturnOtherData(fileName, nation)
   const { supplySlots, customRoleSlotOptions } = ReturnSupplyRoles(convertedRawJSON[fileName])

   const rocketBoosters = ReturnRocketBoosters(convertedRawJSON[fileName].rocketAcceleration)

   const Vehicle: ITankData = {
      ...otherData,
   } as ITankData

   if (VEHICLES_WITH_MECHANICS.includes(fileName.split('.')[0])) {
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
      rocketAcceleration: rocketBoosters,
   }
   if (hydropneumatic) {
      Vehicle.stats.hydropneumatic = hydropneumatic
   }
   if (siegeMode) {
      Vehicle.stats.siegeMode = siegeMode
   }
   if (supplySlots) {
      Vehicle.supplySlotCategory = supplySlots
   }
   if (customRoleSlotOptions) {
      Vehicle.customRoleSlotOptions = customRoleSlotOptions
   }
   return Vehicle
}
