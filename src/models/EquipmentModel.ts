import { Schema, model } from 'mongoose'
import type { IEquipment } from '@Types/Equipment'

const EquipmentSchema = new Schema<IEquipment>({
   id: { type: Number, required: true },
   icon: String,
   price: Number,
   name: String,
   description: String,
   modifiers: { type: [Object], required: false, default: null },
   nationFilter: { type: String, required: false, default: null },
})

export const EquipmentModel = model<IEquipment>('Equipments', EquipmentSchema)
