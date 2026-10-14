import {
   BaseModification,
   FieldModification,
   PairModification,
} from '@Models/FieldMods/FieldModification.model'

import connectDB from '@/Config/connectDB'

import parseXMLFile from '@/src/VehicleEquipments/ParseXMLFile'

interface MulModifier {
   name: string
   value: number
}
interface IFieldModXML {
   id: number
   locName: string
   modifiers: MulModifier[]
   kpi: MulModifier[]
}

type XMLFieldMods = {
   [roleName: string]: IFieldModXML
}

async function ReturnFieldModifications() {
   const FieldMods: { [roleName: string]: any } = {}
   const fieldModsXML = await parseXMLFile<XMLFieldMods>(
      './XML/common/post_progression/field_modifications.xml',
   )
   for (const [roleName, modification] of Object.entries(fieldModsXML)) {
      const roleNameArray = roleName.split('_')
      console.log('ROLE NAME ARRAY: ', roleNameArray, 'HAS BASE: ', roleNameArray.includes('base'))
   }
   return FieldMods
}

export default async function FieldModifications() {
   // await connectDB()
   try {
      // const fieldModsXML = await parseXMLFile<XMLFieldMods>(
      //    './XML/common/post_progression/field_modifications.xml',
      // )
      const fieldModsTreeXML = await parseXMLFile(
         './XML/common/post_progression/field_modifications_trees.xml',
      )

      const fieldModifications = await ReturnFieldModifications()
      console.log('FieldMODS: ', fieldModifications)
   } catch (error) {
      console.error(error)
   }
}
