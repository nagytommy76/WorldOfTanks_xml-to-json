async function getRadios(tankId: string, radioId: string) {
   const radioResponse = await fetch(
      `https://api.worldoftanks.eu/wot/encyclopedia/vehicleprofile/?application_id=${process.env.WOT_APP_ID}&tank_id=${tankId}&radio_id=${radioId}&fields=radio`,
      { method: 'GET' },
   )

   const JSON = await radioResponse.json()
   return await JSON
}

export default async function ReturnRadioName(tank_id: number, radioIds: number[]) {
   let radioName = new Map<string, string>()

   for (const radioId of radioIds) {
      const radio = await getRadios(tank_id.toString(), radioId.toString())
      if (radio.status === 'ok') {
         radioName.set(radio.data[tank_id].radio.tag, radio.data[tank_id].radio.name)
      }
   }
   return radioName
}
