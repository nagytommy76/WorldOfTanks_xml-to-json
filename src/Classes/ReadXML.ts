import fs from 'fs'
import path from 'path'
import type { NationType } from '@Types/Vehicle'
import { fileNameStartsWithByNations, notToIncludeFileNames } from '@Utils/consts'

export default class ReadXML {
   nation: NationType
   xmlSourceDirectory: string
   jsonOutputDirectory: string

   nationSourceXMLDirectory: string
   nationOutputJSONDirectory: string

   constructor(
      currentNation: NationType,
      jsonOutputDirectory: string = './JSON',
      xmlSourceDirectory: string = './XML',
   ) {
      this.nation = currentNation
      this.xmlSourceDirectory = xmlSourceDirectory
      this.jsonOutputDirectory = jsonOutputDirectory
      this.CheckOutputJSONDirectory()

      this.nationSourceXMLDirectory = path.join(this.xmlSourceDirectory, currentNation)
      this.nationOutputJSONDirectory = path.join(this.jsonOutputDirectory, currentNation)
      this.CheckOutputNationJSONDirectory()
   }

   /**
    * @description Check if output JSON/Nation directory exists, if not create one
    */
   private CheckOutputNationJSONDirectory() {
      if (!fs.existsSync(this.nationOutputJSONDirectory)) {
         fs.mkdirSync(this.nationOutputJSONDirectory, { recursive: true })
      }
   }

   /**
    * @description Check if output JSON directory exists, if not create one
    */
   private CheckOutputJSONDirectory() {
      if (!fs.existsSync(this.jsonOutputDirectory)) {
         fs.mkdirSync(this.jsonOutputDirectory, { recursive: true })
      }
   }

   /**
    * @returns {string[]} Returns an array of all the nation's XML files
    */
   returnNationXMLFiles() {
      const nationXMLFiles = fs
         .readdirSync(this.nationSourceXMLDirectory)
         .filter((file) => file.toLowerCase().endsWith('.xml'))
         //   Include all of the nation's vehicles / not list.xml for example
         .filter((file) => {
            return file.startsWith(fileNameStartsWithByNations[this.nation])
         })
         // exclude training / special mode vehicles
         .filter((file) => {
            const base = path.basename(file, '.xml')
            return !notToIncludeFileNames.some((bad) => base.includes(bad))
         })

      if (nationXMLFiles.length === 0) {
         console.log('No XML files found in directory: ', this.nationSourceXMLDirectory)
         process.exit(0)
      }

      return nationXMLFiles
   }
}
