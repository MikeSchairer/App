export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'websites' | 'graphic-design' | 'email-ads';
  categoryLabel: string;
  image: string;
  description: string;
  details?: string;
  technologies: string[];
}

/**
 * Robust asset resolver that respects Vite's base path for GitHub Pages and subpaths
 */
export const getAssetUrl = (path: string): string => {
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const RESUME_URL = getAssetUrl('Michael_Schairer_Resume.pdf');

export const REAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'badger-tobacco',
    title: 'Badger Tobacco',
    subtitle: 'Website Design, Development & Coding',
    category: 'websites',
    categoryLabel: 'Website & Development',
    image: getAssetUrl('images/BadgerTobacco.png'),
    description: 'Full custom website design, responsive frontend layout, and development for Badger Tobacco.',
    details: 'Created an engaging commercial web presence featuring responsive layouts, custom product catalog navigation, and brand identity styling.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'PHP']
  },
  {
    id: 'from-the-ground-up',
    title: 'From The Ground Up Lawn Care',
    subtitle: 'Website Design',
    category: 'websites',
    categoryLabel: 'Website Design',
    image: getAssetUrl('images/FromTheGroundUPLawnCare.png'),
    description: 'Clean, modern website design for a professional outdoor landscaping and lawn care company.',
    details: 'Designed an intuitive user journey highlighting service packages, quotation inquiry workflows, and high-visibility contact touchpoints.',
    technologies: ['Web Design', 'UI/UX', 'Responsive Layout', 'Graphic Design']
  },
  {
    id: 'habitat-for-humanity',
    title: 'Habitat For Humanity ReStore',
    subtitle: 'Website Design, Development & Coding',
    category: 'websites',
    categoryLabel: 'Website & Development',
    image: getAssetUrl('images/HFHRestore.png'),
    description: 'Custom community portal and non-profit retail showcase for Habitat For Humanity ReStore.',
    details: 'Built an accessible and responsive website to drive volunteer participation, donor drop-offs, and store visitor engagement.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX', 'CMS']
  },
  {
    id: 'fox-lake-fire',
    title: 'Fox Lake Fire Department',
    subtitle: 'Website Design',
    category: 'websites',
    categoryLabel: 'Website Design',
    image: getAssetUrl('images/FoxLakeDesign.png'),
    description: 'Official municipal website design for the Fox Lake Fire & Emergency Services.',
    details: 'Crafted a clear, emergency-ready public informational platform with community safety resources and station directories.',
    technologies: ['Web Design', 'Information Architecture', 'Responsive UI']
  },
  {
    id: 'circle-city-tickets',
    title: 'Circle City Tickets',
    subtitle: 'Website Design, Development & Coding',
    category: 'websites',
    categoryLabel: 'Website & E-Commerce',
    image: getAssetUrl('images/CircleCityTickets.png'),
    description: 'High-volume ticket broker e-commerce storefront with interactive event seating listings.',
    details: 'Designed and engineered a complete ticketing platform integrating real-time inventory databases and responsive mobile checkout.',
    technologies: ['Web Development', 'E-Commerce', 'ASP.NET', 'SQL Server', 'JavaScript']
  },
  {
    id: 'canada-box-office',
    title: 'Canada Box Office',
    subtitle: 'Website Design, Development & Coding',
    category: 'websites',
    categoryLabel: 'Website & Development',
    image: getAssetUrl('images/CBO_Home_Page.png'),
    description: 'Premier national ticketing and entertainment event platform for Canadian venues.',
    details: 'Engineered high-performance event discovery pages, interactive seat maps, and secure checkout flows.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Database Integration', 'UI/UX']
  },
  {
    id: 'seat-hub',
    title: 'Seat Hub',
    subtitle: 'Website Design, Development & Coding',
    category: 'websites',
    categoryLabel: 'Website & Development',
    image: getAssetUrl('images/SeatHub.png'),
    description: 'Interactive sports, concert, and theatre event ticketing portal.',
    details: 'Developed a dynamic ticketing application with rapid filtering, venue diagrams, and mobile-optimized booking.',
    technologies: ['Web Design', 'Frontend Development', 'API Feeds', 'CSS3']
  },
  {
    id: 'the-ticket-cloud',
    title: 'The Ticket Cloud',
    subtitle: 'Website Design, Development & Coding',
    category: 'websites',
    categoryLabel: 'Website & Development',
    image: getAssetUrl('images/TheTicketCloud.png'),
    description: 'Cloud-enabled secondary ticketing marketplace with sleek dark-contrast interfaces.',
    details: 'Built modern web layouts and API-connected event search engines for nationwide sports and entertainment tours.',
    technologies: ['Web Coding', 'UI/UX', 'JavaScript', 'Responsive Grid']
  },
  {
    id: 'encore-ticket-store',
    title: 'Encore Ticket Store',
    subtitle: 'Website Design, Development & Coding',
    category: 'websites',
    categoryLabel: 'Website & Development',
    image: getAssetUrl('images/EncoreTicketStore.png'),
    description: 'Full-featured entertainment ticketing portal and brand design.',
    details: 'Complete design and frontend build with streamlined search filters and branded promotional banners.',
    technologies: ['E-Commerce', 'Web Design', 'JavaScript', 'HTML5']
  },
  {
    id: 'front-row-seats',
    title: 'Front Row Seats',
    subtitle: 'Website Design, Development & Coding',
    category: 'websites',
    categoryLabel: 'Website & Development',
    image: getAssetUrl('images/FrontRowSeats.png'),
    description: 'VIP sports and concert ticket portal with interactive stadium section views.',
    details: 'Developed high-conversion landing pages and interactive event grids for premium seating access.',
    technologies: ['Web Development', 'UI Design', 'CSS3', 'SQL Server']
  },
  {
    id: 'aaa-asphalt-page',
    title: 'AAA Asphalt LLC',
    subtitle: 'Facebook Banner & Profile Picture',
    category: 'graphic-design',
    categoryLabel: 'Branding & Social Media',
    image: getAssetUrl('images/FacebookPage.png'),
    description: 'Branded social media header identity and corporate Facebook page graphics.',
    details: 'Created punchy, high-resolution social marketing graphics to build trust and brand recognition for commercial asphalt contractors.',
    technologies: ['Graphic Design', 'Adobe Photoshop', 'Social Media Branding']
  },
  {
    id: 'aaa-asphalt-ad',
    title: 'AAA Asphalt LLC',
    subtitle: 'Custom Facebook Advertisements & Posts',
    category: 'graphic-design',
    categoryLabel: 'Digital Advertising',
    image: getAssetUrl('images/FacebookAd.png'),
    description: 'Promotional ad graphics and lead-generation social campaigns.',
    details: 'Designed eye-catching digital advertisements highlighting seasonal paving specials and residential driveways.',
    technologies: ['Digital Ad Design', 'Adobe Photoshop', 'Marketing Collateral']
  },
  {
    id: 'premier-seats-email',
    title: 'Premier Seats',
    subtitle: 'Custom E-Mail Advertisements',
    category: 'email-ads',
    categoryLabel: 'Email Marketing',
    image: getAssetUrl('images/EmailBlast02.png'),
    description: 'High-conversion HTML email blast and newsletter design for major sports playoffs.',
    details: 'Coded table-based, cross-client compatible HTML email templates with dynamic promotional event headers.',
    technologies: ['HTML Email Coding', 'Graphic Design', 'Email Marketing']
  },
  {
    id: 'top-theatre-email',
    title: 'Top Theatre Tickets',
    subtitle: 'Custom E-Mail Advertisements',
    category: 'email-ads',
    categoryLabel: 'Email Marketing',
    image: getAssetUrl('images/EmailBlast01.jpg'),
    description: 'Broadway and West End promotional newsletter blast with custom typographic headers.',
    details: 'Designed and coded rich media email campaigns for theatre lovers, driving ticket sales for top-billed musicals.',
    technologies: ['Email Design', 'Typography', 'HTML Email Blast']
  },
  {
    id: 'all-access-email',
    title: 'All Access Tickets',
    subtitle: 'Custom E-Mail Advertisements',
    category: 'email-ads',
    categoryLabel: 'Email Marketing',
    image: getAssetUrl('images/EmailBlast.png'),
    description: 'Festivals and concert tour promotional email marketing campaign.',
    details: 'Delivered eye-catching responsive email layouts optimized for mobile inboxes and desktop clients alike.',
    technologies: ['Email Marketing', 'Digital Advertising', 'Graphic Design']
  }
];

export const WHAT_I_DO = [
  {
    title: 'Web Design',
    description: 'Modern, responsive websites designed around usability, visual appeal and business goals.',
    icon: 'layout',
  },
  {
    title: 'Web Development',
    description: 'Front-end and custom web development using HTML, CSS, JavaScript and server-side technologies.',
    icon: 'code',
  },
  {
    title: 'UI/UX Design',
    description: 'Clean interfaces and intuitive user experiences that make websites easier to navigate and use.',
    icon: 'compass',
  },
  {
    title: 'Graphic Design',
    description: 'Branding, advertisements, digital graphics, layouts and marketing materials.',
    icon: 'palette',
  },
  {
    title: 'WordPress',
    description: 'Website development, customization, content management and ongoing maintenance.',
    icon: 'globe',
  },
  {
    title: 'Website Management',
    description: 'Content updates, troubleshooting, optimization and ongoing website support.',
    icon: 'settings',
  },
];

export const SKILLS_DATA = {
  design: {
    category: 'Design',
    skills: [
      'UI/UX Design',
      'Graphic Design',
      'Web Design',
      'Branding & Identity',
      'Social Media Graphics',
      'Typography',
      'Layout Design',
      'Wireframing & Prototyping',
      'Digital Design',
      'Print Design',
      'Color & Visual Systems',
    ],
  },
  webDevelopment: {
    category: 'Web Development',
    skills: [
      'HTML5',
      'CSS3 & Modern CSS',
      'JavaScript & TypeScript',
      'jQuery',
      'PHP',
      'ASP.NET',
      'WordPress',
      'SQL & Databases',
      'XML',
      'Responsive Web Design',
    ],
  },
  software: {
    category: 'Software & Tools',
    skills: [
      'Adobe Photoshop',
      'Adobe Dreamweaver',
      'Adobe Fireworks',
      'WordPress CMS',
      'Microsoft SQL Server',
      'Microsoft Office',
      'Figma & Modern Tools',
    ],
  },
};

export const EDUCATION_DATA = [
  {
    institution: 'Moraine Park Technical College',
    degree: 'Web Development & Design Specialist',
    graduated: 'Graduated 2018 - AAS',
    year: '2018',
  },
  {
    institution: 'Waukesha County Technical College',
    degree: 'Architectural Design & Drafting',
    graduated: 'Graduated 2009 - AAS',
    year: '2009',
  },
  {
    institution: 'Arrowhead Union High School',
    degree: 'High School Diploma',
    graduated: 'Graduated 2007',
    year: '2007',
  },
];

export const EXPERIENCE_DATA = [
  {
    role: 'Web Coder & Graphic Designer',
    company: 'Freelancer',
    period: '2008 — Present',
    description: 'Delivering end-to-end custom websites, branding, digital marketing collateral, and front-end solutions for over 100+ businesses and organizations.',
  },
  {
    role: 'Web Design & Coding Manager',
    company: 'Ticket Platform, LLC',
    period: '2010 — 2020',
    description: 'Spearheaded frontend website design, responsive development, and SQL database management for large-scale e-commerce ticketing networks.',
  },
  {
    role: 'Pyrotechnic Operator',
    company: 'Spielbauer',
    period: '2011 — 2019',
    description: 'Precision timing, electrical firing choreography, and high-stakes safety management for professional aerial displays.',
  },
  {
    role: 'Data Conversion Specialist',
    company: 'ARI Network Services',
    period: '2010 — 2018',
    description: 'Transformed complex technical inventory datasets, catalog structures, and digital assets into web-ready formats.',
  },
  {
    role: 'Marketing Design / Website Administrator',
    company: 'PerMar Ltd.',
    period: '2010 — 2014',
    description: 'Managed corporate website infrastructure, content releases, print and digital advertising campaigns.',
  },
  {
    role: 'Machine Operator / Quality Assurance Manager',
    company: 'Precision Innovations',
    period: '2009 — 2010',
    description: 'Oversaw high-precision equipment calibration, manufacturing tolerances, and quality verification.',
  },
];
