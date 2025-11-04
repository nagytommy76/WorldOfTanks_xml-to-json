import fs from 'fs'
import path from 'path'
import { XMLParser } from 'fast-xml-parser'
import { toStringArray } from './src/utils/xmlHelper'
import { ICrew } from '@Types/Vehicle'

const parser = new XMLParser({
   ignoreAttributes: false,
   allowBooleanAttributes: true,
   attributeNamePrefix: '@_',
   trimValues: true,
   parseTagValue: false,
})

const filePath = path.join('./XML/A182_T803.xml')
const xmlString = fs.readFileSync(filePath, 'utf-8')
const convertedRawJSON = parser.parse(xmlString)

const fileName = path.basename(filePath)

// fs.writeFileSync(path.join(`vehicles.json`), JSON.stringify(convertedJSON, null, 2), 'utf8')

function GetCrewData(rawJSON: any) {
   const crewData = []

   if (rawJSON?.crew) {
      // console.log('RAW: ', rawJSON?.crew)
      for (const [key, value] of Object.entries(rawJSON.crew)) {
         console.log(key, value)
         crewData.push({
            primary: key,
            secondary: toStringArray(value),
         })
      }
   }

   console.log(crewData)
}

// console.log(convertedRawJSON[fileName])
// console.log(fileName)

GetCrewData(convertedRawJSON[fileName])

console.log('RAN')
