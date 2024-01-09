namespace backend.Core.Dtos.Candidate
{
    public class CandidateGetDto
    {
        public long ID { get; set; }

        public String? FirstName { get; set; }

        public String? LastName { get; set; }

        public String? Email { get; set; }

        public String? Phone { get; set; }

        public String? CoverLetter { get; set; }

        public String? ResumeURL { get; set; }

        //Relation
        public long JobId { get; set; }

        public string? JobTitle { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }
}
