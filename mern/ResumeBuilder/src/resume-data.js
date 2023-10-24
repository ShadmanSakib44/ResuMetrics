const Resume = {
  header: {
    name: 'Your Name',
    email: 'email@domain.com',
    phone: '123-456-7890',
    github: 'https://github.com/xxxxxxx',
    linkedin: 'https://linkedin.com/in/xxxxxx',
    address: '123 Main Street',
    website: 'https://website.com',
    city: 'Dhaka',
    state: 'Dhaka',
    zip: '12345',
    country: 'Bangladesh',
  },
  professionalSummary: {
    text: 'Your professional summary!',
  },
  experience: [
    {
      company: 'Experience 1',
      city: 'Dhaka',
      state: 'Dhaka',
      position: 'Position 1',
      dateFrom: 'XX/XXXX',
      dateTo: '',
      primaryWorkBrief: 'Brief description of your main tasks.',
      impact1: 'Something awesome you did 1.',
      impact2: 'Something awesome you did 2.',
      impact3: '',
      impact4: '',
      isVisible: true,
    },
    {
      company: 'Experience 2',
      city: 'Dhaka',
      state: 'Dhaka',
      position: 'Position 2',
      dateFrom: 'XX/XXXX',
      dateTo: 'XX/XXXX',
      primaryWorkBrief: 'Brief description of your main tasks.',
      impact1: 'Something awesome you did 1.',
      impact2: 'Something awesome you did 2.',
      impact3: '',
      impact4: '',
      isVisible: true,
    },
    // Add more experiences as needed
  ],
  education: [
    {
      site: 'School 1',
      dateFrom: 'XX/XXXX',
      dateTo: 'XX/XXXX',
      studyDegree: 'Subject, Degree/Certificate',
      isVisible: true,
    },
    {
      site: 'College',
      dateFrom: 'XX/XXXX',
      dateTo: 'XX/XXXX',
      studyDegree: 'Subject, Degree/Certificate',
      isVisible: true,
    },
    {
      site: 'University',
      dateFrom: 'XX/XXXX',
      dateTo: 'XX/XXXX',
      studyDegree: 'Subject, Degree/Certificate',
      isVisible: true,
    },

  ],
  certification: [
    {
      issuedBy: 'Issuer 1/Cert Name',
      id: '#12345',
      dateFrom: 'XX/XXXX',
      dateTo: '',
      isVisible: true,
    },
    // Add more certification entries as needed
  ],
  technicalSkills: [
    {
      category: 'Development Languages',
      keywords: [
        { name: 'JavaScript', level: 3 },
        { name: 'HTML', level: 4 },
        { name: 'CSS', level: 4 },
      ],
      isVisible: true,
    },
    // Add more technical skills as needed
  ],
  projects: [
    {
      name: 'Project 1',
      dateFrom: 'XX/XXXX',
      dateTo: '',
      link: 'http://website.com',
      teamBrief: '1-person project',
      details: ['Detail 1', 'Detail 2', 'http://projectLink.com'],
      isVisible: true,
    },
    // Add more projects as needed
  ],
};

export default Resume;
