<script setup>

import Logo from "../components/icons/Logo.vue";
</script>

<template>
  <div class="container">

    <h1>Приглашение на презентацию проекта «Новая Елизаветка»</h1>
    <img src="../../public/image_12.png" alt="Приветствие">
    <p class="text">Пройдите регистрацию для принятия участия в презентации нового проекта ГК «ИНСИТИ». Узнайте больше о нашем проекте!</p>
    <router-link class="button button__green" to="/registration-member">Подтвердить участие</router-link>
    <Logo/>
  </div>
</template>

<style scoped>
img {
  border-radius: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  margin: 0 auto 28px auto;
  max-width: 100%;
}
.text {
  margin-bottom: 40px;
}
.button {
  margin-bottom: 42px;
}
.logo {
  display: block;
  margin: 0 auto 40px;
}
</style>
