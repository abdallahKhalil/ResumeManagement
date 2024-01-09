using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Candidate;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        //Instance of ApplicationDbContext
        private ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }

        //constructor for the JobController
        //That takes an instance of ApplicationDbContext
        public CandidateController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //CRUD

        //Create
        [HttpPost]
        [Route("Create")]

        public async Task<IActionResult> CreateCandidate([FromForm] CandidateCreateDto dto, IFormFile pdfFile)
        {
            //First get the PDF file Save it to the server
            //Then Save the URL in the table of Candidates

            //Needed Var
            var fiveMegaByte = 5 * 1024 * 1024;
            var pdfMimeType = "application/pdf";

            if(pdfFile.Length > fiveMegaByte || pdfFile.ContentType != pdfMimeType)
            {
                return BadRequest("File is not Valid");

            }
            //Generating a unique identifier by calling the NewGuid() method of the Guid class
            //toString is called to generate the calleded GIUD to a String the add '.pdf' to the end of it
            var resumeUrl = Guid.NewGuid().ToString() + ".pdf";

            //Creating a file path using the method Combine of the Path class
            //It takes four params the current directory document folder, pdfs folder and the resumeUrl as the file name
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", resumeUrl);

            //In this line we created a new FileStrem object that takes
            //filePath to specifie the file that needs to be opend
            //the FileMode.Create Spacifie that the file should be created
            //The using statement ensures that the file stream is properly disposed of after it is no longer needed.
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                //This line copies the contents of the pdfFile object to the file stream specified by the stream variable
                await pdfFile.CopyToAsync(stream);
            }

            var newCandidate = _mapper.Map<Candidate>(dto);
            newCandidate.ResumeURL = resumeUrl;

            await _context.AddAsync(newCandidate);
            await _context.SaveChangesAsync();

            return Ok("Candidate added Successfully!");
        }

        //Read
        [HttpGet]
        [Route("Get")]

        public async Task<ActionResult<IEnumerable<CandidateGetDto>>> GetCandidate()
        {
            var Candidates = await _context.Candidates.Include(candidate => candidate.Job).OrderByDescending(q => q.CreatedAt).ToListAsync();

            var convertedCnadidate = _mapper.Map<IEnumerable<CandidateGetDto>>(Candidates);

            return Ok(convertedCnadidate);
        }

        [HttpGet]
        [Route("download/{url}")]

        public IActionResult DownloadPdfFile(string url)
        {
            //In this line we are reading the url param 
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "documents", "pdfs", url);
            //Here we are checking if the url exists in this folder
            if (!System.IO.File.Exists(filePath))
            {
                //we are returning a 404 resposnse 
                return NotFound("PDF File Does Not Exists!");
            }
            //here we are reading the file content into a byte array
            var pdfByts = System.IO.File.ReadAllBytes(filePath);
            //here we are creating a File object with the byte array
            var file = File(pdfByts, "application/pdf", url);

            //return 200 the file to be downloaded
            return file;
        }
    }
}
