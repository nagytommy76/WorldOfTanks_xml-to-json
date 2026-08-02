async function getEngines(tankId: string, engineId: string) {
   const engineResponse = await fetch(
      `https://api.worldoftanks.eu/wot/encyclopedia/vehicleprofile/?application_id=${process.env.WOT_APP_ID}&tank_id=${tankId}&engine_id=${engineId}&fields=engine`,
      { method: 'GET' },
   )

   const JSON = await engineResponse.json()
   return await JSON
}

export default async function ReturnEngineName(tank_id: number, engineIds: number[]) {
   let engineName = new Map<string, string>()

   for (const engineId of engineIds) {
      const engine = await getEngines(tank_id.toString(), engineId.toString())
      if (engine.status === 'ok') {
         engineName.set(engine.data[tank_id].engine.tag, engine.data[tank_id].engine.name)
      }
   }
   return engineName
}
