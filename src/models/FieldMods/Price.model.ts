import mongoose, { Schema, Document } from 'mongoose'

interface IModificationCost extends Document {
   modificationType:
      | 'buyPairModificationCost'
      | 'unlockBaseModificationCost'
      | 'unlockPairModificationCost'
      | 'Modification10000xp'
      | 'Modification20000xp'
      | 'Modification25000xp'
      | 'Modification30000xp'
      | 'Modification40000xp'
   currency: 'credits' | 'xp'
   level: number
   price: number
}

const modificationCostSchema = new Schema<IModificationCost>({
   modificationType: {
      type: String,
      enum: [
         'buyPairModificationCost',
         'unlockBaseModificationCost',
         'unlockPairModificationCost',
         'Modification10000xp',
         'Modification20000xp',
         'Modification25000xp',
         'Modification30000xp',
         'Modification40000xp',
      ],
   },
   currency: { type: String, enum: ['credits', 'xp'] },
   level: Number,
   price: Number,
})

export const Price = mongoose.model('Price', modificationCostSchema, 'prices')
