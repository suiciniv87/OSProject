<template>
    <div class="adicionar">
        <form class="adicionarOs">
            <h1 align="center">Adicionar nova OS</h1><br>
            <h2 align="center">OS: {{os}} </h2>
            <label>Título</label>
            <input id="titulo" type="text" v-model="titulo">
            <label>Descrição</label>
            <input id="descricao" type="text" v-model="descricao">
            <label>Data Solicitação</label>
            <input type="date" v-model="dataSolicitacao">
            <label>Data de Visita</label>
            <input type="date" v-model="dataVisita">
            <transition mode="out-in" v-if='mensagemInfo != ""'>
            <span class="mensagemInfo">{{mensagemInfo}}</span>
            </transition>
            <div id="botoes" class="botoes">
                <button @click.prevent="gravarDados()" class="btn btnAdd">Adicionar</button>
                <router-link to="/home" tag="button" class="btn btnVoltar">Voltar</router-link>
            </div>
        </form>
    </div>

</template>

<script>
export default {
    name: "OsAdicionar",
    data() {
        return {
            os: 0,
            titulo: "",
            descricao: "",
            dataSolicitacao: new Date().toLocaleDateString(),
            dataVisita: new Date().toLocaleDateString(),
            fetchData: "",
            mensagemInfo: ""
        }
    },
    methods: {
        async gravarDados() {
            if (this.titulo != "" && this.descricao != "" && this.dataSolicitacao != "" && this.dataVisita != "") {
                await fetch('http://localhost:3000/informacoes', {
                    method: 'POST',
                    body: JSON.stringify({os: parseInt(this.os), titulo: this.titulo, descricao: this.descricao, dataSolicitacao: this.dataSolicitacao, dataVisita: this.dataVisita}),
                    headers: {
                    'content-type': 'application/json'
                    }
                })
                this.mensagem("OS adicionada com sucesso!")
                document.getElementById('titulo').focus();
                this.pegarDados()
            } else this.mensagem("Falta preencher alguns dados!");
        },
        mensagem(mensagem) {
            this.mensagemInfo = mensagem;
            setTimeout(() => { 
                this.mensagemInfo = "";
            }, 2000);
        },
        /* PEGAR DADOS */
        pegarDados() {
            this.titulo = "";
            this.descricao = "";
            this.dataSolicitacao = "";
            this.dataVisita = "";
            fetch('http://localhost:3000/informacoes')
            .then(r => r.json())
            .then((r) => {
                r.forEach(element => {
                    this.fetchData = parseInt(element.os);
                });
                // this.os = this.os.concat(this.fetchData.length -1);
                this.os = this.fetchData +1;
            })
            /* FIM PEGAR DADOS */
        }            
    },
    created() {
        this.pegarDados();
    }
}

</script>

<style scoped>
.adicionar {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.adicionarOs {
    align-items: center;
    max-width: 500px;
}
.botoes {
    display: grid;
    flex-direction: column;
}
.btnAdd {
    grid-column: 1;
    align-items: center;
    margin-left: 70px;
}
.btnVoltar {
    grid-column: 2;
    align-items: center;
}
.mensagemInfo {
  color: #6495ED;
  margin-left: 145px;
}
.v-enter-active,
.v-leave-active {
    transition: all .4s;
}
.v-enter,
.v-leave-to {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
}
</style>