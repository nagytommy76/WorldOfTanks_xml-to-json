const skillDescriptions: { [skillName: string]: string } = {
   repair:
      "When fully trained for all crew members, increases the repair speed of the vehicle's damaged modules by 80%.",
   camouflage: 'When fully trained for all crew members, increases vehicle concealment by 80%.',
   brotherhood:
      'When fully trained for all crew members, increases the crew efficiency bonus of the entire crew by 5%.',
   armorPatching: '',
   commander_tutor:
      'When fully trained, increases the amount of XP earned by 20% for all crew members. Enables the Commander to replace knocked-out members with 65% effectiveness.',
   commander_coordination:
      'When fully trained, increases aiming speed by 12.5% for 15 s after you spot an enemy vehicle.',
   commander_enemyShotPredictor:
      'When fully trained, issues an alert about enemy SPG fire with a 0.1 s delay and identifies the direction of the shot. Decreases the negative effect of stunning by 10%.',
   commander_eagleEye:
      'When fully trained, increases view range by 2% and reduces the penalty to damaged observation devices by 20%.',
   commander_emergency:
      'When fully trained, increases the crew efficiency bonus by 5% for 15 s after receiving damage from an enemy.',
   commander_practical: 'When fully trained, decreases consumable cooldown time by 15%.',
   commander_holdLine:
      'When fully trained, increases the crew efficiency bonus by 5% while the enemy team has at least three more vehicles in battle than yours.',
   commander_staySharp:
      'When fully trained, increases the crew efficiency bonus by 5% for 15 s after using a First Aid Kit. Allows a First Aid Kit to be used even if no crew members are injured.',
   driver_smoothDriving: 'When fully trained, decreases gun dispersion when firing on the move by 4%.',
   driver_virtuoso: 'When fully trained, increases hull traverse speed by 5%.',
   driver_badRoadsKing:
      'When fully trained, reduces speed loss on moderately soft terrain by 5%, reduces speed loss on soft terrain to 100% of the moderately soft terrain resulting value.',
   driver_rammingMaster:
      'When fully trained, increases ramming damage to enemy vehicles by 20%. Reduces ramming damage to your vehicle by 25%, and to your suspension by 50%.',
   driver_motorExpert:
      'When fully trained, increases the top forward and reverse speed of your vehicle by 1 km/h. Reduces the penalty to a damaged engine by 20%.',
   driver_reliablePlacement:
      'When fully trained, increases HE shell damage absorption by 15%. Reduces the chance of engine fire by 15% and damage to your suspension by 15%.',
   driver_suspensionRepair:
      'When fully trained, increases suspension repair speed by 15% at distances of less than 50 m from an allied vehicle.',
   driver_bulletproof:
      "When fully trained, increases the crew efficiency bonus by 5% if the amount of damage you block exceeds your vehicle's initial hit points.",
   gunner_smoothTurret: 'When fully trained, decreases gun dispersion during turret rotation by 7.5%.',
   gunner_armorer:
      'When fully trained, reduces the ranges of potential damage and potential penetration by ±5%. Decreases gun dispersion by 1.5%.',
   gunner_sniper:
      'When fully trained, increases the chance of critically damaging enemy vehicle modules and injuring enemy crew members with all types of shells by 3%.',
   gunner_rancorous:
      "When fully trained, increases the time before an enemy vehicle is no longer visible inside the Gunner's viewing area by 2 s. Enables the identification of damaged modules with a 0.5 s delay.",
   gunner_focus: 'When fully trained, decreases the gun dispersion of a stationary vehicle by 3.5%.',
   gunner_quickAiming: 'When fully trained, increases aiming speed and turret traverse speed by 2.5%.',
   gunner_loneWolf:
      'When fully trained, decreases gun dispersion and increases aiming speed by 5% while there are no allied vehicles within a 300 m radius.',
   gunner_pointBlast:
      'When fully trained, increases maximum potential penetration by 5% when firing at enemy vehicles less than 50 m away.',
   loader_pedant: 'When fully trained, increases ammo rack durability by 25%.',
   loader_desperado:
      'When fully trained, decreases gun loading time by 5% if your vehicle has under 25% of its hit points left.',
   loader_intuition: 'When fully trained, decreases the time of changing shell types in a loaded gun by 60%.',
   loader_perfectCharge: 'When fully trained, increases shell velocity by 10%.',
   loader_melee:
      'When fully trained, decreases gun loading time by 2.5% at distances of less than 50 m from the enemy vehicle.',
   loader_ammunitionImprove:
      'When fully trained, increases minimum potential damage and minimum potential penetration by 2%.',
   loader_magMastery: 'When fully trained, decreases magazine reload time by 2.5%',
   loader_secondChance:
      'When fully trained, reduces gun loading time by 2.5% for the next shell if the previous shot did not cause damage to an enemy vehicle.',

   radioman_finder: 'When fully trained, increases view range by 3%.',
   radioman_expert:
      "When fully trained, increases the crew efficiency bonus by 2.5% if the amount of damage you assist exceeds your vehicle's initial hit points.",
   radioman_sideBySide:
      'When fully trained, increases the crew efficiency bonus by 2.5% at distances of less than 50 m from an allied vehicle of the same type.',
   radioman_interference:
      'When fully trained, decreases the time your vehicle remains spotted by the enemy by 1 s.',
   radioman_signalInterception:
      'When fully trained, decreases the time to determine whether your vehicle has been spotted by the enemy by 0.75 s.',
   radioman_battleTempered:
      "When fully trained, each time the vehicle's crew is stunned, decreases the negative effect of stunning by 7.5% , up to a maximum of 30%.",
   radioman_threatSearch:
      'When fully trained, increases view range by 2% for 5s after receiving the Sixth Sense alert.',
   radioman_fireFighting: 'When fully trained, increases fire extinguishing speed by 80%',
}

export default skillDescriptions
