import fs from 'fs'
import path from 'path'
import xmlParser from '@Utils/xmlParser'

import { IShells } from '@Types/Modules'

const shellsFilePath = path.join('./XML/components/shells.xml')
const xmlShellsString = fs.readFileSync(shellsFilePath, 'utf-8')

const convertedShellsJSON = xmlParser.parse(xmlShellsString)
const fileName = path.basename(shellsFilePath)

export default function ReturnShells(shellTypeName: string): IShells {
   let shellsData: IShells = {} as IShells
   if (convertedShellsJSON[fileName]) {
      const shells = convertedShellsJSON[fileName]
      for (const [shellName, shellData] of Object.entries(shells as Record<string, any>)) {
         if (shellTypeName === shellName) {
            shellsData = shellData as IShells
         }
      }
   }
   return shellsData
}
