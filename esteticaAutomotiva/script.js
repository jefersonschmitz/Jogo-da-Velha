document.getElementById('agendamento').addEventListener('submit', function (e) {
    e.preventDefault() // previne envio real

    const name = document.getElementById('nome').value.trim()
    const data = new Date(document.getElementById('data').value)
    const today = new Date()
    const time = document.getElementById('horario').value
    const job = document.getElementById('servico').value.trim()

    if (!name || !time || !job || isNaN(data.getTime())) {
        alert("Preencha todos os campos corretamente.")
        return
    }

    if (data < today.setHours(0, 0, 0, 0)) {
        alert("Escolha uma data futura.")
        return
    }

    alert("Agendamento realizado com sucesso!")
    this.reset() // limpa o formulário
})

const topoBtn = document.getElementById('topoBtn');

window.addEventListener('scroll', () => {
    topoBtn.style.display = window.scrollY > 300 ? "block" : "none"
})

topoBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
})


