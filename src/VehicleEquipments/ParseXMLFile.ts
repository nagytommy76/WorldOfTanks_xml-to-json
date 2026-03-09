import { readFile } from 'fs/promises'
import path from 'path'
import xmlParser from '@Utils/xmlParser'

export default async function parseXMLFile<T>(filePath: string): Promise<T> {
   const xml = await readFile(filePath, 'utf-8')
   const fileName = path.basename(filePath) // 'deluxe_devices.xml'
   return xmlParser.parse(xml)[fileName] as T
}
