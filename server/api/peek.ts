import { parse } from 'node-html-parser'

export type JEPData = {
  fetched: Date
  lastJEP: number
  lastDraft: number
}

export default defineEventHandler(async (): Promise<JEPData> => {
  // GET content from OpenJDK JEPs page
  const jepHTMLData = await $fetch<string>('https://openjdk.org/jeps/0')

  const jepPage = parse(jepHTMLData)

  // entries are listed in couple of <table class="jeps"> elements
  const tables = jepPage.querySelectorAll('.jeps')

  // first table contains "Process JEPs" => skip

  // second table contains "In-flight JEPs"
  // - those already have proper JEP number, so the "latest JEP" would be here
  const jepTable = tables[1]
  // entries are ordered "newest first" - data will be in the first <tr> row
  const latestJEPRow = jepTable?.querySelectorAll('tr')?.at(0)
  // the target number resides inside (the only one) <td class="jep">
  // element nested inside <tr>'s chlidren
  const latestJEPCell = latestJEPRow?.querySelector('.jep')
  // finally the value is a sole TextNode inside <td> we just grabbed
  // and we can access it directly via .text attribute
  const latestJEPNo = latestJEPCell?.text

  // third table contains "Submitted JEPs"
  // - they passed the first level and are likely to be worked on, so we use this one
  const draftTable = tables[2]
  // entries are not clearly ordered - we need to find correct row by going through all
  let lastDraftNo = -1
  const draftTableRows = draftTable?.querySelectorAll('tr')
  draftTableRows?.forEach((row) => {
    // get current value
    const draftNoCell = row?.querySelector('.jep')
    const draftNo = draftNoCell?.text
    // if it is higher than previous max, set it
    if (draftNo && parseInt(draftNo) > lastDraftNo) {
      lastDraftNo = parseInt(draftNo)
    }
  })

  // return JSON data
  return {
    fetched: new Date(),
    lastJEP: parseInt(latestJEPNo || '-1'),
    lastDraft: lastDraftNo,
  }
})
