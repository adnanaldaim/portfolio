export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    title: "Senior Software Engineer | Technical Lead",
    company: "Systems Limited | PartnerLinq",
    period: "June 2023 - Present",
    description: [
      "Developed enterprise-grade SaaS platforms using .NET 8.0, Angular, and ABP Framework with multi-cloud architecture",
      "Architected and implemented single codebase solutions supporting both Azure and GCP cloud platforms concurrently",
      "Designed cross-cloud database strategies using CosmosDB (Azure) and MongoDB (GCP) with synchronized data models",
      "Implemented Azure Functions and Google Cloud Functions for serverless computing across hybrid cloud environments",
      "Integrated Azure Service Bus and Google Pub/Sub for distributed messaging in multi-cloud microservices architecture",
      "Led full-stack development with technologies like CosmosDB, PostgreSQL, and Entity Framework across cloud providers",
      "Applied Domain-Driven Design (DDD) principles and SOLID architecture patterns in multi-cloud deployments",
      "Lead a team of 5+ developers, establishing development standards and mentoring junior team members",
      "Facilitate agile ceremonies and coordinate between stakeholders, designers, and development teams"
    ]
  },
  {
    title: "Senior .NET Developer (Remote)",
    company: "DecisionTree Technologies, Canada",
    period: "June 2023 - June 2024",
    description: [
      "Developed HigherU AI-powered education platform using .NET 8.0, ABP Framework, and Azure OpenAI integration",
      "Built Clientele Portal SaaS solution with multi-tenancy, social logins, and PostgreSQL database optimization",
      "Implemented Paris Deliver logistics platform with Razor Pages, ABP Framework, and desktop application integration",
      "Integrated Speech Studio and Avatar Streaming services for interactive AI-driven educational experiences",
      "Architected background job processing systems and real-time notification services for enterprise clients",
      "Led migration from legacy systems to modern .NET 8.0 architecture with improved performance and scalability",
      "Collaborated with US-based product teams to implement business requirements in agile development cycles",
      "Optimized Azure Cloud Services deployment, reducing hosting costs by 30% through resource optimization"
    ]
  },
  {
    title: "Senior Software Engineer",
    company: "Techverx",
    period: "November 2021 - June 2023",
    description: [
      "Developed The Shop food industry ERP system using .NET 7.0 with microservices architecture and Docker containerization",
      "Built HedgeFund-MSCI financial platform with ASP.NET Core, SignalR real-time updates, and PostgreSQL database",
      "Implemented Data Sync Module using SignalR, RabbitMQ, MongoDB, and Background Workers for real-time data synchronization",
      "Architected gRPC communication between microservices and established Single Sign-On (SSO) integration",
      "Built multitenant solutions with background job processing and automated notifications system",
      "Established Jenkins CI/CD pipelines for automated deployment and continuous integration",
      "Created data seeders, loaders, and simulators for efficient database population and testing",
      "Enhanced system performance through query optimization and caching strategies"
    ]
  },
  {
    title: "Full Stack Web Developer",
    company: "Highbit Technologies",
    period: "January 2018 - October 2021",
    description: [
      "Led development of QuickMeal food delivery platform with .NET Core RESTful APIs, JWT authentication, and Azure deployment",
      "Integrated payment gateways (Stripe, JazzCash), push notifications, and social login functionalities",
      "Built HRMS internal portal with role-based access control and comprehensive employee management features",
      "Developed ERP Green RESTful APIs for enterprise resource planning with SQL database optimization",
      "Implemented real-time features using SignalR and Redis caching for high-performance applications",
      "Created CSV and PDF reporting modules with data export functionality",
      "Managed full application lifecycle from requirements gathering to deployment and maintenance"
    ]
  },
  {
    title: "Associate Software Engineer",
    company: "Cricingif",
    period: "2019 - 2020",
    description: [
      "Developed Cricingif cricket predictions platform using .NET Core 2.2 Web APIs with Redis caching and SQL optimization",
      "Built RESTful APIs with npoco ORM for efficient database operations and data modeling",
      "Implemented real-time score updates and prediction algorithms for cricket matches",
      "Optimized application performance through Redis caching strategies and database query optimization",
      "Created responsive frontend interfaces with modern JavaScript frameworks",
      "Managed deployment and monitoring of production applications",
      "Collaborated with data analysts to implement prediction models and statistical algorithms",
      "Developed data visualization dashboards for match statistics and player performance analytics"
    ]
  }
];