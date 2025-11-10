import { toStringArray } from '@Utils/xmlHelper'

export default function GetCrewData(rawJSON: any) {
   const crewData = []
   if (rawJSON?.crew) {
      for (const [key, value] of Object.entries(rawJSON.crew)) {
         crewData.push({
            primary: key,
            secondary: toStringArray(value),
         })
      }
   }
   return crewData
}
