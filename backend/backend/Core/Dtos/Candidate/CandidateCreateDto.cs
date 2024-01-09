namespace backend.Core.Dtos.Candidate
{
    public class CandidateCreateDto
    {
        public String? FirstName { get; set; }

        public String? LastName { get; set; }

        public String? Email { get; set; }

        public String? Phone { get; set; }

        public String? CoverLetter { get; set; }

        //Relation
        public long JobId { get; set; }
    }
}
