import { Document } from 'mongoose'

/**
 * @description Vehicle tier filter — present on steps that are tier-restricted
 * @example XML: vehicleFilter > include > vehicle > minLevel / maxLevel
 */
export interface ITierRange {
   /** Minimum vehicle tier (from <minLevel>) */
   min: number
   /** Maximum vehicle tier (from <maxLevel>) */
   max: number
}

// ─────────────────────────────────────────────────────────────────
// Action — what unlocking this step does
// ─────────────────────────────────────────────────────────────────
export type TStepActionType = 'feature' | 'modification' | 'pair_modification'
/**
 * - type 'feature'           → feature name:  opt_dev_boosters_switch -> Alternate Configuration: ( shells and consumables )
 * - type 'modification'      → role_LT_scout_base_1 -> vehicleAllGroundRotationSpeed + 2% to hull traverse speed
 * - type 'pair_modification' → role_lightTank_pair_1 -> vehicleEnginePower: -3% +3% && vehicleForwardMaxSpeed -2km/h or +2km/h
 *  (query: { key: value, kind: 'pair' })
 */
export interface IStepAction {
   type: TStepActionType
   value: string
}

/**
 * @param id Step id — local to this tree, used only as an unlock pointer
 * @param level Depth in the progression tree: 1 (first unlock) → 8 (last)
 * @param unlocks Step ids this step unlocks once completed (empty array = leaf node)
 * @param tierRange null = available to all tiers; set for level 6 (8-10), 7 (9-10), 8 (10 only)
 */
export interface ITreeStep {
   id: number
   level: number
   price: 'unlockBaseModificationCost' | 'unlockPairModificationCost'
   action: IStepAction
   unlocks: number[]
   tierRange: ITierRange | null
}

/**
 * @description
 * Field modification tree document
 *
 * 18 documents, one per vehicle role.
 *
 * Join with vehicle:
 *   vehicle.postProgressionTree === tree.role
 *   e.g.  "role_LT_universal"  ──►  tree { role: "role_LT_universal" }
 *
 * @param role string - Role name — the primary join key; matches vehicle.postProgressionTree
 * @param xmlId number - Numeric id from the XML file
 * @param rootStep Id of the root step (always 1 in the current data)
 */
export interface IFieldModificationTree extends Document {
   role: string
   xmlId: number
   rootStep: number
   steps: ITreeStep[]
}
