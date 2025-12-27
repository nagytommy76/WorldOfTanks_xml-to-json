import fs from 'fs'
import path from 'path'
import xmlParser from '@Utils/xmlParser'
import fetchMetaData from '@Utils/fetchMetaData'
import { fileNameStartsWithByNations, notToIncludeFileNames } from '@Utils/consts'

import ReturnSingleVehicle from '@/src/ReturnSingleVehicle'
import UploadDB from './src/UploadDB'

import vehicleDifferences from './src/VehicleDiff'

import Mechanics from '@VehicleParts/Mechanics/Mechanics'

// folder with all vehicle xmls
const xmlDir = path.resolve('./XML')

// optional: put json output into its own folder
const outputDir = path.resolve('./JSON')
if (!fs.existsSync(outputDir)) {
   fs.mkdirSync(outputDir, { recursive: true })
}
const startTime = performance.now()
async function Main() {
   for (const [nation, fileNameStartsWith] of Object.entries(fileNameStartsWithByNations)) {
      console.log(`The ${nation.toUpperCase()} nation has been started to process`)
      const fetchedJSONByNation = await fetchMetaData(nation)
      // example: XML/germany
      const nationDir = path.join(xmlDir, nation)
      //    Create a nation folder for JSON output
      const outNationDir = path.join(outputDir, nation)
      if (!fs.existsSync(outNationDir)) {
         fs.mkdirSync(outNationDir, { recursive: true })
      }

      const nationXmlFiles = fs
         .readdirSync(nationDir)
         .filter((file) => file.toLowerCase().endsWith('.xml'))
         //   Include all of the nation's vehicles / not list.xml for example
         .filter((file) => {
            return file.startsWith(fileNameStartsWith)
         })
         // exclude training / special mode vehicles
         .filter((file) => {
            const base = path.basename(file, '.xml')
            return !notToIncludeFileNames.some((bad) => base.includes(bad))
         })

      if (nationXmlFiles.length === 0) {
         console.log('No XML files found in', nationDir)
         process.exit(0)
      }

      for (const file of nationXmlFiles) {
         const filePath = path.join(nationDir, file)
         const xmlString = fs.readFileSync(filePath, 'utf-8')
         const fileName = path.basename(filePath)

         const convertedRawJSON = xmlParser.parse(xmlString)

         const baseName = path.basename(fileName, '.xml') // "R19_IS-3"
         const parts = baseName.split('_') // ["R19", "IS-3"]
         // To get tank details -> REMOVE _siege_mode
         const withoutSiegeModeBaseName = parts
            .filter((name) => name !== 'siege' && name !== 'mode')
            .join('_')

         const vehicle = ReturnSingleVehicle(
            convertedRawJSON,
            fileName,
            withoutSiegeModeBaseName,
            nation,
            nationDir,
            fetchedJSONByNation
         )
         fs.writeFileSync(`${outNationDir}/${baseName}.json`, JSON.stringify(vehicle, null, 2), 'utf8')
         console.log(`Wrote ${vehicle.name} tank to ${baseName}.json`)
      }
   }
}

// const strv = fs.readFileSync('./JSON/sweden/S11_Strv_103B.json', 'utf-8') as any
// const strvSiege = fs.readFileSync('./JSON/sweden/S11_Strv_103B_siege_mode.json', 'utf-8') as any
// const strv = fs.readFileSync('./JSON/germany/G147_Kunze_Panzer.json', 'utf-8') as any
// const strvSiege = fs.readFileSync('./JSON/germany/G147_Kunze_Panzer_siege_mode.json', 'utf-8') as any

// const strvJSON = JSON.parse(strv)
// const strvSiegeJSON = JSON.parse(strvSiege)

// const BZ79XML = fs.readFileSync('./XML/china/Ch67_BZ_79.xml', 'utf-8')
// const BZ79JSON = xmlParser.parse(BZ79XML)
// const fileName = path.basename('./XML/china/Ch67_BZ_79.xml')
// Mechanics(BZ79JSON[fileName].mechanics, 'Ch67_BZ_79.xml')

// const BZ79XML = fs.readFileSync('./XML/uk/GB147_FV4025_Contriver.xml', 'utf-8')
// const BZ79JSON = xmlParser.parse(BZ79XML)
// const fileName = path.basename('./XML/uk/GB147_FV4025_Contriver.xml')

// Mechanics(BZ79JSON[fileName].mechanics, 'GB147_FV4025_Contriver.xml')
// const BZ79XML = fs.readFileSync('./XML/france/F135_AS_XX_40_t.xml', 'utf-8')
// const BZ79JSON = xmlParser.parse(BZ79XML)
// const fileName = path.basename('./XML/france/F135_AS_XX_40_t.xml')

// Mechanics(BZ79JSON[fileName].mechanics, 'F135_AS_XX_40_t.xml')

// const differences = vehicleDifferences(strvJSON, strvSiegeJSON)

// fs.writeFileSync(`TEST.json`, JSON.stringify(differences, null, 2), 'utf8')

// Main().then(() => {
//    const endTime = performance.now()
//    console.log(
//       `The XML -> JSON conversion has been ended in: ${((endTime - startTime) / 1000).toFixed(
//          3
//       )} seconds, and ${((endTime - startTime) / 1000 / 60).toFixed(3)} minutes`
//    )
// })

UploadDB().then(() => {
   const endTime = performance.now()
   console.log(
      `DB upload process has been ended in: ${((endTime - startTime) / 1000).toFixed(
         3
      )} seconds seconds, and ${((endTime - startTime) / 1000 / 60).toFixed(3)} minutes`
   )
})
