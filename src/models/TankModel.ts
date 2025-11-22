import { Schema, model, Types } from 'mongoose'
import type { ITankData } from '@Types/Modules'

const tankSchema = new Schema<ITankData>(
   {
      id: Number,
      name: String,
      shortName: String,
      nation: String,
      type: String,
      tags: [String],
      tier: Number,
      role: String,
      notInShop: Boolean,
      price: Number,
      xmlId: String,
      tankDetails: {
         is_gift: Boolean,
         is_premium: Boolean,
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
      },
      siegeMode: null,
      isSiegeMode: Boolean,
      crew: [
         {
            primary: String,
            secondary: [String],
         },
      ],
      stats: {
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
            },
         ],
      },
   },
   { _id: false }
)
