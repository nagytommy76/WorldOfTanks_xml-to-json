import type { IModifierOp } from '@Models/FieldMods/FieldModificationTypes'
import type { MulXMLModifier } from './FieldMod.types'

export default function parseKpiModifiers(section: {
   mul?: MulXMLModifier[] | MulXMLModifier
   add?: MulXMLModifier[] | MulXMLModifier
}): IModifierOp[] {
   const ops: IModifierOp[] = []

   // Normalize single XML elements and repeated XML elements to arrays.
   const mulModifiers = section.mul ? (Array.isArray(section.mul) ? section.mul : [section.mul]) : []
   for (const op of mulModifiers) {
      ops.push({
         operation: 'mul',
         name: String(op.name).trim(),
         value: Number(op.value),
      })
   }

   // Iterate add operations
   const addModifiers = section.add ? (Array.isArray(section.add) ? section.add : [section.add]) : []
   for (const op of addModifiers) {
      ops.push({
         operation: 'add',
         name: String(op.name).trim(),
         value: Number(op.value),
      })
   }

   return ops
}
