import parseXMLFile from '@/src/VehicleEquipments/ParseXMLFile'

import type { RawStep, RawTree, RawVehicleFilter } from './FieldMod.types'
import type {
   FieldModificationTreeInput,
   IStepAction,
   ITierRange,
   ITreeStep,
} from '@Models/FieldMods/TreeTypes'

/**
 *@description
 * Parses <unlocks> into an array of step id numbers.
 * converts text nodes to numbers when possible:
 *   <unlocks>3 401</unlocks> → "3 401"  (stays a string, has a space)
 *   <unlocks>2</unlocks>     →  2       (becomes a number — it looks numeric!)
 *@example
 * String(2)     = "2"     → split → ["2"]     → [2]      ✓
 * String("3 401") = "3 401" → split → ["3","401"] → [3,401] ✓
 * undefined                  → []                           ✓
 */
function parseUnlocks(raw: number | string | undefined): number[] {
   if (raw == null) return []
   return String(raw).trim().split(/\s+/).filter(Boolean).map(Number)
}

/**
 * Flattens vehicleFilter > include > vehicle > minLevel / maxLevel
 * into { min, max }, or returns null when the filter is absent.
 *
 * The XML nests this 3 levels deep but there is only ever one block,
 * so we flatten it immediately rather than mirroring the nesting in the DB.
 */
function parseTierRange(vf: RawVehicleFilter | undefined): ITierRange | null {
   const vehicle = vf?.include?.vehicle
   if (!vehicle) return null

   return {
      min: Number(vehicle.minLevel),
      max: Number(vehicle.maxLevel),
   }
}

export default async function FieldModTrees() {
   console.log('\n🌳 Parsing field_modifications_trees.xml...')
   const treeXML = await parseXMLFile<RawTree>('./XML/common/post_progression/field_modifications_trees.xml')

   const trees: FieldModificationTreeInput[] = []

   for (const [role, rawTree] of Object.entries(treeXML)) {
      const steps: ITreeStep[] = rawTree.steps.step.map((rawStep: RawStep) => {
         const action: IStepAction = {
            // Cast through the union — these values are always one of the 3 known strings
            type: String(rawStep.action.type).trim() as IStepAction['type'],
            value: String(rawStep.action.value).trim(),
         }
         return {
            id: Number(rawStep.id),
            level: Number(rawStep.level),
            price: rawStep.price.trim() as ITreeStep['price'],
            action,
            unlocks: parseUnlocks(rawStep.unlocks),
            tierRange: parseTierRange(rawStep.vehicleFilter),
         }
      })
      trees.push({
         role,
         xmlId: Number(rawTree.id),
         rootStep: Number(rawTree.rootStep),
         steps,
      })
   }
   return trees
}
