import type { XMLCrewSKills } from '@Types/CrewSkills'

import CrewSkills, { type CrewSkillsType, type CrewSkillModifier } from '@/Classes/CrewSkills'
import fetchCrewSkills from '@Utils/fetchCrewSkills'
import { CrewSkillModel } from '@Models/CrewSkillModel'
import connectDB from '@/Config/connectDB'

import parseXMLFile from '@/src/VehicleEquipments/ParseXMLFile'
import skillDescriptions from './SkillDescriptions'
import AddModifiersArray from './AddModifierArray'

export default async function UploadCrewSkills() {
   await connectDB()
   try {
      const crewSkillsXML = await parseXMLFile<{ skills: XMLCrewSKills }>('./XML/common/tankmen.xml')
      const fetchedCrewSkills = await fetchCrewSkills()
      for (let [skillName, skill] of Object.entries(crewSkillsXML.skills)) {
         if (skillName === 'commander_sixthSense' || skillName === 'armorPatching') continue
         if (skillName === 'fireFighting') skillName = 'radioman_fireFighting'
         const role =
            skill.UISettings.typeName === 'common'
               ? 'common'
               : (skillName.split('_')[0] as CrewSkills['role'])

         let modifiers: CrewSkillModifier[] | undefined = undefined
         modifiers = []
         if (Array.isArray(skill.UISettings.descr.arg)) {
            skill.UISettings.descr.arg.forEach((argument) => {
               AddModifiersArray(modifiers, argument)
            })
         } else {
            AddModifiersArray(modifiers, skill.UISettings.descr.arg)
         }

         const skillInstance = new CrewSkills({
            description: skillDescriptions[skillName],
            name: fetchedCrewSkills[skillName]?.name || null,
            role,
            typeName: skill.UISettings.typeName as CrewSkillsType,
            xmlName: skillName,
            modifiers: modifiers,
         })

         const crewModel = new CrewSkillModel(skillInstance)

         await crewModel.save()

         console.log(`${crewModel.xmlName} has been succesfully uploaded to DB`)
      }
   } catch (error) {
      console.error(error)
   }
}
