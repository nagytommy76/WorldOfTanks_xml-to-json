import fs from 'fs'
import path from 'path'

export default class ReadXML {
   xmlSourceDirectory: string = path.resolve('./XML')
   jsonOutputDirectory: string = path.resolve('./JSON')

   nationSourceXMLDirectory: string
   nationOutputJSONDirectory: string

   constructor(currentNation: string) {
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
}
