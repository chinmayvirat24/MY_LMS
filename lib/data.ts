import type {
  Course,
  DashboardMetric,
  PlatformFeature,
  PurchaseRecord,
  Section,
  SubscriptionPlan,
  Testimonial,
  UserProfile
} from "@/lib/types";
import {
  buildCourseArtwork,
  buildEmbedUrl,
  buildYoutubeThumbnail,
  extractYoutubeId,
  percentage,
  slugify
} from "@/lib/utils";

const linkSets = {
  python: `
https://www.youtube.com/watch?v=rfscVS0vtbw
https://www.youtube.com/watch?v=kqtD5dpn9C8
https://www.youtube.com/watch?v=_uQrJ0TkZlc
https://www.youtube.com/watch?v=ix9cRaBkVe0
https://www.youtube.com/watch?v=eWRfhZUzrAc
https://www.youtube.com/watch?v=YYXdXT2l-Gg
https://www.youtube.com/watch?v=HGOBQPFzWKo
https://www.youtube.com/watch?v=DLn3jOsNRVE
https://www.youtube.com/watch?v=Z1Yd7upQsXY
https://www.youtube.com/watch?v=0Lt9w-BxKFQ
https://www.youtube.com/watch?v=nsbmZ6v5vN0
https://www.youtube.com/watch?v=8DvywoWv6fI
https://www.youtube.com/watch?v=7lmCu8wz8ro
https://www.youtube.com/watch?v=VchuKL44s6E
https://www.youtube.com/watch?v=E8NijUYfyus
https://www.youtube.com/watch?v=xdv9A0mS9y8
https://www.youtube.com/watch?v=G2q6OqjXvIY
https://www.youtube.com/watch?v=4F2m91eKmts
https://www.youtube.com/watch?v=7eh4d6sabA0
https://www.youtube.com/watch?v=Qk0zUZW-U_M
`,
  java: `
https://www.youtube.com/watch?v=eIrMbAQSU34
https://www.youtube.com/watch?v=A74TOX803D0
https://www.youtube.com/watch?v=grEKMHGYyns
https://www.youtube.com/watch?v=UmnCZ7-9yDY
https://www.youtube.com/watch?v=GoXwIVyNvX0
https://www.youtube.com/watch?v=H2Y8XCe7F9E
https://www.youtube.com/watch?v=TBWX97e1E9g
https://www.youtube.com/watch?v=l9AzO1FMgM8
https://www.youtube.com/watch?v=5YzjG4JzS0k
https://www.youtube.com/watch?v=FvOqQnR1y9k
https://www.youtube.com/watch?v=U7L2s6D7h8g
https://www.youtube.com/watch?v=5pY3N0f0M0g
https://www.youtube.com/watch?v=9oJ5Zk1z5mM
https://www.youtube.com/watch?v=Yv_2lJ6p3u8
https://www.youtube.com/watch?v=3Yh8k5F5j0I
https://www.youtube.com/watch?v=3pA4Ff5rX3c
https://www.youtube.com/watch?v=9L7zKX9r3qE
https://www.youtube.com/watch?v=5L8gM2kX2sA
https://www.youtube.com/watch?v=8Z4g1tY3b4E
https://www.youtube.com/watch?v=2Q1b6F2n3hA
`,
  sql: `
https://www.youtube.com/watch?v=HXV3zeQKqGY
https://www.youtube.com/watch?v=OT1RErkfLNQ
https://www.youtube.com/watch?v=7S_tz1z_5bA
https://www.youtube.com/watch?v=-fW2X7fh7Yg
https://www.youtube.com/watch?v=9Pzj7Aj25lw
https://www.youtube.com/watch?v=F1rjM3JrR8Q
https://www.youtube.com/watch?v=5hzZtqCNQKk
https://www.youtube.com/watch?v=O7vP6T4P8d8
https://www.youtube.com/watch?v=2A0H9a6bJ5E
https://www.youtube.com/watch?v=0e0lTz6d8Kk
https://www.youtube.com/watch?v=Yz2bX2f0p3g
https://www.youtube.com/watch?v=6K5d0E8j8M4
https://www.youtube.com/watch?v=9L7h3K0p2Jg
https://www.youtube.com/watch?v=5P6f0L2p9X8
https://www.youtube.com/watch?v=2Q1d7P3m4X5
https://www.youtube.com/watch?v=7X8n9K0p1J2
https://www.youtube.com/watch?v=3Y4K5M6P7Q8
https://www.youtube.com/watch?v=8K2J5L9X3M1
`,
  web: `
https://www.youtube.com/watch?v=G3e-cpL7ofc
https://www.youtube.com/watch?v=pQN-pnXPaVg
https://www.youtube.com/watch?v=a_iQb1lnAEQ
https://www.youtube.com/watch?v=3JluqTojuME
https://www.youtube.com/watch?v=UB1O30fR-EE
https://www.youtube.com/watch?v=1Rs2ND1ryYc
https://www.youtube.com/watch?v=PkZNo7MFNFg
https://www.youtube.com/watch?v=1PnVor36_40
https://www.youtube.com/watch?v=Q33KBiDriJY
https://www.youtube.com/watch?v=5fb2aPlgoys
https://www.youtube.com/watch?v=Y3nZ1n9Hh1M
https://www.youtube.com/watch?v=0ik6X4DJKCc
https://www.youtube.com/watch?v=2Ji-clqUYnA
https://www.youtube.com/watch?v=Ukg_U3CnJWI
https://www.youtube.com/watch?v=3gYpY2l9V9Y
https://www.youtube.com/watch?v=KJgsSFOSQv0
https://www.youtube.com/watch?v=FazgJVnrVuI
https://www.youtube.com/watch?v=tbC5k2Y3r8g
https://www.youtube.com/watch?v=7r4xVDI2vho
`,
  react: `
https://www.youtube.com/watch?v=x4rFhThSX04
https://www.youtube.com/watch?v=bMknfKXIFA8
https://www.youtube.com/watch?v=Ke90Tje7VS0
https://www.youtube.com/watch?v=SqcY0GlETPk
https://www.youtube.com/watch?v=w7ejDZ8SWv8
https://www.youtube.com/watch?v=DLX62G4lc44
https://www.youtube.com/watch?v=9j8g9N8h5uM
https://www.youtube.com/watch?v=2LhoCfjm8R4
https://www.youtube.com/watch?v=V1p33H5aXzY
https://www.youtube.com/watch?v=Z1Yd7upQsXY
https://www.youtube.com/watch?v=Q33KBiDriJY
https://www.youtube.com/watch?v=5fb2aPlgoys
https://www.youtube.com/watch?v=Y3nZ1n9Hh1M
https://www.youtube.com/watch?v=0ik6X4DJKCc
https://www.youtube.com/watch?v=2Ji-clqUYnA
https://www.youtube.com/watch?v=Ukg_U3CnJWI
https://www.youtube.com/watch?v=3gYpY2l9V9Y
https://www.youtube.com/watch?v=KJgsSFOSQv0
https://www.youtube.com/watch?v=FazgJVnrVuI
https://www.youtube.com/watch?v=tbC5k2Y3r8g
`,
  node: `
https://www.youtube.com/watch?v=Oe421EPjeBE
https://www.youtube.com/watch?v=RLtyhwFtXQA
https://www.youtube.com/watch?v=f2EqECiTBL8
https://www.youtube.com/watch?v=TlB_eWDSMt4
https://www.youtube.com/watch?v=1NrHkjlWVhM
https://www.youtube.com/watch?v=7nafaH9SddU
https://www.youtube.com/watch?v=F5mRW0jo-U4
https://www.youtube.com/watch?v=NoWRq5Q2bX8
https://www.youtube.com/watch?v=7zXz0mY8eYg
https://www.youtube.com/watch?v=0oXYLzuucwE
https://www.youtube.com/watch?v=6P7M3K2L1J0
https://www.youtube.com/watch?v=8K2J5L9X3M1
https://www.youtube.com/watch?v=3Y4K5M6P7Q8
https://www.youtube.com/watch?v=7X8n9K0p1J2
https://www.youtube.com/watch?v=2Q1d7P3m4X5
https://www.youtube.com/watch?v=5P6f0L2p9X8
https://www.youtube.com/watch?v=9L7h3K0p2Jg
https://www.youtube.com/watch?v=6K5d0E8j8M4
https://www.youtube.com/watch?v=Yz2bX2f0p3g
https://www.youtube.com/watch?v=0e0lTz6d8Kk
`
} as const;

const videoPools = Object.fromEntries(
  Object.entries(linkSets).map(([key, value]) => [
    key,
    value
      .trim()
      .split("\n")
      .map((link) => link.trim())
      .filter(Boolean)
  ])
) as Record<keyof typeof linkSets, string[]>;

const trackTemplates = {
  python: {
    sectionTitles: ["Python Basics", "Working with Data", "Automation Projects"],
    lessonTitles: [
      "Getting Started with Python",
      "Variables, Input, and Control Flow",
      "Functions, Lists, and Dictionaries",
      "Files, Errors, and Debugging",
      "Object-Oriented Python Basics",
      "Working with APIs and JSON",
      "Scripting Repetitive Tasks",
      "Mini Project Walkthrough",
      "Capstone Review and Next Steps"
    ],
    learn: [
      "Set up a confident Python workflow from day one.",
      "Build real scripts that automate repetitive work.",
      "Read and manipulate data with practical examples.",
      "Ship a mini project with clean, reusable code."
    ],
    tags: ["Python", "Automation", "Projects", "Problem Solving"]
  },
  java: {
    sectionTitles: ["Java Foundations", "Core OOP", "Production Patterns"],
    lessonTitles: [
      "Java Environment and Syntax",
      "Variables, Loops, and Methods",
      "Classes, Objects, and Constructors",
      "Collections and Generics",
      "Exception Handling in Practice",
      "Streams and Functional Style",
      "REST and Service Layer Thinking",
      "Testing and Refactoring",
      "Career-Focused Final Project"
    ],
    learn: [
      "Understand Java syntax without getting lost in ceremony.",
      "Use OOP patterns that map to real backend codebases.",
      "Refactor code into clean, maintainable services.",
      "Prepare for interviews with practical exercises."
    ],
    tags: ["Java", "OOP", "Backend", "Interviews"]
  },
  sql: {
    sectionTitles: ["Query Essentials", "Joining and Modeling", "Optimization"],
    lessonTitles: [
      "Tables, Rows, and Query Basics",
      "Filtering, Sorting, and Aggregation",
      "Grouping, CASE, and Window Functions",
      "Joins and Relational Thinking",
      "Schema Design and Normalization",
      "Subqueries and Common Table Expressions",
      "Indexes and Performance Patterns",
      "Analytics Queries in Practice",
      "Capstone Data Project"
    ],
    learn: [
      "Write SQL that is readable, fast, and business-ready.",
      "Model tables that support scalable applications.",
      "Use joins and window functions with confidence.",
      "Tune queries for dashboards, products, and reporting."
    ],
    tags: ["SQL", "Analytics", "Databases", "Optimization"]
  },
  web: {
    sectionTitles: ["Web Fundamentals", "Modern Frontend", "Shipping UX"],
    lessonTitles: [
      "The Web Platform and Browser Basics",
      "Semantic HTML Structures",
      "Responsive CSS Layouts",
      "Modern JavaScript Essentials",
      "Async UI and Data Fetching",
      "Forms, Validation, and Accessibility",
      "Design Systems and Reuse",
      "Performance for Real Users",
      "Project Launch Checklist"
    ],
    learn: [
      "Create polished layouts that feel modern and readable.",
      "Improve accessibility and UX without adding clutter.",
      "Organize frontend code into scalable systems.",
      "Ship responsive projects with fast load times."
    ],
    tags: ["Web", "HTML", "CSS", "JavaScript"]
  },
  react: {
    sectionTitles: ["React Essentials", "State and Patterns", "App Experiences"],
    lessonTitles: [
      "Thinking in Components",
      "Props, State, and Events",
      "Rendering Lists and Forms",
      "Hooks for Real Projects",
      "Routing and App Flows",
      "Async Data and Suspense Thinking",
      "Composition and UI Patterns",
      "Performance and User Experience",
      "Portfolio-Ready React Build"
    ],
    learn: [
      "Build React interfaces that feel calm and production-ready.",
      "Model state flows without over-engineering.",
      "Use modern patterns for routing, forms, and data.",
      "Improve performance with practical architecture choices."
    ],
    tags: ["React", "UI", "Hooks", "Frontend"]
  },
  node: {
    sectionTitles: ["Node Foundations", "APIs and Services", "Deployment and Security"],
    lessonTitles: [
      "Node Runtime and Tooling",
      "Modules, Packages, and Scripts",
      "Express Routing Basics",
      "Validation and Error Handling",
      "Auth, Sessions, and Tokens",
      "Database Patterns and Queries",
      "Queues, Caching, and Scale",
      "Security Hardening Checklist",
      "Deployment Workflow"
    ],
    learn: [
      "Build clean backend services with production structure.",
      "Handle auth, validation, and persistence correctly.",
      "Think about security, observability, and scale.",
      "Deploy services with confidence and fewer surprises."
    ],
    tags: ["Node.js", "Express", "APIs", "Security"]
  }
} as const;

const trackAccents = {
  python: { from: "#dbeafe", to: "#6366f1", glow: "rgba(99, 102, 241, 0.18)" },
  java: { from: "#fef3c7", to: "#f97316", glow: "rgba(249, 115, 22, 0.18)" },
  sql: { from: "#cffafe", to: "#0ea5e9", glow: "rgba(14, 165, 233, 0.18)" },
  web: { from: "#dcfce7", to: "#16a34a", glow: "rgba(22, 163, 74, 0.18)" },
  react: { from: "#e0f2fe", to: "#06b6d4", glow: "rgba(6, 182, 212, 0.18)" },
  node: { from: "#ede9fe", to: "#7c3aed", glow: "rgba(124, 58, 237, 0.18)" }
} as const;

const courseBlueprints = [
  {
    title: "Python Foundations Bootcamp",
    track: "python",
    category: "Programming",
    level: "Beginner",
    accessType: "free",
    price: null,
    instructor: "Aarav Mehta",
    shortDescription: "A calm, structured introduction to Python for absolute beginners.",
    description:
      "Learn Python with a lesson flow that moves from basics to practical scripting. The course balances clarity, real examples, and project-based confidence."
  },
  {
    title: "Python Automation Lab",
    track: "python",
    category: "Automation",
    level: "Intermediate",
    accessType: "paid",
    price: 1499,
    instructor: "Riya Sharma",
    shortDescription: "Turn repetitive work into scripts, dashboards, and helpful tools.",
    description:
      "Move beyond syntax and start building automations that save time. This course focuses on files, APIs, and practical productivity projects."
  },
  {
    title: "Python for Data Analysis",
    track: "python",
    category: "Data",
    level: "Intermediate",
    accessType: "subscription",
    price: 499,
    instructor: "Kabir Nanda",
    shortDescription: "Use Python to inspect, shape, and communicate data with clarity.",
    description:
      "Explore Python workflows for data tasks, from reading datasets to summarizing insights and building repeatable notebooks and scripts."
  },
  {
    title: "Advanced Python Patterns",
    track: "python",
    category: "Programming",
    level: "Advanced",
    accessType: "paid",
    price: 2299,
    instructor: "Naina Rao",
    shortDescription: "Refactor your Python thinking with stronger architecture and reuse.",
    description:
      "Dive into cleaner abstractions, reusable patterns, and better engineering choices that make larger Python codebases easier to maintain."
  },
  {
    title: "Java Essentials",
    track: "java",
    category: "Programming",
    level: "Beginner",
    accessType: "free",
    price: null,
    instructor: "Ishaan Verma",
    shortDescription: "A clear path into Java syntax, logic, and object-oriented thinking.",
    description:
      "Build confidence with Java step by step, using structured examples that connect fundamentals to real application development."
  },
  {
    title: "Java OOP Workshop",
    track: "java",
    category: "Programming",
    level: "Intermediate",
    accessType: "paid",
    price: 1599,
    instructor: "Meera Kulkarni",
    shortDescription: "Internalize classes, objects, and code organization through practice.",
    description:
      "Focus on maintainable Java design with guided exercises around objects, inheritance, generics, and common architectural habits."
  },
  {
    title: "Java Backend APIs",
    track: "java",
    category: "Backend",
    level: "Intermediate",
    accessType: "subscription",
    price: 499,
    instructor: "Rohan Iyer",
    shortDescription: "Bridge Java fundamentals into backend service design and API logic.",
    description:
      "Learn how Java maps into service layers, APIs, error handling, and testing strategies used in production environments."
  },
  {
    title: "Advanced Java Collections",
    track: "java",
    category: "Backend",
    level: "Advanced",
    accessType: "paid",
    price: 2399,
    instructor: "Sana Deshpande",
    shortDescription: "Level up with collections, streams, and high-signal interview practice.",
    description:
      "Sharpen your Java fluency with advanced collection usage, stream transformations, and project-style coding exercises."
  },
  {
    title: "SQL Foundations",
    track: "sql",
    category: "Databases",
    level: "Beginner",
    accessType: "free",
    price: null,
    instructor: "Aditi Kapoor",
    shortDescription: "Write useful SQL from day one, not just toy examples.",
    description:
      "Start with core queries, sorting, grouping, and joins, then learn the mental model behind relational databases and data exploration."
  },
  {
    title: "SQL for Data Analysis",
    track: "sql",
    category: "Analytics",
    level: "Intermediate",
    accessType: "paid",
    price: 1299,
    instructor: "Dev Malhotra",
    shortDescription: "Move from simple queries to analyst-ready dashboards and reports.",
    description:
      "Use SQL to answer business questions, structure analytics queries, and create reliable reporting logic for product and ops teams."
  },
  {
    title: "Database Design Studio",
    track: "sql",
    category: "Databases",
    level: "Intermediate",
    accessType: "subscription",
    price: 499,
    instructor: "Tanvi Sethi",
    shortDescription: "Model clean, scalable relational systems with confidence.",
    description:
      "Understand relationships, normalization, query tradeoffs, and schema planning through practical design walkthroughs."
  },
  {
    title: "SQL Performance Tuning",
    track: "sql",
    category: "Optimization",
    level: "Advanced",
    accessType: "paid",
    price: 1999,
    instructor: "Harsh Bansal",
    shortDescription: "Diagnose slow queries and make data-heavy apps feel fast.",
    description:
      "Learn how indexes, execution thinking, and performance debugging improve SQL reliability at scale."
  },
  {
    title: "Web Development Basics",
    track: "web",
    category: "Frontend",
    level: "Beginner",
    accessType: "free",
    price: null,
    instructor: "Pooja Arora",
    shortDescription: "Build solid HTML, CSS, and JavaScript habits with a modern eye.",
    description:
      "This course keeps the web platform approachable while teaching responsive layouts, semantics, and polished user experience basics."
  },
  {
    title: "HTML CSS Systems",
    track: "web",
    category: "Design Systems",
    level: "Intermediate",
    accessType: "paid",
    price: 1499,
    instructor: "Karan Joshi",
    shortDescription: "Create elegant reusable UI foundations without visual clutter.",
    description:
      "Focus on layout systems, design tokens, component consistency, and accessible styling that scales beyond one-off pages."
  },
  {
    title: "Modern JavaScript Projects",
    track: "web",
    category: "JavaScript",
    level: "Intermediate",
    accessType: "subscription",
    price: 499,
    instructor: "Neha Bhatia",
    shortDescription: "Learn JavaScript by shipping product-style interactions and flows.",
    description:
      "Improve how you reason about the browser, state, async interactions, and maintainable frontend architecture."
  },
  {
    title: "Frontend Performance Sprint",
    track: "web",
    category: "Performance",
    level: "Advanced",
    accessType: "paid",
    price: 2199,
    instructor: "Vikram Chawla",
    shortDescription: "Make interfaces faster, lighter, and more responsive to real users.",
    description:
      "Study rendering cost, loading states, design tradeoffs, and frontend optimization patterns that make apps feel premium."
  },
  {
    title: "React Starter Kit",
    track: "react",
    category: "React",
    level: "Beginner",
    accessType: "free",
    price: null,
    instructor: "Ananya Sen",
    shortDescription: "Understand React in a way that feels intuitive, not overwhelming.",
    description:
      "Learn components, props, state, and event flows through a calm progression that leads quickly into useful project work."
  },
  {
    title: "React UI Patterns",
    track: "react",
    category: "React",
    level: "Intermediate",
    accessType: "paid",
    price: 1699,
    instructor: "Rahul Chopra",
    shortDescription: "Design reusable UI systems and cleaner state patterns in React.",
    description:
      "Explore composition, app-level structure, and thoughtful component boundaries for larger product interfaces."
  },
  {
    title: "React Project Studio",
    track: "react",
    category: "Frontend",
    level: "Intermediate",
    accessType: "subscription",
    price: 499,
    instructor: "Simran Kaur",
    shortDescription: "Build portfolio-ready React experiences with modern polish.",
    description:
      "Work through projects that feel closer to real product teams, including forms, data flows, page transitions, and UX detail."
  },
  {
    title: "React Performance and Routing",
    track: "react",
    category: "Performance",
    level: "Advanced",
    accessType: "paid",
    price: 2299,
    instructor: "Yash Bedi",
    shortDescription: "Improve routing, rendering, and perceived speed across larger apps.",
    description:
      "This course turns React performance into a design and architecture skill rather than a bag of isolated tricks."
  },
  {
    title: "Node API Fundamentals",
    track: "node",
    category: "Backend",
    level: "Beginner",
    accessType: "free",
    price: null,
    instructor: "Arjun Patel",
    shortDescription: "Go from simple scripts to your first structured APIs in Node.",
    description:
      "Learn the Node runtime, Express basics, routing, validation, and service design in a grounded, beginner-friendly way."
  },
  {
    title: "Express Services Masterclass",
    track: "node",
    category: "Backend",
    level: "Intermediate",
    accessType: "paid",
    price: 1799,
    instructor: "Priya Menon",
    shortDescription: "Build maintainable Express services with real production concerns.",
    description:
      "Layer routes, controllers, validation, auth, and persistence into an app structure you can confidently extend."
  },
  {
    title: "Backend Architecture with Node",
    track: "node",
    category: "Architecture",
    level: "Intermediate",
    accessType: "subscription",
    price: 499,
    instructor: "Kshitij Anand",
    shortDescription: "Think in systems: services, queues, scale, and reliability.",
    description:
      "Understand what makes backend platforms resilient by learning caching, async workflows, and architecture patterns."
  },
  {
    title: "Secure Deployment for Node Apps",
    track: "node",
    category: "Security",
    level: "Advanced",
    accessType: "paid",
    price: 2499,
    instructor: "Ira Mukherjee",
    shortDescription: "Ship Node services with stronger security and operational confidence.",
    description:
      "Study deployment, secrets, hardening, observability, and production checklists that reduce surprises after launch."
  }
] as const;

function buildSections(track: keyof typeof trackTemplates, slug: string, offset: number): Section[] {
  const template = trackTemplates[track];
  const urls = videoPools[track];

  const lessons = template.lessonTitles.map((title, index) => {
    const url = urls[(offset + index) % urls.length];
    const videoId = extractYoutubeId(url);

    return {
      id: `${slug}-lesson-${index + 1}`,
      title,
      description: `${title} is taught with a concise, practical flow so learners can move from concept to application quickly.`,
      youtubeUrl: url,
      videoId,
      embedUrl: buildEmbedUrl(videoId),
      thumbnailUrl: buildYoutubeThumbnail(videoId),
      position: index + 1,
      durationMinutes: 12 + ((offset + index) % 6) * 4
    };
  });

  return template.sectionTitles.map((title, sectionIndex) => ({
    id: `${slug}-section-${sectionIndex + 1}`,
    title,
    order: sectionIndex + 1,
    lessons: lessons.slice(sectionIndex * 3, sectionIndex * 3 + 3)
  }));
}

export const courses: Course[] = courseBlueprints.map((blueprint, index) => {
  const slug = slugify(blueprint.title);
  const sections = buildSections(blueprint.track, slug, index * 2);
  const accent = trackAccents[blueprint.track];
  const lessonsCount = sections.reduce((sum, section) => sum + section.lessons.length, 0);
  const durationMinutes = sections
    .flatMap((section) => section.lessons)
    .reduce((sum, lesson) => sum + lesson.durationMinutes, 0);

  return {
    id: `course-${index + 1}`,
    slug,
    title: blueprint.title,
    shortDescription: blueprint.shortDescription,
    description: blueprint.description,
    category: blueprint.category,
    level: blueprint.level,
    accessType: blueprint.accessType,
    price: blueprint.price,
    instructor: blueprint.instructor,
    rating: Number((4.6 + (index % 4) * 0.1).toFixed(1)),
    reviewCount: 180 + index * 41,
    students: 1800 + index * 370,
    lessonsCount,
    durationMinutes,
    thumbnailUrl: buildCourseArtwork(
      blueprint.title,
      blueprint.category,
      accent.from,
      accent.to
    ),
    accent,
    sections,
    whatYouWillLearn: [...trackTemplates[blueprint.track].learn],
    tags: [...trackTemplates[blueprint.track].tags]
  };
});

const bySlug = Object.fromEntries(courses.map((course) => [course.slug, course]));

const completedLessonIds = [
  ...courses[0].sections.flatMap((section) => section.lessons).slice(0, 5).map((lesson) => lesson.id),
  ...courses[4].sections.flatMap((section) => section.lessons).slice(0, 4).map((lesson) => lesson.id),
  ...courses[8].sections.flatMap((section) => section.lessons).slice(0, 3).map((lesson) => lesson.id),
  ...courses[16].sections.flatMap((section) => section.lessons).slice(0, 4).map((lesson) => lesson.id),
  ...courses[20].sections.flatMap((section) => section.lessons).slice(0, 2).map((lesson) => lesson.id)
];

export const userProfile: UserProfile = {
  name: "Ananya Raj",
  email: "ananya@sikho.app",
  role: "Product Design Student",
  initials: "AR",
  bio: "Learning frontend engineering and backend architecture with a focus on structured practice and calm, consistent progress.",
  enrolledCourseSlugs: [
    courses[0].slug,
    courses[4].slug,
    courses[8].slug,
    courses[12].slug,
    courses[16].slug,
    courses[20].slug
  ],
  purchasedCourseSlugs: [courses[1].slug, courses[13].slug, courses[17].slug, courses[21].slug],
  savedCourseSlugs: [courses[2].slug, courses[7].slug, courses[10].slug, courses[19].slug],
  completedLessonIds,
  recentlyWatchedLessonIds: [
    courses[16].sections[1].lessons[0].id,
    courses[0].sections[1].lessons[2].id,
    courses[21].sections[0].lessons[1].id
  ],
  activeSubscription: true,
  hoursLearned: 86,
  certificates: 4
};

export const platformFeatures: PlatformFeature[] = [
  {
    title: "Structured Video Learning",
    description:
      "Short, sequenced lessons keep learners moving through a clear path instead of getting lost in content overload.",
    metric: "216 lessons"
  },
  {
    title: "AI Tutor Assistant",
    description:
      "Ask for clarification, summaries, or practice prompts right beside the lesson without leaving the player.",
    metric: "24/7 support"
  },
  {
    title: "Progress Tracking",
    description:
      "Every course maps completion, continue-learning state, and streak-friendly milestones in a lightweight dashboard.",
    metric: "6 active tracks"
  },
  {
    title: "Smart Recommendations",
    description:
      "Relevant next courses, categories, and subscription picks keep students focused on what matters most next.",
    metric: "Personalized feed"
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Rohit Jain",
    role: "Frontend Learner",
    quote:
      "Sikho feels calm and premium. I always know what to watch next, and the AI tutor saves me when I get stuck."
  },
  {
    name: "Nikita Sharma",
    role: "Working Professional",
    quote:
      "The video player, lesson order, and progress cues make learning feel organized instead of overwhelming."
  },
  {
    name: "Faizan Khan",
    role: "Backend Engineer",
    quote:
      "It has the polish of a course marketplace, but the learning flow feels much more focused and practical."
  }
];

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Enrolled Courses",
    value: `${userProfile.enrolledCourseSlugs.length + userProfile.purchasedCourseSlugs.length}`,
    hint: "Across free and premium tracks"
  },
  {
    label: "Lessons Completed",
    value: `${userProfile.completedLessonIds.length}`,
    hint: "Tracked across your active syllabus"
  },
  {
    label: "Hours Learned",
    value: `${userProfile.hoursLearned}h`,
    hint: "Measured from watched lesson duration"
  },
  {
    label: "Certificates",
    value: `${userProfile.certificates}`,
    hint: "Issued from completed pathways"
  }
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    name: "Sikho Plus",
    price: 499,
    billingLabel: "per month",
    seats: "For solo learners",
    perks: [
      "Unlock all subscription courses",
      "AI tutor and summaries",
      "Smart recommendations",
      "Priority certificate review"
    ]
  },
  {
    name: "Sikho Pro",
    price: 3499,
    billingLabel: "per year",
    seats: "Best for long-term upskilling",
    perks: [
      "All Plus features",
      "Premium career projects",
      "Advanced learning analytics",
      "Priority support"
    ]
  }
];

export const purchaseHistory: PurchaseRecord[] = [
  {
    id: "ord-101",
    label: "Python Automation Lab",
    amount: 1499,
    status: "Paid",
    date: "March 18, 2026"
  },
  {
    id: "ord-102",
    label: "HTML CSS Systems",
    amount: 1499,
    status: "Paid",
    date: "March 12, 2026"
  },
  {
    id: "ord-103",
    label: "React UI Patterns",
    amount: 1699,
    status: "Paid",
    date: "March 2, 2026"
  },
  {
    id: "ord-104",
    label: "Express Services Masterclass",
    amount: 1799,
    status: "Pending",
    date: "March 21, 2026"
  }
];

export const courseCategories = [
  "All",
  ...Array.from(new Set(courses.map((course) => course.category)))
];

export function getCourseBySlug(slug: string) {
  return bySlug[slug];
}

export function getFlatLessons(course: Course) {
  return course.sections.flatMap((section) => section.lessons);
}

export function hasCourseAccess(course: Course) {
  if (course.accessType === "free") {
    return userProfile.enrolledCourseSlugs.includes(course.slug);
  }

  if (course.accessType === "paid") {
    return userProfile.purchasedCourseSlugs.includes(course.slug);
  }

  return userProfile.activeSubscription;
}

export function getCourseProgress(course: Course) {
  const lessonIds = getFlatLessons(course).map((lesson) => lesson.id);
  const completedCount = lessonIds.filter((id) =>
    userProfile.completedLessonIds.includes(id)
  ).length;

  return {
    completedCount,
    percent: percentage(completedCount, lessonIds.length)
  };
}

export function getCourseLessonsWithProgress(course: Course) {
  const accessible = hasCourseAccess(course);
  const flattened = getFlatLessons(course);

  return course.sections.map((section) => ({
    ...section,
    lessons: section.lessons.map((lesson) => {
      const index = flattened.findIndex((item) => item.id === lesson.id);
      const isCompleted = userProfile.completedLessonIds.includes(lesson.id);
      const previousLesson = index > 0 ? flattened[index - 1] : null;
      const previousCompleted = previousLesson
        ? userProfile.completedLessonIds.includes(previousLesson.id)
        : true;

      return {
        ...lesson,
        isCompleted,
        isLocked: !accessible || (!isCompleted && !previousCompleted)
      };
    })
  }));
}

export function getLessonContext(course: Course, lessonId?: string) {
  const lessons = getFlatLessons(course);
  const matchedIndex = lessons.findIndex((lesson) => lesson.id === lessonId);
  const lessonIndex = matchedIndex === -1 ? 0 : matchedIndex;
  const activeLesson = lessons[lessonIndex];
  const previousLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;

  return {
    activeLesson,
    previousLesson,
    nextLesson
  };
}

export function getPopularCourses() {
  return courses.slice(0, 6);
}

export function getFeaturedCourses() {
  return courses.slice(0, 8);
}

export function getContinueLearningCourses() {
  return courses.filter((course) => {
    const progress = getCourseProgress(course);
    return progress.completedCount > 0 && progress.percent < 100;
  });
}

export function getSavedCourses() {
  return userProfile.savedCourseSlugs
    .map((slug) => getCourseBySlug(slug))
    .filter(Boolean) as Course[];
}

export function getPurchasedCourses() {
  return userProfile.purchasedCourseSlugs
    .map((slug) => getCourseBySlug(slug))
    .filter(Boolean) as Course[];
}

export function getRecommendedCourses() {
  return courses
    .filter(
      (course) =>
        !userProfile.completedLessonIds.some((lessonId) =>
          lessonId.startsWith(course.slug)
        )
    )
    .slice(6, 12);
}

export function getRecentCourses() {
  const lessonToCourse = new Map<string, Course>();

  courses.forEach((course) => {
    getFlatLessons(course).forEach((lesson) => {
      lessonToCourse.set(lesson.id, course);
    });
  });

  return userProfile.recentlyWatchedLessonIds
    .map((lessonId) => lessonToCourse.get(lessonId))
    .filter(Boolean) as Course[];
}
