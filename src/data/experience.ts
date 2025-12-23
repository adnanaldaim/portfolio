export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    title: "Software Engineer II",
    company: "Illumina Technology Solutions",
    period: "January 2025 - Present",
    description: [
      "At Illumina Technology Solutions, I’ve held dual roles as a Frontend UI Developer and React Native UI Developer, contributing to both web and mobile platforms. On the web side, I designed and built over 10 UI blocks and page layouts for an internal company portal, aligning with branding, accessibility, and responsive design standards. I worked with a headless WordPress setup using Next.js and PHP, and collaborated with stakeholders to translate business requirements into interactive wireframes and high-fidelity mockups. I emphasized modular development through reusable components and design systems, optimizing performance and ensuring cross-browser compatibility. In the mobile domain, I developed a cross-platform React Native app integrated with MS Dynamics 365, using TypeScript, Tailwind CSS, and GluestackUI. I built over 15 custom components focused on accessibility and responsiveness, optimized app navigation, and cut load times by 50%, delivering a seamless and performant user experience across Android and iOS."
    ]
  },
  {
    title: "Consultant Frontend",
    company: "PartnerLinq",
    period: "2022 - 2025",
    description: [
      "At this role, I was responsible for implementing figma design for the various portals we had for our product. I independently suggested and managed enhancements to the styling structures of multiple internal projects, working closely with design and front-end teams to ensure proper implementation of UX principles. I proactively applied responsive web design practices, often without formal design guidance, to ensure usability across devices. A key achievement was leading the redesign of an internal styling library, which improved build efficiency by 30% through reusable class utilities and consistent theming. I also contributed to Angular front-end development to sharpen my skills and take ownership of key UI responsibilities. Additionally, I led the transition from Angular Material to PrimeNG, resulting in better performance and a more consistent user experience across the platform. Throughout the role, I engaged with senior management to drive improvements in design structure and implementation."
    ]
  },
  {
    title: "Junior Consultant",
    company: "Systems Limited",
    period: "2021 - 2022",
    description: [
      "In this role, I collaborated with product managers, UX designers, and developers to translate project requirements into intuitive, visually appealing UI designs. I ensured smooth handoff and integration with development teams, embraced iterative design based on feedback, and actively participated in training programs to deepen my expertise in UI design and front-end development."
    ]
  }
];