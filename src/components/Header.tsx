import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const [activeSection, setActiveSection] = useState("");

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);

			const sections = ["about", "experience", "projects", "contact"];
			for (const section of sections) {
				const el = document.getElementById(section);
				if (el) {
					const rect = el.getBoundingClientRect();
					if (rect.top <= 100 && rect.bottom >= 100) {
						setActiveSection(section);
						break;
					}
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const getLinkClass = (section: string) => {
		const baseClass = "transition-colors";
		const normalClass =
			"text-neutral-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400";
		const activeClass = "text-primary-600 dark:text-primary-400 font-medium";
		return `${baseClass} ${
			activeSection === section ? activeClass : normalClass
		}`;
	};

	const handleSectionNav = (section: string) => (e: React.MouseEvent) => {
		if (location.pathname !== "/") {
			e.preventDefault();
			navigate("/", { state: { scrollTo: section } });
			setIsMenuOpen(false);
		} else {
			const el = document.getElementById(section);
			if (el) {
				el.scrollIntoView({ behavior: "smooth" });
				setActiveSection(section);
			}
			setIsMenuOpen(false);
		}
	};

	return (
		<>
			{/* HEADER */}
			<header
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					isScrolled
						? "bg-surface-light/90 dark:bg-gray-900/90 backdrop-blur-md py-4 shadow-sm"
						: "bg-transparent py-6"
				}`}
				style={{ height: "80px" }}
			>
				<div className="container mx-auto px-4 md:px-8 lg:px-16 h-full">
					<div className="flex items-center justify-between h-full">
						<Link
							to="/"
							className="text-xl font-bold tracking-tighter"
						>
							<span className="text-primary-600 dark:text-primary-400">
								adnan
							</span>
							<span className="text-neutral-800 dark:text-white">ali</span>
						</Link>

						<nav className="hidden md:flex items-center space-x-8">
							<a
								href="#about"
								className={getLinkClass("about")}
								onClick={handleSectionNav("about")}
							>
								About
							</a>
							<a
								href="#experience"
								className={getLinkClass("experience")}
								onClick={handleSectionNav("experience")}
							>
								Experience
							</a>
							<a
								href="#projects"
								className={getLinkClass("projects")}
								onClick={handleSectionNav("projects")}
							>
								Projects
							</a>
							<a
								href="#contact"
								className={getLinkClass("contact")}
								onClick={handleSectionNav("contact")}
							>
								Contact
							</a>
							<ThemeToggle />
						</nav>

						<div className="flex items-center space-x-4 md:hidden">
							<ThemeToggle />
							<button
								onClick={toggleMenu}
								className="relative w-9 h-9 p-1 text-neutral-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
								aria-label="Toggle menu"
							>
								<div
									className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
										isMenuOpen
											? "opacity-0 rotate-90 scale-75"
											: "opacity-100 rotate-0 scale-100"
									}`}
								>
									<Menu size={20} />
								</div>
								<div
									className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
										isMenuOpen
											? "opacity-100 rotate-0 scale-100"
											: "opacity-0 -rotate-90 scale-75"
									}`}
								>
									<X size={20} />
								</div>
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* BACKDROP */}
			<div
				className={`fixed inset-0 top-[80px] z-40 md:hidden transition duration-300 ease-in-out ${
					isMenuOpen
						? "visible opacity-100 backdrop-blur-sm"
						: "invisible opacity-0 backdrop-blur-0"
				}`}
				onClick={() => setIsMenuOpen(false)}
				aria-hidden={!isMenuOpen}
			/>

			{/* SIDEBAR */}
			<aside
				className={`fixed top-[80px] right-0 h-[calc(100%-80px)] w-72 max-w-full z-50 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${
					isMenuOpen ? "translate-x-0" : "translate-x-full"
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				<nav className="flex flex-col space-y-4 px-6 py-6">
					<a
						href="#about"
						className={getLinkClass("about")}
						onClick={handleSectionNav("about")}
					>
						About
					</a>
					<a
						href="#experience"
						className={getLinkClass("experience")}
						onClick={handleSectionNav("experience")}
					>
						Experience
					</a>
					<a
						href="#projects"
						className={getLinkClass("projects")}
						onClick={handleSectionNav("projects")}
					>
						Projects
					</a>
					<a
						href="#contact"
						className={getLinkClass("contact")}
						onClick={handleSectionNav("contact")}
					>
						Contact
					</a>
				</nav>
			</aside>
		</>
	);
};

export default Header;
