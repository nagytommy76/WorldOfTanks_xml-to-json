import { toNumberArray } from '@Utils/xmlHelper'

export default function ReturnWheelAngles(
   physicsChassis:
      | {
           [chassisName: string]: any
        }
      | undefined,
   chassisName: string
) {
   if (!physicsChassis) return null
   if (physicsChassis && physicsChassis[chassisName]) {
      // FOR: WheelAngle in case of wheeled vehicles: F108_Panhard_EBR_105
      if (physicsChassis[chassisName].axleSteeringLockAngles) {
         return toNumberArray(physicsChassis[chassisName].axleSteeringLockAngles)
      }
      // For uk wheeled vehicles: GB120_Concept_No_5
      if (physicsChassis[chassisName].axleSteeringAngles) {
         return toNumberArray(physicsChassis[chassisName].axleSteeringAngles)
      }
   }
}
