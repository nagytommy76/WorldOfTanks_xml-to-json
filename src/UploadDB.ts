import fs from 'fs'
import path from 'path'
import connectDB from './config/connect.DB'
import { VehicleModel } from '@Models/TankModel'

import vehicleDifferences from './VehicleDiff'

import { fileNameStartsWithByNations, notToIncludeFileNames } from '@Utils/consts'
import type { ITankData } from '@Types/Modules'

const JSONDir = path.resolve('./JSON')

function hasSiegeMode(fileName: string, nationJSONFiles: string[]) {
   const searchString = fileName.split('.')[0] + '_siege_mode.json'
   return nationJSONFiles.includes(searchString)
}
export default async function UploadDB() {
   await connectDB()

   for (const nation of Object.keys(fileNameStartsWithByNations)) {
      const nationDir = path.join(JSONDir, nation)
      const nationJSONFiles = fs.readdirSync(nationDir)
      const nationJSONFilesWithoutSiege = nationJSONFiles
         .filter((file) => {
            const baseName = path.basename(file, '.json')
            return !baseName.includes('siege_mode')
         })
         // Double check if there are any bad file names
         .filter((file) => {
            const base = path.basename(file, '.json')
            return !notToIncludeFileNames.some((bad) => base.includes(bad))
         })

      for (const file of nationJSONFilesWithoutSiege) {
         const filePath = path.join(nationDir, file)
         const JSONString = fs.readFileSync(filePath, 'utf-8')
         const fileName = path.basename(filePath)

         const normalvehicle = JSON.parse(JSONString) as ITankData

         let siegeMode = null

         if (hasSiegeMode(fileName, nationJSONFiles)) {
            const siegeModeFilePath = path.join(nationDir, fileName.split('.')[0] + '_siege_mode.json')
            const siegeModeJSONString = fs.readFileSync(siegeModeFilePath, 'utf-8')
            const siegeVehicle = JSON.parse(siegeModeJSONString)

            siegeMode = vehicleDifferences(normalvehicle, siegeVehicle)
         }

         const singleTank = new VehicleModel({
            id: normalvehicle.id,
            price: normalvehicle.price,
            xmlId: normalvehicle.xmlId,
            name: normalvehicle.name,
            nation: normalvehicle.nation,
            tags: normalvehicle.tags,
            notInShop: normalvehicle.notInShop,
            tier: normalvehicle.tier,
            type: normalvehicle.type,

            tankDetails: normalvehicle.tankDetails || null,
            crew: normalvehicle.crew,
            siegeMode: siegeMode || null,

            stats: {
               camo: normalvehicle.stats.camo,
               chassis: normalvehicle.stats.chassis,
               engines: normalvehicle.stats.engines,
               fuelTank: normalvehicle.stats.fuelTank,
               hull: normalvehicle.stats.hull,
               radios: normalvehicle.stats.radios,
               speedLimit: normalvehicle.stats.speedLimit,
               turrets: normalvehicle.stats.turrets,
               hydropneumatic: normalvehicle.stats.hydropneumatic || null,
               siegeMode: normalvehicle.stats.siegeMode || null,
            },
         })
         await singleTank.save()

         console.log(`${normalvehicle.name} has been uploaded to MongoDB`)
      }
   }
}
