import React, { useEffect, useRef, useState } from "react";
import { Download, Code, PenTool, ChevronDown, Rocket, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About: React.FC = () => {
	const navigate = useNavigate();
	const [isVisible, setIsVisible] = useState(false);
	const [expandedSections, setExpandedSections] = useState({
		abp: false,
		ai: false,
		mvp: false,
		fullstack: false
	});
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsVisible(true);
					}
				});
			},
			{ threshold: 0.2 },
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

	const toggleSection = (section: keyof typeof expandedSections) => {
		setExpandedSections(prev => ({
			...prev,
			[section]: !prev[section]
		}));
	};

	// Color mapping for dynamic classes
	const colorClasses = {
		primary: {
			bg: "bg-primary-50 dark:bg-primary-900/20",
			text: "text-primary-600 dark:text-primary-400",
			border: "border-primary-200 dark:border-primary-800",
			hover: "hover:bg-primary-100 dark:hover:bg-primary-900/40"
		},
		secondary: {
			bg: "bg-secondary-50 dark:bg-secondary-900/20",
			text: "text-secondary-600 dark:text-secondary-400",
			border: "border-secondary-200 dark:border-secondary-800",
			hover: "hover:bg-secondary-100 dark:hover:bg-secondary-900/40"
		},
		amber: {
			bg: "bg-amber-50 dark:bg-amber-900/20",
			text: "text-amber-600 dark:text-amber-400",
			border: "border-amber-200 dark:border-amber-800",
			hover: "hover:bg-amber-100 dark:hover:bg-amber-900/40"
		},
		purple: {
			bg: "bg-purple-50 dark:bg-purple-900/20",
			text: "text-purple-600 dark:text-purple-400",
			border: "border-purple-200 dark:border-purple-800",
			hover: "hover:bg-purple-100 dark:hover:bg-purple-900/40"
		}
	};

	return (
		<section
			ref={sectionRef}
			id="about"
			className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 dark:from-surface-dark dark:to-background-dark relative overflow-hidden"
		>
			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<div
					className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "0.5s" }}
				></div>
				<div
					className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-cyan-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse"
					style={{ animationDelay: "1.5s" }}
				></div>
			</div>

			<div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
				<div className="max-w-6xl mx-auto">
					<h2
						className={`text-3xl md:text-4xl font-bold text-neutral-800 dark:text-white mb-12 text-center transform transition-all duration-700 ${isVisible
								? "translate-y-0 opacity-100"
								: "translate-y-8 opacity-0"
							}`}
					>
						What I Do
					</h2>

					<div className="space-y-8">
						{/* ABP.IO Development Section - Full Width */}
						<div
							className={`group bg-white/70 dark:bg-surface-dark backdrop-blur-sm rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-500 overflow-hidden ${isVisible
									? "translate-y-0 opacity-100"
									: "translate-y-12 opacity-0"
								} hover:-translate-y-2`}
							style={{ transitionDelay: "0.2s" }}
						>
							{/* Clickable Header */}
							<button
								onClick={() => toggleSection('abp')}
								className="w-full p-8 text-left flex items-start justify-between hover:bg-white/30 dark:hover:bg-surface-dark/50 transition-colors duration-300"
							>
								<div className="flex items-start gap-4 flex-1">
									<div className={`p-3 ${colorClasses.primary.bg} rounded-full group-hover:scale-110 transition-transform duration-300 shrink-0`}>
										<Code
											size={24}
											className={colorClasses.primary.text}
										/>
									</div>
									<div className="flex-1">
										<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
											<div>
												<h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">
													ABP.IO Development
												</h3>
												<p className="text-neutral-600 dark:text-gray-300">
													Enterprise-grade SaaS platforms with ABP Framework
												</p>
											</div>
											<div className="flex items-center gap-2">
												<span className="text-sm text-neutral-500 dark:text-neutral-400">
													{expandedSections.abp ? "Show less" : "Show more"}
												</span>
												<div className={`transform transition-transform duration-300 ${expandedSections.abp ? "rotate-180" : ""}`}>
													<ChevronDown size={20} className="text-neutral-400 dark:text-neutral-500" />
												</div>
											</div>
										</div>
										
										{/* Key Features - Always Visible */}
										<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
											<div className="flex items-center p-2 bg-white/50 dark:bg-black/20 rounded-lg">
												<span className="mr-2 text-green-500">•</span>
												<span className="text-sm text-neutral-700 dark:text-gray-300">Modular monoliths & microservices</span>
											</div>
											<div className="flex items-center p-2 bg-white/50 dark:bg-black/20 rounded-lg">
												<span className="mr-2 text-green-500">•</span>
												<span className="text-sm text-neutral-700 dark:text-gray-300">Multi-tenant SaaS platforms</span>
											</div>
											<div className="flex items-center p-2 bg-white/50 dark:bg-black/20 rounded-lg">
												<span className="mr-2 text-green-500">•</span>
												<span className="text-sm text-neutral-700 dark:text-gray-300">Domain-Driven Design implementation</span>
											</div>
										</div>
									</div>
								</div>
							</button>

							{/* Collapsible Content */}
							<div className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedSections.abp ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
								<div className="px-8 pb-8 space-y-6">
									<p className="text-neutral-700 dark:text-gray-300 text-lg">
										I architect and build <strong className="text-primary-600 dark:text-primary-400">enterprise-grade SaaS platforms</strong> using ABP Framework, delivering scalable, maintainable solutions that grow with your business.
									</p>

									<div className="space-y-4">
										<h4 className="text-lg font-semibold text-neutral-800 dark:text-white">What I Deliver:</h4>
										<ul className="space-y-3">
											<li className="flex items-start">
												<div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 shrink-0">
													<span className="text-xs text-green-600 dark:text-green-400">✓</span>
												</div>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Modular Architecture</strong> – Scalable monoliths & microservices that evolve with your needs</span>
											</li>
											<li className="flex items-start">
												<div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 shrink-0">
													<span className="text-xs text-green-600 dark:text-green-400">✓</span>
												</div>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Multi-Tenant SaaS</strong> – Isolated data, shared infrastructure, maximum efficiency</span>
											</li>
											<li className="flex items-start">
												<div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 shrink-0">
													<span className="text-xs text-green-600 dark:text-green-400">✓</span>
												</div>
												<span className="text-neutral-700 dark:text-gray-300"><strong>DDD Implementation</strong> – Aligning code with business domains for long-term maintainability</span>
											</li>
											<li className="flex items-start">
												<div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 shrink-0">
													<span className="text-xs text-green-600 dark:text-green-400">✓</span>
												</div>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Secure Authentication</strong> – SSO, role-based access, IdentityServer integration</span>
											</li>
											<li className="flex items-start">
												<div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 shrink-0">
													<span className="text-xs text-green-600 dark:text-green-400">✓</span>
												</div>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Background Processing</strong> – Reliable async processing with RabbitMQ/Hangfire</span>
											</li>
										</ul>
									</div>

									<div className="pt-4 border-t border-gray-200 dark:border-gray-700">
										<p className="font-medium text-neutral-800 dark:text-gray-200 mb-3">
											Why Choose My ABP.IO Expertise:
										</p>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
											<div className="flex items-start">
												<span className="mr-2 text-primary-500 shrink-0">•</span>
												<span className="text-neutral-700 dark:text-gray-300"><strong>6+ years</strong> of .NET and ABP Framework experience</span>
											</div>
											<div className="flex items-start">
												<span className="mr-2 text-primary-500 shrink-0">•</span>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Production-proven</strong> patterns that reduce technical debt</span>
											</div>
											<div className="flex items-start">
												<span className="mr-2 text-primary-500 shrink-0">•</span>
												<span className="text-neutral-700 dark:text-gray-300"><strong>ABP Commercial & Suite</strong> proficiency</span>
											</div>
											<div className="flex items-start">
												<span className="mr-2 text-primary-500 shrink-0">•</span>
												<span className="text-neutral-700 dark:text-gray-300"><strong>End-to-end</strong> ownership</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* AI Integration Section - Full Width */}
						<div
							className={`group bg-white/70 dark:bg-surface-dark backdrop-blur-sm rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-500 overflow-hidden ${isVisible
									? "translate-y-0 opacity-100"
									: "translate-y-12 opacity-0"
								} hover:-translate-y-2`}
							style={{ transitionDelay: "0.4s" }}
						>
							{/* Clickable Header */}
							<button
								onClick={() => toggleSection('ai')}
								className="w-full p-8 text-left flex items-start justify-between hover:bg-white/30 dark:hover:bg-surface-dark/50 transition-colors duration-300"
							>
								<div className="flex items-start gap-4 flex-1">
									<div className={`p-3 ${colorClasses.secondary.bg} rounded-full group-hover:scale-110 transition-transform duration-300 shrink-0`}>
										<PenTool
											size={24}
											className={colorClasses.secondary.text}
										/>
									</div>
									<div className="flex-1">
										<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
											<div>
												<h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">
													AI Integration
												</h3>
												<p className="text-neutral-600 dark:text-gray-300">
													Intelligent applications with Azure OpenAI and custom LLMs
												</p>
											</div>
											<div className="flex items-center gap-2">
												<span className="text-sm text-neutral-500 dark:text-neutral-400">
													{expandedSections.ai ? "Show less" : "Show more"}
												</span>
												<div className={`transform transition-transform duration-300 ${expandedSections.ai ? "rotate-180" : ""}`}>
													<ChevronDown size={20} className="text-neutral-400 dark:text-neutral-500" />
												</div>
											</div>
										</div>
										
										{/* Key Features - Always Visible */}
										<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
											<div className="flex items-center p-2 bg-white/50 dark:bg-black/20 rounded-lg">
												<span className="mr-2 text-blue-500">•</span>
												<span className="text-sm text-neutral-700 dark:text-gray-300">Azure OpenAI implementation</span>
											</div>
											<div className="flex items-center p-2 bg-white/50 dark:bg-black/20 rounded-lg">
												<span className="mr-2 text-blue-500">•</span>
												<span className="text-sm text-neutral-700 dark:text-gray-300">Custom chatbots & LLM workflows</span>
											</div>
											<div className="flex items-center p-2 bg-white/50 dark:bg-black/20 rounded-lg">
												<span className="mr-2 text-blue-500">•</span>
												<span className="text-sm text-neutral-700 dark:text-gray-300">Semantic Kernel orchestration</span>
											</div>
										</div>
									</div>
								</div>
							</button>

							{/* Collapsible Content */}
							<div className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedSections.ai ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
								<div className="px-8 pb-8 space-y-6">
									<p className="text-neutral-700 dark:text-gray-300 text-lg">
										I build <strong className="text-blue-600 dark:text-blue-400">intelligent, AI-powered applications</strong> that transform how businesses operate. Specializing in Azure OpenAI, custom LLM workflows, and AI automation.
									</p>

									<div className="space-y-4">
										<h4 className="text-lg font-semibold text-neutral-800 dark:text-white">What I Deliver:</h4>
										<ul className="space-y-3">
											<li className="flex items-start">
												<div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 shrink-0">
													<span className="text-xs text-blue-600 dark:text-blue-400">AI</span>
												</div>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Azure OpenAI Implementation</strong> – GPT-4, DALL·E, embeddings</span>
											</li>
											<li className="flex items-start">
												<div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 shrink-0">
													<span className="text-xs text-blue-600 dark:text-blue-400">🤖</span>
												</div>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Custom Chatbots & Assistants</strong> – Domain-specific conversational AI</span>
											</li>
											<li className="flex items-start">
												<div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 shrink-0">
													<span className="text-xs text-blue-600 dark:text-blue-400">⚙️</span>
												</div>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Semantic Kernel Workflows</strong> – Orchestrating AI services</span>
											</li>
											<li className="flex items-start">
												<div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 shrink-0">
													<span className="text-xs text-blue-600 dark:text-blue-400">🎤</span>
												</div>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Speech Studio Integration</strong> – Voice interfaces & transcription</span>
											</li>
										</ul>
									</div>

									<div className="pt-4 border-t border-gray-200 dark:border-gray-700">
										<p className="font-medium text-neutral-800 dark:text-gray-200 mb-3">
											Why Choose My AI Integration:
										</p>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
											<div className="flex items-start">
												<span className="mr-2 text-blue-500 shrink-0">•</span>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Production-Ready AI</strong> – Scalable, secure</span>
											</div>
											<div className="flex items-start">
												<span className="mr-2 text-blue-500 shrink-0">•</span>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Hybrid Architecture</strong> – .NET + AI services</span>
											</div>
											<div className="flex items-start">
												<span className="mr-2 text-blue-500 shrink-0">•</span>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Cost-Optimized</strong> – Smart token usage</span>
											</div>
											<div className="flex items-start">
												<span className="mr-2 text-blue-500 shrink-0">•</span>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Full-Stack AI</strong> – End-to-end implementation</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* MVP Building Section - Full Width */}
						<div
							className={`group bg-white/70 dark:bg-surface-dark backdrop-blur-sm rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-500 overflow-hidden ${isVisible
									? "translate-y-0 opacity-100"
									: "translate-y-12 opacity-0"
								} hover:-translate-y-2`}
							style={{ transitionDelay: "0.6s" }}
						>
							{/* Clickable Header */}
							<button
								onClick={() => toggleSection('mvp')}
								className="w-full p-8 text-left flex items-start justify-between hover:bg-white/30 dark:hover:bg-surface-dark/50 transition-colors duration-300"
							>
								<div className="flex items-start gap-4 flex-1">
									<div className={`p-3 ${colorClasses.amber.bg} rounded-full group-hover:scale-110 transition-transform duration-300 shrink-0`}>
										<Rocket
											size={24}
											className={colorClasses.amber.text}
										/>
									</div>
									<div className="flex-1">
										<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
											<div>
												<h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">
													MVP Building
												</h3>
												<p className="text-neutral-600 dark:text-gray-300">
													From idea to production-ready MVP in 4-8 weeks
												</p>
											</div>
											<div className="flex items-center gap-2">
												<span className="text-sm text-neutral-500 dark:text-neutral-400">
													{expandedSections.mvp ? "Show less" : "Show more"}
												</span>
												<div className={`transform transition-transform duration-300 ${expandedSections.mvp ? "rotate-180" : ""}`}>
													<ChevronDown size={20} className="text-neutral-400 dark:text-neutral-500" />
												</div>
											</div>
										</div>
										
										{/* Key Features - Always Visible */}
										<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
											<div className="flex items-center p-2 bg-white/50 dark:bg-black/20 rounded-lg">
												<span className="mr-2 text-amber-500">•</span>
												<span className="text-sm text-neutral-700 dark:text-gray-300">Idea to production in 4-8 weeks</span>
											</div>
											<div className="flex items-center p-2 bg-white/50 dark:bg-black/20 rounded-lg">
												<span className="mr-2 text-amber-500">•</span>
												<span className="text-sm text-neutral-700 dark:text-gray-300">Scalable architecture from day one</span>
											</div>
											<div className="flex items-center p-2 bg-white/50 dark:bg-black/20 rounded-lg">
												<span className="mr-2 text-amber-500">•</span>
												<span className="text-sm text-neutral-700 dark:text-gray-300">Investor-ready demonstrations</span>
											</div>
										</div>
									</div>
								</div>
							</button>

							{/* Collapsible Content */}
							<div className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedSections.mvp ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
								<div className="px-8 pb-8 space-y-6">
									<p className="text-neutral-700 dark:text-gray-300 text-lg">
										I turn <strong className="text-amber-600 dark:text-amber-400">ideas into production-ready applications</strong> in 4-8 weeks, not months. Using proven rapid development methodologies to build MVPs that are investor-ready and engineered to scale.
									</p>

									<div className="space-y-4">
										<h4 className="text-lg font-semibold text-neutral-800 dark:text-white">What I Deliver:</h4>
										<ul className="space-y-3">
											<li className="flex items-start">
												<div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 shrink-0">
													<span className="text-xs text-amber-600 dark:text-amber-400">⚡</span>
												</div>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Rapid Prototyping</strong> – From concept to working demo in 2-4 weeks</span>
											</li>
											<li className="flex items-start">
												<div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 shrink-0">
													<span className="text-xs text-amber-600 dark:text-amber-400">🏗️</span>
												</div>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Scalable Foundations</strong> – MVPs built with enterprise patterns</span>
											</li>
											<li className="flex items-start">
												<div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 shrink-0">
													<span className="text-xs text-amber-600 dark:text-amber-400">🎯</span>
												</div>
												<span className="text-neutral-700 dark:text-gray-300"><strong>User-Centric Design</strong> – Interfaces that test product-market fit</span>
											</li>
											<li className="flex items-start">
												<div className="mr-3 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30 shrink-0">
													<span className="text-xs text-amber-600 dark:text-amber-400">💰</span>
												</div>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Investor-Ready Demos</strong> – Polished applications that secure funding</span>
											</li>
										</ul>
									</div>

									<div className="pt-4 border-t border-gray-200 dark:border-gray-700">
										<p className="font-medium text-neutral-800 dark:text-gray-200 mb-3">
											My MVP Process:
										</p>
										<div className="space-y-4 text-sm">
											<div className="flex items-start">
												<span className="mr-3 mt-1 text-amber-500 font-bold">1</span>
												<div className="text-neutral-700 dark:text-gray-300">
													<strong>Week 1-2</strong> – Discovery & Architecture Design
												</div>
											</div>
											<div className="flex items-start">
												<span className="mr-3 mt-1 text-amber-500 font-bold">2</span>
												<div className="text-neutral-700 dark:text-gray-300">
													<strong>Week 3-6</strong> – Core Development & Iteration
												</div>
											</div>
											<div className="flex items-start">
												<span className="mr-3 mt-1 text-amber-500 font-bold">3</span>
												<div className="text-neutral-700 dark:text-gray-300">
													<strong>Week 7-8</strong> – Polish, Testing & Launch Prep
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Full-Stack Solutions Section - Full Width */}
						<div
							className={`group bg-white/70 dark:bg-surface-dark backdrop-blur-sm rounded-xl border border-neutral-200/50 dark:border-neutral-700/50 layered-shadow hover:shadow-strong transition-all duration-500 overflow-hidden ${isVisible
									? "translate-y-0 opacity-100"
									: "translate-y-12 opacity-0"
								} hover:-translate-y-2`}
							style={{ transitionDelay: "0.8s" }}
						>
							{/* Clickable Header */}
							<button
								onClick={() => toggleSection('fullstack')}
								className="w-full p-8 text-left flex items-start justify-between hover:bg-white/30 dark:hover:bg-surface-dark/50 transition-colors duration-300"
							>
								<div className="flex items-start gap-4 flex-1">
									<div className={`p-3 ${colorClasses.purple.bg} rounded-full group-hover:scale-110 transition-transform duration-300 shrink-0`}>
										<Layers
											size={24}
											className={colorClasses.purple.text}
										/>
									</div>
									<div className="flex-1">
										<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
											<div>
												<h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">
													Full-Stack Solutions
												</h3>
												<p className="text-neutral-600 dark:text-gray-300">
													End-to-end application development from design to deployment
												</p>
											</div>
											<div className="flex items-center gap-2">
												<span className="text-sm text-neutral-500 dark:text-neutral-400">
													{expandedSections.fullstack ? "Show less" : "Show more"}
												</span>
												<div className={`transform transition-transform duration-300 ${expandedSections.fullstack ? "rotate-180" : ""}`}>
													<ChevronDown size={20} className="text-neutral-400 dark:text-neutral-500" />
												</div>
											</div>
										</div>
										
										{/* Key Features - Always Visible */}
										<div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
											<div className="flex items-center p-2 bg-white/50 dark:bg-black/20 rounded-lg">
												<span className="mr-2 text-purple-500">•</span>
												<span className="text-sm text-neutral-700 dark:text-gray-300">End-to-end application development</span>
											</div>
											<div className="flex items-center p-2 bg-white/50 dark:bg-black/20 rounded-lg">
												<span className="mr-2 text-purple-500">•</span>
												<span className="text-sm text-neutral-700 dark:text-gray-300">Modern frontend + .NET backend</span>
											</div>
											<div className="flex items-center p-2 bg-white/50 dark:bg-black/20 rounded-lg">
												<span className="mr-2 text-purple-500">•</span>
												<span className="text-sm text-neutral-700 dark:text-gray-300">Cloud-native deployment</span>
											</div>
										</div>
									</div>
								</div>
							</button>

							{/* Collapsible Content */}
							<div className={`transition-all duration-500 ease-in-out overflow-hidden ${expandedSections.fullstack ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
								<div className="px-8 pb-8 space-y-6">
									<p className="text-neutral-700 dark:text-gray-300 text-lg">
										I deliver <strong className="text-purple-600 dark:text-purple-400">complete, production-ready applications</strong> from database design to deployment. With expertise across the entire stack, I ensure seamless integration between frontend, backend, and infrastructure.
									</p>

									<div className="space-y-4">
										<h4 className="text-lg font-semibold text-neutral-800 dark:text-white">Tech Stack:</h4>
										<div className="grid grid-cols-2 gap-4 text-sm">
											<div className="space-y-2">
												<p className="font-medium text-neutral-700 dark:text-gray-300">Frontend</p>
												<ul className="space-y-1">
													<li className="flex items-center">
														<span className="mr-2 text-purple-500">•</span>
														<span className="text-neutral-700 dark:text-gray-300">React.js / Angular</span>
													</li>
													<li className="flex items-center">
														<span className="mr-2 text-purple-500">•</span>
														<span className="text-neutral-700 dark:text-gray-300">TypeScript</span>
													</li>
													<li className="flex items-center">
														<span className="mr-2 text-purple-500">•</span>
														<span className="text-neutral-700 dark:text-gray-300">Tailwind CSS</span>
													</li>
												</ul>
											</div>
											<div className="space-y-2">
												<p className="font-medium text-neutral-700 dark:text-gray-300">Backend</p>
												<ul className="space-y-1">
													<li className="flex items-center">
														<span className="mr-2 text-purple-500">•</span>
														<span className="text-neutral-700 dark:text-gray-300">.NET Core / ASP.NET</span>
													</li>
													<li className="flex items-center">
														<span className="mr-2 text-purple-500">•</span>
														<span className="text-neutral-700 dark:text-gray-300">C#</span>
													</li>
													<li className="flex items-center">
														<span className="mr-2 text-purple-500">•</span>
														<span className="text-neutral-700 dark:text-gray-300">Entity Framework</span>
													</li>
												</ul>
											</div>
										</div>
									</div>

									<div className="pt-4 border-t border-gray-200 dark:border-gray-700">
										<p className="font-medium text-neutral-800 dark:text-gray-200 mb-3">
											Key Capabilities:
										</p>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
											<div className="flex items-start">
												<span className="mr-2 text-purple-500 shrink-0">•</span>
												<span className="text-neutral-700 dark:text-gray-300"><strong>API Design</strong> – REST, GraphQL, gRPC</span>
											</div>
											<div className="flex items-start">
												<span className="mr-2 text-purple-500 shrink-0">•</span>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Database Design</strong> – SQL Server, PostgreSQL</span>
											</div>
											<div className="flex items-start">
												<span className="mr-2 text-purple-500 shrink-0">•</span>
												<span className="text-neutral-700 dark:text-gray-300"><strong>Cloud Deployment</strong> – Azure, AWS, Docker</span>
											</div>
											<div className="flex items-start">
												<span className="mr-2 text-purple-500 shrink-0">•</span>
												<span className="text-neutral-700 dark:text-gray-300"><strong>DevOps & CI/CD</strong> – GitHub Actions, Azure DevOps</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div
						className={`text-center mt-12 transform transition-all duration-700 ${isVisible
								? "translate-y-0 opacity-100"
								: "translate-y-8 opacity-0"
							}`}
						style={{ transitionDelay: "1s" }}
					>
						<a
							href="/Adnan-CV.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="group inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-medium hover:shadow-strong relative overflow-hidden"
						>
							<span className="relative z-10 flex items-center gap-2">
								<Download
									size={18}
									className="group-hover:animate-bounce"
								/>
								View Resume
							</span>
							<div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;