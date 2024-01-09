using backend.Core.Enums;

namespace backend.Core.Dtos.Company
{
    public class CompanyGetDto
    {
        public long ID { get; set; }

        public String? Name { get; set; }

        //This is the enum created for the size of the company
        public CompanySize Size { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }
}
