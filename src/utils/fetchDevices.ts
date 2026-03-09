import 'dotenv/config'

export default async function fetchDevices() {
   const fetchedJSONEquipments = await fetch(
      `https://api.worldoftanks.eu/wot/encyclopedia/provisions/?application_id=${process.env.WOT_APP_ID}&fields=provision_id%2Cname%2Ctag`,
      { method: 'GET' },
   )
   const response = (await fetchedJSONEquipments.json()) as Promise<{
      data: {
         [provision_id: string]: {
            name: string
            provision_id: number
            tag: string
         }
      }
   }>
   return (await response).data
}
