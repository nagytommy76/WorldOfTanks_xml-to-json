import { readFile } from 'fs/promises'
import xmlParser from '@Utils/xmlParser'
import fetchDevices from '@Utils/fetchDevices'

import type { DeluxeDevicesXML } from '@Types/Devices'

// import connectDB from '@/Config/connectDB'

import Devices from '@/Classes/Devices/Devices'

export default async function ReturnDeluxeDevices() {
   try {
      const fetchedDevices = await fetchDevices()
      const deluxeDevicesMap = new Map(Object.values(fetchedDevices).map((e) => [e.tag, e]))

      const deluxeDevicesXML = await readFile('./XML/common/optional_devices/deluxe_devices.xml', 'utf-8')
      const deluxeDevicesJSON = xmlParser.parse(deluxeDevicesXML)['deluxe_devices.xml'] as DeluxeDevicesXML

      const deluxeDevices: Devices[] = []

      for (const [deviceName, device] of Object.entries(deluxeDevicesJSON)) {
         const foundAPIDevice = deluxeDevicesMap.get(deviceName)
         if (!foundAPIDevice) continue
         const vehicleLevel = device.vehicleFilter

         const DeluxeDevices = new Devices({
            id: foundAPIDevice.provision_id,
            icon: device.icon,
            displayName: foundAPIDevice.name,
            name: deviceName,
            price: { crystal: Number(device.price['#text']) },
            vehicleLevel: {
               min: Number(vehicleLevel?.include?.vehicle.minLevel) || 0,
               max: Number(vehicleLevel?.include?.vehicle.maxLevel) || undefined,
            },
         })

         DeluxeDevices.setTagsArray(device.tags)

         if (vehicleLevel) {
            if (vehicleLevel.include) {
               DeluxeDevices.setVehicleIncludeFilterTags(vehicleLevel.include.vehicle.tags as string)
            }
            if (vehicleLevel.exclude) {
               DeluxeDevices.setVehicleExcludeFilterTags(vehicleLevel.exclude.vehicle.mandatoryTags as string)
            }
         }

         if (device.kpi.mul) {
            DeluxeDevices.setModifiers(device.kpi.mul)
         }

         if (device.kpi.aggregateMul) {
            DeluxeDevices.setAggregateModifiers(device.kpi.aggregateMul)
         }

         if (device.incompatibleTags) {
            DeluxeDevices.setIncompatibleTags(device.incompatibleTags)
         }

         deluxeDevices.push(DeluxeDevices)
      }
      return deluxeDevices
   } catch (error) {}
}
