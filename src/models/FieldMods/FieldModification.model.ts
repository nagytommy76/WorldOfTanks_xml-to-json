import mongoose, { Schema } from 'mongoose'
import type {
   IModifierOp,
   IFieldModification,
   IPairModification,
   IBaseModification,
   IPairOption,
} from './FieldModificationTypes'

const modifierOpSchema = new Schema<IModifierOp>(
   {
      operation: { type: String, enum: ['mul', 'add'], required: true },
      name: { type: String, required: true },
      value: { type: Number, required: true },
   },
   { _id: false }, // ← never queried standalone; no ObjectId needed
)

// ─────────────────────────────────────────────────────────────────
// Base schema — shared fields only (the discriminator key lives here)
//
//   Tree steps mix base and pair references freely. With a discriminator:
//     → ONE collection, ONE query:
//       FieldModification.find({ key: { $in: allKeysFromTree } })
//   Without it we'd need to branch on step.action.type before deciding
//   which model to call, and do two separate round-trips.
// ─────────────────────────────────────────────────────────────────
const fieldModificationSchema = new Schema<IFieldModification>(
   {
      key: { type: String, required: true, unique: true },
      kind: { type: String, required: true, enum: ['base', 'pair'] },
   },
   {
      collection: 'fieldModifications',
      discriminatorKey: 'kind', // ← Mongoose stores this in the document
      //   and uses it to pick the right shape on read
   },
)

// Explicit index declaration (unique already creates one, but this makes
// intent clear and lets us tune the index independently later)
fieldModificationSchema.index({ key: 1 })

export const FieldModification = mongoose.model<IFieldModification>(
   'FieldModification',
   fieldModificationSchema,
)

// ─────────────────────────────────────────────────────────────────
// 'base' discriminator — adds the base-only fields
// ─────────────────────────────────────────────────────────────────
export const BaseModification = FieldModification.discriminator<IBaseModification>(
   'base',
   new Schema({
      xmlId: { type: Number, required: true },
      locName: { type: String, required: true },
      modifiers: { type: [modifierOpSchema], required: true },
      kpi: { type: [modifierOpSchema], required: true },
   }),
)

// ─────────────────────────────────────────────────────────────────
// 'pair' discriminator — adds the pair-only fields
// ─────────────────────────────────────────────────────────────────
const pairOptionSchema = new Schema<IPairOption>(
   {
      xmlId: { type: Number, required: true },
      imgName: { type: String, required: true },
      modifiers: { type: [modifierOpSchema], required: true },
      kpi: { type: [modifierOpSchema], required: true },
   },
   { _id: false }, // ← an option is always embedded in its pair document
)

export const PairModification = FieldModification.discriminator<IPairModification>(
   'pair',
   new Schema({
      options: {
         type: [pairOptionSchema],
         required: true,
         validate: {
            // There are exactly 2 options per pair — enforce this at DB level
            validator: (arr: unknown[]) => arr.length === 2,
            message: 'A pair modification must have exactly 2 options.',
         },
      },
   }),
)
