import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	ArrowLeft,
	Calendar,
	ExternalLink,
	Github,
	Clock,
	User,
	Target,
	Lightbulb,
	TrendingUp,
	Code2,
	CheckCircle,
	Palette,
	X,
	ZoomIn,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import Header from "../components/Header";
import { allProjects } from "../data/projects";
import { getTagColor } from "../data/tagColors";
import FullScreenCarousel from "../components/FullScreenCarousel";

const CaseStudy: React.FC = () => {
	const { projectId } = useParams<{ projectId: string }>();
	const navigate = useNavigate();
	const [project, setProject] = useState<any>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [visibleSections, setVisibleSections] = useState<number[]>([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [currentIterationIndex, setCurrentIterationIndex] = useState(0);
	const [currentView, setCurrentView] = useState<"before" | "after" | "split">(
		"split",
	);
	const sectionRefs = useRef<(HTMLElement | null)[]>([]);

	// Scroll to top when component mounts
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// Animate in on mount
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	// Intersection Observer for scroll animations
	useEffect(() => {
		if (!project) return; // Don't set up observer until project is loaded

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = sectionRefs.current.findIndex(
							(ref) => ref === entry.target,
						);
						if (index !== -1 && !visibleSections.includes(index)) {
							setVisibleSections((prev) => [...prev, index]);
						}
					}
				});
			},
			{
				threshold: 0.3,
				rootMargin: "0px 0px -100px 0px",
			},
		);

		// Small delay to ensure refs are set
		const timeoutId = setTimeout(() => {
			sectionRefs.current.forEach((ref) => {
				if (ref) {
					observer.observe(ref);
				}
			});
		}, 100);

		return () => {
			clearTimeout(timeoutId);
			observer.disconnect();
		};
	}, [project]); // Only depend on project, not visibleSections

	useEffect(() => {
		if (projectId) {
			const foundProject = allProjects.find(
				(p) => p.id === parseInt(projectId),
			);
			setProject(foundProject || null);
		}
	}, [projectId]);

	useEffect(() => {
		if (project) {
			document.title = `${project.title} - Case Study | Portfolio`;
		}
	}, [project]);

	// Modal control functions
	const openModal = (iterationIndex: number) => {
		setCurrentIterationIndex(iterationIndex);
		setModalOpen(true);
		document.body.style.overflow = "hidden";
	};

	const closeModal = () => {
		setModalOpen(false);
		document.body.style.overflow = "unset";
	};

	const nextIteration = () => {
		if (project?.caseStudy?.designEvolution) {
			setCurrentIterationIndex((prev) =>
				prev < project.caseStudy.designEvolution.length - 1 ? prev + 1 : 0,
			);
		}
	};

	const prevIteration = () => {
		if (project?.caseStudy?.designEvolution) {
			setCurrentIterationIndex((prev) =>
				prev > 0 ? prev - 1 : project.caseStudy.designEvolution.length - 1,
			);
		}
	};

	// Handle escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				closeModal();
			}
		};

		if (modalOpen) {
			document.addEventListener("keydown", handleEscape);
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [modalOpen]);

	if (!project || !project.caseStudy) {
		return (
			<PageTransition>
				<div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
					<div className="text-center">
						<h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
							Project Not Found
						</h1>
						<button
							onClick={() => navigate("/")}
							className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300"
						>
							<ArrowLeft size={16} />
							Back to Home
						</button>
					</div>
				</div>
			</PageTransition>
		);
	}

	// Calculate dynamic section indices
	const baseSectionCount = 6; // Overview, Challenge, Solution, Results, and 2 initial sections
	const designEvolutionCount = project.caseStudy.designEvolution
		? project.caseStudy.designEvolution.length
		: 0;
	const sidebarStartIndex = baseSectionCount + designEvolutionCount;

	const currentEvolution =
		project.caseStudy.designEvolution?.[currentIterationIndex];

	return (
		<PageTransition>
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50/80 to-zinc-50/60 dark:from-background-dark dark:to-surface-dark relative overflow-hidden">
				{/* Use the same Header component */}
				<Header />

				{/* Design Iteration Modal */}
				{modalOpen && currentEvolution && (
					<FullScreenCarousel
						iterations={project.caseStudy.designEvolution}
						currentIndex={currentIterationIndex}
						onClose={closeModal}
						onPrevIteration={prevIteration}
						onNextIteration={nextIteration}
					/>
				)}

				{/* Animated Background Elements */}
				<div className="absolute inset-0 overflow-hidden">
					<div
						className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-slate-200/20 to-gray-200/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDelay: "0.5s" }}
					></div>
					<div
						className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-zinc-200/20 to-slate-200/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDelay: "1.5s" }}
					></div>
				</div>

				{/* Hero Section */}
				<div className="container mx-auto px-4 md:px-8 lg:px-16 py-12 pt-32 relative z-10">
					<div className="max-w-6xl mx-auto">
						{/* Back Button - Outside Header */}
						<div
							className={`mb-8 transform transition-all duration-700 ${
								isVisible
									? "translate-y-0 opacity-100"
									: "translate-y-8 opacity-0"
							}`}
						>
							<button
								onClick={() => navigate("/")}
								className="group inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-300 font-medium"
							>
								<ArrowLeft
									size={20}
									className="group-hover:-translate-x-1 transition-transform"
								/>
								<span>Back to Portfolio</span>
							</button>
						</div>

						{/* Project Header */}
						<div
							className={`text-center mb-12 transform transition-all duration-700 ${
								isVisible
									? "translate-y-0 opacity-100"
									: "translate-y-8 opacity-0"
							}`}
							style={{ transitionDelay: "0.2s" }}
						>
							<div className="flex items-center justify-center gap-4 mb-6">
								<span className="px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full">
									{project.category}
								</span>
								<div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
									<Calendar size={16} />
									<span>{project.year}</span>
								</div>
							</div>

							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
								{project.title}
							</h1>

							<p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
								{project.description}
							</p>

							{/* Action Buttons */}
							<div className="flex items-center justify-center gap-4 mt-8">
								{project.link && (
									<a
										href={project.link}
										target="_blank"
										rel="noopener noreferrer"
										className="group/btn inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 text-sm transform hover:-translate-y-1 shadow-medium hover:shadow-strong relative overflow-hidden"
									>
										<span className="relative z-10 flex items-center gap-2">
											<ExternalLink size={16} />
											Live Demo
										</span>
										<div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-600 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
									</a>
								)}
								{project.github && (
									<a
										href={project.github}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium rounded-lg transition-all duration-300 text-sm transform hover:-translate-y-1 shadow-soft hover:shadow-medium"
									>
										<Github size={16} />
										Source Code
									</a>
								)}
							</div>
						</div>

						{/* Hero Image */}
						<div
							ref={(el) => (sectionRefs.current[0] = el)}
							className={` w-fit align-center rounded-2xl overflow-hidden mb-16 layered-shadow transform transition-all duration-700 ${
								visibleSections.includes(0)
									? "translate-y-0 opacity-100"
									: "translate-y-12 opacity-0"
							}`}
						>
							<img
								src={
									project.image?.startsWith("http") ||
									project.image?.startsWith("/")
										? project.image
										: "/" + project.image
								}
								alt={project.title}
								className="w-full h-full object-cover"
							/>
						</div>

						{/* Project Details Grid */}
						<div
							ref={(el) => (sectionRefs.current[1] = el)}
							className={`grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16 transform transition-all duration-700 ${
								visibleSections.includes(1)
									? "translate-y-0 opacity-100"
									: "translate-y-12 opacity-0"
							}`}
						>
							<div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-300">
								<div className="flex items-center gap-3 mb-4">
									<div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
										<Clock
											size={20}
											className="text-blue-600 dark:text-blue-400"
										/>
									</div>
									<h3 className="font-bold text-neutral-900 dark:text-neutral-100">
										Duration
									</h3>
								</div>
								<p className="text-neutral-600 dark:text-neutral-400">
									{project.caseStudy.duration}
								</p>
							</div>

							<div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-300">
								<div className="flex items-center gap-3 mb-4">
									<div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
										<User
											size={20}
											className="text-green-600 dark:text-green-400"
										/>
									</div>
									<h3 className="font-bold text-neutral-900 dark:text-neutral-100">
										Role
									</h3>
								</div>
								<p className="text-neutral-600 dark:text-neutral-400">
									{project.caseStudy.role}
								</p>
							</div>

							<div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-300">
								<div className="flex items-center gap-3 mb-4">
									<div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
										<Code2
											size={20}
											className="text-purple-600 dark:text-purple-400"
										/>
									</div>
									<h3 className="font-bold text-neutral-900 dark:text-neutral-100">
										Platform
									</h3>
								</div>
								<p className="text-neutral-600 dark:text-neutral-400">
									{project.category}
								</p>
							</div>

							<div className="bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-300">
								<div className="flex items-center gap-3 mb-4">
									<div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
										<Calendar
											size={20}
											className="text-orange-600 dark:text-orange-400"
										/>
									</div>
									<h3 className="font-bold text-neutral-900 dark:text-neutral-100">
										Year
									</h3>
								</div>
								<p className="text-neutral-600 dark:text-neutral-400">
									{project.year}
								</p>
							</div>
						</div>

						{/* Main Content */}
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
							{/* Content Sections */}
							<div className="lg:col-span-2 space-y-12">
								{/* Overview */}
								<section
									ref={(el) => (sectionRefs.current[2] = el)}
									className={`bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-700 transform ${
										visibleSections.includes(2)
											? "translate-y-0 opacity-100"
											: "translate-y-12 opacity-0"
									}`}
								>
									<div className="flex items-center gap-3 mb-6">
										<div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-full">
											<Target
												size={24}
												className="text-primary-600 dark:text-primary-400"
											/>
										</div>
										<h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
											Project Overview
										</h2>
									</div>
									<p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
										{project.caseStudy.overview}
									</p>
								</section>

								{/* Challenge */}
								<section
									ref={(el) => (sectionRefs.current[3] = el)}
									className={`bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-700 transform ${
										visibleSections.includes(3)
											? "translate-y-0 opacity-100"
											: "translate-y-12 opacity-0"
									}`}
								>
									<div className="flex items-center gap-3 mb-6">
										<div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-full">
											<Target
												size={24}
												className="text-red-600 dark:text-red-400"
											/>
										</div>
										<h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
											The Challenge
										</h2>
									</div>
									<p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
										{project.caseStudy.challenge}
									</p>
								</section>

								{/* Solution */}
								<section
									ref={(el) => (sectionRefs.current[4] = el)}
									className={`bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-700 transform ${
										visibleSections.includes(4)
											? "translate-y-0 opacity-100"
											: "translate-y-12 opacity-0"
									}`}
								>
									<div className="flex items-center gap-3 mb-6">
										<div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-full">
											<Lightbulb
												size={24}
												className="text-yellow-600 dark:text-yellow-400"
											/>
										</div>
										<h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
											The Solution
										</h2>
									</div>
									<p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
										{project.caseStudy.solution}
									</p>
								</section>

								{/* Results */}
								{project.caseStudy.results && project.caseStudy.results.length > 0 && (
                  <section
									ref={(el) => (sectionRefs.current[5] = el)}
									className={`bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-700 transform ${
										visibleSections.includes(5)
											? "translate-y-0 opacity-100"
											: "translate-y-12 opacity-0"
									}`}
								>
									<div className="flex items-center gap-3 mb-6">
										<div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
											<TrendingUp
												size={24}
												className="text-green-600 dark:text-green-400"
											/>
										</div>
										<h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
											Results & Impact
										</h2>
									</div>
									<div className="space-y-4">
										{project.caseStudy?.results?.map(
											(result: string, index: number) => (
												<div
													key={index}
													className="flex items-start gap-3"
												>
													<div className="p-1 bg-green-50 dark:bg-green-900/20 rounded-full mt-1">
														<CheckCircle
															size={16}
															className="text-green-600 dark:text-green-400"
														/>
													</div>
													<p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
														{result}
													</p>
												</div>
											),
										) ?? null}
									</div>
								</section>)}

								{/* Design Evolution Section */}
								{project.caseStudy.designEvolution &&
									project.caseStudy.designEvolution.length > 0 && (
										<section
											ref={(el) => (sectionRefs.current[baseSectionCount] = el)}
											className={`bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-700 transform ${
												visibleSections.includes(baseSectionCount)
													? "translate-y-0 opacity-100"
													: "translate-y-12 opacity-0"
											}`}
										>
											<div className="flex items-center gap-3 mb-8">
												<div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-full">
													<Palette
														size={24}
														className="text-purple-600 dark:text-purple-400"
													/>
												</div>
												<h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
													Design Evolution
												</h2>
											</div>

											<div className="space-y-12">
												{project.caseStudy.designEvolution.map(
													(evolution: any, index: number) => (
														<div
															key={index}
															ref={(el) =>
																(sectionRefs.current[
																	baseSectionCount + 1 + index
																] = el)
															}
															className={`transform transition-all duration-700 ${
																visibleSections.includes(
																	baseSectionCount + 1 + index,
																)
																	? "translate-y-0 opacity-100"
																	: "translate-y-12 opacity-0"
															}`}
														>
															{evolution.beforeImage &&
																evolution.afterImage && (
																	<>
																		<div className="flex items-center justify-between mb-6">
																			<h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
																				{evolution.title ||
																					`Design Iteration ${index + 1}`}
																			</h3>
																			<button
																				onClick={() => openModal(index)}
																				className="group inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-medium hover:shadow-strong"
																			>
																				<ZoomIn size={16} />
																				<span className="hidden sm:inline">
																					View Larger
																				</span>
																				<span className="sm:hidden">Zoom</span>
																			</button>
																		</div>

																		{/* Before/After Image Comparison - Smaller Preview */}
																		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
																			{/* Before Image */}
																			<div className="space-y-3">
																				<h4 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 text-center">
																					Before
																				</h4>
																				<div
																					className="aspect-[4/3] rounded-lg overflow-hidden shadow-md border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:shadow-lg transition-shadow"
																					onClick={() => openModal(index)}
																				>
																					<img
																						src={
																							evolution.beforeImage?.startsWith(
																								"http",
																							) ||
																							evolution.beforeImage?.startsWith(
																								"/",
																							)
																								? evolution.beforeImage
																								: "/" + evolution.beforeImage
																						}
																						alt={`Before - ${
																							evolution.title ||
																							`Design ${index + 1}`
																						}`}
																						className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
																					/>
																				</div>
																			</div>

																			{/* After Image */}
																			<div className="space-y-3">
																				<h4 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 text-center">
																					After
																				</h4>
																				<div
																					className="aspect-[4/3] rounded-lg overflow-hidden shadow-md border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:shadow-lg transition-shadow"
																					onClick={() => openModal(index)}
																				>
																					<img
																						src={
																							evolution.afterImage?.startsWith(
																								"http",
																							) ||
																							evolution.afterImage?.startsWith(
																								"/",
																							)
																								? evolution.afterImage
																								: "/" + evolution.afterImage
																						}
																						alt={`After - ${
																							evolution.title ||
																							`Design ${index + 1}`
																						}`}
																						className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
																					/>
																				</div>
																			</div>
																		</div>
																	</>
																)}
															{/* Description */}
															<div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-6 border border-neutral-200/50 dark:border-neutral-700/50">
																<p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-center">
																	{evolution.description}
																</p>
															</div>
														</div>
													),
												)}
											</div>
										</section>
									)}
							</div>

							{/* Sidebar */}
							<div className="space-y-8">
								{/* Project Tags */}
								<div
									ref={(el) =>
										(sectionRefs.current[sidebarStartIndex + 1] = el)
									}
									className={`bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-700 transform ${
										visibleSections.includes(sidebarStartIndex + 1)
											? "translate-y-0 opacity-100"
											: "translate-y-12 opacity-0"
									}`}
								>
									<h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
										Core Technologies
									</h3>
									<div className="flex flex-wrap gap-3">
										{project.tags.map((tag: string, index: number) => (
											<span
												key={index}
												className={`tech-tag px-3 py-2 text-sm font-medium rounded-lg border ${getTagColor(
													tag,
												)}`}
											>
												{tag}
											</span>
										))}
									</div>
								</div>

								{/* Quick Actions */}
								{project.link && (
									<div
										ref={(el) =>
											(sectionRefs.current[sidebarStartIndex + 2] = el)
										}
										className={`bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm rounded-2xl p-6 border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-700 transform ${
											visibleSections.includes(sidebarStartIndex + 2)
												? "translate-y-0 opacity-100"
												: "translate-y-12 opacity-0"
										}`}
									>
										<h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
											Project Links
										</h3>
										<div className="space-y-3">
											<a
												href={project.link}
												target="_blank"
												rel="noopener noreferrer"
												className="group/btn w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-medium hover:shadow-strong relative overflow-hidden"
											>
												<span className="relative z-10 flex items-center gap-2">
													<ExternalLink size={16} />
													View Live Demo
												</span>
												<div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-600 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
											</a>
											{project.github && (
												<a
													href={project.github}
													target="_blank"
													rel="noopener noreferrer"
													className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-soft hover:shadow-medium"
												>
													<Github size={16} />
													View Source Code
												</a>
											)}
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Navigation */}
						<div
							ref={(el) => (sectionRefs.current[sidebarStartIndex + 3] = el)}
							className={`mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-700 transform transition-all duration-700`}
						>
							<div className="flex flex-col sm:flex-row justify-between items-center gap-6">
								<button
									onClick={() => navigate("/projects")}
									className="group inline-flex items-center gap-2 px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-medium hover:shadow-strong relative overflow-hidden lg:w-fit w-auto"
								>
									<span className="relative z-10">View More Projects</span>
									<div className="absolute inset-0 bg-gradient-to-r from-secondary-700 to-tertiary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
								</button>

								<button
									onClick={() => navigate("/#contact")}
									className="group inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-medium hover:shadow-strong relative overflow-hidden lg:w-fit w-auto"
								>
									<span className="relative z-10">Get In Touch</span>
									<div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageTransition>
	);
};

export default CaseStudy;
