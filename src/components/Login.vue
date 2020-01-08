<template>
  <div class="login">
    <transition appear mode="out-in">
      <form>
        <h1>Entrar</h1>
        <label for="usuario">Usuário: </label>
        <input type="text" id="usuario" nome="usuario" v-model="login">
        <label for="senha">Senha: </label>
        <input type="password" id="senha" nome="senha" v-model="senha">
        <span class="erro">{{erroMensagem}}</span>
        <button class="btn" @click.prevent="logar">Logar</button>
      </form>    
    </transition>
  </div>
</template>

<script>
import router from '../router.js';
export default {
  name: 'Login',
  data() {
    return {
      login: "",
      senha: "",
      erroMensagem: ""
    }
  },
  methods: {
    logar() {
      if ((this.login != "") && (this.senha != "")) {
        fetch('http://localhost:3000/usuarios')
        .then(r => r.json())
        .then(r => {
          r.forEach(resp => {
            if(this.login == resp.email && this.senha == resp.senha) {
              router.push({ path: '/home' })
            }
            else {
              this.erroMensagem = "Usuário ou senha incorretos";
              setTimeout(() => { 
                this.erroMensagem = "";
              }, 2000);
            }
          })
        })
      }
      else {
        this.erroMensagem = "Informe usuário e senha!";
        setTimeout(() => { 
          this.erroMensagem = "";
        }, 2000);
      }
    },
  }
}
</script>


<style scoped>
form h1 {
  text-align: center;
  color: #005555;
}
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%)
}
form label {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1.2rem;
}
form {
  display: grid;
  border-style: groove;
  padding: 20px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
.erro {
  color: firebrick;
  text-align: center;
}
</style>
