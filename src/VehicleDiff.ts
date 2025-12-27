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

// /**
//  * Finds and returns the differences between two objects `a` and `b`.
//  *
//  * @param {Record<string, any>} [a] The first object to compare.
//  * @param {Record<string, any>} [b] The second object to compare.
//  *
//  * @returns {Record<string, any> | undefined} An object containing the differences between `a` and `b`, or undefined if `b` is null or undefined.
//  */
// export default function vehicleDifferences(
//    a: Record<string, any> = {},
//    b: Record<string, any> = {}
// ): Record<string, any> | undefined {
//    // This event happens when the object b is of the null type.
//    if (!b) {
//       return b
//    }

//    return [...new Set([...Object.keys(b), ...Object.keys(a)])].reduce(
//       (differences: Record<string, any>, key: string) => {
//          if (Array.isArray(b[key])) {
//             if (!Array.isArray(a[key])) {
//                return { ...differences, [key]: b[key] }
//             }

//             const d = b[key].reduce((acc: any[] | undefined, item: any, index: number) => {
//                const isObject = typeof item === 'object' && !Array.isArray(item)

//                if (!isObject && JSON.stringify(a[key][index]) === JSON.stringify(item)) {
//                   return acc
//                }

//                acc ??= []

//                if (isObject) {
//                   const d = vehicleDifferences(a[key][index], item)

//                   if (d && Object.keys(d).length) {
//                      acc[index] = d
//                   }
//                } else {
//                   acc[index] = item
//                }

//                return acc
//             }, undefined)

//             if (d && d.length) {
//                differences[key] = d
//             }
//          } else if (typeof b[key] === 'object') {
//             const d = vehicleDifferences(a[key], b[key])

//             if ((d && Object.keys(d).length) || JSON.stringify(a[key]) !== JSON.stringify(b[key])) {
//                differences[key] = d
//             }
//          } else if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) {
//             differences[key] = b[key]
//          }

//          return differences
//       },
//       {}
//    )
// }
