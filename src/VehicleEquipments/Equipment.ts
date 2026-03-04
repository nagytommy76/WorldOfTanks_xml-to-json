/**
 * @description Modifier values from XML -> kpi -> mul -> name/value
 */
interface IModifier {
   name: string
   value: number
}

/**
 * @description Nation filter for extra rations ( cocacola, chocolate, etc.)
 */
interface IVehicleNationFilter {
   nation: string
}

type XMLModifiers = {
   kpi: {
      mul: IModifier[]
   }
}

/**
 * @param {number} id provision_id from WG API
 * @param {string} icon icon name (use for find icons in public/icons folder (largeMedkit.jpg))
 * @param {number} price credit price
 * @param {string} name full name of the equipment (Manual Fire Extinguisher from WG API)
 * @param {string} description description of the equipment from WG API
 * @param {string} tag XML name of the equipment (largeMedkit, handExtinguishers ration_poland)
 */
export default class Equipment {
   id: number
   icon: string
   price: number
   name: string
   tag: string
   description: string

   private modifiers?: IModifier[]
   private nationFilters?: IVehicleNationFilter[]

   constructor(id: number, icon: string, price: number, name: string, description: string, tag: string) {
      this.id = id
      this.icon = icon
      this.price = price
      this.name = name
      this.description = description
      this.tag = tag
   }

   private setModifiers(modifiers: IModifier[]) {
      this.modifiers = modifiers
   }

   private setNationFilters(nationFilters: IVehicleNationFilter[]) {
      this.nationFilters = nationFilters
   }

   getModifiers() {
      return this.modifiers
   }

   getNationFilters() {
      return this.nationFilters
   }

   setModifiersFromXML(xmlModifiers: XMLModifiers) {}
}

/**
 *   <kpi>
      <mul>
        <name>	crewHitChance	</name>
        <value>	1.15	</value>
      </mul>
      <mul>
        <name>	crewStunDuration	</name>
        <value>	0.95	</value>
      </mul>
    </kpi>
 */
