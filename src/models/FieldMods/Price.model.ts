import mongoose, { Schema, Model } from 'mongoose'
import { ITierPrice, IFieldModificationPrice, PRICE_CURRENCIES } from './price.types'

// Sub-schema: never queried on its own, so no _id per entry
const tierPriceSchema = new Schema<ITierPrice>(
   {
      tier: { type: Number, required: true, min: 6, max: 11 }, // level_11 exists in the XML
      amount: { type: Number, required: true, min: 0 }, // 0 is valid (unlockPairModificationCost)
      currency: { type: String, required: true, enum: PRICE_CURRENCIES },
   },
   { _id: false },
)

const fieldModificationPriceSchema = new Schema<IFieldModificationPrice>(
   {
      // unique: true also creates the index used by the tree-step → price lookup
      key: { type: String, required: true, unique: true, trim: true },
      prices: {
         type: [tierPriceSchema],
         required: true,
         validate: [
            {
               // An empty price table means the XML (or the parser) broke
               validator: (tierPrices: ITierPrice[]) => tierPrices.length > 0,
               message: 'At least one tier price is required.',
            },
            {
               // Each tier may appear only once per key, otherwise lookups are ambiguous
               validator: (tierPrices: ITierPrice[]) =>
                  new Set(tierPrices.map((tierPrice) => tierPrice.tier)).size === tierPrices.length,
               message: 'Duplicate tier in prices.',
            },
         ],
      },
   },
   { collection: 'fieldModificationPrices' },
)

export const FieldModificationPrice: Model<IFieldModificationPrice> = mongoose.model<IFieldModificationPrice>(
   'FieldModificationPrice',
   fieldModificationPriceSchema,
)
