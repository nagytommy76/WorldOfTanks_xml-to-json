import fetchDevices from '@Utils/fetchDevices'

import type { DeluxeDevicesXML, DeviceTypes, IPrice } from '@Types/Devices'

import connectDB from '@/Config/connectDB'

import UploadSingleDevice from './UploadSingleDevice'
import parseXMLFile from './ParseXMLFile'

type CurrencyType = 'crystal' | 'credits' | 'equipCoin' | 'dynamic'

interface DeviceSource {
   data: DeluxeDevicesXML
   currency: CurrencyType // 'dynamic' = determine at runtime like battle boosters
   deviceType: DeviceTypes
}

export default async function UploadDevices() {
   try {
      await connectDB()
      const fetchedDevices = await fetchDevices()
      const devicesMap = new Map(Object.values(fetchedDevices).map((e) => [e.tag, e]))

      const [
         deluxeDevicesJSON,
         tieredDevicesJSON,
         bountyDevicesJSON,
         battleBoostersJSON,
         // modernizedDevicesJSON,
      ] = await Promise.all([
         parseXMLFile<DeluxeDevicesXML>('./XML/common/optional_devices/deluxe_devices.xml'),
         parseXMLFile<DeluxeDevicesXML>('./XML/common/optional_devices/tiers_devices.xml'),
         parseXMLFile<DeluxeDevicesXML>('./XML/common/optional_devices/trophy_devices.xml'),
         // parseXMLFile<DeluxeDevicesXML>('./XML/common/equipments/battle_boosters.xml'),
         parseXMLFile<DeluxeDevicesXML>('./XML/common/optional_devices/modernized_devices.xml'),
      ])
      const deviceSources: DeviceSource[] = [
         { data: deluxeDevicesJSON, currency: 'crystal', deviceType: 'deluxe' },
         { data: tieredDevicesJSON, currency: 'credits', deviceType: 'tiers' },
         // { data: modernizedDevicesJSON, currency: 'equipCoin', deviceType: 'modernized' },
         { data: bountyDevicesJSON, currency: 'credits', deviceType: 'trophy' },
         { data: battleBoostersJSON, currency: 'dynamic', deviceType: 'boosters' },
      ]

      for (const source of deviceSources) {
         for (const [deviceName, device] of Object.entries(source.data)) {
            const foundAPIDevice = devicesMap.get(deviceName)
            if (!foundAPIDevice) continue

            const currency = returnCurrencyType(source.currency, device.price)

            await UploadSingleDevice(device, deviceName, foundAPIDevice, currency, source.deviceType)
         }
      }
   } catch (error) {
      console.error(error)
   }
}

function returnCurrencyType(currencyType: CurrencyType, devicePrice: IPrice) {
   switch (currencyType) {
      case 'dynamic':
         if (devicePrice.crystal !== undefined) {
            return 'crystal'
         } else {
            return 'credits'
         }
      default:
         return currencyType
   }
}
