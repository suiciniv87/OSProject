<template>
  <div class="servicos">
    <h1>Serviços</h1>
    <form class="busca">
      <label>OS: </label>
      <input align="center" type="text" id="procurar" name="procurar" placeholder="Digite o número da ordem de serviço" v-on:input="busca = $event.target.value">
    </form>
    <transition mode="out-in">
      <section class="modal" v-if="editar">
        <div class="modal_container">
          <form class="modalDados">
            <h1>Editar OS</h1><br>
            <label class="labelOs">OS: </label>
            <span class="spanOs">{{editar.os}}</span><br>
            <p><label class="labelOs">Título: </label>
            <input class="inputOs" type="text" name="titulo" v-model="editar.titulo"></p>
            <label class="labelOs">Descrição: </label>
            <input class="inputOs" type="text" name="descricao" v-model="editar.descricao"><br>
            <label class="labelOs">Data Solicitação: </label>
            <span>{{editar.dataSolicitacao}}</span><br>
            <label class="labelOs">Data Visita: </label>
            <span>{{editar.dataVisita}}</span><br>
            <div id="botoes" class="btnModal">
              <button class="btn btnAtualizar" @click.prevent="atualizarDados(editar); editar = '';">Atualizar</button>
              <button class="btn btnEditar" @click.prevent='editar = ""'>Fechar</button>
            </div>
          </form>
        </div>
      </section>
    </transition>
      <div>
        <table class="tabelaOs">
          <thead>
            <tr>
              <th>OS</th>
              <th>Título</th>
              <th>Descrição</th>
              <th>Data Solicitação</th>
              <th>Data de Visita</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody v-for="(servico, os) in servicoBusca" :key="os">
            <tr class="tabelaOs">
              <th>{{servico.os}}</th>
              <th>{{servico.titulo}}</th>
              <th>{{servico.descricao}}</th>
              <th>{{servico.dataSolicitacao}}</th>
              <th>{{servico.dataVisita}}</th>
              <th><center><button class="btn" @click="abrirModal(servico)">Editar</button>
            <button class="btn btnExc" @click.prevent=removerOs(servico)>Excluir</button></center></th>
            </tr>
          </tbody>
        </table>
        <center><router-link to="/adicionar" tag="button" class="btn btnAdd">Adicionar</router-link></center>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      servicos: [],
      busca: "",
      editar: "",
      os: []
    };
  },
  methods: {
    todosServicos() {
      fetch('http://localhost:3000/informacoes')
      .then(r => r.json())
      .then((r) => {
        this.servicos = r;
      })
    },
    editarServico(servico) {
      this.editar = servico;
    },
    atualizarDados(editar) {
        fetch(`http://localhost:3000/informacoes/${editar.id}`, {
        method: 'PUT',
        body: JSON.stringify({os: editar.os, titulo: editar.titulo, descricao: editar.descricao, dataSolicitacao: editar.dataSolicitacao, dataVisita: editar.dataVisita}),
        headers: {
        'content-type': 'application/json'
        }
      })
    },
    abrirModal(servico) {
      this.editarServico(servico);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    removerOs(servico) {
      fetch(`http://localhost:3000/informacoes/${servico.id}`, {
        method: 'DELETE'
      }) 
      //this.todosServicos();    **** EVITA PUXAR NOVAMENTE A API! APENAS FAZ UMA RENDERIZAÇÃO PARA O USUÁRIO.
      let indice = this.servicos.indexOf(servico);
      this.servicos.splice(indice,1);
    }
  },
   computed: {
    servicoBusca() {
      if (this.busca) {
        let exp = new RegExp(this.busca.trim(), 'i');
        return this.servicos.filter(servico => exp.test(servico.os));
      }
      else return this.servicos;
    }
  },
  created() {
    this.todosServicos();
  }
}
</script>


<style scoped>
.servicos h1 {
  text-align: center;
  margin-top: 30px;
  
}
.busca { 
  margin-left: auto;
  margin-right: auto;
  max-width: 380px;
}
.busca label {
  font-size: 23px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
input {
  max-width: 300px;
  margin: 20px 10px;
  padding: 10px auto auto;
  box-shadow: 0 4px 6px rgba(30, 60, 90, 0.2);
}
.resultadoTotal {
  margin: 0 auto;
  list-style: grid;
  font-family: "Avenir", "Helvetica", "Arial", sans-serif;
}
.tabelaOs {
  width: 100%; 
  text-align: center;

  border: 1px;
  border-style: unset;
}
tr.tabelaOs:hover {
  background: #9fcbd3;
}


/* MODAL */
.modal::before {
  content: "";
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,.5);
}
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 80px;
}
.modal_container {
  position: relative;
  background: white;
  z-index: 1;
  display: grid;
  grid-gap: 100px;
  padding: 0px 0px 10px 20px;
}
.modalDados {
  grid-column: 1;
  max-width: 500px;
}
.labelOs {
  padding: 10px 20px 10px 10px;
  text-align: left;
  margin-left: 10px;
  font-size: 18px;
  font-family: "Avenir", "Helvetica", "Arial", sans-serif;
}
.inputOs {
  align-content: right;
}
.btnModal {
  margin: 10px;
  display: grid;
  flex-direction: column;
}
.btnAtualizar {
  grid-column: 1;
  align-items: center;
}
.btnEditar {
  grid-column: 2;
  align-items: center;
}
.spanOs {
  font-size: 22px;
  color: darkred ; 
}
</style>
