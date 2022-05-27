using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUD_Pessoa.Models
{
    public class Pessoa
    {
        public int Codigo { get; set; }
        public string Nome { get; set; }
        public string Tipo{ get; set; }
        public string Cpf_Cnpj { get; set; }
        public string Rg_Incricao { get; set; }
        public string Email { get; set; }
        public string DataNasc_Fundacao { get; set; }

        const string _FISICA = "F", _JURIDICA = "J";

        public void Validar()
        {
            if (String.IsNullOrEmpty(Nome))
                throw new Exception("Nome não foi preenchido" + Nome);
            ValidTipo();
            ValidCnpjCpf();
            if (String.IsNullOrEmpty(Rg_Incricao))
                if (Tipo == _FISICA) 
                    throw new Exception("RG não foi preenchido");
                else
                    throw new Exception("Inscrição Estadual não foi preenchido");
            if(String.IsNullOrEmpty(DataNasc_Fundacao))
                if (Tipo == _FISICA) 
                    throw new Exception("Data de Nascimento não foi preenchido"); 
                else
                    throw new Exception("Data de Fundação não foi preenchido");
            ValidEmail();
            if (DataNasc_Fundacao.ValidData())
                if (Tipo == _FISICA) 
                    throw new Exception("Data de Nascimento não foi preenchido corretamente"); 
                else
                    throw new Exception("Data de Fundação não foi preenchido corretamente");
        }
        public void ValidEmail()
        {
            //try
            //{
            //    var address = new System.Net.Mail.MailAddress(Email);
            //    if(address.Address == Email) throw new Exception("Email inválido");
            //}
            //catch
            //{
            //    throw new Exception("Email não foi prenchido corretamente");
            //}
        }

        public void ValidTipo()
        {
            if (Tipo != "F" && Tipo != _JURIDICA)
                throw new Exception("Tipo de Pessoa inválido");
        }

        /* Referencias para as validações de CPF e CNPJ
         * https://www.macoratti.net/11/09/c_val1.htm
         */
        public void ValidCnpjCpf()
        {
            if (Tipo == _FISICA) ValidCpf(); else ValidCnpj();
        }
        public void ValidCpf()
        {
            string cpf = Cpf_Cnpj;

            int[] multiplicador1 = new int[9] { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = new int[10] { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            string tempCpf;
            string digito;
            int soma;
            int resto;
            cpf = cpf.Trim();
            cpf = cpf.Replace(".", "").Replace("-", "");
            if (cpf.Length != 11) throw new Exception("CPF não foi prenchido corretamente");
            tempCpf = cpf.Substring(0, 9);
            soma = 0;

            for (int i = 0; i < 9; i++)
            {
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador1[i];
            }
            resto = soma % 11;
            if (resto < 2)
            {
                resto = 0;
            }
            else
            {
                resto = 11 - resto;
            }
            digito = resto.ToString();
            tempCpf = tempCpf + digito;
            soma = 0;
            for (int i = 0; i < 10; i++)
            {
                soma += int.Parse(tempCpf[i].ToString()) * multiplicador2[i];
            }
            resto = soma % 11;
            if (resto < 2)
            {
                resto = 0;
            }
            else
            {
                resto = 11 - resto;
            }
            digito +=  resto.ToString();
            if(!cpf.EndsWith(digito)) throw new Exception("CPF inválido");
        }

        public void ValidCnpj()
        {
            string cnpj = Cpf_Cnpj;
            int[] multiplicador1 = new int[12] { 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = new int[13] { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            int soma;
            int resto;
            string digito;
            string tempCnpj;
            cnpj = cnpj.Trim();
            cnpj = cnpj.Replace(".", "").Replace("-", "").Replace("/", "");
            if (cnpj.Length != 14) throw new Exception("CNPJ não foi prenchido corretamente");
            tempCnpj = cnpj.Substring(0, 12);
            soma = 0;
            for (int i = 0; i < 12; i++)
                soma += int.Parse(tempCnpj[i].ToString()) * multiplicador1[i];
            resto = (soma % 11);
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = resto.ToString();
            tempCnpj = tempCnpj + digito;
            soma = 0;
            for (int i = 0; i < 13; i++)
                soma += int.Parse(tempCnpj[i].ToString()) * multiplicador2[i];
            resto = (soma % 11);
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito += resto.ToString();
            if(cnpj.EndsWith(digito)) throw new Exception("CNPJ inválido");
        }

    }
}
