const cuatrimestres = Array.from(document.querySelectorAll('div > p > span')).map(p => p.textContent)
const historialAcadémico = Array.from(document.querySelectorAll('tbody')).map((table, idx) => {
  const materias = []
  for (const row of table.rows) {
    const [cod_nom, créditos, comisión] = Array.from(row.cells[1].querySelectorAll('span')).map(span => span.textContent)
    const [código, nombre] = cod_nom.split(' - ')
    const cursada = row.cells[2].querySelector('span > span').textContent
    const finales = Array.from(row.cells[3].querySelectorAll('div > div')).map(div => parseFinal(div))
    materias.push({
      código,
      nombre,
      comisión,
      créditos: parseFloat(créditos),
      cursada: parseCursada(cursada),
      finales,
    })
  }
  return {
    cuatrimestre: cuatrimestres[idx],
    materias,
  }
}
)

function formatDate(date_ar) {
  const [_, day, month, year] = date_ar.match(/(\d{2}).(\d{2}).(\d{4})/) || []
  return day ? `${year}-${month}-${day}` : null
}

function parseCursada(cursada) {
  const nota = parseFloat(cursada) || null
  let estado = ''
  if (!nota) estado = cursada
  else if (nota >= 4) estado = 'Aprobado'
  else estado = 'Desaprobado'

  return { nota, estado }
}

function parseFinal(finalDiv) {
  const [nota_estado, fecha] = Array.from(finalDiv.querySelectorAll('span')).map(span => span.textContent)
  const nota = parseFloat(nota_estado) || null
  let estado = ''
  if (!nota) estado = nota_estado
  else if (nota >= 4) estado = 'Aprobado'
  else estado = 'Desaprobado'

  return {
    nota,
    estado,
    fecha: formatDate(fecha),
  }
}

const json = JSON.stringify(historialAcadémico, null, 2)
const blob = new Blob([json], { type: 'application/json' })
const download = document.createElement('a')
download.href = URL.createObjectURL(blob)
download.download = 'historialAcadémico.json'
download.textContent = 'Descargar historial académico'
const jsonNode = document.createElement('p')
jsonNode.textContent = json
jsonNode.style.whiteSpace = 'pre-wrap'
document.body.replaceChildren(jsonNode, download)
