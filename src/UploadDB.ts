import fs from 'fs'
import path from 'path'
import connectDB from './config/connect.DB'
import { TankModel } from '@Models/TankModel'

import { fileNameStartsWithByNations } from '@Utils/consts'
import type { ITankData } from '@Types/Modules'

const JSONDir = path.resolve('./JSON')

function hasSiegeMode(fileName: string, nationJSONFiles: string[]) {
   return nationJSONFiles.includes(fileName)
   //    baseName.includes('siege_mode')
   //    const parts = baseName.split('_')

   //    return parts.some((name) => name === 'siege' || name === 'mode')
}

export default async function UploadDB() {
   //    await connectDB()

   for (const nation of Object.keys(fileNameStartsWithByNations)) {
      const nationDir = path.join(JSONDir, nation)
      const nationJSONFiles = fs.readdirSync(nationDir)
      const nationJSONFilesWithoutSiege = nationJSONFiles.filter((file) => {
         const baseName = path.basename(file, '.json')
         return !baseName.includes('siege_mode')
      })

      for (const file of nationJSONFilesWithoutSiege) {
         const filePath = path.join(nationDir, file)
         const JSONString = fs.readFileSync(filePath, 'utf-8')
         const fileName = path.basename(filePath)
         //  const vehicle = JSON.parse(JSONString) as ITankData
         //  console.log(fileName)

         console.log(hasSiegeMode(fileName, nationJSONFiles))

         //  const singleTank = new TankModel({
         //     id: vehicle.id,
         //     price: vehicle.price,
         //     xmlId: vehicle.xmlId,
         //     name: vehicle.name,
         //     nation: vehicle.nation,
         //     tags: vehicle.tags,
         //     notInShop: vehicle.notInShop,
         //     tier: vehicle.tier,
         //     type: vehicle.type,

         //     tankDetails: vehicle.tankDetails || null,
         //     crew: vehicle.crew,
         //     siegeMode: vehicle.siegeMode || null,
         //     isSiegeMode: vehicle.isSiegeMode || false,

         //     stats: {
         //        camo: vehicle.stats.camo,
         //        chassis: vehicle.stats.chassis,
         //        engines: vehicle.stats.engines,
         //        fuelTank: vehicle.stats.fuelTank,
         //        hull: vehicle.stats.hull,
         //        radios: vehicle.stats.radios,
         //        speedLimit: vehicle.stats.speedLimit,
         //        turrets: vehicle.stats.turrets,
         //     },
         //  })
      }

      // const normalMode = JSON.parse(
      //    fs.readFileSync(path.join(`../JSON/${nation}`, `${fileNameStartsWith}`), 'utf8')
      // )
      // const siegeMode = JSON.parse(
      //    fs.readFileSync(path.join('./JSON/sweden', 'S10_Strv_103_0_Series_siege_mode.json'), 'utf8')
      // )
   }
}
