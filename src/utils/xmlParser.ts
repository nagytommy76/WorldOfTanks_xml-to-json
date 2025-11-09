import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser({
   ignoreAttributes: false,
   allowBooleanAttributes: true,
   attributeNamePrefix: '@_',
   trimValues: true,
   parseTagValue: false,
})

export default parser
