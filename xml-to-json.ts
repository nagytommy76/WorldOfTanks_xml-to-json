import fs from 'fs'
import path from 'path'
import { XMLParser } from 'fast-xml-parser'
import { ISpeedLimit, ICamo } from '@Types/Modules'
import { toStringArray, toNumber, toNumberArray } from '@Utils/xmlHelper'

import { ReturnHull } from '@VehicleParts/Hull/HullArmor'
import { ReturnChassis } from '@VehicleParts/Chassis/ReturnChassis'

const parser = new XMLParser({
   ignoreAttributes: false,
   allowBooleanAttributes: true,
   attributeNamePrefix: '@_',
   trimValues: true,
   parseTagValue: false,
})

const filePath = path.join('./XML/A182_T803.xml')
// const manticoreFilePath = path.join('./XML/GB100_Manticore.xml')
const xmlString = fs.readFileSync(filePath, 'utf-8')
const convertedRawJSON = parser.parse(xmlString)

const fileName = path.basename(filePath)

function GetCrewData(rawJSON: any) {
   const crewData = []
   if (rawJSON?.crew) {
      for (const [key, value] of Object.entries(rawJSON.crew)) {
         crewData.push({
            primary: key,
            secondary: toStringArray(value),
         })
      }
   }
   return crewData
}

function ReturnSpeedLimits(rawJSON: any) {
   const speedLimits: ISpeedLimit = { backward: 0, forward: 0 }
   if (rawJSON?.speedLimits) {
      speedLimits.forward = toNumber(rawJSON.speedLimits?.forward) || 0
      speedLimits.backward = toNumber(rawJSON.speedLimits?.backward) || 0
   }
   return speedLimits
}

function ReturnCamoValues(rawJSON: any) {
   const camoValues: ICamo = { moving: 0, stationary: 0, camoBonus: 0, firePenalty: 0 }
   if (rawJSON?.invisibility) {
      camoValues.moving = toNumber(rawJSON.invisibility?.moving) || 0
      camoValues.stationary = toNumber(rawJSON.invisibility?.still) || 0
      camoValues.camoBonus = toNumber(rawJSON.invisibility?.camouflageBonus) || 0
      camoValues.firePenalty = toNumber(rawJSON.invisibility?.firePenalty) || 0
   }
   return camoValues
}

GetCrewData(convertedRawJSON[fileName])
ReturnSpeedLimits(convertedRawJSON[fileName])
ReturnCamoValues(convertedRawJSON[fileName])
ReturnHull(convertedRawJSON[fileName])
console.log(ReturnChassis(convertedRawJSON[fileName]))

console.log('RAN')
