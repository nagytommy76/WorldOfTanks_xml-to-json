import type { XMLCrewSKills } from '@Types/CrewSkills'

import CrewSkills, { type CrewSkillsType, type CrewSkillModifier } from '@/Classes/CrewSkills'

import parseXMLFile from '@/src/VehicleEquipments/ParseXMLFile'

export default async function UploadCrewSkills() {
   const crewSkillsXML = await parseXMLFile<{ skills: XMLCrewSKills }>('./XML/common/tankmen.xml')

   // console.log(crewSkillsXML.skills.gunner_rancorous.UISettings)
   // console.log(crewSkillsXML.skills.gunner_focus.UISettings.descr.arg)

   for (const [skillName, skill] of Object.entries(crewSkillsXML.skills)) {
      let modifiers: CrewSkillModifier[] | undefined = undefined
      modifiers = []
      if (Array.isArray(skill.UISettings.descr.arg)) {
         skill.UISettings.descr.arg.forEach((argument) => {
            modifiers?.push({
               measureType: argument.measureType as 'percent' | 'seconds',
               paramName: argument.paramName,
               value:
                  Number(argument.value) >= 0
                     ? Number(argument.value) * 100 + 1
                     : Number(argument.value) * 100,
               situationalParam: Boolean(argument.situationalParam),
            })
         })
      } else {
         modifiers.push({
            measureType: skill.UISettings.descr.arg.measureType as 'percent' | 'seconds',
            paramName: skill.UISettings.descr.arg.paramName,
            value:
               Number(skill.UISettings.descr.arg.value) >= 0
                  ? Number(skill.UISettings.descr.arg.value) * 100 + 1
                  : Number(skill.UISettings.descr.arg.value) * 100,
            situationalParam: Boolean(skill.UISettings.descr.arg.situationalParam),
         })
      }

      const skillInstance = new CrewSkills({
         description: 'desc FROM WG API',
         name: 'name FROM WG API',
         role: skillName.split('_')[0] as CrewSkills['role'],
         typeName: skill.UISettings.typeName as CrewSkillsType,
         xmlName: skillName,
         modifiers: modifiers,
      })

      console.log(skillName, skillInstance)
   }
}
