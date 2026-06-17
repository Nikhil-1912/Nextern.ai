import { Domain, Task } from "../types";

export const domains: Domain[] = [
  {
    id: "ai-engineer",
    title: "AI Engineering",
    description: "Learn to build intelligent applications using modern AI tools and APIs.",
    category: "Artificial Intelligence",
    icon: "Brain",
    difficulty: "Beginner",
    tasks: [
      {
        id: "ai_task_1",
        title: "Milestone 1: Prompts & Chatbots",
        description: "Write 3 different prompts (Creative, Analytical, Technical) and test them on an AI model like ChatGPT or Gemini.",
        requirements: [
          "Document your prompts and the AI's responses.",
          "Write a small reflection on how changing the prompt changes the output."
        ],
        instructions: [
          "Open an AI chat interface.",
          "Experiment with different prompt styles.",
          "Copy the results into a document."
        ],
        sampleOutput: "A PDF document with 3 prompts, 3 responses, and a short reflection.",
        resources: ["Prompt Engineering Guide"],
        submissionFormat: "PDF Document",
        deadlineDays: 7
      },
      {
        id: "ai_task_2",
        title: "Milestone 2: AI Tools Research",
        description: "Research 3 different AI tools and describe how they can be used to solve real-world problems.",
        requirements: [
          "Select 3 tools (e.g., Midjourney, GitHub Copilot, Grammarly).",
          "Write 1 paragraph for each explaining its use case."
        ],
        instructions: [
          "Search for modern AI tools.",
          "Identify their core features.",
          "Document your findings."
        ],
        sampleOutput: "A document detailing 3 tools and their use cases.",
        resources: ["AI Directory websites"],
        submissionFormat: "PDF or Word Document",
        deadlineDays: 14
      }
    ]
  },
  {
    id: "java-dev",
    title: "Java Development",
    description: "Learn core Java concepts and build robust backend systems.",
    category: "Software Engineering",
    icon: "Coffee",
    difficulty: "Beginner",
    tasks: [
      {
        id: "java_task_1",
        title: "Milestone 1: Basic Calculator",
        description: "Write a simple Java program that takes two numbers and an operator (+, -, *, /) and outputs the result.",
        requirements: [
          "Use Scanner for input.",
          "Use a switch statement or if-else for the operators.",
          "Handle division by zero."
        ],
        instructions: [
          "Install Java.",
          "Write the code in a single file like Calculator.java.",
          "Compile and run the program."
        ],
        sampleOutput: "The result of 5 + 3 is 8.",
        resources: ["Java Basics Tutorial"],
        submissionFormat: "Java Source File (.java)",
        deadlineDays: 7
      },
      {
        id: "java_task_2",
        title: "Milestone 2: Array Operations",
        description: "Write a Java program that defines an array of integers, prints all the numbers, and calculates their sum and average.",
        requirements: [
          "Initialize an array with at least 5 numbers.",
          "Use a loop to iterate through the array.",
          "Print the numbers, sum, and average."
        ],
        instructions: [
          "Set up your Java class.",
          "Write the array and loop logic.",
          "Print the results clearly."
        ],
        sampleOutput: "Numbers: 1, 2, 3, 4, 5. Sum: 15. Average: 3.",
        resources: ["Java Arrays Guide"],
        submissionFormat: "Java Source File (.java)",
        deadlineDays: 14
      }
    ]
  },
  {
    id: "web-dev",
    title: "Web Development",
    description: "Master frontend web development basics to build responsive sites.",
    category: "Web Development",
    icon: "Monitor",
    difficulty: "Beginner",
    tasks: [
      {
        id: "web_task_1",
        title: "Milestone 1: HTML Basics",
        description: "Create a simple web page with a heading, a paragraph, and an image.",
        requirements: [
          "Include an h1 element.",
          "Include a p element.",
          "Include an img element with an alt attribute."
        ],
        instructions: [
          "Create an index.html file.",
          "Add the required HTML tags.",
          "Open it in your browser to verify."
        ],
        sampleOutput: "A basic HTML page rendered in the browser.",
        resources: ["HTML Basics Tutorial"],
        submissionFormat: "HTML File (.html)",
        deadlineDays: 7
      },
      {
        id: "web_task_2",
        title: "Milestone 2: CSS Styling",
        description: "Add basic CSS styling to your HTML page to change colors and fonts.",
        requirements: [
          "Change the background color.",
          "Change the text color.",
          "Change the font family."
        ],
        instructions: [
          "Add a style block or external CSS file.",
          "Apply the styles to your HTML elements."
        ],
        sampleOutput: "A styled web page.",
        resources: ["CSS Basics Tutorial"],
        submissionFormat: "HTML/CSS Files",
        deadlineDays: 14
      }
    ]
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Learn to analyze and visualize data using Python.",
    category: "Data Science",
    icon: "BarChart3",
    difficulty: "Beginner",
    tasks: [
      {
        id: "ds_task_1",
        title: "Milestone 1: Excel Data Entry",
        description: "Create a simple spreadsheet recording the ages of 10 people and calculate the average.",
        requirements: [
          "List 10 names and ages.",
          "Use the AVERAGE function."
        ],
        instructions: [
          "Open Excel or Google Sheets.",
          "Enter your data.",
          "Calculate the average."
        ],
        sampleOutput: "A spreadsheet with data and an average calculation.",
        resources: ["Excel Basics"],
        submissionFormat: "Spreadsheet File (.xlsx)",
        deadlineDays: 7
      },
      {
        id: "ds_task_2",
        title: "Milestone 2: Basic Chart",
        description: "Create a bar chart visualizing the data from your spreadsheet.",
        requirements: [
          "Create a bar chart.",
          "Add titles and axis labels."
        ],
        instructions: [
          "Select your data in the spreadsheet.",
          "Insert a bar chart.",
          "Format it clearly."
        ],
        sampleOutput: "A spreadsheet containing a labeled bar chart.",
        resources: ["Creating Charts in Excel"],
        submissionFormat: "Spreadsheet File (.xlsx) or PDF",
        deadlineDays: 14
      }
    ]
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    description: "Understand network fundamentals and security auditing concepts.",
    category: "Information Technology",
    icon: "ShieldAlert",
    difficulty: "Beginner",
    tasks: [
      {
        id: "cyber_task_1",
        title: "Milestone 1: Password Analysis",
        description: "Evaluate the strength of 5 common passwords and explain why they are weak.",
        requirements: [
          "List 5 common weak passwords (e.g., 'password123').",
          "Explain the flaws (e.g., dictionary word, too short)."
        ],
        instructions: [
          "Research common weak passwords.",
          "Write a documented analysis."
        ],
        sampleOutput: "A document analyzing 5 weak passwords.",
        resources: ["Password Security Best Practices"],
        submissionFormat: "PDF Document",
        deadlineDays: 7
      },
      {
        id: "cyber_task_2",
        title: "Milestone 2: Phishing Email Identification",
        description: "Find an example of a phishing email online and highlight 3 suspicious elements.",
        requirements: [
          "Provide a screenshot or transcript of a phishing email.",
          "Point out 3 red flags (e.g., suspicious sender address, urgent tone)."
        ],
        instructions: [
          "Search for phishing email examples.",
          "Annotate the image or list the red flags in a document."
        ],
        sampleOutput: "A document with an annotated phishing email.",
        resources: ["How to Identify Phishing"],
        submissionFormat: "PDF Document",
        deadlineDays: 14
      }
    ]
  },
  {
    id: "mobile-dev",
    title: "Mobile App Development",
    description: "Build native mobile experiences for iOS and Android.",
    category: "Mobile Development",
    icon: "Smartphone",
    difficulty: "Beginner",
    tasks: [
      {
        id: "mobile_task_1",
        title: "Milestone 1: UI Sketch",
        description: "Sketch a simple 2-screen mobile app idea on paper.",
        requirements: [
          "Draw the main screen.",
          "Draw the details screen.",
          "Label the buttons."
        ],
        instructions: [
          "Take a pen and paper.",
          "Draw the layouts.",
          "Take a photo of your sketch."
        ],
        sampleOutput: "A photo of 2 mobile screens sketched on paper.",
        resources: ["Mobile Layout Basics"],
        submissionFormat: "Image File (.jpg/.png)",
        deadlineDays: 7
      },
      {
        id: "mobile_task_2",
        title: "Milestone 2: App Analysis",
        description: "Analyze a popular mobile app and explain its navigation flow.",
        requirements: [
          "Choose an app (e.g., Instagram, Spotify).",
          "Describe how you navigate from the home screen to the settings screen."
        ],
        instructions: [
          "Open your chosen app.",
          "Map out the steps to reach settings.",
          "Write it down clearly."
        ],
        sampleOutput: "A text document outlining the navigation flow.",
        resources: ["Mobile App Navigation Models"],
        submissionFormat: "PDF Document",
        deadlineDays: 14
      }
    ]
  },
  {
    id: "cloud-dev",
    title: "Cloud Computing",
    description: "Deploy, scale, and manage infrastructure on modern cloud platforms.",
    category: "Cloud Architecture",
    icon: "Cloud",
    difficulty: "Beginner",
    tasks: [
      {
        id: "cloud_task_1",
        title: "Milestone 1: Cloud Concepts",
        description: "Define three major cloud service models: IaaS, PaaS, and SaaS.",
        requirements: [
          "Define IaaS and give an example.",
          "Define PaaS and give an example.",
          "Define SaaS and give an example."
        ],
        instructions: [
          "Research the cloud service models.",
          "Write a simple explanation for each in your own words."
        ],
        sampleOutput: "A document detailing IaaS, PaaS, and SaaS with examples.",
        resources: ["Cloud Computing Basics"],
        submissionFormat: "PDF Document",
        deadlineDays: 7
      },
      {
        id: "cloud_task_2",
        title: "Milestone 2: Cloud Storage Setup",
        description: "Create a free cloud storage account (Google Drive, Dropbox, OneDrive) and upload a picture.",
        requirements: [
          "Create a folder named 'Internship'.",
          "Upload a picture.",
          "Generate a shareable link."
        ],
        instructions: [
          "Sign up or log in to a cloud storage provider.",
          "Follow the steps to upload.",
          "Copy the shareable link."
        ],
        sampleOutput: "A document containing the shareable link.",
        resources: ["Cloud Storage Guides"],
        submissionFormat: "PDF Document",
        deadlineDays: 14
      }
    ]
  },
  {
    id: "uiux-design",
    title: "UI/UX Design",
    description: "Master modern user interface and experience design principles.",
    category: "Design",
    icon: "PenTool",
    difficulty: "Beginner",
    tasks: [
      {
        id: "ux_task_1",
        title: "Milestone 1: Color Palette",
        description: "Select a color palette for a hypothetical coffee shop app.",
        requirements: [
          "Choose a primary color, secondary color, and background color.",
          "Explain why you chose them."
        ],
        instructions: [
          "Use a tool like Coolors.co or Adobe Color.",
          "Pick 3 colors.",
          "Write a brief explanation."
        ],
        sampleOutput: "A document with the hex codes and explanation.",
        resources: ["Color Theory Basics"],
        submissionFormat: "PDF Document",
        deadlineDays: 7
      },
      {
        id: "ux_task_2",
        title: "Milestone 2: App Critique",
        description: "Look at the homepage of your favorite app and identify 1 thing you like and 1 thing you would improve.",
        requirements: [
          "Name the app.",
          "Describe 1 positive design aspect.",
          "Describe 1 area of improvement."
        ],
        instructions: [
          "Open your favorite app.",
          "Evaluate its visual design and ease of use.",
          "Document your findings."
        ],
        sampleOutput: "A document with your critique.",
        resources: ["UX Critique Methods"],
        submissionFormat: "PDF Document",
        deadlineDays: 14
      }
    ]
  }
];

export const mockSuccessStories = [
  {
    id: "s1",
    name: "Arjun Mehta",
    role: "Full Stack Engineer @ FinTech Corp",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
    quote: "Nextern's internship was amazing. The sequential tasks taught me production requirements and the automatically verified portfolio in my profile caught the recruiters' eyes instantly!",
    domain: "Web Development"
  },
  {
    id: "s2",
    name: "Ananya Sharma",
    role: "ML Specialist @ TechGiant",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    quote: "The rigor of the milestones and automated format checking pushed me to code clean solutions. My certificate was verified on-the-spot during my technical round.",
    domain: "AI Engineering"
  },
  {
    id: "s3",
    name: "Kabir Malhotra",
    role: "Security Analyst @ CyberNet",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    quote: "The cyber security modules gave me hands-on practical experience. The offer letter and verified grading card proved my skills directly to senior engineers.",
    domain: "Cyber Security"
  }
];

export const mockFAQs = [
  {
    question: "How does the Nextern sequential internship task model work?",
    answer: "Once you register and choose a domain, you immediately unlock Milestone 1. You must submit your workspace links or file packages into our system. Our automated evaluation validates your submission, and then Milestone 2 gets unlocked."
  },
  {
    question: "Are Nextern certificates and offer letters officially verified?",
    answer: "Yes. Every student receives a unique Certificate ID and QR Code. Recruiters or partners can scan the QR code or enter the ID in our verification portal to view the certified student's complete historical portfolio, AI scores, and direct files proof."
  },
  {
    question: "Do I have to pay anything to enroll in Nextern internships?",
    answer: "No. Nextern offers standard merit-based, project-driven internships completely free for talented students globally. We generate revenue from partner universities who track students, and recruiter partners who search premium candidates."
  },
  {
    question: "What happens after I complete all milestones?",
    answer: "Once all required milestones are approved by the evaluation engine, your internship is marked as 'Completed'. The platform will then automatically generate your verified Completion Certificate, which you can share on your LinkedIn profile."
  }
];
