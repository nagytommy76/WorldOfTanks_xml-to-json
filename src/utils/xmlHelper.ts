export function toNumber(value: any): number | undefined {
   if (value == null) return undefined
   if (typeof value === 'number') return value

   if (typeof value === 'string') {
      const n = Number(value.trim().replace(',', '.'))
      return Number.isNaN(n) ? undefined : n
   }

   // mixed node, eg { value: "5", vehicleDamageFactor: 0 }
   if (typeof value === 'object' && 'value' in value) {
      return toNumber((value as any).value)
   }

   return undefined
}

export function toNumberArray(value: any): number[] {
   if (value == null) return []
   if (typeof value === 'string') {
      return value
         .trim()
         .split(/\s+/)
         .map((v) => Number(v.replace(',', '.')))
         .filter((v) => !Number.isNaN(v))
   }

   // if it already parsed into array somehow
   if (Array.isArray(value)) {
      return value.map((v) => (typeof v === 'number' ? v : Number(String(v)))).filter((v) => !Number.isNaN(v))
   }

   if (typeof value === 'object' && 'value' in value) {
      return toNumberArray((value as any).value)
   }

   return []
}

export function toStringArray(value: any): string[] {
   if (value == null) return []
   if (typeof value === 'string') {
      return value.trim().split(/\s+/).filter(Boolean)
   }
   if (typeof value === 'object' && 'value' in value) {
      return toStringArray((value as any).value)
   }
   return []
}
