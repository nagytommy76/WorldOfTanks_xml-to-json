import { Schema, model } from 'mongoose'
import type { ITankData } from '@Types/Modules'

const shells = {
   type: [
      {
         defaultPortion: Number,
         gravity: Number,
         maxDistance: Number,
         name: String,
         piercingPower: [Number],
         speed: Number,
         damage: {
            armor: { type: Schema.Types.Mixed, of: [Number, [Number]] },
            devices: { type: Schema.Types.Mixed, of: [Number, [Number]] },
         },
         caliber: Number,
         effects: String,
         icon: String,
         id: Number,
         isTracer: Boolean,
         kind: String,
         normalizationAngle: Number,
         price: Number,
         ricochetAngle: Number,
         userString: String,
         armorSpalls: {
            impactRadius: Number,
            coneAngle: Number,
            damage: {
               armor: Number,
               devices: Number,
            },
         },
         explosionRadius: Number,
         mechanics: String,
         hasStun: Boolean,
         stunDuration: Number,
         /**
          * @description stunDuration * guaranteedStunDuration = minimum stun duration
          */
         guaranteedStunDuration: Number,
      },
   ],
}

const guns = {
   type: [
      {
         accuracy: Number,
         aimTime: Number,
         arc: [Number],
         burst: {
            count: { type: Number, required: false, default: () => null },
            rate: { type: Number, required: false, default: () => null },
            syncReloading: { type: Boolean, required: false, default: false },
         },
         autoreload: {
            reloadTime: [Number],
            boostFraction: Number,
            boostStartTime: Number,
            boostResidueTime: Number,
         },
         clip: {
            count: Number,
            rate: Number,
         },
         depression: Number,
         dispersion: {
            turretRotation: Number,
            afterShot: Number,
            whileDamaged: Number,
         },
         dualAccuracy: {
            afterShotDispersionRadius: Number,
            coolingDelay: Number,
         },
         dualGun: {
            afterShotDelay: Number,
            chargeThreshold: Number,
            chargeTime: Number,
            preChargeIndication: Number,
            rateTime: Number,
            reloadLockTime: Number,
            reloadTimes: [Number],
            shootImpulse: Number,
         },
         autoShoot: {
            shotDispersionPerSec: Number,
            maxShotDispersion: Number,
            groupSize: Number,
            aimingDelay: Number,
            shotDispersionPerShot: Number,
         },
         elevation: Number,
         elevationLimits: {
            elevation: [Number],
            depression: [Number],
         },
         gunArc: [Number],
         id: String,
         level: Number,
         maxAmmo: Number,
         name: String,
         reloadTime: Number,
         invisibilityFactorAtShot: Number,
         shells,
         twinGun: {
            afterShotDelay: Number,
            twinGunReloadTime: Number,
         },
         weight: Number,
         mechanics: Schema.Types.Mixed,
      },
   ],
}

const stats = {
   camo: {
      moving: Number,
      stationary: Number,
      camoBonus: Number,
      firePenalty: Number,
   },
   chassis: [
      {
         price: Number,
         armor: Number,
         dispersion: {
            vehicleMovement: Number,
            vehicleRotation: Number,
         },
         id: String,
         level: Number,
         maxHealth: Number,
         maxRegenHealth: Number,
         name: String,
         repairTime: Number,
         rotatesInPlace: Boolean,
         rotationSpeed: Number,
         terrainResistance: [Number],
         weight: Number,
         wheeled: Boolean,
         wheelAngle: { type: [Number], required: false, default: () => null },
      },
   ],
   engines: [
      {
         fireStartingChance: Number,
         level: Number,
         maxHealth: Number,
         maxRegenHealth: Number,
         name: String,
         power: Number,
         price: Number,
         realPower: Number,
         repairCost: Number,
         rpm_max: Number,
         rpm_min: Number,
         tags: [String],
         userString: String,
         weight: Number,
         wwsoundNPC: String,
         wwsoundPC: String,
      },
   ],
   fuelTank: [
      {
         tags: [String],
         price: Number,
         weight: Number,
         maxHealth: Number,
         maxRegenHealth: Number,
         repairCost: Number,
      },
   ],
   hull: {
      ammoRackHealth: {
         maxHealth: Number,
         maxRegenHealth: Number,
         repairCost: Number,
      },
      armor: [Number],
      weight: Number,
   },
   radios: [
      {
         distance: Number,
         level: Number,
         maxHealth: Number,
         maxRegenHealth: Number,
         name: String,
         price: Number,
         repairCost: Number,
         tags: [String],
         userString: String,
         weight: Number,
      },
   ],
   speedLimit: {
      forward: Number,
      backward: Number,
   },
   turrets: [
      {
         armor: [Number],
         price: Number,
         guns,
         hp: Number,
         id: String,
         level: Number,
         name: String,
         ringHealth: {
            maxHealth: Number,
            maxRegenHealth: Number,
            repairCost: Number,
         },
         traverse: Number,
         viewRange: Number,
         viewportHealth: {
            maxHealth: Number,
            maxRegenHealth: Number,
            repairCost: Number,
         },
         weight: Number,
         openTop: { type: Boolean, required: false, default: false },
         secondaryGuns: {
            type: [
               {
                  name: String,
                  reloadTime: Number,
                  burst: {
                     count: Number,
                     rate: Number,
                  },
                  aimingTime: Number,
                  shotDispersionRadius: Number,
                  shotDispersionFactors: {
                     turretRotation: Number,
                     afterShot: Number,
                     whileGunDamaged: Number,
                  },
                  invisibilityFactorAtShot: Number,
                  shells: [
                     {
                        name: String,
                        id: Number,
                        icon: String,
                        kind: String,
                        mechanics: String,
                        caliber: Number,
                        explosionRadius: Number,
                        damage: {
                           armor: Number,
                           devices: Number,
                        },
                     },
                  ],
               },
            ],
            default: () => null,
            required: false,
            _id: false,
         },
      },
   ],
   hydropneumatic: {
      depression: { type: Number, required: false, default: () => null },
      elevation: { type: Number, required: false, default: () => null },
   },
   siegeMode: Schema.Types.Mixed,
   rocketAcceleration: {
      type: {
         deployTime: Number,
         reloadTime: Number,
         reuseCount: Number,
         duration: Number,
         vehicleEnginePower: Number,
         vehicleForwardMaxSpeed: Number,
         vehicleBackwardMaxSpeed: Number,
         vehicleAllGroundRotationSpeed: Number,
      },
      required: false,
      default: () => null,
   },
}

/**
 * @description From WG API
 */
const tankDetails = {
   next_tanks: { type: Schema.Types.Map, of: Number, required: false, default: () => null },
   prices_xp: { type: Schema.Types.Map, of: Number, required: false, default: () => null },
   is_gift: { type: Boolean, required: false, default: false },
   is_premium: { type: Boolean, required: false, default: false },
   images: {
      small_icon: String,
      contour_icon: String,
      big_icon: String,
   },
   small_icon: String,
   contour_icon: String,
   big_icon: String,
   tank_id: Number,
   tag: String,
   description: String,
   short_name: String,
   name: String,
   provisions: { type: [Number], required: false },
   is_premium_igr: { type: Boolean, required: false, default: false },
}

const VehicleSchema = new Schema<ITankData>({
   id: { type: Number, required: false, default: null },
   name: String,
   shortName: String,
   nation: String,
   type: String,
   tags: [String],
   tier: Number,
   notInShop: Boolean,
   price: { type: Schema.Types.Mixed, of: [Number, { gold: Number }] },
   xmlId: String,
   tankDetails: { type: tankDetails, default: () => null, required: false, _id: false },
   siegeMode: { type: Schema.Types.Mixed, default: () => null, required: false },
   crew: {
      type: [
         {
            primary: String,
            secondary: [String],
         },
      ],
      _id: false,
   },
   stats,
   mechanics: Schema.Types.Mixed,
})

export const VehicleModel = model<ITankData>('Vehicles', VehicleSchema)
