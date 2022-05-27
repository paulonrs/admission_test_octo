using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace CRUD_Pessoa.Models
{
    static class Validacao
    {
        public static bool ValidData(this string data)
        {
            try
            {
                DateTime date;
                return DateTime.TryParseExact(data,
                                              "dd/MM/yyyy",
                                              CultureInfo.InvariantCulture,
                                              DateTimeStyles.None,
                                              out date);
            }
            catch
            {
                return false;
            }
        }
    }
}
