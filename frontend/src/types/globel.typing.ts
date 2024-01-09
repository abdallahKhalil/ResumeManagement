export interface ICompany {
  id: String;
  name: String;
  size: String;
  createdAt: String;
}

export interface ICreateCompanyDto {
  name: String;
  size: String;
}

export interface IJobs {
  id: String;
  title: String;
  level: String;
  companyId: String;
  companyName: String;
  createdAt: String;
}

export interface ICreateJobsDto {
  title: String;
  level: String;
  companyId: String;
}

export interface ICandidate {
  id: String;
  firstName: String;
  lastName: String;
  email: String;
  phone: String;
  coverLetter: String;
  resumeUrl: String;
  jobId: String;
  jobTitle: String;
  createdAt: String;

}

export interface ICreateCandidateDto {
  firstName: String;
  lastName: String;
  email: String;
  phone: String;
  coverLetter: String;
  jobId: String;
}
