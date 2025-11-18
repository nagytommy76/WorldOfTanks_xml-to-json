export interface ICamo {
   camoBonus: number
   firePenalty: number
   moving: number
   stationary: number
}

export interface ISiegeMode {
   switchOffTime: number
   switchOnTime: number
}

export interface IHydropneumatic {
   depression: number
   elevation: number
}

export interface IChassis {
   price: number
   armor: number
   dispersion: {
      vehicleMovement: number
      vehicleRotation: number
   }
   // hullPosition: number[]
   id: string
   level: number
   maxHealth: number
   // maxLoad: number
   maxRegenHealth: number
   name: string
   repairTime: number
   rotatesInPlace: boolean
   rotationSpeed: number
   terrainResistance: number[]
   weight: number
   // wheelAngle: null
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
   price: number
   // gunPosition: number[]
   guns: IGuns[]
   hp: number
   id: string
   level: number
   name: string
   // openTop: boolean
   // pitch: null
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

export interface IDualAccuracy {
   afterShotDispersionRadius: number
   coolingDelay: number
}

export interface ITwinGun {
   afterShotDelay: number
   twinGunReloadTime: number
}

export interface IGuns {
   accuracy: number
   aimTime: number
   arc: number[]
   burst: {
      // BlackRock T11 USA
      count: number
      rate: number
      syncReloading?: boolean
   } | null
   autoreload: {
      reloadTime: number[]
   } | null
   clip: {
      count: number
      rate: number
   } | null
   depression: number
   dispersion: {
      turretRotation: number
      afterShot: number
      whileDamaged: number
   }
   dualAccuracy: IDualAccuracy | null
   dualGun: IDualGun | null
   elevation: number
   elevationLimits: {
      elevation: number[]
      depression: number[]
   }
   gunArc: number[]
   id: string
   level: number
   maxAmmo: number
   name: string
   reloadTime: number
   shells: IShells[] // Not sure what type this should be, so leaving as any
   twinGun: null | ITwinGun
   weight: number
}

export interface IDualGun {
   afterShotDelay: number
   chargeThreshold: number
   chargeTime: number
   preChargeIndication: number
   rateTime: number
   reloadLockTime: number
   reloadTimes: number[]
   shootImpulse: number
}

export interface ISharedShell {
   damage: {
      armor: number
      devices: number
   }
   caliber: number
   effects: string
   icon: string
   id: number
   isTracer?: boolean
   kind: AmmoType
   normalizationAngle?: number
   price: number
   ricochetAngle: number
   userString: string
   armorSpalls: {
      impactRadius: number
      coneAngle: number
      damage: {
         armor: number
         devices: number
      }
   } | null
   explosionRadius: number | null
   mechanics: string | null
}

export interface IShells extends ISharedShell {
   defaultPortion: number
   gravity: number
   id: number
   maxDistance: number
   name: string
   piercingPower: number[]
   speed: number
}

export interface JSONData {
   [tank_id: number]: ITankDetails
}

export interface ITankDetails {
   is_gift: boolean
   next_tanks: {
      [tank_id: number]: number
   } | null
   prices_xp: {
      [tank_id: number]: number
   } | null
   is_premium: boolean
   images: {
      small_icon: string
      contour_icon: string
      big_icon: string
   }
   tank_id: number
   /**
    * @description Equivalent to `tankName` -> A182_T803
    */
   tag: string
}

export interface ITankData {
   id: number | null
   tankDetails: ITankDetails | null
   name: string
   nation: string
   price: number | { '#text': string; gold: number }
   role: string
   shortName: string
   tags: string[]
   tier: number
   type: string
   xmlId: string
   notInShop: boolean
   crew: {
      primary: string
      secondary: string[]
   }[]
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
      speedLimit: ISpeedLimit
      turrets: ITurrets[]
      hydropneumatic?: IHydropneumatic | null
      siegeMode?: ISiegeMode | null
   }
}
