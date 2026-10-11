// One operation inside modifiers/kpi: multiply a factor or add a term
/**
 * @description Gives 2 options -> vehicleEnginePower: +3% || vehicleForwardMaxSpeed: -2km/h
 * @example
 *  <kpi>
      <mul>
        <name>	vehicleEnginePower	</name>
        <value>	1.03	</value>
      </mul>
      <add>
        <name>	vehicleForwardMaxSpeed	</name>
        <value>	-2	</value>
      </add>
    </kpi>
 */
interface IModifierOp {
   operation: 'mul' | 'add'
   name: string // vehicleEnginePower
   value: number
}

// One entry from field_modifications.xml
interface IFieldModification {
   key: string // XML tag name, e.g. "role_HT_assault_pair_4_1"
   id: number
   kind: 'base' | 'pair'
   locName?: string // base modifications only
   imgName?: string // pair modifications only
   modifiers: IModifierOp[]
   kpi: IModifierOp[]
}

// One node of a tree from field_modifications_trees.xml
interface ITreeStep {
   id: number // local to the tree
   level: number // depth in the tree (1-8)
   price: string
   // Modification: role_LT_scout_base_1 -> vehicleAllGroundRotationSpeed + 2% to hull traverse speed
   // pair_modification: role_lightTank_pair_1 -> vehicleEnginePower: -3% +3% && vehicleForwardMaxSpeed -2km/h or +2km/h
   // feature: opt_dev_boosters_switch -> Alternate Configuration: ( shells and consumables )
   actionType: 'feature' | 'modification' | 'pair_modification'
   actionValue: string // feature name or modification key/prefix
   unlocks: number[] // next step ids
   tierRange?: { min: number; max: number } // from vehicleFilter, if present
}
