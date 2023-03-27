const cuatrimestres = Array.from(document.querySelectorAll('div > p > span')).map(p=>p.textContent)
const historialAcadémico = Array.from(document.querySelectorAll('tbody')).map((table,idx)=>{
  const materias = []
  for (const row of table.rows) {
    const [cod_nom,créditos,comisión] = Array.from(row.cells[1].querySelectorAll('span')).map(span=>span.textContent)
    const [código,nombre] = cod_nom.split(' - ')
    const notaCursada = row.cells[2].querySelector('span > span').textContent
    const finales = Array.from(row.cells[3].querySelectorAll('div > div')).map(div=>{
      const [nota,fecha] = Array.from(div.querySelectorAll('span')).map(span=>span.textContent)
      return {
        nota: parseFloat(nota) || nota || null,
        fecha: fecha || null
      }
    }
    )
    materias.push({
      código,
      nombre,
      comisión,
      créditos: parseFloat(créditos),
      notaCursada: parseFloat(notaCursada) || notaCursada || null,
      finales,
    })
  }
  return {
    cuatrimestre: cuatrimestres[idx],
    materias,
  }
}
)

const blob = new Blob([JSON.stringify(historialAcadémico, null, 2)], {type: 'application/json'})
const download = document.createElement('a')
download.href = URL.createObjectURL(blob)
download.download = 'historialAcadémico.json'
download.textContent = 'Descargar historial académico'
document.body.replaceChildren(download)
