export interface ICamo {
   camoBonus: number
   firePenalty: number
   moving: number
   stationary: number
}

export interface IChassis {
   armor: number
   dispersion: {
      vehicleMovement: number
      vehicleRotation: number
   }
   hullPosition: number[]
   id: string
   level: number
   maxHealth: number
   maxLoad: number
   maxRegenHealth: number
   name: string
   repairTime: number
   rotatesInPlace: boolean
   rotationSpeed: number
   terrainResistance: number[]
   weight: number
   wheelAngle: null
   wheeled: boolean
}

export interface IEngines {
   fireStartingChance: number
   level: number
   maxHealth: number
   maxRegenHealth: number
   name: string
   power: number
   price: number
   realPower: number
   repairCost: number
   rpm_max: number
   rpm_min: number
   shortUserString: string
   tags: string[]
   userString: string
   weight: number
   wwsoundNPC: string
   wwsoundPC: string
}

export interface IFuelTank {
   tags: string[]
   price: number
   weight: number
   maxHealth: number
   maxRegenHealth: number
   repairCost: number
}

export interface IHull {
   ammoRackHealth: {
      maxHealth: number
      maxRegenHealth: number
      repairCost: number
   }
   armor: number[]
   weight: number
}

export interface ISpeedLimit {
   backward: number
   forward: number
}

export interface IRadios {
   distance: number
   level: number
   maxHealth: number
   maxRegenHealth: number
   name: string
   rice: number
   repairCost: number
   tags: string[]
   userString: string
   weight: number
}

/**
 * Type of ammo
 * @ARMOR_PIERCING_CR = armor piercing Premium
 */
export type AmmoType =
   | 'ARMOR_PIERCING'
   | 'ARMOR_PIERCING_CR'
   | 'ARMOR_PIERCING_CR_PREMIUM'
   | 'ARMOR_PIERCING_PREMIUM'
   | 'HIGH_EXPLOSIVE_MODERN'
   | 'HIGH_EXPLOSIVE_MODERN_PREMIUM'
   | 'HIGH_EXPLOSIVE_SPG_STUN'
   | 'HIGH_EXPLOSIVE_SPG'
   | 'HOLLOW_CHARGE_PREMIUM'
   | 'HOLLOW_CHARGE'

export interface ITurrets {
   armor: number[]
   gunPosition: number[]
   guns: IGuns[]
   hp: number
   id: string
   level: number
   name: string
   openTop: boolean
   pitch: null
   ringHealth: {
      maxHealth: number
      maxRegenHealth: number
      repairCost: number
   }
   traverse: number
   viewRange: number
   viewportHealth: {
      maxHealth: number
      maxRegenHealth: number
      repairCost: number
   }
   weight: number
}

export interface IGuns {
   accuracy: number
   aimTime: number
   arc: null
   autoreload: null
   burst: null
   clip: null
   depression: number
   dispersion: {
      turretRotation: number
      afterShot: number
      whileDamaged: number
   }
   dualAccuracy: null
   dualGun: null
   elevation: number
   elevationLimits: {
      elevation: number[]
      // Add other elevation limits properties as needed
   }
   gunArc: null
   id: string
   level: number
   maxAmmo: number
   name: string
   reloadTime: number
   shells: IShells[] // Not sure what type this should be, so leaving as any
   twinGun: null
   weight: number
}
export interface IShells {
   caliber: number
   damage: {
      armor: number
      devices: number
   }
   defaultPortion: number
   effects: string
   gravity: number
   icon: string
   id: number
   image: AmmoType
   isTracer: boolean
   kind: AmmoType
   maxDistance: number
   name: string
   normalizationAngle: number
   piercingPower: number[]
   price: number
   ricochetAngle: number
   speed: number
   userString: string
}

export interface ITankData {
   crew: {
      primary: string
      secondary: string[]
   }[]
   id: number
   name: string
   nation: string
   price: number
   role: string
   shortName: string
   stats: {
      camo: {
         moving: number
         stationary: number
         camoBonus: number
         firePenalty: number
      }
      chassis: IChassis[]
      engines: IEngines[]
      fuelTank: IFuelTank
      hull: IHull
      radios: IRadios[]
      speedLimit: {
         forward: number
         backward: number
      }
      turretPosition: number[]
      turrets: ITurrets[]
   }
   tags: string[]
   tier: number
   type: string
   xmlId: string
}
