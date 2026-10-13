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

export default async function FieldModifications() {
   await connectDB()
   try {
      const fieldModsXML = await parseXMLFile<XMLFieldMods>(
         './XML/common/post_progression/field_modifications.xml',
      )
      const fieldModsTreeXML = await parseXMLFile(
         './XML/common/post_progression/field_modifications_trees.xml',
      )

      for (const [roleName, modification] of Object.entries(fieldModsXML)) {
      }
   } catch (error) {
      console.error(error)
   }
}
