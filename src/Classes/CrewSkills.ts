export type CrewSkillsType = 'situational' | 'commanderSpecial' | 'common'

export type CrewSkillModifier = {
   measureType: 'seconds' | 'percent'
   situationalParam: boolean
   paramName: string
   value: number
}

type CrewSkillRoles = 'commander' | 'gunner' | 'driver' | 'radioman' | 'loader' | 'common'

export default class CrewSkills {
   /**
    * @param {CrewSkillRoles} role The role of the crew member that this skill applies to, e.g., "commander", "gunner", "driver", "radioOperator", or "loader". This is used to categorize the crew skill based on the crew member's role in the vehicle.
    */
   public role: CrewSkillRoles
   /**
    * @param {string} xmlName e.g., "armorPatching, brotherhood, commander_tutor". This is used to identify the crew skill in the source XML data.
    */
   public xmlName: string
   /**
    * @param {CrewSkillsType | undefined} typeName The type of the crew skill, can be 'situational', 'commanderSpecial', 'common', or undefined if not specified.
    */
   public typeName: CrewSkillsType | undefined
   /**
    * @param {string} name The name of the crew skill, e.g., "Brothers in Arms". From Wargaming API.
    */
   public name: string | null
   /**
    * @param {string} description The description of the crew skill, e.g., "Increases the experience earned by the crew by 5%." From Wargaming API.
    */
   public description: string
   /**
    * @param {CrewSkillModifier[]} modifiers An array of modifiers that describe the effects of the crew skill, including the type of measurement (seconds or percent), whether it's situational, the parameter name, and the value.
    * @example
    * 
    *<armorPatching>
    *   <arg>
            <situationalParam>	true	</situationalParam>
            <paramName>	hpRecover	</paramName>
            <measureType>	percents	</measureType>
            <value>	0.0005	</value>
        </arg>
    </armorPatching>
    * 
    */
   public modifiers: CrewSkillModifier[]

   constructor({
      description,
      modifiers,
      name,
      role,
      typeName,
      xmlName,
   }: {
      xmlName: string
      typeName: CrewSkillsType | undefined
      name: string | null
      description: string
      modifiers: CrewSkillModifier[]
      role: CrewSkillRoles
   }) {
      this.typeName = typeName
      this.name = name
      this.description = description
      this.modifiers = modifiers
      this.xmlName = xmlName
      this.role = role
   }
}
