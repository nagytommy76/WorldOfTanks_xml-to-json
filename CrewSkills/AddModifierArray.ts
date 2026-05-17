import { DescriptionArgs } from '@Types/CrewSkills'
import { CrewSkillModifier } from '@/Classes/CrewSkills'

export default function AddModifiersArray(
   modifiersArray: CrewSkillModifier[],
   descriptionArgs: DescriptionArgs,
) {
   return modifiersArray.push({
      measureType: descriptionArgs.measureType as 'percent' | 'seconds',
      paramName: descriptionArgs.paramName,
      value:
         Number(descriptionArgs.value) >= 0
            ? Number(descriptionArgs.value) * 100 + 1
            : Number(descriptionArgs.value) * 100,
      situationalParam: Boolean(descriptionArgs.situationalParam),
   })
}
