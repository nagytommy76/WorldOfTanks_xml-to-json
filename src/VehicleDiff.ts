import type { ITankData } from './@Types/Modules'

type JsonPrimitive = string | number | boolean | null
type JsonValue = JsonPrimitive | JsonObject | JsonArray
interface JsonObject {
   [key: string]: JsonValue
}
interface JsonArray extends Array<JsonValue> {}

/**
 * Returns an object/array that has the same structure as `changed`,
 * but only contains values that are different from `base`.
 *
 * For primitives: returns `changed` if it differs from `base`.
 * For objects: returns only keys that changed.
 * For arrays: returns an array of the same length, with entries only
 * where something changed (other entries are left `undefined`).
 *
 * If there is no difference at all, returns `undefined`.
 */
export default function vehicleDifferences<T extends JsonValue>(
   base: T,
   changed: T
): Partial<ITankData> | undefined {
   // Fast path for identical values, including NaN handling
   if (Object.is(base, changed)) {
      return undefined
   }

   const baseIsArray = Array.isArray(base)
   const changedIsArray = Array.isArray(changed)

   const baseIsObject = typeof base === 'object' && base !== null && !baseIsArray
   const changedIsObject = typeof changed === 'object' && changed !== null && !changedIsArray

   // If types differ, or one side is primitive, just return the changed value
   if (
      (!baseIsObject && !baseIsArray) ||
      (!changedIsObject && !changedIsArray) ||
      baseIsArray !== changedIsArray ||
      baseIsObject !== changedIsObject
   ) {
      return changed as Partial<T>
   }

   // Both are arrays
   if (baseIsArray && changedIsArray) {
      const baseArr = base as JsonArray
      const changedArr = changed as JsonArray

      const maxLen = Math.max(baseArr.length, changedArr.length)
      const result: Array<Partial<JsonValue> | undefined> = []
      let hasChanges = false

      for (let i = 0; i < maxLen; i += 1) {
         const childDiff = vehicleDifferences(baseArr[i] as JsonValue, changedArr[i] as JsonValue)

         if (childDiff !== undefined) {
            result[i] = childDiff
            hasChanges = true
         }
      }

      return hasChanges ? (result as any) : undefined
   }

   // Both are plain objects
   if (baseIsObject && changedIsObject) {
      const baseObj = base as JsonObject
      const changedObj = changed as JsonObject

      const result: { [key: string]: Partial<JsonValue> | undefined } = {}
      let hasChanges = false

      const keys = new Set<string>([...Object.keys(baseObj), ...Object.keys(changedObj)])

      for (const key of keys) {
         // If the key does not exist in `changed`, ignore it.
         if (!(key in changedObj)) {
            continue
         }

         const childDiff = vehicleDifferences(baseObj[key] as JsonValue, changedObj[key] as JsonValue)

         if (childDiff !== undefined) {
            result[key] = childDiff
            hasChanges = true
         }
      }

      return hasChanges ? (result as Partial<T>) : undefined
   }

   // Fallback, should not really hit here, but for safety
   return changed as Partial<T>
}
