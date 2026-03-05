import fs from 'fs'
import path from 'path'
import xmlParser from '@Utils/xmlParser'

import fetchMetaData from '@Utils/fetchMetaData'
import fetchEquipments from '@Utils/fetchEquipments'

import { fileNameStartsWithByNations } from '@Utils/consts'

import type { NationType } from '@Types/Vehicle'

import ReturnSingleVehicle from '@/src/ReturnSingleVehicle'
// import UploadDB from './src/UploadDB'
// import Mechanics from '@VehicleParts/Mechanics/Mechanics'

import Equipment from '@/src/VehicleEquipments/Equipment'
import ReadXML from '@/Classes/ReadXML'

const startTime = performance.now()
async function Main() {
   for (const nation of Object.keys(fileNameStartsWithByNations)) {
      console.log(`The ${nation.toUpperCase()} nation has been started to process`)

      const fetchedJSONByNation = await fetchMetaData(nation)
      const readXml = new ReadXML(nation as NationType)
      const nationXmlFiles = readXml.returnNationXMLFiles()

      for (const file of nationXmlFiles) {
         const filePath = path.join(readXml.nationSourceXMLDirectory, file)
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
            readXml.nationSourceXMLDirectory,
            fetchedJSONByNation,
         )
         fs.writeFileSync(
            `${readXml.nationOutputJSONDirectory}/${baseName}.json`,
            JSON.stringify(vehicle, null, 2),
            'utf8',
         )
         console.log(`Wrote ${vehicle.name} tank to ${baseName}.json`)
      }
   }
}

// Main().then(() => {
//    const endTime = performance.now()
//    console.log(
//       `The XML -> JSON conversion has been ended in: ${((endTime - startTime) / 1000).toFixed(
//          3,
//       )} seconds, and ${((endTime - startTime) / 1000 / 60).toFixed(3)} minutes`,
//    )
// })

// UploadDB().then(() => {
//    const endTime = performance.now()
//    console.log(
//       `DB upload process has been ended in: ${((endTime - startTime) / 1000).toFixed(
//          3
//       )} seconds seconds, and ${((endTime - startTime) / 1000 / 60).toFixed(3)} minutes`
//    )
// })

async function Equipments() {
   const equipmentsFromWGAPI = await fetchEquipments()
   const vehicleEquipmentsXML = fs.readFileSync('./XML/common/equipments/vehicle_equipments.xml', 'utf-8')
   const vehicleEquipmentsJSON = xmlParser.parse(vehicleEquipmentsXML)['vehicle_equipments.xml'] as any
   const vehicleEquipments = []

   for (const [equipmentName, equipment] of Object.entries(vehicleEquipmentsJSON) as any) {
      const foundAPIEquipment = Object.values(equipmentsFromWGAPI).find((e) => e.tag === equipmentName)
      if (!foundAPIEquipment) return

      const vehicleEquipment = new Equipment(
         foundAPIEquipment?.provision_id,
         equipment.icon,
         Number(equipment.price),
         foundAPIEquipment?.name,
         foundAPIEquipment?.description,
         equipmentName,
      )

      if (equipment.kpi) {
         console.log(equipment.kpi?.mul)
      }

      // console.log(equipment.script)
   }
}

Equipments().then(() => {
   console.log('FINISH')
})
