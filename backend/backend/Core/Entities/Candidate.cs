namespace backend.Core.Entities
{
    public class Candidate : BaseEntity
    {

        public String? FirstName { get; set; }

        public String? LastName { get; set;}

        public String? Email { get; set; }

        public String? Phone{ get; set; }

        public String? CoverLetter { get; set; }

        public String? ResumeURL { get; set; }

        //Relation
        public long JobId { get; set; }

        public Job? Job { get; set; }    

    }
}
