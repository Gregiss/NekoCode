String.prototype.isABC = function() {
    var a = this,
        ab = "abcdefghijklmnopqrstuvwxyz,.[] {}1234567890´''àáóòê",
        ab2 = ab.toUpperCase(),
        ab3 = '"":´><';
    for (i = 0; i < ab.length; i++) { if (ab.charAt(i) == a || ab2.charAt(i) == a || ab3.charAt(i) == a) { return true; } }
    return false;
}

var app = new Vue({
    el: "#app",
    data: {
        reg: /[a-zA-Z\u00C0-\u00FF ]+/i,
        left_a: [
            { "name": "Explorer", "icon": "far fa-copy" },
            { "name": "Search", "icon": "fas fa-search" }
        ],
        where: "Explorer",
        explorer: [{
            'name': "readme",
            "icon": "fab fa-readme",
            "text": "Seja bem vindo ao NekoCode, NekoCode é um editor de código parecido com Visual Studio Code"
        }],
        abertos: [],
        ativo: {},
        selectAllFunction: false,
        newFile: false,
        newFileName: null,
        modal: false,
        arquivoId: 0
    },
    created() {
        window.addEventListener('keydown', (e) => {
            if (e.key.isABC()) {
                this.editar(e.key)
            }
            if (e.key == ' ') {
                this.editar(e.key)
            }
            if (e.key == 'Backspace') {
                var novotexto = this.ativo.text.substring(0, (this.ativo.text.length - 1));
                this.ativo.text = novotexto
            }
        });
    },
    mounted() {
        this.explorer = localStorage.explorer ? JSON.parse(localStorage.explorer) : [{
            'name': "readme",
            "icon": "fab fa-readme",
            "text": "Seja bem vindo ao NekoCode, NekoCode é um editor de código parecido com Visual Studio Code"
        }]
    },
    methods: {
        editar(letter) {
            this.ativo.text += letter
            localStorage.explorer = JSON.stringify(this.explorer)
        },
        acessar(app) {
            this.where = app
        },
        abrir(arq) {
            if (this.abertos.find((aberto) => aberto.name === arq.name)) {
                return false
            } else {
                this.abertos.push(arq)
                this.ativo = arq
                var index = this.abertos.indexOf(arq)
                this.ativo.id = index;
                this.arquivoId = index
            }
        },
        close(aberto) {
            var index = this.abertos.indexOf(aberto)
            if (index !== -1) this.abertos.splice(index, 1);
            this.ativo = {}
        },
        selectAll() {
            this.selectAllFunction = true
            Console.Log("Select all")
        },
        novoArquivo() {
            this.modal = true
            localStorage.explorer = JSON.stringify(this.explorer)
            this.newFile = true
        },
        criarArquivoNovo() {
            if (this.newFileName.length >= 3) {
                this.explorer.push({
                    'name': this.newFileName,
                    "icon": "fas fa-code",
                    "text": "Escreve seu código aqui"
                })
                this.newFile = false
                this.modal = false
                localStorage.explorer = JSON.stringify(this.explorer)
            }
        },
        cancelNewFile() {
            this.newFile = false
            this.modal = false
            localStorage.explorer = JSON.stringify(this.explorer)
        },
        openFile(arq) {
            this.ativo = arq
            var index = this.abertos.indexOf(arq)
            this.ativo.id = index;
            this.arquivoId = index
            localStorage.explorer = JSON.stringify(this.explorer)
        }
    }
});