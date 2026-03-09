import { DeviceModel } from '@Models/DevicesModel'

import type { IDeluxeDevice, IPrice } from '@Types/Devices'

import Devices from '@/Classes/Devices/Devices'

function extractPrice(price: IPrice, currencyName: 'crystal' | 'credits' | 'equipCoin' = 'crystal'): number {
   switch (currencyName) {
      case 'credits':
         return Number(price)
      default:
         return Number(price['#text'])
   }
}

export default async function UploadSingleDevice(
   device: IDeluxeDevice,
   deviceName: string,
   foundAPIDevice: {
      name: string
      provision_id: number
      tag: string
   },
   currencyName: 'crystal' | 'credits' | 'equipCoin' = 'crystal',
) {
   const vehicleLevel = device.vehicleFilter

   const price = { [currencyName]: extractPrice(device.price, currencyName) }

   const DeluxeDevices = new Devices({
      id: foundAPIDevice.provision_id,
      icon: device.icon,
      displayName: foundAPIDevice.name,
      name: deviceName,
      price,
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

   if (device.kpi?.mul) {
      DeluxeDevices.setModifiers(device.kpi.mul)
   }

   if (device.kpi?.aggregateMul) {
      DeluxeDevices.setAggregateModifiers(device.kpi.aggregateMul)
   }

   if (device.incompatibleTags) {
      DeluxeDevices.setIncompatibleTags(device.incompatibleTags)
   }

   const deluxeDeviceModel = new DeviceModel(DeluxeDevices)

   await deluxeDeviceModel.save()

   console.log(`${deluxeDeviceModel.name} has been uploaded to DB`)
}
