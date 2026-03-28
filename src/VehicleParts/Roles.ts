import { toNumberArray } from '@/src/utils/xmlHelper'

const supplySlotTypes = new Map<number, string>([
   [2, 'mobility'],
   [3, 'stealth'],
   [4, 'firepower'],
   [5, 'survivability'],
])

export default function ReturnSupplyRoles(rawJSON: any) {
   let supplySlots: string | null = null
   let customRoleSlotOptions: string[] | null = null

   if (rawJSON?.supplySlots) {
      const supplySlotsXML = toNumberArray(rawJSON.supplySlots as string)
      if (supplySlotsXML && supplySlotsXML.length > 0) {
         supplySlots = supplySlotTypes.get(supplySlotsXML[0]) || null
      }
   }

   if (rawJSON?.customRoleSlotOptions) {
      const supplySlotsXML = toNumberArray(rawJSON.customRoleSlotOptions as string)
      if (supplySlotsXML && supplySlotsXML.length > 0) {
         customRoleSlotOptions = supplySlotsXML
            .map((slot) => supplySlotTypes.get(slot))
            .filter(Boolean) as string[]
      }
   }

   return { supplySlots, customRoleSlotOptions }
}
