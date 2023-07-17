<script setup>
import {Form, Field} from 'vee-validate'
import {vMaska} from "maska"
import Error from "../components/icons/Error.vue";
import {reactive, ref, watch} from "vue";
import Trash from "../components/icons/Trash.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const refForm = ref(null)
const buttonNext = ref(null)
const dataForm = reactive({
  company_name: '',
  members: []
})




if (sessionStorage.getItem('company')) {
  dataForm.company_name = JSON.parse(sessionStorage.getItem('company'))
}

if (sessionStorage.getItem('members')) {
  dataForm.members = JSON.parse(sessionStorage.getItem('members'))
}

const validateEmpty = (value) => {
  if (!value) {
    return 'Поле обязательно для заполнения';
  }
  return true;
}

const addMember = () => {

  refForm.value?.validate().then(({valid}) => {
    if (valid) {
      dataForm.members.push({
        id: dataForm.members.length,
        company_name: dataForm.company_name,
        first_name: '',
        last_name: '',
        phone: ''
      })

      setTimeout(() => {
        buttonNext.value.scrollIntoView({
          block: 'start', // к ближайшей границе экрана
          behavior: 'smooth', // и плавно
        });
      })
    }
  })

}

const deleteMembers = (id) => {
  dataForm.members = dataForm.members.filter(item => item.id !== id)
}

watch(dataForm, (item) => {
  sessionStorage.setItem('company', JSON.stringify(item.company_name))
  sessionStorage.setItem('members', JSON.stringify(item.members))
})

const goToCheckList = () => {
  refForm.value?.validate().then(({valid}) => {
    if (valid) {
      router.push('/list-members')
    }
  })
}

</script>

<template>
  <div class="container">
    <h1>Регистрация участников</h1>
    <p class="text">Введите название компании для регистрации всех участников. После заполнения всех приглашенных, нажмите кнопку «Далее».</p>
    <Form v-slot="{ errors }" ref="refForm">
      <div class="form-item">
        <div class="form-item__title">Укажите вашу компанию</div>
        <Field as="input" v-model="dataForm.company_name" class="input" name="company_name" type="text"
               placeholder="Название компании*"
               :rules="validateEmpty"></Field>
        <transition name="fade" mode="out-in">
          <div v-if="errors.company_name" class="error-message">
            <Error/>
            {{ errors.company_name }}
          </div>
        </transition>
        <transition name="fade" mode="out-in">
          <div class="members" v-if="dataForm.members.length > 0">
            <div class="members-header">
              <div class="members-header-title">
                <div class="members-header-title__text">Добавление участников</div>
              </div>
            </div>

            <div class="members-items">
              <div class="members-items-item" v-for="(member, idx) in dataForm.members">
                <div class="members-items-item-header">
                  Участник {{ idx + 1 }}
                  <div @click="deleteMembers(member.id)">
                    <Trash/>
                  </div>
                </div>
                <div class="form-item">
                  <Field v-model="member.first_name" class="input" :name="'first_name_' + idx" type="text"
                         placeholder="Имя участника*"
                         :rules="validateEmpty"></Field>
                  <transition name="fade" mode="out-in">
                    <div v-if="errors['first_name_' + idx]" class="error-message">
                      <Error/>
                      {{ errors['first_name_' + idx] }}
                    </div>
                  </transition>
                </div>
                <div class="form-item">
                  <Field v-model="member.last_name" class="input" :name="'last_name_' +idx" type="text"
                         placeholder="Фамилия участника*"
                         :rules="validateEmpty"></Field>
                  <transition name="fade" mode="out-in">
                    <div v-if="errors['last_name_' + idx]" class="error-message">
                      <Error/>
                      {{ errors['last_name_' + idx] }}
                    </div>
                  </transition>
                </div>
                <div class="form-item">
                  <Field v-model="member.phone" class="input" :name="'phone_' + idx" type="text"
                         v-maska data-maska="+7 (###) ###-##-##"
                         placeholder="Телефон участника*"
                         :rules="validateEmpty"></Field>
                  <transition name="fade" mode="out-in">
                    <div v-if="errors['phone_' + idx]" class="error-message">
                      <Error/>
                      {{ errors['phone_' + idx] }}
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <button @click="addMember" type="button" class="button button__gray"
                :class="{'button__light-green': dataForm.company_name }">Добавить участника
        </button>
        <transition name="fade" mode="out-in">
          <button ref="buttonNext" v-show="dataForm.members.length > 0" type="button" class="button button__green" @click="goToCheckList">Далее
          </button>
        </transition>
      </div>
    </Form>
  </div>
</template>

<style scoped>

.text {
  margin-bottom: 32px;
}

.button.button__gray {
  margin-top: 24px;
}

.button.button__green {
  margin-top: 16px;
}

.members {
  margin-top: 8px;
}

.members-header {
  position: sticky;
  padding-top: 24px;
  padding-bottom: 24px;
  top: 0;
  background-color: #fff;
}

.members-header-title__text {
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  color: #191919;
  margin-bottom: 10px;
}


.members-add-place__title svg {
  margin-right: 8px;
}
.members-items {
  max-height: 32vh;
  overflow: auto;
}

.members-items-item {
  margin-bottom: 24px;
  min-height: 240px;
}

.members-items-item:last-child {
  margin-bottom: 0;
}

.members-items-item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  line-height: 26px;
  font-weight: 500;
  color: #212832;
  margin-bottom: 12px;
}

.members-items .members-items-item .form-item {
  margin-bottom: 12px;
}

.members-items .members-items-item .form-item:last-child {
  margin-bottom: 0;
}


</style>