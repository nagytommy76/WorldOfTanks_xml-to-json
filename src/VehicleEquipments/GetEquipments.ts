import { readFile } from 'fs/promises'
import xmlParser from '@Utils/xmlParser'
import { EquipmentModel } from '@Models/EquipmentModel'
import connectDB from '@/Config/connectDB'

import Equipment from '@/Classes/Equipment'

import fetchEquipments from '@Utils/fetchEquipments'

export default async function Equipments() {
   await connectDB()
   const equipmentsFromWGAPI = await fetchEquipments()
   const equipmentsByTag = new Map(Object.values(equipmentsFromWGAPI).map((e) => [e.tag, e]))

   const vehicleEquipmentsXML = await readFile('./XML/common/equipments/vehicle_equipments.xml', 'utf-8')
   const vehicleEquipmentsJSON = xmlParser.parse(vehicleEquipmentsXML)['vehicle_equipments.xml'] as any

   for (const [equipmentName, equipment] of Object.entries(vehicleEquipmentsJSON) as any) {
      if (equipmentName === 'removedRpmLimiter' || equipmentName === 'afterburning') continue
      const foundAPIEquipment = equipmentsByTag.get(equipmentName)
      if (!foundAPIEquipment) continue

      const vehicleEquipment = new Equipment({
         id: foundAPIEquipment.provision_id,
         icon: equipment.icon,
         price: Number(equipment.price),
         name: equipmentName,
         displayName: foundAPIEquipment.name,
         description: foundAPIEquipment.description,
      })

      if (equipment.vehicleFilter?.include?.nations) {
         vehicleEquipment.nationFilter = equipment.vehicleFilter.include.nations
      }

      if (equipment.kpi.mul) {
         vehicleEquipment.setModifiers(equipment.kpi.mul)
      }

      const newEquipment = new EquipmentModel({
         id: vehicleEquipment.id,
         icon: vehicleEquipment.icon,
         price: vehicleEquipment.price,
         name: vehicleEquipment.name,
         description: vehicleEquipment.description,
         modifiers: vehicleEquipment.modifiers,
         nationFilter: vehicleEquipment.nationFilter,
      })

      await newEquipment.save()

      console.log(`${vehicleEquipment.name} has been uploaded to DB`)
   }
}
