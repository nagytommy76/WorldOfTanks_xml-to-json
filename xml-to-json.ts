import fs from 'fs'
import path from 'path'
import xmlParser from '@Utils/xmlParser'
import fetchMetaData from '@Utils/fetchMetaData'

import ReturnSingleVehicle from '@/src/ReturnSingleVehicle'

const notToIncludeFileNames = [
   'bob',
   'Dummy',
   'MapsTraining',
   '7x7',
   'IGR',
   'FL',
   'CN',
   'NewOnBoarding',
   'StoryModeStealth',
   'StoryMode',
   'fallout',
   'GrandFinal',
   'LE',
   'CO',
   'CFE',
   'Pillbox',
   'Bomber',
]

const fileNameStartsWithByNations = {
   // germany: 'G',
   // ussr: 'R',
   // usa: 'A',
   // france: 'F',
   // uk: 'GB',
   // china: 'Ch',
   // japan: 'J',
   // czech: 'Cz',
   // poland: 'Pl',
   sweden: 'S',
   // italy: 'It',
}

// folder with all vehicle xmls
const xmlDir = path.resolve('./XML')

// optional: put json output into its own folder
const outputDir = path.resolve('./JSON')
if (!fs.existsSync(outputDir)) {
   fs.mkdirSync(outputDir, { recursive: true })
}

async function Main() {
   for (const [nation, fileNameStartsWith] of Object.entries(fileNameStartsWithByNations)) {
      const fetchedJSONByNation = await fetchMetaData(nation)
      // example: XML/germany
      const nationDir = path.join(xmlDir, nation)
      //    Create a nation folder for JSON output
      const outNationDir = path.join(outputDir, nation)
      if (!fs.existsSync(outNationDir)) {
         fs.mkdirSync(outNationDir, { recursive: true })
      }
      // const xmlFile = fs.readFileSync('./XML/ussr/R19_IS-3.xml', 'utf8')

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
            const lower = base.toLowerCase()
            return !notToIncludeFileNames.some((bad) => lower.includes(bad.toLowerCase()))
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

Main()
