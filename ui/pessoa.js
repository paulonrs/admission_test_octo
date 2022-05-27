const pessoa = {
  template: `
  <button
    type="button"
    class="btn btn-primary m-2 fload-end"
    data-bs-toggle="modal"
    data-bs-target="#dialog"
    @click="addCliente()"
  >+</button>

  <table class="table table-striped">
    <thead>
      <tr>
        <th>Nome</th>
        <th>CPF / CNPJ</th>
        <th>Telefones</th>
        <th>Endereços</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="pessoa in pessoas">
        <td>{{pessoa.nome}}</td>
        <td>{{pessoa.cpf_cnpj}}</td>
        <td>{{pessoa.nome}}</td>
        <td>{{pessoa.nome}}</td>
        <td>
          <button type="button" class="btn btn-warning mx-1" data-bs-toggle="modal" data-bs-target="#dialog"
                  @click="editarPessoa(pessoa)">
            <img src="/imagens/edit.svg" alt="Editar">
          </button>

          <button type="button" @click="deletarPessoa(pessoa)"
          class="btn btn-danger mx-1">
          <img src="/imagens/delete.svg" alt="Deletar">
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <div
    class="modal fade cadastro"
    id="dialog"
    tabindex="-1"
    aria-labelledby="dialogTituloModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="dialogTituloModalLabel">{{modalTitle}}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <h5>Dados</h5>
          ${criarLinha([
            [
              {
                tamColum: 6,
                nomeInput: 'Nome ',
                idCampo: 'Nome',
                obrigatorio: true
              },
              {
                tamColum: 6,
                nomeInput: 'Tipo ',
                obrigatorio: true,
                padrao: false,
                campoInteiro: `
                  <select class="form-select" id="Tipo" @change="chengeTipoPessoa()">
                    <option selected>Selecione</option>
                    <option value="F">Física</option>
                    <option value="J">Jurídica</option>
                  </select>`
              }
            ],
            [
              {
                tamColum: 6,
                nomeInput: 'CPF / CNJP ',
                idCampo: 'Cpf_Cnpj',
                obrigatorio: true
              },
              {
                tamColum: 6,
                nomeInput: 'RG / Inscrição Estadual ',
                idCampo: 'Rg_Incricao',
                obrigatorio: true
              }
            ],
            [
              {
                tamColum: 6,
                nomeInput: 'Email ',
                idCampo: 'Email',
                obrigatorio: true
              },
              {
                tamColum: 6,
                nomeInput: 'Data de Nascimento / Fundação',
                idCampo: 'DataNasc_Fundacao'
              }
            ]
          ])}

          <hr class="linha my-1"/>
          <div id="formTelefone" class="PrimeiroItem">
            <h5>Telefones</h5>
            <div class="row">
              ${criarColunas([
                {
                  tamColum: 4,
                  nomeInput: 'Tipo ',
                  idCampo: 'TelefoneTipo',
                  obrigatorio: true
                },
                {
                  tamColum: 2,
                  nomeInput: 'DDD ',
                  idCampo: 'TelefoneDDD',
                  obrigatorio: true
                },
                {
                  tamColum: 4,
                  nomeInput: 'Número ',
                  idCampo: 'TelefoneNumero',
                  obrigatorio: true
                }
              ])}

              <div class="col-md-2 ">
                <button type="button" @click="deletarTelefone(this)" class="btn btn-danger mx-1">
                  <img src="/imagens/delete.svg" alt="Deletar">
                </button>
              </div>
            </div>

            <div class="row">
              ${criarColunas([
                {
                  tamColum: 10,
                  nomeInput: 'Observações',
                  idCampo: 'TelefoneObs'
                }
              ])}

              <div class="col-md-2 colunaSalvar">
                <button type="button" @click="SalvarTelefone(this)" class="btn btn-success mx-1">
                <img src="/imagens/check.svg" alt="Confirmar">
                </button>
              </div>

              <div class="col-md-2 colunaAlterar">
                <button type="button" @click="editarTelefone(this)" class="btn btn-warning mx-1">
                  <img src="/imagens/edit.svg" alt="Editar">
                  </button>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 my-auto text-end"> 
                <h5>Adicionar Telefone</h5>
              </div>
              <div class="col-md-2"> 
                <button type="button" class="btn btn-primary m-2 fload-end" @click="addTelefone()">+</button>
              </div>
            </div>
          </div>

          <hr class="linha my-1"/>
          <div id="formEndereco" class="PrimeiroItem">
            <h5>Endereços</h5>

            <div class="row">
            ${criarColunas([
              {
                tamColum: 3,
                nomeInput: 'Tipo ',
                idCampo: 'EnderecoTipo',
                obrigatorio: true
              },
              {
                tamColum: 7,
                nomeInput: 'CEP ',
                idCampo: 'EnderecoCEP',
                obrigatorio: true
              }
            ])}
              <div class="col-md-2">
                <button type="button" @click="deletarTelefone(this)" class="btn btn-danger mx-1">
                <img src="/imagens/delete.svg" alt="Deletar">
                </button>
              </div>
            </div>

            <div class="row linhaPrimeiro">
            ${criarColunas([
              {
                tamColum: 4,
                nomeInput: 'Logadouro ',
                idCampo: 'EnderecoLogadouro',
                obrigatorio: true
              },
              {
                tamColum: 2,
                nomeInput: 'Nº ',
                idCampo: 'EnderecoNumero',
                obrigatorio: true
              },
              {
                tamColum: 4,
                nomeInput: 'Complemento',
                idCampo: 'EnderecoComplemento'
              }
            ])}
              <div class="col-md-2 colunaSalvar">
                <button type="button" @click="Alterar(this)" class="btn btn-success mx-1">
                <img src="/imagens/check.svg" alt="Confirmar">
                </button>
              </div>
            </div>

            ${criarLinha([
              [
                {
                  tamColum: 4,
                  nomeInput: 'Bairro ',
                  idCampo: 'EnderecoBairro',
                  obrigatorio: true
                },
                {
                  tamColum: 4,
                  nomeInput: 'Cidade ',
                  idCampo: 'EnderecoCidade',
                  obrigatorio: true
                },
                {
                  tamColum: 2,
                  nomeInput: 'UF ',
                  idCampo: 'EnderecoUF',
                  obrigatorio: true
                }
              ]
            ])}
          </div>

          <div class="row">
            <div class="col-md-6 my-auto text-end"> 
              <h5>Adicionar Endereço</h5>
            </div>
            <div class="col-md-2"> 
              <button type="button" class="btn btn-primary m-2 fload-end" @click="addEndereco()">+</button>
            </div>
          </div>
          
          <button id="btnCadatro" type="button" 
                  @click="adicionarPessoa()" v-if="Codigo==0" class="btn btn-primary">
            Cadastrar
          </button>
          <button id="btnEdicao" type="button" 
                  @click="atulizarPessoa()" v-if="Codigo!=0" class="btn btn-primary">
            Atualizar
          </button>
        </div>
      </div>
    </div>
  </div>
  `,

  data() {
    return {
      pessoas: [],
      modalTitle: '',
      TipoSelecionado: false,

      Codigo: 0,
      Nome: '',
      Tipo: '',
      Cpf_Cnpj: '',
      Rg_Incricao: '',
      Email: '',
      DataNasc_Fundacao: '',

      TelefoneTipo: '',
      TelefoneNumero: '',
      TelefoneDDD: '',
      TelefoneObs: '',

      EnderecoLogadouro: '',
      EnderecoNumero: '',
      EnderecoComplemento: '',
      EnderecoBairro: '',
      EnderecoCidade: '',
      EnderecoUF: '',
      EnderecoTipo: '',
      EnderecoCEP: ''
    }
  },
  methods: {
    refreshData() {
      axios.get(variables.API_URL + 'pessoa').then(response => {
        this.pessoas = response.data
      })
    },
    addCliente() {
      this.modalTitle = 'Adicionar Pessoa'
      this.Codigo = 0
      this.Nome = ''
      Tipo.value = 'Selecione'
      this.Cpf_Cnpj = ''
      this.Rg_Incricao = ''
      this.Email = ''
      this.DataNasc_Fundacao = ''
      desabilitarCamposPessoa(true)
    },
    editarPessoa(pessoa) {
      this.modalTitle = 'Editar Pessoa'
      this.Codigo = pessoa.codigo
      this.Nome = pessoa.nome
      Tipo.value = pessoa.tipo
      this.Cpf_Cnpj = pessoa.cpf_cnpj
      this.Rg_Incricao = pessoa.rg_incricao
      this.Email = pessoa.email
      this.DataNasc_Fundacao = pessoa.data_nasc_fundacao

      mudarCamposPessoa()
      desabilitarCamposPessoa(false)
    },
    adicionarPessoa() {
      axios
        .post(variables.API_URL + 'pessoa', {
          Nome: this.Nome,
          Tipo: Tipo.value,
          Cpf_Cnpj: this.Cpf_Cnpj,
          Rg_Incricao: this.Rg_Incricao,
          Email: this.Email,
          DataNasc_Fundacao: this.DataNasc_Fundacao
        })
        .then(response => {
          this.refreshData()
          alert(response.data)
        })
    },
    atulizarPessoa() {
      axios
        .put(variables.API_URL + 'pessoa', {
          Codigo: this.Codigo,
          Nome: this.Nome,
          Tipo: Tipo.value,
          Cpf_Cnpj: this.Cpf_Cnpj,
          Rg_Incricao: this.Rg_Incricao,
          Email: this.Email,
          DataNasc_Fundacao: this.DataNasc_Fundacao
        })
        .then(response => {
          this.refreshData()
          alert(response.data)
        })
    },
    deletarPessoa(pessoa) {
      axios
        .put(variables.API_URL + 'pessoa', {
          Codigo: pessoa.codigo,
          Nome: 'ParaDelete' // Por algum motivo o 'axios.delete' está dando o erro 415, não consegui achar o motivo, infelizmente tive que usar gambiarra
        })
        .then(response => {
          this.refreshData()
          alert(response.data)
        })
    },
    addTelefone() {},
    addEndereco() {},

    chengeTipoPessoa() {
      TipoSelecionado = Tipo.value == 'F' || Tipo.value == 'J'
      desabilitarCamposPessoa(!TipoSelecionado)
      mudarCamposPessoa()
    }
  },
  mounted: function () {
    this.refreshData()
  }
}
function desabilitarCamposPessoa(status) {
  $('#Cpf_Cnpj').prop('disabled', status)
  $('#Rg_Incricao').prop('disabled', status)
  $('#DataNasc_Fundacao').prop('disabled', status)
  $('#Email').prop('disabled', status)
}
function mudarCamposPessoa() {
  if (Tipo.value == 'F') {
    $('#lbl_Rg_Incricao').text('RG')
    $('#lbl_Cpf_Cnpj').text('CPF')
    $('#Cpf_Cnpj').mask('000.000.000-00')
    $('#lbl_DataNasc_Fundacao').text('Data de Nascimento')
  } else if (Tipo.value == 'J') {
    $('#lbl_Rg_Incricao').text('Inscrição Estadual')
    $('#lbl_Cpf_Cnpj').text('CNPJ')
    $('#Cpf_Cnpj').mask('000.000.000/0000-00')
    $('#lbl_DataNasc_Fundacao').text('Data de Fundação')
  }
}

/* FUNCÕES PARA FACILITAR A ESCRITA DO HTML */
/* Para usar a função o argumento precisa ter essa sintaxe
  [ // Array de linhas      -- Cada um que voce passar sera equivalente a uma linha
    [ // Array de colunas   -- Cada um que voce passar sera equivalente a uma Coluna da linha
      { // coluna de input  -- Propriedades da coluna
        tamColum: 12
        nomeInput: inputMax
        idCampo: idInputMax
      }
    ]
  ]
 */
function criarLinha(linhas) {
  let texto = ''

  linhas.forEach(linha => {
    texto += `<div class="row">`
    texto += criarColunas(linha)
    texto += `</div>`
  })

  return texto
}

function criarColunas(linha) {
  let texto = ''
  linha.forEach(colum => {
    texto += `<div class="col-md-${colum.tamColum}">
                  <div class="input-group mb-3">

                    <span class="input-group-text"> 
                      <span id="lbl_${colum.idCampo}">
                        ${colum.nomeInput}
                      </span> 
                      <span>${colum.obrigatorio ? '<b>*</b>' : ''}</span> 
                    </span> 
                    
                    ${
                      colum.padrao != false
                        ? `<input type="text" class="form-control" id="${colum.idCampo}" v-model="${colum.idCampo}" />`
                        : colum.campoInteiro
                    }
                    
                  </div>
                </div>`
  })
  return texto
}
