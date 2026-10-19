import parseXMLFile from '@/src/VehicleEquipments/ParseXMLFile'
import { PRICE_CURRENCIES, type ITierPrice, type TPriceCurrency } from '@Models/FieldMods/price.types'

// <level_10>	28000	<xp></xp></level_10>:
//  { "#text": 28000, "xp": "" }
// The number lands in "#text"; the currency is the NAME of the other key.
type RawTierPrice = { '#text'?: number | string } & Record<string, unknown>

export interface FieldModificationPriceInput {
   key: string
   prices: ITierPrice[]
}

// Matches "level_10" and captures the tier number
const tierTagPattern = /^level_(\d+)$/

// Type guard: narrows a plain string to 'xp' | 'credits'
function isPriceCurrency(value: string): value is TPriceCurrency {
   return (PRICE_CURRENCIES as readonly string[]).includes(value)
}

/**
 * Converts one <level_N> node into { tier, amount, currency }.
 * Throws on anything unexpected: a patch that changes the format should stop the seed,
 * not quietly write wrong prices to the database.
 */
function parseTierPrice(priceKey: string, tierTag: string, raw: unknown): ITierPrice {
   const tierMatch = tierTagPattern.exec(tierTag)
   if (!tierMatch) {
      throw new Error(`"${priceKey}": unexpected tag <${tierTag}>, expected <level_N>`)
   }
   const tier = Number(tierMatch[1])

   // If there is no currency tag, the parser returns a bare number instead of an object
   if (typeof raw !== 'object' || raw === null) {
      throw new Error(`"${priceKey}" <${tierTag}>: missing currency marker`)
   }
   const node = raw as RawTierPrice

   const amount = Number(node['#text'])
   if (node['#text'] === undefined || Number.isNaN(amount)) {
      throw new Error(`"${priceKey}" <${tierTag}>: missing or invalid amount`)
   }

   // Every key except "#text" is a currency marker; there must be exactly one
   const currencyMarkers = Object.keys(node).filter((nodeKey) => nodeKey !== '#text')
   if (currencyMarkers.length !== 1) {
      throw new Error(
         `"${priceKey}" <${tierTag}>: expected 1 currency marker, found [${currencyMarkers.join(', ')}]`,
      )
   }

   const currency = currencyMarkers[0]
   if (!isPriceCurrency(currency)) {
      throw new Error(`"${priceKey}" <${tierTag}>: unknown currency "${currency}"`)
   }

   return { tier, amount, currency }
}

export default async function FieldModPrice() {
   console.log('\n💰 Parsing prices.xml...')
   const priceXML = await parseXMLFile<Record<string, Record<string, unknown>>>(
      './XML/common/post_progression/prices.xml',
   )

   const convertedPrices = Object.entries(priceXML).map(([priceKey, tierNodes]) => ({
      key: priceKey,
      prices: Object.entries(tierNodes)
         .map(([tierTag, rawTierPrice]) => parseTierPrice(priceKey, tierTag, rawTierPrice))
         .sort((first, second) => first.tier - second.tier), // stable order in the DB
   }))

   console.log('CONVERTED PRICES: ', convertedPrices[5].prices)
}
