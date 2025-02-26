<style>
@import '../app.css';
</style>
<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 mb-4" style="min-width: 750px;">
        <div class="card-header" style="background-color:#f2d907">
          Buscar Documentos
        </div>
        <div class="card">
          <img class="card-img-top" src="" alt=""/>

          <div class="card-body">
            <div class="row gap">
              <div>
                <label for="model">Modelo:</label>&nbsp;
                <div class="select">
                  <select id="model" name="model">
                    <option value="anthropic.claude-3-5-sonnet-20240620-v1:0" selected>Claude 3.5 Sonnet</option>
                    <option value="anthropic.claude-3-opus-20240229-v1:0">Claude 3 Opus</option>
                    <option value="meta.llama3-1-8b-instruct-v1:0">Llama 3.1 Instruct 8B</option>
                    <option value="us.amazon.nova-micro-v1:0">Amazon Nova Micro V1</option>
                    <option value="us.amazon.nova-lite-v1:0">Amazon Nova Lite V1</option>
                    <option value="us.amazon.nova-pro-v1:0">Amazon Nova Pro V1</option>
                    <option value="anthropic.claude-3-sonnet-20240229-v1:0">Claude 3 Sonnet</option>
                    <option value="anthropic.claude-3-haiku-20240307-v1:0">Claude 3 Haiku</option>
                  </select>
                </div>
              </div>
              <svg v-if="!isMuted" @click="mute()" class="hover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="20" height="20"><path d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>
              <svg v-if="isMuted" @click="mute()" class="hover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="20" height="20"><path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>
            </div>
          <br />
            <form @submit="formSubmit">
              <strong>Pergunta</strong> <br />
              <input type="text" class="form-control" v-model="name" placeholder="Escreva sua pergunta..." />
              <br />
              <button class="btn btn-success">Perguntar</button>
            </form>
            <br />
            <div id="loading" style="display: none">
              <strong>Carregando...</strong>
            </div>
            <div id="divresult" class="text-secondary mb-2" style="display: block; padding: 3px;">
              <strong v-if="output.answer" style="display: block; white-space: pre-line; text-align: left">Resposta: </strong>
              <span v-if="output.answer" style="white-space: pre-line; text-align: left">{{output.answer}}</span>
              <br />
              <strong v-if="output.source_documents" style="display: block; text-align: left">Referências: </strong>
              <span v-if="output.source_documents" style="white-space: pre-line; text-align: left">{{output.source_documents}}</span>
              <br />
              <strong v-if="output.error" style="display: block; white-space: pre-line; color: red; text-align: left">Erro: </strong>
              <span v-if="output.error" style="white-space: pre-line; text-align: left; color: red; font-style: italic;">{{output.error}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAuthToken } from '../utils/auth'
//import linkifyHtml from 'linkify-html';
    export default {
        mounted() {
            console.log('Component mounted.')
        },
        data() {
            return {
                name: '',
                description: '',
                output: '',
                isMuted: false
            };
        },
        methods: {
          playSound (sound) {
              if(sound) {
                var audio = new Audio(sound);
                audio.play();
              }
            },
          mute(){
            this.isMuted = !this.isMuted;
          },
          formSubmit(e) {
              console.log('started.')
              e.preventDefault();
              var x = document.getElementById("divresult");
              var img = document.getElementById("loading");
              var model_select = document.getElementById('model');
              var model_id = model_select.options[model_select.selectedIndex].value;

              img.style.display = "block";
              x.style.display = "none";
              let currentObj = this;
              const json = JSON.stringify({
                  query: this.name,
                  model_id: model_id


              });
              console.log(json)
              const config = {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': getAuthToken()
                }
              };
              this.axios.post('/kb',
              json, config).then(function(response) {
                    img.style.display = "none";
                    x.style.display = "block";
                    console.log(response.data)
                    currentObj.output =response.data
                    if(!currentObj.isMuted){
                      currentObj.playSound(response.data.audio_url)
                    }
                    console.log(currentObj.output)
                }).catch(function(error) {
                    currentObj.output = error;
                    console.log('ERROR')
                    console.log(currentObj.output)
                });
            }
        }
    }
</script>
