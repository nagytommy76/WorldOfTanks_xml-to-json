// diffJson.ts
type DiffItem = {
   path: string
   normal: unknown
   siege: unknown
}

function isObject(value: unknown): value is Record<string, unknown> {
   return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function diffJson(normal: unknown, siege: unknown, basePath = ''): DiffItem[] {
   // Identical or both NaN etc
   if (Object.is(normal, siege)) return []

   // Primitive or different types
   const normalIsObj = isObject(normal) || Array.isArray(normal)
   const siegeIsObj = isObject(siege) || Array.isArray(siege)

   if (!normalIsObj || !siegeIsObj) {
      return [
         {
            path: basePath || 'root',
            normal,
            siege,
         },
      ]
   }

   // Arrays
   if (Array.isArray(normal) && Array.isArray(siege)) {
      const maxLen = Math.max(normal.length, siege.length)
      const diffs: DiffItem[] = []

      for (let i = 0; i < maxLen; i++) {
         const childPath = `${basePath}[${i}]`
         diffs.push(...diffJson(normal[i], siege[i], childPath))
      }

      return diffs
   }

   // Plain objects
   const diffs: DiffItem[] = []
   const keys = new Set([
      ...Object.keys(normal as Record<string, unknown>),
      ...Object.keys(siege as Record<string, unknown>),
   ])

   for (const key of keys) {
      const childPath = basePath ? `${basePath}.${key}` : key
      const leftVal = (normal as Record<string, unknown>)[key]
      const rightVal = (siege as Record<string, unknown>)[key]

      if (typeof leftVal === 'undefined' && typeof rightVal === 'undefined') {
         continue
      }

      if (Object.is(leftVal, rightVal)) {
         continue
      }
      // console.log('CHILD PATH: ', childPath)

      diffs.push(...diffJson(leftVal, rightVal, childPath))
   }

   return diffs
}
