using backend.Core.Enums;

namespace backend.Core.Dtos.Job
{
    public class JobCreateDto
    {
        public String? Title { get; set; }

        //Enum 
        public JobLevel Level { get; set; }

        public long CompanyId { get; set; }
    }
}
