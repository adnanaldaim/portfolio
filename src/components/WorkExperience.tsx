import React, { useEffect, useRef, useState } from "react";
import { Briefcase } from "lucide-react";
import { experiences } from "../data/experience";

const WorkExperience: React.FC = () => {
	const [visibleItems, setVisibleItems] = useState<number[]>([]);
	const [isInView, setIsInView] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);
	const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isInView) {
						setIsInView(true);
						// Start animating items with smooth staggered timing
						experiences.forEach((_, index) => {
							setTimeout(() => {
								setVisibleItems((prev) => [...prev, index]);
							}, index * 300); // Increased delay for smoother effect
						});
					}
				});
			},
			{
				threshold: 0.2,
				rootMargin: "0px 0px -50px 0px", // Start animation slightly before fully in view
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
	}, [isInView, experiences.length]);

	return (
		<section
			ref={sectionRef}
			id="experience"
			className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50/50 to-slate-100/40 dark:from-surface-dark dark:to-background-dark relative overflow-hidden"
		>
			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div
					className="absolute bottom-32 right-32 w-48 h-48 bg-gradient-to-br from-orange-200/20 to-amber-200/20 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "1s" }}
				></div>
				<div
					className="absolute top-32 left-32 w-48 h-48 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "2s" }}
				></div>
			</div>

			<div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
				<div className="max-w-4xl mx-auto">
					<h2
						className={`text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-12 text-center transform transition-all duration-1000 ease-out ${
							isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
						}`}
					>
						Work Experience
					</h2>

					<div className="space-y-12">
						{experiences.map((exp, index) => (
							<div
								key={index}
								ref={(el) => (itemRefs.current[index] = el)}
								className={`group relative pl-8 border-l-2 border-primary-200 dark:border-primary-800 hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-700 ease-out transform ${
									visibleItems.includes(index)
										? "translate-x-0 opacity-100 scale-100"
										: "-translate-x-12 opacity-0 scale-95"
								}`}
								style={{
									transitionDelay: `${index * 100}ms`,
									transitionTimingFunction:
										"cubic-bezier(0.25, 0.46, 0.45, 0.94)", // Smooth easing
								}}
							>
								{/* Timeline Dot */}
								<div
									className={`absolute -left-3 top-0 w-6 h-6 bg-white/80 dark:bg-surface-dark border-2 border-primary-200 dark:border-primary-800 group-hover:border-primary-500 dark:group-hover:border-primary-400 rounded-full transition-all duration-500 ease-out backdrop-blur-sm transform ${
										visibleItems.includes(index)
											? "scale-100 rotate-0"
											: "scale-0 rotate-45"
									} group-hover:scale-125`}
									style={{
										transitionDelay: `${index * 100 + 200}ms`, // Slight delay after card animation
									}}
								>
									<Briefcase
										size={14}
										className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-500 dark:text-primary-400 transition-all duration-300 ${
											visibleItems.includes(index) ? "opacity-100" : "opacity-0"
										} group-hover:animate-pulse`}
										style={{
											transitionDelay: `${index * 100 + 400}ms`,
										}}
									/>
								</div>

								{/* Experience Card */}
								<div className="bg-white/70 dark:bg-surface-dark backdrop-blur-sm p-6 rounded-lg border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow group-hover:shadow-strong transition-all duration-700 ease-out transform group-hover:-translate-y-2">
									{/* Header */}
									<div className="flex flex-wrap items-center justify-between gap-4 mb-4">
										<div
											className={`transform transition-all duration-500 ease-out ${
												visibleItems.includes(index)
													? "translate-y-0 opacity-100"
													: "translate-y-4 opacity-0"
											} group-hover:translate-x-2`}
											style={{
												transitionDelay: `${index * 100 + 300}ms`,
											}}
										>
											<h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
												{exp.title}
											</h3>
											<p className="text-primary-600 dark:text-primary-400 font-medium">
												{exp.company}
											</p>
										</div>
										<span
											className={`px-4 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full transition-all duration-500 ease-out transform ${
												visibleItems.includes(index)
													? "translate-y-0 opacity-100 scale-100"
													: "translate-y-4 opacity-0 scale-90"
											} group-hover:scale-105`}
											style={{
												transitionDelay: `${index * 100 + 400}ms`,
											}}
										>
											{exp.period}
										</span>
									</div>

									{/* Description List */}
									<ul className="space-y-2">
										{exp.description.map((item, idx) => (
											<li
												key={idx}
												className={`text-neutral-600 dark:text-neutral-400 flex items-start gap-2 transform transition-all duration-500 ease-out ${
													visibleItems.includes(index)
														? "translate-x-0 opacity-100"
														: "translate-x-4 opacity-0"
												} group-hover:translate-x-2`}
												style={{
													transitionDelay: `${index * 100 + 500 + idx * 100}ms`, // Stagger each list item
												}}
											>
												<span
													className={`w-1.5 h-1.5 mt-2 rounded-full bg-primary-500 dark:bg-primary-400 flex-shrink-0 transition-all duration-300 ${
														visibleItems.includes(index)
															? "scale-100"
															: "scale-0"
													} group-hover:animate-pulse`}
													style={{
														transitionDelay: `${
															index * 100 + 600 + idx * 100
														}ms`,
													}}
												/>
												{item}
											</li>
										))}
									</ul>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default WorkExperience;
