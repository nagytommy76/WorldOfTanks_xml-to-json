async function getTurrets(tankId: string, turretId: string) {
   const suspensionResponse = await fetch(
      `https://api.worldoftanks.eu/wot/encyclopedia/vehicleprofile/?application_id=${process.env.WOT_APP_ID}&tank_id=${tankId}&turret_id=${turretId}&fields=turret`,
      { method: 'GET' },
   )

   const JSON = await suspensionResponse.json()
   return await JSON
}

export default async function ReturnTurretName(tank_id: number, turretIds: number[]) {
   let turretName = new Map<string, string>()

   for (const turretId of turretIds) {
      const turret = await getTurrets(tank_id.toString(), turretId.toString())
      if (turret.status === 'ok') {
         turretName.set(turret.data[tank_id].turret.tag, turret.data[tank_id].turret.name)
      }
   }
   return turretName
}
