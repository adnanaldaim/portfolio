export const getTagColor = (tag: string): string => {
  const tagColors: { [key: string]: string } = {
    // Frontend Frameworks
    'React': 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    'Next.js': 'bg-neutral-100 dark:bg-neutral-900/20 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800',
    'Vue.js': 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    'Svelte': 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    'React Native': 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
    'HTML': 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    'CSS': 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    'Tailwind CSS': 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    'Material UI': 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    'PrimeNG': 'bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700',
    'Ant Design': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    'Bootstrap': 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800',
    'Gluestack UI': 'bg-fuchsia-50 dark:bg-fuchsia-900/20 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800',
    'Angular': 'bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    'Angular Material': 'bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800',
    'SCSS': 'bg-fuchsia-100 dark:bg-fuchsia-900/20 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800',
    'Figma': 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',


    // Languages
    'JavaScript': 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    'TypeScript': 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    'EmailJS': 'bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800',
    'Python': 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',

    // Backend
    'Node.js': 'bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-300 border-lime-200 dark:border-lime-800',
    'Express': 'bg-slate-50 dark:bg-slate-900/20 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800',
    'Express.js': 'bg-slate-50 dark:bg-slate-900/20 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800',
    'FastAPI': 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
    'Django': 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
    'Flask': 'bg-stone-100 dark:bg-stone-900/20 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800',
    'Laravel': 'bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    'Ruby on Rails': 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
    'Spring Boot': 'bg-lime-100 dark:bg-lime-900/20 text-lime-700 dark:text-lime-300 border-lime-200 dark:border-lime-800',
    'ASP.NET': 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',

    // Databases
    'MongoDB': 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
    'PostgreSQL': 'bg-sky-100 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    'MySQL': 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    'Prisma': 'bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800',
    'Firebase': 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    'Redis': 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
    'SQLite': 'bg-zinc-100 dark:bg-zinc-900/20 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800',

    // State Management
    'Redux': 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',

    // DevOps & Tools
    'Docker': 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    'Kubernetes': 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    'Git': 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    'GitHub': 'bg-neutral-100 dark:bg-neutral-900/20 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800',
    'Netlify': 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    'Vercel': 'bg-zinc-50 dark:bg-zinc-900/20 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800',
    'AWS': 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    'Azure': 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    'Google Cloud': 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    'Vite': 'bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800',


    // APIs & Libraries
    'Chart.js': 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    'Stripe': 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    'JWT Authentication': 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    'Plaid API': 'bg-blue-200 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800',
    'Algolia Search': 'bg-blue-300 dark:bg-blue-900/20 text-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-800',
    'Machine Learning APIs': 'bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800',

    // Health APIs
    'HealthKit': 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
    'Google Fit': 'bg-blue-200 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  };

  return tagColors[tag] || 'bg-neutral-50 dark:bg-neutral-900/20 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800';
};
