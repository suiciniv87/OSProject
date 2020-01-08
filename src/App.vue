<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body, ul, li, h1, h2, p {
  padding: 0px;
  margin: 0px;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: url('./assets/back.png');
  background-size: cover;
}

.btn {
  margin: 10px;
  width: 120px;
  display: block;
  padding: 10px 30px;
  background: #0e2f44;
  border-radius: 4px;
  color: #FFF;
  text-align: center;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  transition: all 0.3;
  border: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  cursor: pointer;
}
.btn:hover {
  background: #0d5572;
}
.btnExc {
  background: firebrick;
}
.btnExc:hover {
  background: #f3403b;
}
.btnAdd {
  background: #009874;
}
.btnAdd:hover {
  background: #005b45;
}
.btnAtualizar {
  background: #db4a26;
}
.btnAtualizar:hover {
  background: #ff7538;
}
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}
input, textarea {
  width: 100%;
  border-radius: 4px;
  border: 1px solid white;
  padding: 15px 10px;
  box-shadow: 0 4px 8px (30, 60, 90, 0.1);
  transition: all .3s;
  font-size: 1rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-bottom: 15px;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: #0e2f44;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}
.v-leave-to {
  transform: translate3d(0, 20px, 0);
}
.v-enter-active,
.v-leave-active {
  transition: all .3s;
}
</style>
