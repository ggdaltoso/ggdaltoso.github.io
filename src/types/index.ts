export interface BlogPost {
  title: string;
  description: string;
  date: Date;
  category: string;
  slug: string;
}

export interface ProfileConfig {
  name: string;
  profileUrl: string;
  avatarSrc: string;
  email: string;
  githubUrl: string;
}

export interface SeoConfig {
  title: string;
  description: string;
}
