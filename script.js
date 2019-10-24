String.prototype.isABC = function(){var a =this,ab="abcdefghijklmnopqrstuvwxyz,.[] {}1234567890´''àáóòê",ab2=ab.toUpperCase(),ab3='"":´><';for(i=0;i<ab.length;i++){if(ab.charAt(i)==a||ab2.charAt(i)==a||ab3.charAt(i)==a){return true;}}return false;}

var app = new Vue({
  el: "#app",
  data:{
    reg: /[a-zA-Z\u00C0-\u00FF ]+/i,
    left_a: [
      {"name": "Explorer", "icon" : "far fa-copy"},
      {"name": "Search", "icon" : "fas fa-search"}
    ],
    where: "Explorer",
    explorer: [
      {'name' : "readme", "icon":"fab fa-readme",
      "text" : "Seja bem vindo ao NekoCode, NekoCode é um editor de código parecido com Visual Studio Code"
      }],
    abertos: [],
    ativo: {}
  },
  created() {
    window.addEventListener('keydown', (e) => {
      if(e.key.isABC()){
        this.editar(e.key)
      }
      if(e.key == ' '){
        this.editar(e.key)
      }
      if(e.key == 'Backspace'){
        var novotexto = this.ativo.text.substring(0,(this.ativo.text.length - 1));
        this.ativo.text = novotexto
      }
        
    });
  },
  methods:{
    editar(letter){
      this.ativo.text += letter
    },
    acessar(app){
      this.where = app
    },
    abrir(arq){
      this.abertos.push(arq)
      this.ativo = arq
    },
    close(aberto){
      var index = this.abertos.indexOf(aberto)
      if (index !== -1) this.abertos.splice(index, 1);
      this.ativo = {}
    }
  }
});