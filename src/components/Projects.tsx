import React, { useState, useEffect, useRef } from "react";
import {
	ArrowUpRight,
	ExternalLink,
	Github,
	Calendar,
	Code2,
	FileText,
	Eye,
	PenTool,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { getTagColor } from "../data/tagColors";

const Projects: React.FC = () => {
	const navigate = useNavigate();
	const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);
	const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

	// Intersection Observer for scroll animations
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = projectRefs.current.findIndex(
							(ref) => ref === entry.target,
						);
						if (index !== -1 && !visibleProjects.includes(index)) {
							// Stagger the animation with delay
							setTimeout(() => {
								setVisibleProjects((prev) => [...prev, index]);
							}, index * 150); // 150ms delay between each project
						}
					}
				});
			},
			{
				threshold: 0.3,
				rootMargin: "-20px 0px -20px 0px",
			},
		);

		projectRefs.current.forEach((ref) => {
			if (ref) observer.observe(ref);
		});

		return () => {
			projectRefs.current.forEach((ref) => {
				if (ref) observer.unobserve(ref);
			});
		};
	}, [visibleProjects]);

	// Intersection Observer for section visibility
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsVisible(true);
					}
				});
			},
			{
				threshold: 0.2,
				rootMargin: "-50px 0px -50px 0px",
			},
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}
		};
	}, []);

	const openCaseStudy = (project: any) => {
		navigate(`/case-study/${project.id}`);
	};

	const openDemo = (url: string) => {
		window.open(url, "_blank", "noopener,noreferrer");
	};

	return (
		<section
			ref={sectionRef}
			id="projects"
			className="py-20 bg-gradient-to-tl from-slate-50 via-blue-50/50 to-indigo-100/40 dark:from-surface-dark dark:to-background-dark relative overflow-hidden"
		>
			<div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-violet-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-br from-indigo-200/20 to-violet-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
			<div className="container mx-auto px-4 md:px-8 lg:px-16">
				<div className="max-w-6xl mx-auto">
					{/* Section Header */}
					<div className="text-center mb-16">
						<div className="flex items-center justify-center gap-3 mb-4">
							<div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-full">
								<Code2
									size={24}
									className="text-primary-600 dark:text-primary-400"
								/>
							</div>
							<h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
								Featured Projects
							</h2>
						</div>
						<p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
							A showcase of recent work demonstrating modern web development and
							user experience design.
						</p>
					</div>

					{/* Compact Projects Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
						{projects.map((project, index) => (
							<div
								key={project.id}
								ref={(el) => (projectRefs.current[index] = el)}
								className={`group transform transition-all duration-700 ease-out ${
									visibleProjects.includes(index)
										? "translate-y-0 opacity-100"
										: "translate-y-8 opacity-0"
								}`}
								style={{
									transitionDelay: `${index * 150}ms`,
								}}
							>
								<div className="bg-white/80 dark:bg-surface-dark backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
									{/* Project Image */}
									<div className="relative overflow-hidden">
										<div className="aspect-[16/10] overflow-hidden">
											<img
												src={project.image}
												alt={project.title}
												className="w-full h-full object-cover transition-transform duration-700 scale-105 group-hover:scale-100"
											/>
										</div>

										{/* Image Overlay */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
											<div className="absolute top-4 left-4">
												<span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-neutral-800 text-sm font-medium rounded-lg">
													{project.category}
												</span>
											</div>
											<div className="absolute bottom-4 right-4">
												<div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-neutral-800 text-sm font-medium rounded-lg">
													<Calendar size={14} />
													{project.year}
												</div>
											</div>
										</div>
									</div>

									{/* Project Content */}
									<div className="p-6 flex-1 flex flex-col">
										<div className="space-y-4 flex-1">
											{/* Title */}
											<h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
												{project.title}
											</h3>

											{/* Description */}
											<p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
												{project.description}
											</p>

											{/* Technology Tags */}
											<div className="flex flex-wrap gap-2">
												{project.tags.map((tag, tagIndex) => (
													<span
														key={tagIndex}
														className={`tech-tag px-2 py-1 text-xs font-medium rounded-md border ${getTagColor(
															tag,
														)}`}
													>
														{tag}
													</span>
												))}
											</div>
										</div>

										{/* Action Buttons */}
										<div className="flex gap-2 pt-4 mt-auto">
											{/* Primary Action Button */}
											{project.link ? (
												<button
													onClick={() => openDemo(project.link!)}
													className="group/btn flex-1 inline-flex items-center gap-2 text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 font-medium transition-all duration-300 transform hover:translate-x-2"
												>
													<ExternalLink
														size={16}
														className="group-hover/btn:animate-pulse"
													/>
													Live demo
												</button>
											) : project.caseStudy ? (
												<button
													onClick={() => openCaseStudy(project)}
													className="group/btn flex-1 inline-flex items-center gap-2 text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 font-medium transition-all duration-300 transform hover:translate-x-2"
												>
													<FileText
														size={16}
														className="group-hover/btn:animate-pulse"
													/>
													Read case study
												</button>
											) : (
												<div className="flex-1"></div>
											)}

											{/* GitHub Button - Only show if github link exists */}
											{project.github && (
												<a
													href={project.github}
													target="_blank"
													rel="noopener noreferrer"
													className="inline-flex items-center justify-center p-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-soft hover:shadow-medium"
												>
													<Github size={14} />
												</a>
											)}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* View All Projects Button */}
					<div
						className={`text-center mt-12 transform transition-all duration-700 ${
							isVisible
								? "translate-y-0 opacity-100"
								: "translate-y-8 opacity-0"
						}`}
						style={{ transitionDelay: "0.6s" }}
					>
						<button
							onClick={() => navigate("/projects")}
							className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-medium hover:shadow-strong relative overflow-hidden"
						>
							<span className="relative z-10 flex items-center gap-2">
								View All Projects
								<ArrowUpRight
									size={18}
									className="group-hover/btn:animate-pulse"
								/>
							</span>
							<div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-600 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Projects;
