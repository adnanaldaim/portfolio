export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  github?: string;
  year: string;
  category: string;
  caseStudy?: {
    overview: string;
    challenge: string;
    solution: string;
    results?: string[];
    duration: string;
    role: string;
    designEvolution?: {
      beforeImage?: string;
      afterImage?: string;
      description?: string;
    }[];
  };
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Teledental",
    description: "A dental health management platform that connects patients with dental professionals for virtual consultations, appointment scheduling, and treatment tracking. Also has dental guidance blogs. Built frontend view using React and mobile-first approach.",
    image: "images/Teledental.png",
    tags: ["HTML", "CSS", "React", "TypeScript", "Bootstrap", "Ant Design", "Node.js"],
    link: "https:teledental.com",
    year: "2024",
    category: "Web Application",
  },
  {
    id: 2,
    title: "PartnerlinQ",
    description: "An EDI platform for various international partners to use for onboarding and exchanging data with their respective partners. Implemented the design first using Angular Material and MAterial UI then switched to PrimeNG.",
    image: "images/Partnerlinq.png",
    tags: ["HTML", "CSS", "Angular", "TypeScript", "SCSS", "Material UI", "Bootstrap", "Angular Material", "PrimeNG"],
    year: "2022",
    category: "Web Application",
    caseStudy: {
      overview: "Worked as a UI/UX developer for about 3 years on new features and enhancements as well as maintaining the existing codebase of PartnerlinQ, an EDI platform used by various international partners for onboarding and exchanging data. The platform had multiple internal portals all with their own functionality and user experience requirements.",
      challenge: "Since it was an evolving product with multiple internal portals, there was always the issue of increasing design inconsistencies and user confusion. The goal was to create a unified design system that could be used across all portals, ensuring a consistent user experience. There was significant design burden with global styling reaching thousands of lines across multiple platforms rather than a unified design system. Using Material UI and Angular Material also added on significant complexity with multiple design overrides needed as per changing design requirements.",
      solution: "Replaced Material UI and Angular Material with PrimeNG to create a more consistent and maintainable design system. Developed a custom design system that could be used across all portals, ensuring a unified user experience. Created custom utility classes using mixins mimicing Tailwind functionality since completely removing Bootstrap was not part of current scope. Reworked all components' reusability and modularity to reduce design burden and improve maintainability. Moving to PrimeNG also allowed us to shift the design towards a more modern style, aligning with current design trends.",
      results: [
        "80% reduction in design inconsistencies across portals",
        "50% faster development time for new features due to easier class structure",
        "90% reduction in CSS file size due to custom utility classes",
        "Enhanced maintainability with a unified design system"
      ],

      duration: "3 years",
      role: "Frontend UI/UX Developer",
      designEvolution: [{
        description: "Due to NDA and confidentiality agreements, I am unable to share specific before and after images of the design evolution. However, the transition from Material UI and Angular Material to PrimeNG significantly improved the design consistency and maintainability of the platform.",
      }]
    }
  },
  {
    id: 3,
    title: "Soletechs",
    description: "A marketing website for an HCM (Human Capital Management) service provider in the Middle East. Built from scratch using mobile-first approach. Current updates to the live version are ongoing. Also implemented design strategy for RTL and LTR due to arabic text direction requirements.",
    image: "images/Soletechs.png",
    tags: ["HTML", "CSS", "Angular", "TypeScript", "SCSS", "Bootstrap"],
    link: "https://soletechs.com/",
    year: "2023",
    category: "Marketing Website",
  }
];

export const allProjects = [
  ...projects,
  {
    id: 4,
    title: "Portfolio Website",
    link: "https://adnanaldaim.com",
    description: "Decided to finally build my own portfolio website to showcase my work and skills. It is deployed on Netlify and uses EmailJS for contact form functionality. Built using React, TypeScript, and Tailwind with a mobile-first approach.",
    image: "images/Portfolio.png",
    tags: ["HTML", "CSS", "React", "TypeScript", "SCSS", "Tailwind CSS", "EmailJS", "Vite"],
    year: "2025",
    category: "Web Application"
  },
  {
    id: 5,
    title: "Microsoft POS Order Modifier Screen Redesign",
    description: "Legacy POS software provided by Microsoft for hospitality industry. The goal was to redesign the order modifier screen to improve usability and reduce complexity. The original design was very old and not very conducive to modern user experience standards.",
    image: "images/POS.png",
    tags: ["Figma"],
    year: "2025",
    category: "Management System",
    caseStudy: {
      overview: "Worked on redesigning the order modifier screen of a legacy POS software provided by Microsoft for the hospitality industry. The code written was very old has not been changed by Microsoft after acquiring the software from another company.",
      challenge: "The modifier screen was very flat as opposed to the modern design standards. The action button placement was not intuitive and neither was the item selection and listing. The goal was to redesign the screen to improve usability and reduce complexity. The item details were also not very clear and in dark mode the text was not very readable.",
      solution: "Rework the whole design of the screen to fit modern UI/UX standards. I looked towards different design inspirations for POS systems and came up with a color scheme that would clearly highlight selections and errors. Since this was a POS screen the flow had to be fast with minimal interruptions, so I focused on making the action buttons more prominent and intuitive. The item selection was also made more clear with better spacing and item details. The dark mode was also improved with better contrast and readability.",
      duration: "Ongoing",
      role: "UI/UX Designer",
      designEvolution: [{
        beforeImage: "images/POS.png",
        afterImage: "images/POS-light.png",
        description: "I chose to go with a blue theme for the light mode. I designed new cards and sections to clearly divide different parts of an order. The order list has been moved to the right side because on the previous screen the button to redirect to this screen was on the right side. The parents in the list are collapsible accordions to avoid clutter when modifying a certain order with clear border divisions. The complete order button has also been made more prominent and visible as opposed to a small tick button on the bottom right corner in the previous design.",
      },
      {
        beforeImage: "images/POS.png",
        afterImage: "images/POS-dark.png",
        description: "For the dark mode I more or less stayed with the same color scheme but reversed the colors of the box shadow for the parent containers. The light blue highlight color showing selection was switched to a darker shade ",
      }]
    }
  },
];