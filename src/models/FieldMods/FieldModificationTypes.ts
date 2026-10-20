/**
 * @description Shared sub-schema: one mul / add operation on a game attribute
 * Used by both <modifiers> and <kpi> — same structure, different paths
 * _id: false → sub-documents that are never queried standalone
 */
export interface IModifierOp {
   /** 'mul' multiplies the current value; 'add' adds a flat term */
   operation: 'mul' | 'add'
   /** Attribute path in the game engine, e.g. "miscAttrs/gunAimingTimeFactor" */
   name: string
   value: number
}

/**
 * @description BASE modification
 * One option, a single-stat buff, referenced by locName key.
 * @example
 * XML name pattern: role_<class>_base_<level>
 * e.g. role_LT_universal_base_1
 *
 * @param key string - XML tag name — the primary join key used by tree steps
 * @param xmlId Numeric id from the XML file. Named xmlId to avoid collision
 *  with Mongoose's built-in .id virtual getter (which returns _id.toString())
 * @param locName Localization string key, e.g. "gun_balancing_1"
 * @param kpi Human-readable display stats shown in the game UI
 */
export interface IBaseModification extends Document {
   kind: 'base'
   key: string
   xmlId: number
   locName: string
   modifiers: IModifierOp[]
   kpi: IModifierOp[]
}

/**
 * @description
 * PAIR modification
 *Two mutually exclusive options. The player picks one.
 * The tree step references the prefix (e.g. "role_heavyTank_pair_1"),
 * not either individual option — grouping both under that prefix key
 * means a single DB lookup returns both options ready to display.
 * XML name pattern: role_<class>_pair_<level>_1 / _2
 */
export interface IPairOption {
   xmlId: number
   /** Icon key used in the game UI, e.g. "additionalGrousers" */
   imgName: string
   displayName: string
   modifiers: IModifierOp[]
   kpi: IModifierOp[]
}

/**
 * @param key - string - XML tag prefix — the join key used by pair_modification tree steps
 *  e.g. "role_heavyTank_pair_1" (without the trailing _1 / _2)
 */
export interface IPairModification extends Document {
   kind: 'pair'
   /** XML tag prefix — the join key used by pair_modification tree steps
    *  e.g. "role_heavyTank_pair_1" (without the trailing _1 / _2) */
   key: string
   /** Always exactly 2 options — validated at schema level */
   options: [IPairOption, IPairOption]
}

// Union type: what a resolved modification document looks like
export type IFieldModification = IBaseModification | IPairModification

export interface BaseModificationInput {
   key: string
   xmlId: number
   locName: string
   modifiers: IModifierOp[]
   kpi: IModifierOp[]
}

export interface PairOptionInput {
   xmlId: number
   imgName: string
   displayName: string
   modifiers: IModifierOp[]
   kpi: IModifierOp[]
}

export interface PairModificationInput {
   key: string // the PREFIX: "role_heavyTank_pair_1" (not _1 / _2)
   options: [PairOptionInput, PairOptionInput] // always exactly 2
}
