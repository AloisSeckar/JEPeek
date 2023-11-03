import { parse } from 'node-html-parser'

export type JEPData = {
  fetched: Date,
  lastJEP: number,
  lastDraft: number,
}

export default defineEventHandler(async (): Promise<JEPData> => {
  // GET content from OpenJDK JEPs page
  const jepHTMLData = await $fetch<string>('https://openjdk.org/jeps/0')
  const jepPage = parse(jepHTMLData)

  // entries are listed in two <table class="jeps"> elements
  const tables = jepPage.querySelectorAll('.jeps')
  // first table containts the actual JEPs
  const jepTable = tables[0]
  // second table lists drafts yet to be promoted to JEP (or left forsaken)
  const draftTable = tables[1]

  // now we seek last <tr> of each table - here will be the latest entry
  const lastJEPRow = jepTable?.childNodes.at(-1)
  const lastDraftRow = draftTable?.childNodes.at(-1)

  // the target number resides inside a <td class="jep"> element nested inside <tr> chlidren
  const lastJEPCell = lastJEPRow?.childNodes.filter(node => node.rawAttrs === 'class="jep"')[0]
  const lastDraftCell = lastDraftRow?.childNodes.filter(node => node.rawAttrs === 'class="jep"')[0]

  // finally the value is a sole TextNode inside <td> we just grabbed
  const lastJEPNo = lastJEPCell?.childNodes[0]?.rawText
  const lastDraftNo = lastDraftCell?.childNodes[0]?.rawText

  // return JSON data
  return {
    fetched: new Date(),
    lastJEP: parseInt(lastJEPNo || "-1"),
    lastDraft: parseInt(lastDraftNo || "-1")
  }
})
