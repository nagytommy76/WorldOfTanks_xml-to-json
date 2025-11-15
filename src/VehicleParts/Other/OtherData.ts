import fs from 'fs'
import path from 'path'
import xmlParser from '@Utils/xmlParser'
import { toNumber, toStringArray } from '@/src/utils/xmlHelper'

interface IOtherData {
   tags: string[]
   tier: number
   type: string
   xmlId: string
   id: number
   name: string
   nation: string
   price: number
   role: string
   shortName: string
   notInShop: boolean
}

export default function ReturnOtherData(fileName: string, nation: string): IOtherData {
   const filePath = path.join(`./XML/${nation}/list.xml`)
   const xmlString = fs.readFileSync(filePath, 'utf-8')
   const convertedListJSON = xmlParser.parse(xmlString)

   const otherData: IOtherData = {} as IOtherData

   const baseName = path.basename(fileName, '.xml')
   const parts = baseName.split('_')
   const shortName = parts.slice(1).join(' ') || parts[0]

   const listVehicles = convertedListJSON['list.xml'][baseName]

   if (convertedListJSON && listVehicles) {
      const price = toNumber(listVehicles.price)
      if (typeof price === 'number' && price) {
         otherData.price = price
      } else {
         otherData.price = { gold: Number(listVehicles.price['#text']) } as any
      }
      otherData.name = shortName || ''
      otherData.xmlId = fileName
      otherData.nation = nation
      const tags = toStringArray(listVehicles.tags) || []
      otherData.tags = tags
      otherData.notInShop = listVehicles.notInShop === 'true'
      otherData.tier = toNumber(listVehicles.level) || 0
      otherData.type = tags[0]
   }

   return otherData
}
