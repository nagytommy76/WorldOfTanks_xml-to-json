async function getGuns(tankId: string, gunId: string, turretId?: string) {
   try {
      const gunResponse = await fetch(
         `https://api.worldoftanks.eu/wot/encyclopedia/vehicleprofile/?application_id=${process.env.WOT_APP_ID}&tank_id=${tankId}&gun_id=${gunId}${turretId ? `&turret_id=${turretId}` : ``}&fields=gun`,
         { method: 'GET' },
      )

      const JSON = await gunResponse.json()
      return await JSON
   } catch (error) {
      return error
   }
}

export default async function ReturnGunName(tank_id: number, gunIds: number[], turretIds: number[]) {
   let gunName = new Map<string, string>()

   if (turretIds.length > 0) {
      for (const turretId of turretIds) {
         for (const gunId of gunIds) {
            const gun = await getGuns(tank_id.toString(), gunId.toString(), turretId.toString())
            if (gun.status === 'ok') {
               gunName.set(gun.data[tank_id]?.gun.tag, gun.data[tank_id]?.gun.name)
            }
         }
      }
   } else {
      for (const gunId of gunIds) {
         const gun = await getGuns(tank_id.toString(), gunId.toString())
         if (gun.status === 'ok') {
            gunName.set(gun.data[tank_id]?.gun.tag, gun.data[tank_id]?.gun.name)
         }
      }
   }

   return gunName
}
