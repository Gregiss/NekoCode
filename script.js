String.prototype.isABC = function() {
    var a = this,
        ab = "abcdefghijklmnopqrstuvwxyz,.[] {}1234567890´''àáóòê()",
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
            { "name": "Explorar", "icon": "far fa-copy" },
            { "name": "Buscar", "icon": "fas fa-search" }
        ],
        where: "Explorar",
        explorer: [{
            'name': "readme",
            "icon": "fab fa-readme",
            "text": "Seja bem vindo ao NekoCode, NekoCode é um editor de código parecido com Visual Studio Code",
            "ativo": false
        }],
        abertos: [],
        ativo: {},
        selectAllFunction: false,
        newFile: false,
        newFileName: null,
        modal: false,
        arquivoId: 0,
        search: false,
        searchTerm: null,
        searchItems: []
    },
    created() {
        window.addEventListener('keydown', (e) => {
          if(!this.search){
            if (e.key.isABC()) {
                this.editar(e.key)
            }
            if (e.key == ' ') {
                this.editar(e.key)
            }
            if (e.key == 'Backspace') {
              if(!this.modal){
                var novotexto = this.ativo.text.substring(0, (this.ativo.text.length - 1));
                this.ativo.text = novotexto
              }
            }
          }
        });
    },
    mounted() {
        this.explorer = localStorage.explorer ? JSON.parse(localStorage.explorer) : [{
            'name': "readme",
            "icon": "fab fa-readme",
            "text": "Seja bem vindo ao NekoCode, NekoCode é um editor de código parecido com Visual Studio Code",
            "ativo": false
        }]
        this.ativo = localStorage.ativo ? JSON.parse(localStorage.ativo) : {}
        this.abertos = localStorage.abertos ? JSON.parse(localStorage.abertos) : []
    },
    methods: {
        editar(letter) {
          if(!this.modal){
            this.ativo.text += letter
            localStorage.explorer = JSON.stringify(this.explorer)
            localStorage.ativo = JSON.stringify(this.ativo)
            localStorage.abertos = JSON.stringify(this.abertos)
          }
        },
        acessar(app) {
            this.where = app
            localStorage.explorer = JSON.stringify(this.explorer)
            localStorage.ativo = JSON.stringify(this.ativo)
            localStorage.abertos = JSON.stringify(this.abertos)
        },
        abrir(arq) {
            if (this.abertos.find((aberto) => aberto.name === arq.name)) {
                this.ativo = arq
                for (var i = 0; i < this.abertos.length; i++) {
                    this.abertos[i].ativo = false
                }
                for (var i = 0; i < this.explorer.length; i++) {
                    this.explorer[i].ativo = false
                }
                this.abertos[arq.id].ativo = true
            } else {
                this.abertos.push(arq)
                this.ativo = arq
                var index = this.abertos.indexOf(arq)
                this.ativo.id = index;
                this.arquivoId = index
                for (var i = 0; i < this.abertos.length; i++) {
                    this.abertos[i].ativo = false
                }
                for (var i = 0; i < this.explorer.length; i++) {
                    this.explorer[i].ativo = false
                }
                var indice = this.abertos.find((aberto) => aberto.name === arq.name)
                if(indice){
                var index = this.abertos.indexOf(indice)
                console.log(index)
                this.abertos[index].ativo = true
                }
            }
            localStorage.explorer = JSON.stringify(this.explorer)
            localStorage.ativo = JSON.stringify(this.ativo)
            localStorage.abertos = JSON.stringify(this.abertos)
        },
        close(aberto) {
            var index = this.abertos.indexOf(aberto)
            if (index !== -1) this.abertos.splice(index, 1);
            this.ativo = {}
            localStorage.explorer = JSON.stringify(this.explorer)
            localStorage.ativo = JSON.stringify(this.ativo)
            localStorage.abertos = JSON.stringify(this.abertos)
        },
        selectAll() {
            this.selectAllFunction = true
            Console.Log("Select all")
        },
        novoArquivo() {
            this.modal = true
            localStorage.explorer = JSON.stringify(this.explorer)
            this.newFile = true
            localStorage.ativo = JSON.stringify(this.ativo)
            localStorage.abertos = JSON.stringify(this.abertos)
        },
        criarArquivoNovo() {
           if(this.explorer.find((explorer) => explorer.name === this.newFileName)){
             console.log("Já existe");
           }
            else{
              if (this.newFileName.length >= 3) {
                  this.explorer.push({
                      'name': this.newFileName,
                      "icon": "fas fa-code",
                      "text": "Escreve seu código aqui",
                      "ativo": false
                  })
                  this.newFile = false
                  this.modal = false
                  this.newFileName = ""
                  localStorage.explorer = JSON.stringify(this.explorer)
                  localStorage.ativo = JSON.stringify(this.ativo)
                  localStorage.abertos = JSON.stringify(this.abertos)
             }
            }
        },
        cancelNewFile() {
            this.newFile = false
            this.modal = false
            localStorage.explorer = JSON.stringify(this.explorer)
            localStorage.ativo = JSON.stringify(this.ativo)
            localStorage.abertos = JSON.stringify(this.abertos)
        },
        openFile(arq) {
            var indice = this.abertos.find((aberto) => aberto.name === arq.name)
            if(indice){
            var index = this.abertos.indexOf(indice)
            console.log(index)
            for (var i = 0; i < this.abertos.length; i++) {
                this.abertos[i].ativo = false
            }
            this.abertos[index].ativo = true
            this.ativo = arq
            this.ativo.id = index;
            this.arquivoId = index
            localStorage.explorer = JSON.stringify(this.explorer)
            localStorage.ativo = JSON.stringify(this.ativo)
            localStorage.abertos = JSON.stringify(this.abertos)
            }
        },
      searchOk(){
        var index = -1
        this.search = true
        var indice = this.explorer.find((arquivos) => arquivos.name.search(this.searchTerm))
        index = this.explorer.indexOf(indice)
        console.log(index)
        if(index >= 0){
        if(this.searchItems.find((itens) => itens === indice)){
            return false
        } else{
            this.searchItems.push(indice)
        }
        }
      },
      searchFail(){
        this.search = false
      }
    }
});