/**
 * Portfolio content: projects, skills, and assistant responses.
 * Update project links here; App.tsx renders this data in the Projects and Skills popups.
 */
export const siteContent = {
  name: 'Kenny Richardson',
  shortName: 'KR',
  role: 'AI Developer · Full-stack Builder',
  eyebrow: 'AI PORTFOLIO',
  headlineLead: 'Kenny',
  headlineAccent: 'Richardson',
  tagline: 'I BUILD REAL-WORLD APPLICATIONS USING AI,',
  taglineSecondLine: '',
  intro: 'I’m a computer science student focused on practical AI, machine learning, and full-stack product development. I like turning ambitious ideas into useful software, from local LLM experiments to polished web applications.',
  location: 'India',
  availability: 'Open to opportunities',
  email: 'kennykrichardson@gmail.com',
  github: 'https://github.com/kennykrichardson',
  linkedin: 'https://linkedin.com/in/kennykrichardson',
  portfolio: 'https://kennykrichardson.onrender.com',
  resumeUrl: '/kennykrichardson-resume.pdf',
  philosophy: ['BUILD', 'LEARN', 'IMPROVE', 'REPEAT'],
  skills: [
    { category: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'Java', 'Rust', 'SQL', 'HTML5', 'CSS3', 'Kotlin', 'Swift'] },
    { category: 'Frontend', items: ['React', 'TailwindCSS', 'Framer Motion', 'GSAP', 'Three.js', 'React Three Fiber', 'Vite', 'Recharts', 'PWA'] },
    { category: 'Backend', items: ['Python', 'Node.js', 'Express', 'FastAPI', 'REST APIs', 'Mesa/Solara', 'API Design', 'Middleware', 'BLOB API'] },
    { category: 'AI / ML', items: ['Deep Learning', 'Fine-Tuning', 'Database-Generation', 'NLP', 'Machine Learning', 'LLMs', 'Huggingface', 'Embeddings', 'Jupyter Notebook', 'OCR', 'Transformers.js', 'Prompt Engineering', 'Vector Databases', 'Semantic Search', 'Local AI', 'Inference Pipelines'] },
    { category: 'Databases & Systems', items: ['Electron', 'SQLite', 'LanceDB', 'PostgreSQl', 'Firebase', 'Git', 'GitHub', 'MongoDB'] },
    { category: 'Tools & Shipping', items: ['VS Code', 'Thunder Client', 'Render', 'Vercel', 'Netlify', 'Cloudfare', 'npm', 'pnpm', 'CI/CD'] },
  ],
  projects: [
    {
      name: 'Orzyn AI',
      category: 'AI / DEVELOPER INTELLIGENCE',
      description: 'An AI-powered GitHub intelligence platform that helps developers explore repository activity and make project information easier to understand.',
      stack: ['React', 'AI', 'GitHub API', 'Analytics'],
      repo: 'https://github.com/kennykrichardson/orzyn-ai-m2.0',
      live: 'https://orzyn.onrender.com',
    },
    {
      name: 'Lexyra AI',
      category: 'AI / WRITING ASSISTANT',
      description: 'An AI writing assistant designed to transform rough drafts into clear, polished, professional writing through a focused writing experience.',
      stack: ['Python', 'AI inference API', 'React', 'TypeScript'],
      repo: 'https://github.com/kennykrichardson/lexyra-ai-writing-assistant',
      live: 'https://lexyra.onrender.com',
    },
    {
      name: 'Regenesis AI',
      category: 'AI / DEVELOPER WORKFLOW',
      description: 'An AI-powered GitHub prompt reconstructor built to help developers recover useful context and turn repository information into better prompts.',
      stack: ['Python', 'AI', 'GitHub API', 'TypeScript'],
      repo: 'https://github.com/kennykrichardson/regenesis-ai',
      live: 'https://regenesis-ai.onrender.com',
    },
    {
      name: 'Nyxora AI',
      category: 'LOCAL LLM / GENERATIVE AI',
      description: 'A fine-tuned LLM-powered world generator exploring local language models and generative storytelling.',
      stack: ['Python', 'Local LLM', 'PyTorch', 'React'],
      repo: 'https://github.com/kennykrichardson/nyxora-ai-world-generator',
    },
    {
      name: 'Quartly',
      category: 'AI / PERSONAL FINANCE',
      description: 'A modern finance dashboard project combining a polished interface with financial insights and data visualisation.',
      stack: ['React', 'Charts', 'PDF', 'Finance'],
      repo: 'https://github.com/kennykrichardson/quartly-finance-tracker',
      live: 'https://quartly.onrender.com',
    },
    {
      name: 'FlashText OCR',
      category: 'OCR / DOCUMENT INTELLIGENCE',
      description: 'A browser-based OCR application that extracts text from images using Tesseract.js.',
      stack: ['Tesseract.js', 'OCR', 'TypeScript'],
      repo: 'https://github.com/kennykrichardson/flashtext-ocr',
      live: 'https://flashtext-ocr.vercel.app',
    },
    {
      name: 'Fluid Deck AI',
      category: 'LOCAL AI / DOCUMENT AUTOMATION',
      description: 'A local AI parser for PowerPoint slides, exploring ways to make presentation content easier to process and work with.',
      stack: ['AI parser', 'PowerPoint', 'Local processing', 'Automation'],
      repo: 'https://github.com/kennykrichardson/fluid-deck-ai',
    },
    {
      name: 'EchoDrive',
      category: 'LOCAL AI / PERSONAL KNOWLEDGE',
      description: 'A desktop second-brain concept for working with files, using local data storage and vector search foundations.',
      stack: ['Electron', 'SQLite', 'LanceDB', 'Local AI'],
      repo: 'https://github.com/kennykrichardson',
    },
  ],
  chatbot: {
    greeting: 'Hey! I’m the portfolio assistant. Ask me about Kenny’s AI projects, technical toolkit, or how he approaches building useful software.',
    fallback: 'I don’t have a specific answer for that yet. Try asking about the AI projects, a particular project name, skills, local LLMs, or contact links.',
    quickPrompts: [
      'What AI projects have you built?',
      'Which project uses a local LLM?',
      'Walk me through your tech stack',
      'What makes Orzyn AI useful?',
      'Tell me about yourself...',
      'How can I contact you?',
    ],
    answers: [
      {
        keywords: ['project', 'projects', 'built', 'build', 'work', 'portfolio'],
        answer: 'My AI-related projects include Orzyn AI for GitHub intelligence, Lexyra AI for writing enhancement, Regenesis AI for GitHub prompt reconstruction, Nyxora AI for local-LLM world generation, Quartly for finance insights, FlashFrame OCR for text extraction, Fluid Deck AI for local PowerPoint parsing, and EchoDrive for local-AI file exploration. The Projects popup includes the available GitHub and live links.',
      },
      {
        keywords: ['orzyn', 'github intelligence', 'repository'],
        answer: 'Orzyn AI is an AI-powered GitHub intelligence platform. It combines a React interface with GitHub data and analytics. GitHub: https://github.com/kennykrichardson/orzyn-ai-m2.0 · Live: https://orzyn.onrender.com',
      },
      {
        keywords: ['lexyra', 'writing', 'writer'],
        answer: 'Lexyra AI is a writing assistant designed to turn rough text into clear, polished, professional language. It uses a React and TypeScript frontend with a Python-based AI integration. GitHub: https://github.com/kennykrichardson/lexyra-ai-writing-assistant · Live: https://lexyra.onrender.com',
      },
      {
        keywords: ['regenesis', 'reconstruct', 'prompt'],
        answer: 'Regenesis AI is an AI-powered GitHub prompt reconstructor for developer workflows. GitHub: https://github.com/kennykrichardson/regenesis-ai · Live: https://regenesis-ai.onrender.com',
      },
      {
        keywords: ['nyxora', 'local llm', 'fine-tuning', 'fine tuning', 'world generator'],
        answer: 'Nyxora AI explores a fine-tuned, locally run language model for generative world-building. Its stack includes Python, a local LLM, PyTorch, and React. GitHub: https://github.com/kennykrichardson/nyxora-ai-world-generator. A live deployment is not listed yet.',
      },
      {
        keywords: ['quartly', 'finance', 'financial'],
        answer: 'Quartly is a finance dashboard project focused on presenting financial information and insights through a modern interface. GitHub: https://github.com/kennykrichardson/quartly-finance-tracker · Live: https://quartly.onrender.com',
      },
      {
        keywords: ['flashframe', 'flashtext', 'ocr', 'extract text'],
        answer: 'FlashFrame OCR extracts text from images using Tesseract.js. GitHub: https://github.com/kennykrichardson/flashtext-ocr · Live: https://flashtext-ocr.vercel.app',
      },
      {
        keywords: ['fluid deck', 'powerpoint', 'slides', 'presentation'],
        answer: 'Fluid Deck AI is a local AI parser for PowerPoint slide content, with an emphasis on local processing and automation. GitHub: https://github.com/kennykrichardson/fluid-deck-ai. A live deployment is not listed yet.',
      },
      {
        keywords: ['echodrive', 'second brain', 'vector database', 'lancedb'],
        answer: 'EchoDrive is a desktop second-brain project for working with files, built around Electron, SQLite, LanceDB, and local AI ideas. The project source currently points to my GitHub profile: https://github.com/kennykrichardson.',
      },
      {
        keywords: ['skill', 'skills', 'stack', 'technology', 'technologies', 'tech', 'language', 'tools'],
        answer: 'My listed toolkit spans 11 languages and web fundamentals, frontend frameworks and motion/3D tools, Python and Node.js backend development, AI/ML and LLM workflows, OCR, embeddings, vector databases, semantic search, local AI, databases, and shipping tools. Open the Skills popup for the full list.',
      },
      {
        keywords: ['ai', 'machine learning', 'llm', 'model', 'inference'],
        answer: 'I’m interested in practical AI: local LLMs, fine-tuning, prompt engineering, NLP, OCR, embeddings, semantic search, vector databases, and inference pipelines. I like connecting those techniques to products people can actually use.',
      },
      {
        keywords: ['hobby', 'hobbies', 'fun', 'outside coding', 'anime', 'interests'],
        answer: 'Outside coding, I enjoy anime, Marvel & DC comics, and great storytelling, exploring AI tools, and turning new ideas into amazing projects.',
      },
      {
        keywords: ['about', 'who', 'kenny', 'background', 'intro'],
        answer: 'I’m Kenny Richardson, a computer science student focused on AI and machine learning, frontend engineering, and full-stack product development. I’m open to freelancing opportunities and building serious projects with other developers. I like turning ambitious ideas into useful software, from local LLM experiments to polished web applications.',
      },
      {
        keywords: ['contact', 'email', 'reach', 'hire', 'opportunity', 'linkedin', 'github','touch'],
        answer: 'You can find my work on GitHub at https://github.com/kennykrichardson and connect with me on LinkedIn at https://linkedin.com/in/kennykrichardson, or email me at kennykrichardson@gmail.com. I’m open to opportunities and collaborations, so feel free to reach out!',
      },
      {
        keywords: ['resume', 'cv'],
        answer: 'You can find my resume if you click the button on the right corner of the page. It includes my education, skills, and project experience.',
      },
    ],
  },
} as const;
