<script setup>

import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {tg} from "../main.js";

const router = useRouter()
const company_name = computed(() => JSON.parse(sessionStorage.getItem('company')))
const company_members = computed(() => JSON.parse(sessionStorage.getItem('members')))
const statusSend = ref({
  color: '#7CB342',
  text: 'Данные успешно отправлены',
})
const statusSendActive = ref(false)
const loader = ref(false)

const sendData = async () => {
  loader.value = true
  const response = await fetch('/api/v1/invitee/create', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(company_members.value)
  })
  setTimeout(() => {

    if (response.status >= 400) {
      statusSend.value.color = 'rgba(242, 50, 24, 1)'
      statusSend.value.text = 'Произошла ошибка'

      statusSendActive.value = true
      loader.value = false


      setTimeout(() => {
        statusSendActive.value = false

      }, 2500)

      return false
    }

    // statusSend.value.color = '#7CB342'
    // statusSend.value.text = 'Данные успешно отправлены'

    setTimeout(() => {
      loader.value = false
      statusSendActive.value = false
      sessionStorage.removeItem('company')
      sessionStorage.removeItem('members')

      tg.sendData("Invitees was submitted");
      tg.postEvent('web_app_close');
      tg.close();


    }, 2500)

  }, 3000)

}
</script>

<template>
  <div class="container">
    <div class="alert" :style="{backgroundColor: statusSend.color}" :class="{'is-active': statusSendActive}">
      <div class="alert__text">{{ statusSend.text }}</div>
    </div>
    <h1>Проверьте список участников</h1>
    <p class="text company-name">Компания {{ company_name }}</p>
    <div class="member-items">
      <div class="member-item" v-for="(item, idx) in company_members">
        <div class="member-item__count">{{ idx + 1 }}</div>
        <div class="member-item-info">
          <div class="member-item-head__name">{{ item.first_name }} {{ item.last_name }}</div>
          <div class="member-item__phone">{{ item.phone }}</div>
        </div>
      </div>
    </div>


    <button type="button" class="button button__green" @click="sendData" :class="{'is-disabled': loader}" :disabled="loader">
      <div v-if="loader" class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <template v-else>
        Отправить
      </template>

    </button>
    <router-link class="button button__gray" to="/registration-member">Назад</router-link>
  </div>
</template>
<style scoped>
h1 {
  margin-bottom: 32px;
}

.company-name {
  color: #191919;
  font-weight: 500;
  padding-bottom: 16px;
}

.member-items {
  max-height: 480px;
  overflow: auto;
}

.member-item {
  display: flex;
  align-items: flex-start;
  border-top: 1px solid #D0D0D0;
  padding: 16px 0;
}

.member-item-head__name {
  font-size: 15px;
  line-height: 24px;
  font-weight: 500;
}

.member-item__count {
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  color: #A0A0A0;
  margin-right: 8px;
  width: 16px;
}

.member-item__phone {
  font-size: 15px;
  line-height: 24px;
  font-weight: 500;
  color: #5C5C5C;
}

.button__green {
  margin-top: 40px;
}

.button__green.is-disabled {
  opacity: 0.5;
}
.button__gray {
  margin-top: 16px;
  color: #191919;
}

.alert {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 16px;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  transition: 0.5s;
  transform: translateY(-100px);
  opacity: 0;
}

.alert.is-active {
  transform: translateY(0px);
  opacity: 1;
}
</style>