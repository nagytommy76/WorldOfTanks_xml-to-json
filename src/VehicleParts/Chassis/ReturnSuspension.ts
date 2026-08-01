async function getSuspension(tankId: string, suspensionId: string) {
   const suspensionResponse = await fetch(
      `https://api.worldoftanks.eu/wot/encyclopedia/vehicleprofile/?application_id=${process.env.WOT_APP_ID}&tank_id=${tankId}&suspension_id=${suspensionId}&fields=suspension`,
      { method: 'GET' },
   )

   const JSON = await suspensionResponse.json()
   return (await JSON).data
}

export default async function ReturnChassisName(tank_id: number, suspensionIds: number[]) {
   let chassisName = new Map<string, string>()

   for (const suspensionId of suspensionIds) {
      const suspension = await getSuspension(tank_id.toString(), suspensionId.toString())

      chassisName.set(suspension[tank_id].suspension.tag, suspension[tank_id].suspension.name)
   }
   return chassisName
}
