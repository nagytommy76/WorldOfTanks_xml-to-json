import parseXMLFile from '@/src/VehicleEquipments/ParseXMLFile'

import {
   BaseModificationInput,
   PairOptionInput,
   PairModificationInput,
} from '@Models/FieldMods/FieldModificationTypes'
import type { XMLFieldMods } from './FieldMod.types'
import parseKpiModifiers from './parseModifiers.helper'
import FieldModNames from './FieldModNames'

export default async function ReturnFieldModifications() {
   const BaseFieldMods: BaseModificationInput[] = []
   const PairOptionsMap = new Map<string, PairOptionInput[]>()
   const fieldModsXML = await parseXMLFile<XMLFieldMods>(
      './XML/common/post_progression/field_modifications.xml',
   )
   for (const [roleName, modification] of Object.entries(fieldModsXML)) {
      const roleNameArray = roleName.split('_')
      if (roleNameArray.includes('base')) {
         BaseFieldMods.push({
            key: roleName,
            xmlId: Number(modification.id),
            locName: String(modification.locName ?? '').trim(),
            modifiers: parseKpiModifiers(modification.modifiers),
            kpi: parseKpiModifiers(modification.kpi),
         })
      } else if (roleNameArray.includes('pair')) {
         const prefix = roleName.replace(/_[12]$/, '')
         const ingameName = FieldModNames[prefix][modification.imgName as string]

         const option: PairOptionInput = {
            xmlId: Number(modification.id),
            displayName: ingameName,
            imgName: String(modification.imgName ?? '').trim(),
            modifiers: parseKpiModifiers(modification.modifiers),
            kpi: parseKpiModifiers(modification.kpi),
         }

         const existing = PairOptionsMap.get(prefix) ?? []
         PairOptionsMap.set(prefix, [...existing, option])
      }
   }

   const PairFieldMods: PairModificationInput[] = []

   for (const [prefix, options] of PairOptionsMap) {
      // Fail loud — a pair with 1 or 3 options means the XML changed structure
      if (options.length !== 2) {
         throw new Error(`Pair "${prefix}" has ${options.length} options — expected exactly 2`)
      }
      PairFieldMods.push({ key: prefix, options: [options[0], options[1]] })
   }

   return { BaseFieldMods, PairFieldMods }
}
