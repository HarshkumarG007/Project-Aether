export const PERSONA = {
  name: "Harsh Kumar Gupta",
  title: "Applied AI/ML Engineer",
  tagline: "Building Intelligent Systems That Work Beyond the Demo.",
  bio: "I'm Harsh Kumar Gupta, an Applied AI/ML Engineer interested in the engineering behind intelligent systems. My work spans machine learning, recommendation architectures, LLM applications, retrieval systems, evaluation frameworks, and local-first AI infrastructure.",
  location: "Varanasi, Uttar Pradesh, India",
  availability: "Open to opportunities — India, Remote, Relocation",
  email: "hrslsha007@gmail.com",
  links: {
    github: "https://github.com/HarshkumarG007",
    linkedin: "https://www.linkedin.com/in/harshkumarg/",
    credly: "https://www.credly.com/users/harshkumarg",
    hackerrank: "https://www.hackerrank.com/profile/HarshkumarG"
  },
  experience: [
    {
      role: "AI & Robotics Specialist",
      company: "Arque Technologies",
      period: "March 2026 – Present",
      location: "Kathmandu, Bhaktapur, Nepal",
      type: "Full-time",
      highlights: [
        "Designing and delivering Python, AI, and robotics learning experiences",
        "Working with Raspberry Pi, Arduino, and ESP32 platforms",
        "Conducting computational thinking and AI training programs",
        "Faculty training workshops and engineering team mentorship",
        "Mentored 11 students across 4 teams for Codeavour 7.0 Regionals",
        "Teams achieved 1st place (Elementary Robo Pup) and nationals qualification (Junior Robo Soccer League)"
      ]
    },
    {
      role: "AI Trainer",
      company: "Arque Technologies",
      period: "March 2025 – March 2026",
      location: "Fatehpur, Uttar Pradesh, India",
      type: "Full-time",
      highlights: [
        "Reconfigured and upgraded a 30-PC educational computer laboratory",
        "Built LAN using Cat6 cabling and network equipment",
        "Configured server for CBSE SAFAL assessment",
        "Assembled 10 PCs and upgraded system infrastructure",
        "Delivered AI education and technical mentorship programs"
      ]
    },
    {
      role: "AI, ML & Data Science Intern",
      company: "IBM SkillsBuild — PBEL Virtual Internship",
      period: "2024 (Six-month program)",
      location: "Virtual",
      type: "Internship",
      highlights: [
        "Built NOVELia: emotion-aware conversational book recommendation chatbot using IBM Watsonx Assistant",
        "Hosted application via GitHub Pages",
        "Worked on supervised learning, unsupervised learning, NLP preprocessing, and model evaluation"
      ]
    }
  ],
  education: [
    { degree: "Master of Computer Applications (MCA)", institution: "Kashi Institute of Technology, Varanasi", period: "2023–2025", grade: "CGPA: 7.56/10" },
    { degree: "Master of Arts (MA)", institution: "Jain Vishva Bharati Institute", period: "Sep 2023 – Nov 2025", focus: "Yoga, Science of Living, Psychology" },
    { degree: "Bachelor of Science (BSc)", institution: "Jagatpur P.G. College, Varanasi", period: "2019–2022", focus: "Mathematics, Physics, Chemistry" },
    { degree: "Diploma in Pharmacy", institution: "Board of Technical Education, Uttar Pradesh", period: "2022–2025", grade: "63.5%" },
    { degree: "Diploma in Yoga and Naturopathy", institution: "Mahayogi Gorakhnath Maharishi Patanjali Yog Sansthan", period: "2018–2019", focus: "Yoga and Naturopathy" }
  ],
  certifications: [
    { name: "Google Advanced Data Analytics", issuer: "Google", category: "Data Analytics", relevant: true },
    { name: "Google AI Essentials", issuer: "Google", category: "AI/ML", relevant: true },
    { name: "Google IT Automation with Python", issuer: "Google", category: "Programming", relevant: true },
    { name: "Google Data Analytics", issuer: "Google", category: "Data Analytics", relevant: true },
    { name: "Google Business Intelligence", issuer: "Google", category: "Data Analytics", relevant: true },
    { name: "Google Cybersecurity Professional Certificate", issuer: "Google", category: "Security", relevant: false },
    { name: "Google Digital Marketing and E-commerce", issuer: "Google", category: "Marketing", relevant: false },
    { name: "Google Project Management", issuer: "Google", category: "Management", relevant: false },
    { name: "Google Prompting Essentials", issuer: "Google", category: "AI/ML", relevant: true },
    { name: "Google UX Design", issuer: "Google", category: "Design", relevant: false },
    { name: "AI-Enabled Applications for Customer Service", issuer: "IBM SkillsBuild", category: "AI/ML", relevant: true },
    { name: "IBM SkillsBuild Faculty", issuer: "IBM SkillsBuild", category: "Education", relevant: false },
    { name: "Unsupervised Learning Methods", issuer: "IBM SkillsBuild", category: "AI/ML", relevant: true },
    { name: "Natural Language Processing", issuer: "IBM SkillsBuild", category: "AI/ML", relevant: true },
    { name: "Supervised Learning Methods", issuer: "IBM SkillsBuild", category: "AI/ML", relevant: true },
    { name: "Data Analytics for Machine Learning", issuer: "IBM SkillsBuild", category: "AI/ML", relevant: true },
    { name: "Getting Started with Generative AI", issuer: "IBM SkillsBuild", category: "AI/ML", relevant: true },
    { name: "AI Fundamentals", issuer: "IBM SkillsBuild", category: "AI/ML", relevant: true },
    { name: "LLM for Young Developers: Foundational Course", issuer: "Various", category: "AI/ML", relevant: true },
    { name: "Yuva AI for All", issuer: "Various", category: "AI/ML", relevant: true }
  ],
  engineeringNotes: [
    {
      id: "two-stage-recsys",
      title: "Why Recommendation Systems Need Separate Retrieval and Ranking Stages",
      status: "published",
      date: "November 2026",
      readTime: "4 min read",
      tags: ["recommendation-systems", "applied-ml"],
      summary: "A practical breakdown of the two-stage funnel architecture in modern recommendation systems, separating candidate retrieval latency constraints from complex pairwise ranking features.",
      sections: [
        {
          heading: "The Latency vs. Expressiveness Dilemma",
          body: "When designing recommendation systems for catalogues with 50,000+ items (such as MovieLens 25M with 62K items), a single unified model creates an intractable engineering contradiction: real-time user-facing latency must stay under 10ms, but evaluating complex, candidate-aware interaction features across 60,000 items on every request is computationally impossible."
        },
        {
          heading: "Stage 1: Candidate Generation (Retrieval)",
          body: "The candidate generation stage reduces the search space from tens of thousands of items down to a manageable candidate pool (typically Top-100). By utilizing a PyTorch Two-Tower architecture, item embeddings can be precomputed and indexed offline into FAISS (Approximate Nearest Neighbors). At inference time, only the user tower computes an embedding in real time, achieving sub-2ms retrieval latency."
        },
        {
          heading: "Stage 2: Precision Ranking (Scoring)",
          body: "Once the candidate pool is reduced to 100 items, we can afford a substantially more expressive model. We employ an XGBoost pairwise Learning-to-Rank (LTR) model with candidate-aware tabular features (e.g., historical user rating distributions, temporal interaction recency, cross-feature interactions). This stage runs in approximately 3ms, bringing total end-to-end latency to ~5.27ms."
        },
        {
          heading: "Diversity & Exploration",
          body: "A pure ranking model will often over-index on identical genres or popular titles. To combat homogenization, Maximal Marginal Relevance (MMR) is applied to ensure catalogue diversity, complemented by an epsilon-greedy exploration strategy to balance exploitation with discovery."
        }
      ]
    },
    {
      id: "hard-negatives",
      title: "Solving Sample Selection Bias with Hard-Negative Mining",
      status: "published",
      date: "November 2026",
      readTime: "3 min read",
      tags: ["applied-ml", "training"],
      summary: "Why uniform random negative sampling fails in recommendation architectures and how mining hard negatives from FAISS nearest neighbors enforces precise decision boundaries.",
      sections: [
        {
          heading: "The Flaw of Random Negative Sampling",
          body: "In implicit feedback datasets, unobserved interactions are typically sampled randomly as negatives. However, a randomly chosen movie from a 62K catalogue is almost certainly irrelevant. The model easily separates a user who loves sci-fi from a random 1940s documentary, learning superficial decision boundaries without ever learning fine-grained preferences."
        },
        {
          heading: "Hard-Negative Mining Mechanics",
          body: "Hard negatives are items that the retrieval model considers very similar (high vector dot product) but which the user did not actually interact with or rate positively. By sourcing hard negatives from FAISS top candidates during training, the loss function penalizes false positives in the critical boundary region, dramatically improving HitRate@100 on held-out evaluation sets."
        }
      ]
    },
    { id: "local-rag-eval", title: "Building Local RAG Evaluation Systems Under Hardware Constraints", status: "idea", tags: ["generative-ai", "llm-rag"] },
    { id: "ai-reliability", title: "Why AI Reliability Requires More Than Prompt Engineering", status: "idea", tags: ["generative-ai", "ai-infrastructure"] },
    { id: "privacy-first-ai", title: "Building Privacy-Oriented Local-First AI Applications", status: "idea", tags: ["privacy-security"] },
    { id: "uncertainty-risk", title: "Understanding Uncertainty in Risk Prediction Systems", status: "idea", tags: ["statistical-modeling"] }
  ]
};
