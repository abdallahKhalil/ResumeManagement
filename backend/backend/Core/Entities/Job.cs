using backend.Core.Enums;

namespace backend.Core.Entities
{
    public class Job : BaseEntity
    {

        public String? Title { get; set; }

        //Enum 
        public JobLevel Level { get; set; }

        //Relations 
        public long CompanyId { get; set; }

        public Company? Company { get; set; }

        public ICollection<Candidate>? Candidates { get; set; }
    }
}
