using backend.Core.Enums;

namespace backend.Core.Dtos.Job
{
    public class JobGetDto
    {
        public long ID { get; set; }

        public String? Title { get; set; }

        //enum
        public JobLevel Level { get; set; }

        public long CompanyId { get; set; }

        public string? CompanyName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
