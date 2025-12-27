import fs from 'fs'
import xmlParser from '@Utils/xmlParser'

import { toNumber } from '@Utils/xmlHelper'

export default function ReturnTierXIMechanics(vehicleMechanics: any, fileName: string) {
   const fileNameSplit = fileName.split('.')[0]
   const vehicleMechanicsXML = fs.readFileSync('XML/vehicle_mechanics.xml', 'utf-8')
   const vehicleMechanicsJSON = xmlParser.parse(vehicleMechanicsXML)

   const mechanics = Object.values(vehicleMechanicsJSON['vehicle_mechanics.xml'])[0] as any[]

   const returnVehicleMechanics = {} as any

   for (const mechanic of mechanics) {
      const vehicleName = (mechanic as any).vehicleType.split(':')[1]
      if (vehicleName === fileNameSplit) {
         const mechanicsKey = Object.keys(mechanic.mechanics)[0] as string
         const mechanicsValues = Object.values(mechanic.mechanics)[0] as {
            // param: { name: string; '#text': string }[]
            param: any
         }
         const helperObject = {} as any

         if (mechanicsValues.param) {
            if (mechanicsValues.param.length > 1) {
               for (const param of mechanicsValues.param) {
                  helperObject[param.name] = toNumber(param['#text']) || param['#text']
               }
            } else {
               helperObject[mechanicsValues.param.name] =
                  toNumber(mechanicsValues.param['#text']) || mechanicsValues.param['#text']
            }
         }
         returnVehicleMechanics['mechanics'] = helperObject

         if (vehicleMechanics) {
            Object.entries(vehicleMechanics[mechanicsKey]).map(([key, value]) => {
               return (vehicleMechanics[mechanicsKey][key] = toNumber(value) || value)
            })

            returnVehicleMechanics[mechanicsKey] = vehicleMechanics[mechanicsKey]
         }
      }
   }

   return returnVehicleMechanics
}
