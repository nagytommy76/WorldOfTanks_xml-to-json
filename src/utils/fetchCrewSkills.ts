import 'dotenv/config'

export default async function fetchCrewSkills() {
   const fetchedCrewSkills = await fetch(
      `https://api.worldoftanks.eu/wot/encyclopedia/crewskills/?application_id=${process.env.WOT_APP_ID}`,
      { method: 'GET' },
   )

   const response = (await fetchedCrewSkills.json()) as Promise<{
      data: {
         [crewSkillName: string]: {
            name: string
            description: string | null
         }
      }
   }>
   return (await response).data
}
