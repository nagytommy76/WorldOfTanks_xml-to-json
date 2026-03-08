// ─── Vehicle Filter ───────────────────────────────────────────────────────────

/**
 * The <vehicle> block inside a filter. All fields are optional
 * because different devices only use some of them.
 */
interface IVehicleFilterCriteria {
   tags?: string // e.g. "tankRammer_class1_user tankRammer_class2_user"
   mandatoryTags?: string // used in <exclude> blocks, e.g. "wheeledVehicle lightTank"
   minLevel?: number
   maxLevel?: number
}

interface IVehicleFilter {
   include?: { vehicle: IVehicleFilterCriteria }
   exclude?: { vehicle: IVehicleFilterCriteria }
}

// ─── KPI ─────────────────────────────────────────────────────────────────────

/**
 * A standard multiplier entry. Note: the XML uses <n> for the name,
 * which your parser will likely map to `n` not `name`.
 */
export interface IKpiMul {
   name: string
   value: number
   specValue?: number // If you put in the correct slot ( visibility, firepower )
   vehicleTypes?: string // only present inside aggregateMul children
}

/**
 * Some equipment (camouflage net, invisibility device) groups their modifiers
 * by vehicle type under an aggregateMul block instead of a flat mul.
 */
export interface IKpiAggregateMul {
   name: string // the group name, e.g. "vehicleCamouflageGroup"
   mul: IKpiMul[] // again — could be one or many, normalize with Array.isArray
}

/**
 * kpi can have flat mul entries, aggregate entries, or both.
 * Both are typed as single-or-array because fast-xml-parser collapses
 * single-child arrays into plain objects.
 */
export interface IKpi {
   mul?: IKpiMul | IKpiMul[]
   aggregateMul?: IKpiAggregateMul
}

// ─── Price ───────────────────────────────────────────────────────────────────

/**
 * Price is tricky — the XML has a <crystal/> child tag which signals
 * the currency type (bonds/crystal). Your parser will likely produce:
 * { '#text': 5000, crystal: '' }
 * So we type it to reflect that reality.
 */
interface IPrice {
   '#text': number // the actual credit/bond cost
   crystal?: string // empty string if present, signals bond currency
}

// ─── Incompatible Tags ───────────────────────────────────────────────────────

interface IIncompatibleTags {
   installed: string // e.g. "improvedConfiguration"
}

// ─── Root Device ─────────────────────────────────────────────────────────────

/**
 * Represents a single parsed deluxe device entry from deluxe_devices.xml.
 * Optional fields are those that don't appear on every device.
 */
export interface IDeluxeDevice {
   id: number
   icon: string
   price: IPrice
   tags: string // space-separated tag list
   vehicleFilter?: IVehicleFilter
   incompatibleTags: IIncompatibleTags
   kpi: IKpi
}

/**
 * The top-level parsed object from the file.
 * Keys are the XML tag names like "deluxImprovedConfiguration".
 */
export type DeluxeDevicesXML = Record<string, IDeluxeDevice>
