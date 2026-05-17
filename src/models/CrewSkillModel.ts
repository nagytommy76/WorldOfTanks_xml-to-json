import { Schema, model } from 'mongoose'

const CrewSkillSchema = new Schema({
   role: { type: String, required: true },
   xmlName: { type: String, required: true },
   typeName: { type: String, required: false, default: null },
   name: { type: String, required: false, default: null },
   description: { type: String, required: true },
   modifiers: {
      type: [
         {
            _id: false,
            measureType: String,
            situationalParam: Boolean,
            paramName: String,
            value: Number,
         },
      ],
   },
})

export const CrewSkillModel = model('CrewSkills', CrewSkillSchema)
