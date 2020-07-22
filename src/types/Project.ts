interface Project {
  id?: string;
  name: string;
  description: string;
  openSource: string;
  githubLink?: string;
  live: string;
  liveLink?: string;
  tech: Array<string> | string;
  [key: string]: any;
}

export default Project;
