import 'dotenv/config'

export default async function fetchModuleNames(tankId: string) {
   const fetchedJSON = await fetch(
      `https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=${process.env.WOT_APP_ID}&fields=radios%2Csuspensions%2Cengines%2Cguns%2Cturrets&tank_id=${tankId}`,
      { method: 'GET' },
   )
   const response = (await fetchedJSON.json()) as Promise<{
      data: {
         [tank_id: string]: {
            radios: number[]
            engines: number[]
            guns: number[]
            suspensions: number[]
            turrets: number[]
         }
      }
   }>
   return (await response).data
}
