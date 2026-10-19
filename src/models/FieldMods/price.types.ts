import type { Document } from 'mongoose'

export const PRICE_CURRENCIES = ['xp', 'credits'] as const
export type TPriceCurrency = (typeof PRICE_CURRENCIES)[number] // 'xp' | 'credits'

export interface ITierPrice {
   tier: number // vehicle tier, e.g. 10 (from <level_10>)
   amount: number // e.g. 28000
   currency: TPriceCurrency // e.g. 'xp'
}

/**
 * @description
 * One document per price key from prices.xml (8 documents in total).
 * Join with trees: fieldModificationTree.steps[].price === key
 */
export interface IFieldModificationPrice extends Document {
   key: string // e.g. "unlockBaseModificationCost"
   prices: ITierPrice[] // sorted by tier, ascending
}
