using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Company;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {

        //Instance of ApplicationDbContext
        private ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }

        //constructor for the ConpanyController
        //That takes an instance of ApplicationDbContext
        public CompanyController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD

        //Create
        //from body is as if I am saying from the http request body
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCompany([FromBody] CompanyCreateDto dto)
        {
            Company newCompany = _mapper.Map<Company>(dto);
            await _context.AddAsync(newCompany);
            await _context.SaveChangesAsync();

            return Ok("Company Created Successfully!");

        }

        //Read
        [HttpGet]
        [Route("Get")]

        public async Task<ActionResult<IEnumerable<CompanyGetDto>>> GetCompanies()
        {
            //In this line we retrived all the data from companies table
            //From the database as list and stored them in companies variable
            var companies = await _context.Companies.OrderByDescending(q => q.CreatedAt).ToListAsync();

            //In this line we convert the companies variable structure to CompanyGetDto structure
            // And saved in convertedCompanies and retured at the end
            var convertedCompanies = _mapper.Map<IEnumerable<CompanyGetDto>>(companies);

            return Ok(convertedCompanies);
        }

        //Update

        //Delete


    }
}
