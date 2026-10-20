const PairFieldModNames: {
   [xmlRoleName: string]: {
      [imgName: string]: string
   }
} = {
   // ───────────── Heavy tanks – shared pairs 1–3 ─────────────
   role_heavyTank_pair_1: {
      additionalGrousers: 'All-Terrain Suspension',
      betterFriction: 'Lightweight Suspension',
   },
   role_heavyTank_pair_2: {
      improvedScope: 'Parallax Adjustment',
      improvedAimingHandling: 'Aiming Gears Lapping',
   },
   role_heavyTank_pair_3: {
      improvedSpallingResistance: 'Sound Insulation',
      improvedObservationDevice: 'Periscope Electric Drive',
   },
   // ───────────── Heavy tanks – Assault ─────────────
   role_HT_assault_pair_4: {
      improvedSpallingResistance: 'Additional Noise Insulation',
      improvedSpeedIndicator: 'Padding Removal',
   },
   role_HT_assault_pair_5: {
      reinforcedInteriorModules: 'Auxiliary Safety System',
      improvedTurretTurningWheels: 'Lightweight Mounting Points',
   },
   // ───────────── Heavy tanks – Breakthrough ─────────────
   role_HT_break_pair_4: {
      improvedSpeedIndicator: 'Power Supply Rewiring (Setup 1)',
      improvedTurretTurningWheels: 'Power Supply Rewiring (Setup 2)',
   },
   role_HT_break_pair_5: {
      increasedThickness: 'Reinforced Platform',
      improvedChassisStability: 'Lightweight Platform',
   },
   // ───────────── Heavy tanks – Versatile ─────────────
   role_HT_universal_pair_4: {
      improvedSpeedIndicatorBackwards: 'Power Output Tuning (Setup 1)',
      improvedTurretTurningWheels: 'Power Output Tuning (Setup 2)',
   },
   role_HT_universal_pair_5: {
      improvedSpallingResistance: 'Reinforced Hull',
      improvedChassisStability: 'Lightweight Hull',
   },
   // ───────────── Heavy tanks – Support ─────────────
   role_HT_support_pair_4: {
      improvedSpeedIndicatorBackwards: 'Focus on Mobility',
      improvedGunBreech: 'Focus on Firepower',
   },
   role_HT_support_pair_5: {
      increasedThickness: 'Heavyweight Gun',
      improvedAimingHandling: 'Lightweight Gun',
   },
   // ───────────── Medium tanks – shared pairs 1–3 ─────────────
   role_mediumTank_pair_1: {
      reinforcedInteriorModules: 'Module Durability Increase',
      betterFriction: 'Light-Alloy Mounting Points',
   },
   role_mediumTank_pair_2: {
      improvedChassisStability: 'Suspension Arm Tuning',
      improvedScope: 'Improved Sight',
   },
   role_mediumTank_pair_3: {
      improvedSpeedIndicatorBackwards: 'Turbocharger Tuning',
      improvedLightFilters: 'Anti-Reflective Headlights Coating',
   },
   // ───────────── Medium tanks – Assault ─────────────
   role_MT_assault_pair_4: {
      increasedThickness: 'Advanced Durability Reinforcement',
      improvedAimingHandling: 'Advanced Aiming Improvement',
   },
   role_MT_assault_pair_5: {
      improvedObservationDevice: 'Additional Observation Devices',
      improvedEnginePower: 'Reinforced Joints',
   },
   // ───────────── Medium tanks – Versatile ─────────────
   role_MT_universal_pair_4: {
      improvedSpeedIndicator: 'Heavy-Gauge Nozzles',
      improvedObservationDevice: 'Sensitive Optics',
   },
   role_MT_universal_pair_5: {
      improvedChassisDurability: 'Reinforced Support Rollers',
      improvedSelfRepairingTracks: 'Lightweight Support Rollers',
   },
   // ───────────── Medium tanks – Sniper ─────────────
   role_MT_sniper_pair_4: {
      improvedGunBreech: 'Loading Mechanism Tuning',
      improvedScope: 'Aiming Mechanism Tuning',
   },
   role_MT_sniper_pair_5: {
      improvedEnginePower: 'PTO Tuning',
      improvedAimingHandling: 'Electric Aiming Drive',
   },
   // ───────────── Medium tanks – Support ─────────────
   role_MT_support_pair_4: {
      improvedGunBreech: 'Breech Tweaking',
      improvedAimingHandling: 'New Aiming Gears',
   },
   role_MT_support_pair_5: {
      improvedSpeedIndicator: 'Injection System Tuning',
      improvedObservationDevice: 'Field of Vision Tuning',
   },
   // ───────────── Medium tanks – Support (overheating gun / Ares line) ─────────────
   // Not verified: wotgarage shows the Ares tanks with the standard medium-tank pair names,
   // but with the standard effects too, so it doesn't reflect these temperatureGun variants.
   role_MT_support_temperatureGun_pair_1: {
      reinforcedInteriorModules: '',
      betterFriction: '',
   },
   role_MT_support_temperatureGun_pair_4: {
      improvedGunBreech: '',
      improvedAimingHandling: '',
   },
   // ───────────── Tank destroyers – shared pairs 1–3 ─────────────
   role_ATSPG_pair_1: {
      improvedChassisDurability: 'Reinforced Suspension',
      betterFriction: 'Lightweight Suspension',
   },
   role_ATSPG_pair_2: {
      improvedAimingHandling: 'Aiming Gears Lapping',
      improvedScope: 'Parallax Adjustment',
   },
   role_ATSPG_pair_3: {
      improvedMuzzleBreak: 'Ejector Tuning',
      improvedObservationDevice: 'Right-Angle Periscope',
   },
   // ───────────── Tank destroyers – Assault ─────────────
   role_ATSPG_assault_pair_4: {
      increasedThickness: 'Passive Safety System',
      improvedGunBreech: 'Ammo Rack Reconfiguration',
   },
   role_ATSPG_assault_pair_5: {
      improvedSelfRepairingTracks: 'Repairable Tracks',
      improvedSpeedIndicatorBackwards: 'Engine Compartment Tweaking',
   },
   // ───────────── Tank destroyers – Versatile ─────────────
   role_ATSPG_universal_pair_4: {
      improvedCamouflage: 'Matte Paints',
      improvedSpeedIndicatorBackwards: 'Additional Reverse Gear',
   },
   role_ATSPG_universal_pair_5: {
      improvedSpeedIndicator: 'Overhead Camshaft Engine',
      improvedGunBreech: 'Improved Gun Rammer',
   },
   // ───────────── Tank destroyers – Support ─────────────
   role_ATSPG_support_pair_4: {
      improvedAimingHandling: 'New Aiming Gears',
      improvedGunBreech: 'Breech Tweaking',
   },
   role_ATSPG_support_pair_5: {
      improvedSpeedIndicatorBackwards: 'General Weight Reduction',
      increasedThickness: 'General Durability Increase',
   },
   // ───────────── Tank destroyers – Sniper ─────────────
   role_ATSPG_sniper_pair_4: {
      improvedGunBreech: 'Loading Mechanism Tuning',
      improvedScope: 'Aiming Mechanism Tuning',
   },
   role_ATSPG_sniper_pair_5: {
      improvedEnginePower: 'PTO Tuning',
      improvedAimingHandling: 'Electric Aiming Drive',
   },
   // ───────────── Light tanks – shared pairs 1–3 ─────────────
   role_lightTank_pair_1: {
      improvedEnginePower: 'Valves Tuning (Setup 1)',
      improvedSpeedIndicator: 'Valves Tuning (Setup 2)',
   },
   role_lightTank_pair_2: {
      improvedGunBreech: 'Loading Mechanism Tuning',
      improvedScope: 'Aiming Mechanism Tuning',
   },
   role_lightTank_pair_3: {
      improvedSpallingResistance: 'Reinforced Spalling Protection',
      improvedSpeedIndicatorBackwards: 'Lightweight Spalling Protection',
   },
   // ───────────── Light tanks – Versatile ─────────────
   role_LT_universal_pair_4: {
      improvedMuzzleBreak: 'Ejector Tuning',
      improvedTurretTurningWheels: 'Power Supply Rewiring',
   },
   role_LT_universal_pair_5: {
      improvedProjectileRifling: 'Improved Projectile Rifling',
      increasedSensitivityOptics: 'Sensitive Optics',
   },
   // ───────────── Light tanks – Scout ─────────────
   role_LT_scout_pair_4: {
      improvedLightFilters: 'Anti-Reflective Headlights Coating',
      improvedObservationDevice: 'Periscope Electric Drive',
   },
   role_LT_scout_pair_5: {
      improvedReflexScopes: 'Panoramic Triplex',
      improvedSharpnessVisor: 'Narrow-Angle Observation Device',
   },
   // ───────────── Light tanks – Support ─────────────
   role_LT_support_pair_4: {
      improvedAimingHandling: 'New Aiming Gears',
      improvedObservationDevice: 'Periscope Electric Drive',
   },
   role_LT_support_pair_5: {
      increasedThickness: 'General Durability Increase',
      improvedLightFilters: 'Anti-Reflective Headlights Coating',
   },
   // ───────────── Light tanks – Wheeled (pairs 1–3 come from role_lightTank_pair_*) ─────────────
   role_LT_wheeled_pair_4: {
      reinforcedStructure: 'Reinforced Primary Structure',
      improvedGunBreech: 'Turret Chamber Expansion',
   },
   role_LT_wheeled_pair_5: {
      increasedSensitivityOptics: 'Recon Kit',
      improvedSelfRepairingWheels: 'Assault Kit',
   },
   // ───────────── SPGs (artillery) ─────────────
   role_SPG_pair_1: {
      improvedChassisStability: 'Suspension Tweaking',
      improvedEnginePower: 'Engine Tweaking',
   },
   role_SPG_pair_2: {
      improvedSpeedIndicator: 'Hunter S Suite',
      improvedMuzzleBreak: 'Hunter C Suite',
   },
   role_SPG_pair_3: {
      improvedChassisStability: 'Hydraulics Tuning (Setup 1)',
      improvedTurretRingStability: 'Hydraulics Tuning (Setup 2)',
   },
   role_SPG_pair_4: {
      improvedGunBreech: 'Loading Mechanism Tuning',
      improvedScope: 'Aiming Mechanism Tuning',
   },
   role_SPG_pair_5: {
      increasedThickness: 'Survivability Increase',
      improvedAimingHandling: 'Weight Reduction',
   },
}

export default PairFieldModNames
