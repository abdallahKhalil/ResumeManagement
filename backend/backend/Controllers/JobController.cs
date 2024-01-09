using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Company;
using backend.Core.Dtos.Job;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        //Instance of ApplicationDbContext
        private ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }

        //constructor for the JobController
        //That takes an instance of ApplicationDbContext
        public JobController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD

        //Create
        [HttpPost]
        [Route("Create")]

        public async Task<IActionResult> CreateJob([FromBody] JobCreateDto dto)
        {
            //When the http request Reaches the create dto is mapped to Job object
            Job newJob = _mapper.Map<Job>(dto);

            //Then it is added to dataBase
            await _context.AddAsync(newJob);

            //Then Saved in the database
            await _context.SaveChangesAsync();

            //Then return the success statment
            return Ok("New Job added Successfully!");

        }

        //Read
        [HttpGet]
        [Route("Get")]

        public async Task<ActionResult<IEnumerable<JobGetDto>>> GetJobs()
        {
            var Job = await _context.Jobs.Include(job => job.Company).OrderByDescending(q => q.CreatedAt).ToListAsync();

            var convertedJob = _mapper.Map<IEnumerable<JobGetDto>>(Job);

            return Ok(convertedJob);
        }
    }
}
