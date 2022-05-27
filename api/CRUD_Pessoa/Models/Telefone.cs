using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUD_Pessoa.Models
{
    public class Telefone
    {
        public int Codigo  { get; set; }
        public string Tipo { get; set; }
        public string Ddd { get; set; }
        public string Numero { get; set; }
        public string Observacao { get; set; }
        public int CodigoPessoa { get; set; }

    }
}