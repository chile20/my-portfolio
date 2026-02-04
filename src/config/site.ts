export const siteConfig = {
  name: 'Chi Le',
  title: 'Full-Stack Developer & UI/UX Designer',
  description:
    'I build apps and care a lot about UI/UX.',
  url: 'https://lechi.dev',
  links: {
    github: 'https://github.com/chile20',
    linkedin: 'https://linkedin.com/in/chile20',
    email: 'chichile.20@gmail.com',
  },
  author: {
    name: 'Chi',
    email: 'chichile.20@gmail.com',
    avatar: '/images/avatar.jpg',
    bio: 'Full-stack developer passionate about creating exceptional user experiences and building scalable web applications.',
    location: 'California, USA',
    education: 'B.S. Computer Science - Cal Poly Pomona',
  },
  resume: {
    url: 'https://drive.google.com/file/d/1zyHbkTWiE6LFJFw_smqnTdW4QkfkiSTZ/view?usp=sharing',
  },
} as const;

export type SiteConfig = typeof siteConfig;
