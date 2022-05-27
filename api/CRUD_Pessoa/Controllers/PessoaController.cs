using CRUD_Pessoa.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Data;

namespace CRUD_Pessoa.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PessoaController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public PessoaController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            
            string query = @"SELECT * FROM bd_sistema.tt_pessoa";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PessoaAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(table);
        }
        [HttpPost]
        public JsonResult Post(Pessoa pessoa)
        {
            try
            {
                //return new JsonResult(pessoa.Rg_Incricao);
                pessoa.Validar();
                //validarPessoa(pessoa);
                //validarTelefone();
                string query = "INSERT INTO bd_sistema.tt_pessoa" +
                                            "(nome, tipo, cpf_cnpj, rg_incricao, email, data_nasc_fundacao) " +
                                    "VALUES " +
                                            @"(@Nome, @Tipo, @Cpf_Cnpj, @Rg_Incricao, @Email, @DataNasc_Fundacao )";

                DataTable table = new DataTable();
                string sqlDataSource = _configuration.GetConnectionString("PessoaAppCon");
                MySqlDataReader myReader;
                using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
                {
                    mycon.Open();
                    using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                    {
                        myCommand.Parameters.AddWithValue("@Nome", pessoa.Nome);
                        myCommand.Parameters.AddWithValue("@Tipo", pessoa.Tipo);
                        myCommand.Parameters.AddWithValue("@Cpf_Cnpj", pessoa.Cpf_Cnpj);
                        myCommand.Parameters.AddWithValue("@Rg_Incricao", pessoa.Rg_Incricao);
                        myCommand.Parameters.AddWithValue("@Email", pessoa.Email);
                        myCommand.Parameters.AddWithValue("@DataNasc_Fundacao", pessoa.DataNasc_Fundacao);
                        myReader = myCommand.ExecuteReader();
                        table.Load(myReader);

                        myReader.Close();
                        mycon.Close();
                    }
                }

                return new JsonResult("Adiconado com sucesso");
            }
            catch (Exception e)
            {
                return new JsonResult (e.Message);
            }
        }

        [HttpPut]
        public JsonResult Put(Pessoa pessoa)
        {
            if(pessoa.Nome == "ParaDelete") return Delete(pessoa); // Por algum motivo o 'axios.delete' está dando o erro 415, não consegui achar o motivo, infelizmente tive que usar gambiarra 
            string query = "UPDATE tt_pessoa SET nome= @Nome,tipo= @Tipo,cpf_cnpj= @Cpf_Cnpj,rg_incricao= @Rg_Incricao,email= @Email,data_nasc_fundacao= @DataNasc_Fundacao  " +
                "WHERE codigo= @Codigo";
            pessoa.Validar();
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PessoaAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@Nome", pessoa.Nome);
                    myCommand.Parameters.AddWithValue("@Tipo", pessoa.Tipo);
                    myCommand.Parameters.AddWithValue("@Cpf_Cnpj", pessoa.Cpf_Cnpj);
                    myCommand.Parameters.AddWithValue("@Rg_Incricao", pessoa.Rg_Incricao);
                    myCommand.Parameters.AddWithValue("@Email", pessoa.Email);
                    myCommand.Parameters.AddWithValue("@DataNasc_Fundacao", pessoa.DataNasc_Fundacao);
                    myCommand.Parameters.AddWithValue("@Codigo", pessoa.Codigo);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult("Alterado com sucesso");
            //return new JsonResult(table);
        }
        [HttpDelete]
        public JsonResult Delete(Pessoa pessoa)
        {

            string query = " DELETE FROM bd_sistema.tt_pessoa " +
                           " WHERE tt_pessoa.codigo = @Codigo ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PessoaAppCon");
            MySqlDataReader myReader;
            using (MySqlConnection mycon = new MySqlConnection(sqlDataSource))
            {
                mycon.Open();
                using (MySqlCommand myCommand = new MySqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@Codigo", pessoa.Codigo);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    mycon.Close();
                }
            }

            return new JsonResult(pessoa.Codigo);
            //return new JsonResult(table);
        }

        private void validarTelefone(Telefone tel)
        {

            //throw new ArgumentException();
        }
    }
}
