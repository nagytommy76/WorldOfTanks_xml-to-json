import fs from 'fs'
import xmlParser from '@Utils/xmlParser'

import { toNumber } from '@Utils/xmlHelper'

function fillObject(returnVehicleMechanics: any, vehicleMechanics: any, mechanicsKey: string) {
   Object.entries(vehicleMechanics[mechanicsKey]).map(([key, value]) => {
      return (vehicleMechanics[mechanicsKey][key] = toNumber(value) || value)
   })

   returnVehicleMechanics[mechanicsKey] = vehicleMechanics[mechanicsKey]
}

export default function ReturnTierXIMechanics(vehicleMechanics: any, fileName: string) {
   const fileNameSplit = fileName.split('.')[0]
   const vehicleMechanicsXML = fs.readFileSync('XML/common/vehicle_mechanics.xml', 'utf-8')
   const vehicleMechanicsJSON = xmlParser.parse(vehicleMechanicsXML)

   const mechanics = Object.values(vehicleMechanicsJSON['vehicle_mechanics.xml'])[0] as any[]

   const returnVehicleMechanics = {} as any

   for (const mechanic of mechanics) {
      const vehicleName = (mechanic as any).vehicleType.split(':')[1]
      if (vehicleName === fileNameSplit) {
         const mechanicsKey = Object.keys(mechanic.mechanics)[0] as string
         const mechanicsValues = Object.values(mechanic.mechanics)[0] as {
            params: { param: any }
         }

         const helperObject = {} as any

         // vehicle_mechanics.xml fileban lévő adatok:
         if (mechanicsValues.params) {
            if (mechanicsValues.params.param.length > 1) {
               for (const param of mechanicsValues.params.param) {
                  helperObject[param.name] = toNumber(param['#text']) || param['#text']
               }
            } else {
               helperObject[mechanicsValues.params.param.name] =
                  toNumber(mechanicsValues.params.param['#text']) || mechanicsValues.params.param['#text']
            }
         }
         returnVehicleMechanics['mechanics'] = helperObject

         // vehicle.xml fileban lévő adatok:
         if (vehicleMechanics && vehicleMechanics[mechanicsKey]) {
            fillObject(returnVehicleMechanics, vehicleMechanics, mechanicsKey)
         } else if (vehicleMechanics && vehicleMechanics['reactiveDebuffs']) {
            fillObject(returnVehicleMechanics, vehicleMechanics, 'reactiveDebuffs')
         }
      }
   }

   return returnVehicleMechanics
}
