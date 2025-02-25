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
            <table>
              <tr>
                <td >
                <label for="model">Modelo:</label>&nbsp;
                </td>
                <td>
                  <div class="select">
                  <select id="model" name="model">
                      <option value="anthropic.claude-3-5-sonnet-20240620-v1:0" selected>Claude 3.5 Sonnet</option>
                      <option value="anthropic.claude-3-opus-20240229-v1:0">Claude 3 Opus</option>
                      <option value="meta.llama3-1-8b-instruct-v1:0">Llama 3.1 Instruct 8B</option>
                      <option value="amazon.nova-micro-v1:0">Amazon Nova Micro V1</option>
                      <option value="amazon.nova-lite-v1:0">Amazon Nova Lite V1</option>
                      <option value="amazon.nova-pro-v1:0">Amazon Nova Pro V1</option>
                      <option value="anthropic.claude-3-sonnet-20240229-v1:0">Claude 3 Sonnet</option>
                      <option value="anthropic.claude-3-haiku-20240307-v1:0">Claude 3 Haiku</option>
                  </select>
                  </div>
                </td>
              </tr>
            </table>
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
                output: ''
            };
        },
        methods: {
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
