using backend.Core.Enums;

namespace backend.Core.Dtos.Company
{
    //The DTOs are the object that will be send from a different layers of the application
    //In my case here the company name & size will be send from the frontend 
    public class CompanyCreateDto
    {
        public String? Name { get; set; }

        //This is the enum created for the size of the company
        public CompanySize Size { get; set; }
    }
}
