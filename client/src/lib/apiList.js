export const server = "http://localhost:8000";

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  uploadResume: `${server}/upload/resume`,
  uploadProfileImage: `${server}/upload/profile`,
  jobs: `${server}/jobs`, 
  applications: `${server}/applications`, 
  rating: `${server}/rating`,  
  user: `${server}/user`,
  applicants: `${server}/applicants`, 
};

export default apiList;
