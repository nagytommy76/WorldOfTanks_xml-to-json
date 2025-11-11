import convertedJSON from '@Utils/convertedJson'

import { IShells } from '@Types/Modules'

export default function ReturnShells(shellTypeName: string, nationDir: string): IShells {
   const { convertedComponentJSON, fileName } = convertedJSON(nationDir, 'shells')

   let shellsData: IShells = {} as IShells
   if (convertedComponentJSON[fileName]) {
      const shells = convertedComponentJSON[fileName]
      for (const [shellName, shellData] of Object.entries(shells as Record<string, any>)) {
         if (shellTypeName === shellName) {
            shellsData = shellData as IShells
         }
      }
   }
   return shellsData
}
