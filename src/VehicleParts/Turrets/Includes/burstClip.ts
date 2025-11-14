import { toNumber, toNumberArray } from '@Utils/xmlHelper'
import convertedJSON from '@Utils/convertedJson'

import { IGuns, IShells } from '@Types/Modules'

export default function ReturnBurstClip(clipAndBurst: any) {
   const count = toNumber(clipAndBurst.clip?.count)
   const rate = toNumber(clipAndBurst.clip?.rate)
   let clip = null
   if (count !== undefined && rate !== undefined) {
      clip = { count: count, rate: rate }
   }

   const burstCount = toNumber(clipAndBurst.burst?.count)
   const burstRate = toNumber(clipAndBurst.burst?.rate)
   const burstSyncReloading = clipAndBurst.burst?.syncReloading === 'true' ? true : false
   let burst = null
   if (burstCount !== undefined && burstRate !== undefined) {
      burst = {
         count: burstCount,
         rate: burstRate,
         syncReloading: burstSyncReloading,
      }
   }

   return { clip, burst }
}
