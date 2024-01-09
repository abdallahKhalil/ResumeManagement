using AutoMapper;
using backend.Core.Dtos.Candidate;
using backend.Core.Dtos.Company;
using backend.Core.Dtos.Job;
using backend.Core.Entities;

namespace backend.Core.AutoMapperConfig
{
    public class AutoMapperConfigProfile : Profile
    {
        public AutoMapperConfigProfile()
        {
            //Company

            //We are creating the map that will convert from CompanyCreateDto to Company
            CreateMap<CompanyCreateDto, Company>();
            //The converter from Company to CompanyGetDto
            CreateMap<Company, CompanyGetDto>();


            //Job
            CreateMap<JobCreateDto, Job>();
            //convert from Job to JobGetDto
            //regarding the company name is set from the company object according to the relation that we specified
            //In ApplicationDbContext
            CreateMap<Job, JobGetDto>()
                .ForMember(destination => destination.CompanyName, opt => opt.MapFrom(src => src.Company.Name));

            //Candidate
            CreateMap<CandidateCreateDto,  Candidate>();

            CreateMap<Candidate, CandidateGetDto>()
                .ForMember(destination => destination.JobTitle, opt => opt.MapFrom(src => src.Job.Title));
        }
    }
}
