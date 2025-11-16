import type { JSONData } from '../@Types/Modules'
import 'dotenv/config'

export default async function fetchMetaData(nation: string) {
   const fetchedJSONByNation = await fetch(
      `https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=${process.env.WOT_APP_ID}&fields=+name%2C+tank_id%2C+images%2C+next_tanks%2C+is_gift%2C+is_premium%2C+prices_xp%2C+tag&
    nation=${nation}`,
      { method: 'GET' }
   )
   const response = (await fetchedJSONByNation.json()) as Promise<{
      data: JSONData
   }>
   return (await response).data
}
