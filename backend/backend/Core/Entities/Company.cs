using backend.Core.Enums;

namespace backend.Core.Entities
{
    public class Company : BaseEntity
    {

        public String? Name { get; set; }

        //This is the enum created for the size of the company
        public CompanySize Size { get; set; }

        //Relations

        public ICollection<Job>? Jobs { get; set; }
    }
}
