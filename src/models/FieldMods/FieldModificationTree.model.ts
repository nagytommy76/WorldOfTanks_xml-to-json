import mongoose, { Document, Schema } from 'mongoose'
import type { ITierRange, IStepAction, TStepActionType, ITreeStep, IFieldModificationTree } from './TreeTypes'

const tierRangeSchema = new Schema<ITierRange>(
   {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
   },
   { _id: false },
)

const stepActionSchema = new Schema<IStepAction>(
   {
      type: {
         type: String,
         enum: ['feature', 'modification', 'pair_modification'] as TStepActionType[],
         required: true,
      },
      value: { type: String, required: true },
   },
   { _id: false },
)

const treeStepSchema = new Schema<ITreeStep>(
   {
      id: { type: Number, required: true },
      level: { type: Number, required: true, min: 1, max: 8 },
      price: {
         type: String,
         enum: ['unlockBaseModificationCost', 'unlockPairModificationCost'],
         required: true,
      },
      action: { type: stepActionSchema, required: true },
      unlocks: { type: [Number], default: [] },
      tierRange: { type: tierRangeSchema, default: null },
   },
   { _id: false }, // ← steps are always read as part of their parent tree
)

const fieldModificationTreeSchema = new Schema<IFieldModificationTree>(
   {
      role: { type: String, required: true, unique: true },
      xmlId: { type: Number, required: true, unique: true },
      rootStep: { type: Number, required: true },
      steps: { type: [treeStepSchema], required: true },
   },
   { collection: 'fieldModificationTrees' },
)

// This is the hot path: every vehicle page does findOne({ role })
fieldModificationTreeSchema.index({ role: 1 })

export const FieldModificationTree = mongoose.model<IFieldModificationTree>(
   'FieldModificationTree',
   fieldModificationTreeSchema,
)
