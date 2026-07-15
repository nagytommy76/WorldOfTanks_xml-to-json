const FRICTION_DEVIDE = 0.0805
/**
 *
 * @param chassis physics -> detailed -> chassis
 * @param chassisName e.g: Chassis_GB158_Executor
 * @returns effective number[] of hard/medium/soft terrain resistances
 *
 * @description
 * "There are also several rollingFriction values, which were harder to interpret.
 * My first assumption was that they're, well, friction constants,
 * but it turns out if you divide them by 0.0805 you get a second set of terrain resistance values."
 *
 * @example
 * GB158_Executor
 *
 * XML: <terrainResistance>	1.0 1.35 1.95	</terrainResistance>
 * <grounds>
 *  <soft>
 *       <rollingFriction>	0.15	</rollingFriction>
 *  </soft>
 *  <medium>
 *      <rollingFriction>	0.1	</rollingFriction>
 *  </medium>
 *  <firm>
 *      <rollingFriction>	0.05	</rollingFriction>
 *  </firm>
 * </grounds>
 *
 * soft: 0.15 / 0.0805 = 1,8633
 * medium: 0.1 / 0.0805 = 1,2422
 * hard (firm): 0.05 / 0.0805 = 0,6211
 */
export default function EffectiveTerrain(chassis: any, chassisName: string): number[] | undefined {
   if (chassis[chassisName] && chassis[chassisName].grounds) {
      const chassisGrounds = chassis[chassisName].grounds
      const hardTerrain = chassisGrounds.firm.rollingFriction / FRICTION_DEVIDE
      const mediumTerrain = chassisGrounds.medium.rollingFriction / FRICTION_DEVIDE
      const softTerrain = chassisGrounds.soft.rollingFriction / FRICTION_DEVIDE

      return [hardTerrain, mediumTerrain, softTerrain]
   }
   return undefined
}
