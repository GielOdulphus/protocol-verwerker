import PopUp from './popup.js'

function downloadZip (zip, naam) {
  zip.generateAsync({ type: 'blob' })
    .then(function (blob) {
      saveAs(blob, naam + '.zip')
    })
}

const timer = ms => new Promise(res => setTimeout(res, ms))

async function create (type) {
  PopUp.popupText('Bestanden Openen')
  PopUp.openPopup()
  const files = document.querySelector('#file').files
  if (files.length < 0) {
    alert('Selecteer één of meerdere bestanden')
    closePopup()
    return
  }
  let zip; let zipNaam = 'resultaten'
  if (files.length > 1 || type == 'all') {
    zip = new JSZip()
    if (type == 'all' && files.length > 1) {
      for (let index = 0; index < files.length; index++) {
        const file = files[index]
        popupText(`Frequentietabel genereren - ${index + 1}/${files.length}`)
        const frequentieTabel = await frequentietabel(file)
        popupText(`Sequentietabel genereren - ${index + 1}/${files.length}`)
        const sequentieTabel = await sequentietabel(file)
        console.log(sequentieTabel)
        zip.folder(file.name).file('frequentietabel.csv', frequentieTabel)
        zip.folder(file.name).file('sequentietabel.csv', sequentieTabel)
      }
      popupText('Ethogram genereren')
      zip.file('ethogram.csv', ethogram(files))
    } else if (files.length == 1 && type == 'all') {
      const file = files[0]
      popupText('Frequentietabel genereren')
      zip.file('frequentietabel.csv', await frequentietabel(file))
      popupText('Sequentietabel genereren')
      zip.file('sequentietabel.csv', await sequentietabel(file))
      popupText('Ethogram genereren')
      zip.file('ethogram.csv', ethogram(files))
      zipNaam = file.name
    } else if (type == 'f') {
      for (let index = 0; index < files.length; index++) {
        const file = files[index]
        popupText(`Frequentietabel genereren - ${index + 1}/${files.length}`)
        zip.file(file.name + '.csv', await frequentietabel(file))
      }
      zipNaam = 'frequentietabellen'
    } else if (type == 's') {
      for (let index = 0; index < files.length; index++) {
        const file = files[index]
        popupText(`Sequentietabel genereren - ${index + 1}/${files.length}`)
        zip.file(file.name + '.csv', await sequentietabel(file))
      }
      zipNaam = 'sequentietabellen'
    }
    if (type == 'e') {
      popupText('Ethogram genereren')
      ethogram(files, true)
    } else {
      popupText('Bestanden inpakken')
      downloadZip(zip, zipNaam)
    }
    popupText('Download beschikbaar')
    await timer(1000)
    closePopup()
  } else {
    if (type == 's') {
      popupText('Sequentietabel genereren')
      sequentietabel(files[0], true)
      popupText('Download beschikbaar')
      await timer(1000)
      closePopup()
    } else if (type == 'f') {
      popupText('Frequentietabel genereren')
      frequentietabel(files[0], true)
      popupText('Download beschikbaar')
      await timer(1000)
      closePopup()
    } else if (type == 'e') {
      popupText('Ethogram genereren')
      ethogram(files, true)
      popupText('Download beschikbaar')
      await timer(1000)
      closePopup()
    }
  }
}
