import fs from 'fs'
import path from 'path'
import xmlParser from '@Utils/xmlParser'

import { ReturnHull } from '@VehicleParts/Hull/HullArmor'
import { ReturnChassis } from '@VehicleParts/Chassis/ReturnChassis'
import ReturnTurrets from '@VehicleParts/Turrets/Turrets'
import ReturnSpeedLimits from '@VehicleParts/Other/SpeedLimits'
import ReturnCamoValues from '@VehicleParts/Other/Camo'
import GetCrewData from '@VehicleParts/Other/Crew'
import ReturnEngines from '@VehicleParts/Other/Engines'
import ReturnFuelTanks from '@VehicleParts/Other/FuelTank'
import ReturnRadios from '@VehicleParts/Other/Radio'

// const filePath = path.join('./XML/A182_T803.xml')
const filePath = path.join('./XML/R19_IS-3.xml')
// const manticoreFilePath = path.join('./XML/GB100_Manticore.xml')
const xmlString = fs.readFileSync(filePath, 'utf-8')
const convertedRawJSON = xmlParser.parse(xmlString)

const fileName = path.basename(filePath)

ReturnHull(convertedRawJSON[fileName])
ReturnChassis(convertedRawJSON[fileName])
ReturnTurrets(convertedRawJSON[fileName])

GetCrewData(convertedRawJSON[fileName])
ReturnCamoValues(convertedRawJSON[fileName])
ReturnSpeedLimits(convertedRawJSON[fileName])
ReturnEngines(convertedRawJSON[fileName])
ReturnFuelTanks(convertedRawJSON[fileName])
ReturnRadios(convertedRawJSON[fileName])

console.log('RAN')
