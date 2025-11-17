import type { ITankDetails, JSONData } from '@/src/@Types/Modules'

export default function MetaData(baseName: string, fetchedJSONByNation: JSONData): ITankDetails {
   const metaData = {} as ITankDetails
   for (const [tank_id, vehicle] of Object.entries(fetchedJSONByNation as Record<string, ITankDetails>)) {
      if (vehicle.tag.toLowerCase().trim() === baseName.toLowerCase().trim()) {
         metaData.tank_id = Number(tank_id)
         metaData.images = vehicle.images
         metaData.is_gift = vehicle.is_gift
         metaData.is_premium = vehicle.is_premium
         metaData.next_tanks = vehicle.next_tanks || null
         metaData.prices_xp = vehicle.prices_xp || null
         metaData.tag = vehicle.tag
         return metaData
      }
   }

   return metaData
}
