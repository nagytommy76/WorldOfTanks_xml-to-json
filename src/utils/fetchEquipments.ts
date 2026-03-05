import 'dotenv/config'

export default async function fetchEquipments() {
   const fetchedJSONByNation = await fetch(
      `https://api.worldoftanks.eu/wot/encyclopedia/provisions/?application_id=${process.env.WOT_APP_ID}&type=equipment&fields=provision_id%2Cdescription%2Cname%2Ctag`,
      { method: 'GET' },
   )
   const response = (await fetchedJSONByNation.json()) as Promise<{
      data: {
         [provision_id: string]: {
            description: string
            name: string
            provision_id: number
            tag: string
         }
      }
   }>
   return (await response).data
}
