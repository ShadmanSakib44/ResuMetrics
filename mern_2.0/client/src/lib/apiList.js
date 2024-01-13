export const server = "http://localhost:8000";

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  uploadResume: `${server}/upload/resume`,
  uploadProfileImage: `${server}/upload/profile`,
  jobs: `${server}/jobs`,  // Updated from `${server}/`
  applications: `${server}/applications`,  // Updated from `${server}/api/applications`
  rating: `${server}/rating`,  // Updated from `${server}/api/rating`
  user: `${server}/user`,
  applicants: `${server}/applicants`,  // Updated from `${server}/api/applicants`
};

export default apiList;
