import { BaseModification, PairModification } from '@Models/FieldMods/FieldModification.model'
import { FieldModificationTree } from '@Models/FieldMods/FieldModificationTree.model'

import connectDB from '@/Config/connectDB'
import ReturnFieldModifications from './ReturnFieldMods.helper'
import ReturnTrees from './FieldModTrees.helper'

export default async function FieldModifications() {
   await connectDB()
   try {
      const { BaseFieldMods, PairFieldMods } = await ReturnFieldModifications()
      const FieldModTrees = await ReturnTrees()

      console.log(`   Found ${BaseFieldMods.length} base mods, ${PairFieldMods.length} pairs`)

      const baseOps = BaseFieldMods.map((base) => ({
         updateOne: {
            filter: { key: base.key },
            update: { $set: base },
            upsert: true,
         },
      }))

      const baseResult = await BaseModification.bulkWrite(baseOps, {
         ordered: false,
      })

      console.log(
         `   ✅ Bases  → inserted: ${baseResult.upsertedCount}, updated: ${baseResult.modifiedCount}`,
      )

      const pairOps = PairFieldMods.map((pair) => ({
         updateOne: {
            filter: { key: pair.key },
            update: { $set: pair },
            upsert: true,
         },
      }))

      const pairResult = await PairModification.bulkWrite(pairOps, {
         ordered: false,
      })

      console.log(
         `   ✅ Pairs  → inserted: ${pairResult.upsertedCount}, updated: ${pairResult.modifiedCount}`,
      )

      const treeOps = FieldModTrees.map((tree) => ({
         updateOne: {
            filter: { role: tree.role }, // role is the stable join key
            update: { $set: tree },
            upsert: true,
         },
      }))

      const treeResult = await FieldModificationTree.bulkWrite(treeOps, {
         ordered: false,
      })

      console.log(
         `   ✅ Trees  → inserted: ${treeResult.upsertedCount}, updated: ${treeResult.modifiedCount}`,
      )
   } catch (error) {
      console.error(error)
   }
}
