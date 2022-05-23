const puppeteer = require('puppeteer')
const fs = require('fs')
const ObjectsToCsv = require('objects-to-csv')
const path = require('path')

const scrap = async () => {
  const url = 'https://talents.esi.dz/scolar/referentiel_competence/'
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  })
  const page = await browser.newPage()

  await page.goto(url)
  await page.waitForSelector(`table.table-sm > tbody > tr`)

  const arrayOfData = await page.evaluate(() => {
    const data = []
    var signleData = {}
    let myNodeList = document.querySelectorAll(`table.table-sm > tbody > tr`)

    var td = []
    // td = document.querySelector(`table.table-sm > tbody > tr`).children
    // signleData = {
    //   FamilledeCompetence: td[0].innerText,
    //   Competence: td[1].innerText,
    //   ElemdeCompetence: td[2].innerText,        console.log(tdLength)

    //   Type: td[3].innerText,
    //   Matieres: td[4].innerText,
    //   ObjectifsPedagogiques: td[5].innerText
    // }
    // console.log(signleData)

    var dataCopy = {}
    for (var i = 0; i < myNodeList.length; i++) {
      var item = myNodeList[i]

      // if (i < 10) console.log(item.children)
      // for (var i = 0; i < item.children.length; ++i) {
      td = item.children
      var tdLength = td.length

      // today try
      if (tdLength - 1 == 0) {
        signleData = {
          FamilledeCompetence: dataCopy.FamilledeCompetence,
          Competence: dataCopy.Competence,
          ElemdeCompetence: dataCopy.ElemdeCompetence,
          Type: dataCopy.Type,
          Matieres: dataCopy.Matieres,
          ObjectifsPedagogiques: td[0].innerText
        }
      }
      if (tdLength - 2 == 0) {
        signleData = {
          FamilledeCompetence: dataCopy.FamilledeCompetence,
          Competence: dataCopy.Competence,
          ElemdeCompetence: dataCopy.ElemdeCompetence,
          Type: dataCopy.Type,
          Matieres: td[0].innerText,
          ObjectifsPedagogiques: td[1].innerText
        }
      }
      //   console.log(td.innerText)
      // }
      if (tdLength - 3 == 0) {
        signleData = {
          FamilledeCompetence: dataCopy.FamilledeCompetence,
          Competence: dataCopy.Competence,
          ElemdeCompetence: dataCopy.ElemdeCompetence,
          Type: td[0].innerText,
          Matieres: td[1].innerText,
          ObjectifsPedagogiques: td[2].innerText
        }
      }

      if (tdLength - 4 == 0) {
        signleData = {
          FamilledeCompetence: dataCopy.FamilledeCompetence,
          Competence: dataCopy.Competence,
          ElemdeCompetence: td[0].innerText,
          Type: td[1].innerText,
          Matieres: td[2].innerText,
          ObjectifsPedagogiques: td[3].innerText
        }
      }
      if (tdLength - 5 == 0) {
        signleData = {
          FamilledeCompetence: dataCopy.FamilledeCompetence,
          Competence: td[0].innerText,
          ElemdeCompetence: td[1].innerText,
          Type: td[2].innerText,
          Matieres: td[3].innerText,
          ObjectifsPedagogiques: td[4].innerText
        }
      }
      if (tdLength - 6 == 0) {
        signleData = {
          FamilledeCompetence: td[0].innerText,
          Competence: td[1].innerText,
          ElemdeCompetence: td[2].innerText,
          Type: td[3].innerText,
          Matieres: td[4].innerText,
          ObjectifsPedagogiques: td[5].innerText
        }
      }

      //here we finish

      console.log(item)
      data.push(signleData)
      dataCopy = Object.assign({}, signleData)
    }
    return data
  })
  console.log(arrayOfData)
  const csv = new ObjectsToCsv(arrayOfData)

  // Save to file:
  await csv.toDisk('./data.csv')

  // Return the CSV file as string:
  console.log(await csv.toString())

  // browser.close()

  // setTimeout(() => {
  //   console.log(arrayOfData)
  // }, 5000)
  return 'done'
}

module.exports = scrap
