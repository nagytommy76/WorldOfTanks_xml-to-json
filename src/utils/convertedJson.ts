import fs from 'fs'
import path from 'path'
import xmlParser from '@Utils/xmlParser'

export default function ReturnConvertedComponentJSON(
   nationDir: string,
   componentType: 'guns' | 'turrets' | 'shells' | 'radios' | 'fuelTanks' | 'engines' | 'chassis'
): { fileName: string; convertedComponentJSON: any } {
   const filePath = path.join(`${nationDir}/components/${componentType}.xml`)
   const xmlString = fs.readFileSync(filePath, 'utf-8')
   const convertedComponentJSON = xmlParser.parse(xmlString)
   const fileName = path.basename(filePath)
   return { fileName, convertedComponentJSON }
}
