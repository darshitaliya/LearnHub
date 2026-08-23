import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Order from '../models/Order.js';
import Progress from '../models/Progress.js';

const DB_FILE_PATH = path.resolve(process.cwd(), 'data', 'persistent_db.json');

function ensureDataDirExists() {
  const dir = path.dirname(DB_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function saveStateToFile() {
  try {
    ensureDataDirExists();
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(memoryStore, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving state to persistent_db.json:', err);
  }
}

export function loadStateFromFile() {
  try {
    ensureDataDirExists();
    if (fs.existsSync(DB_FILE_PATH)) {
      const fileData = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      if (fileData.trim()) {
        const parsed = JSON.parse(fileData);
        if (parsed && typeof parsed === 'object') {
          if (Array.isArray(parsed.users)) memoryStore.users = parsed.users;
          if (Array.isArray(parsed.courses)) memoryStore.courses = parsed.courses;
          if (Array.isArray(parsed.orders)) memoryStore.orders = parsed.orders;
          if (Array.isArray(parsed.enrollments)) memoryStore.enrollments = parsed.enrollments;
          if (parsed.progress) memoryStore.progress = parsed.progress;
          return true;
        }
      }
    }
  } catch (err) {
    console.error('Error loading state from persistent_db.json:', err);
  }
  return false;
}

export const memoryStore = {
  users: [
    {
      _id: 'usr_admin',
      id: 'usr_admin',
      name: 'System Admin',
      email: 'admin@learnhub.com',
      phone: '+91 98765 43210',
      password: bcrypt.hashSync('admin123', 10),
      role: 'admin',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC',
      enrolledCourses: ['ml301', 'cs201', 'web101'],
      wishlist: [],
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'usr_instructor',
      id: 'usr_instructor',
      name: 'Dr. Elena Rostova',
      email: 'elena@learnhub.com',
      phone: '+91 98765 43211',
      password: bcrypt.hashSync('instructor123', 10),
      role: 'instructor',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4',
      enrolledCourses: ['ml301'],
      wishlist: [],
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'usr_alex',
      id: 'usr_alex',
      name: 'Alex Morgan',
      email: 'alex@learnhub.com',
      phone: '+91 98765 43212',
      password: bcrypt.hashSync('student123', 10),
      role: 'student',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC',
      enrolledCourses: ['cs201', 'des102', 'ml301', 'web101'],
      wishlist: [],
      createdAt: new Date().toISOString(),
    },
  ],
  courses: [
  {
    "_id": "crs_web101",
    "id": "web101",
    "title": "React 18 & Modern Frontend Architecture",
    "subtitle": "Master Computer Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in React 18 & Modern Frontend Architecture. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Computer Science",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.6,
    "reviewsCount": 1200,
    "hours": 18,
    "lessonsCount": 20,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "React",
      "JavaScript",
      "CSS3",
      "Vite"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": true,
    "modules": [
      {
        "id": "web101_mod1",
        "title": "Module 1: Computer Science Foundations",
        "lessons": [
          {
            "id": "web101_les1",
            "title": "Introduction & Architecture Blueprint for React 18 & Modern Frontend Architecture",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "web101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "web101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "web101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_node201",
    "id": "node201",
    "title": "Node.js, Express & Microservices Architecture",
    "subtitle": "Master Computer Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Node.js, Express & Microservices Architecture. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Computer Science",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.7,
    "reviewsCount": 1540,
    "hours": 22,
    "lessonsCount": 25,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Node.js",
      "Express",
      "MongoDB",
      "REST API"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": true,
    "modules": [
      {
        "id": "node201_mod1",
        "title": "Module 1: Computer Science Foundations",
        "lessons": [
          {
            "id": "node201_les1",
            "title": "Introduction & Architecture Blueprint for Node.js, Express & Microservices Architecture",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=Oe421EPjeBE",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "node201_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=Oe421EPjeBE",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "node201_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "node201_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=Oe421EPjeBE",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_next301",
    "id": "next301",
    "title": "Next.js 14 Server Actions & Full-Stack Mastery",
    "subtitle": "Master Computer Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Next.js 14 Server Actions & Full-Stack Mastery. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Computer Science",
    "level": "Advanced",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.8,
    "reviewsCount": 1880,
    "hours": 26,
    "lessonsCount": 30,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": true,
    "modules": [
      {
        "id": "next301_mod1",
        "title": "Module 1: Computer Science Foundations",
        "lessons": [
          {
            "id": "next301_les1",
            "title": "Introduction & Architecture Blueprint for Next.js 14 Server Actions & Full-Stack Mastery",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=wm5gMKCOBGs",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "next301_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=wm5gMKCOBGs",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "next301_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "next301_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=wm5gMKCOBGs",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_py101",
    "id": "py101",
    "title": "Python 3 Programming: Zero to Hero",
    "subtitle": "Master Computer Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Python 3 Programming: Zero to Hero. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Computer Science",
    "level": "Beginner",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.9,
    "reviewsCount": 2220,
    "hours": 30,
    "lessonsCount": 35,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Python",
      "OOP",
      "Algorithms"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": true,
    "modules": [
      {
        "id": "py101_mod1",
        "title": "Module 1: Computer Science Foundations",
        "lessons": [
          {
            "id": "py101_les1",
            "title": "Introduction & Architecture Blueprint for Python 3 Programming",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "py101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "py101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "py101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_js202",
    "id": "js202",
    "title": "Modern JavaScript ES6+ & Asynchronous Patterns",
    "subtitle": "Master Computer Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Modern JavaScript ES6+ & Asynchronous Patterns. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Computer Science",
    "level": "Beginner",
    "price": 0,
    "originalPrice": 0,
    "rating": 5,
    "reviewsCount": 2560,
    "hours": 34,
    "lessonsCount": 40,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "JavaScript",
      "Async/Await",
      "ES6"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": true,
    "modules": [
      {
        "id": "js202_mod1",
        "title": "Module 1: Computer Science Foundations",
        "lessons": [
          {
            "id": "js202_les1",
            "title": "Introduction & Architecture Blueprint for Modern JavaScript ES6+ & Asynchronous Patterns",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=hdI2bqOjy3c",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "js202_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=hdI2bqOjy3c",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "js202_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "js202_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=hdI2bqOjy3c",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_cs201",
    "id": "cs201",
    "title": "Advanced Data Structures & Algorithms",
    "subtitle": "Master Computer Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Advanced Data Structures & Algorithms. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Computer Science",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.6,
    "reviewsCount": 2900,
    "hours": 38,
    "lessonsCount": 45,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "C++",
      "Java",
      "Python",
      "Algorithms"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1516116211223-47a12595a004?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": true,
    "modules": [
      {
        "id": "cs201_mod1",
        "title": "Module 1: Computer Science Foundations",
        "lessons": [
          {
            "id": "cs201_les1",
            "title": "Introduction & Architecture Blueprint for Advanced Data Structures & Algorithms",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "cs201_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "cs201_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "cs201_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_java101",
    "id": "java101",
    "title": "Java Enterprise Edition & Spring Boot Masterclass",
    "subtitle": "Master Computer Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Java Enterprise Edition & Spring Boot Masterclass. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Computer Science",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.7,
    "reviewsCount": 3240,
    "hours": 42,
    "lessonsCount": 50,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Java",
      "Spring Boot",
      "Hibernate"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "java101_mod1",
        "title": "Module 1: Computer Science Foundations",
        "lessons": [
          {
            "id": "java101_les1",
            "title": "Introduction & Architecture Blueprint for Java Enterprise Edition & Spring Boot Masterclass",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=vtPkZShrvXQ",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "java101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=vtPkZShrvXQ",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "java101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "java101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=vtPkZShrvXQ",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_cpp301",
    "id": "cpp301",
    "title": "C++ Systems Programming & Memory Optimization",
    "subtitle": "Master Computer Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in C++ Systems Programming & Memory Optimization. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Computer Science",
    "level": "Advanced",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.8,
    "reviewsCount": 3580,
    "hours": 46,
    "lessonsCount": 55,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "C++",
      "Pointers",
      "Memory Management"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "cpp301_mod1",
        "title": "Module 1: Computer Science Foundations",
        "lessons": [
          {
            "id": "cpp301_les1",
            "title": "Introduction & Architecture Blueprint for C++ Systems Programming & Memory Optimization",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "cpp301_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "cpp301_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "cpp301_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_flutter101",
    "id": "flutter101",
    "title": "Flutter & Dart Cross-Platform Mobile Apps",
    "subtitle": "Master Computer Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Flutter & Dart Cross-Platform Mobile Apps. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Computer Science",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.9,
    "reviewsCount": 3920,
    "hours": 50,
    "lessonsCount": 20,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Flutter",
      "Dart",
      "iOS",
      "Android"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "flutter101_mod1",
        "title": "Module 1: Computer Science Foundations",
        "lessons": [
          {
            "id": "flutter101_les1",
            "title": "Introduction & Architecture Blueprint for Flutter & Dart Cross-Platform Mobile Apps",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=VPvVD8t02U8",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "flutter101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=VPvVD8t02U8",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "flutter101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "flutter101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=VPvVD8t02U8",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_rn201",
    "id": "rn201",
    "title": "React Native & Expo App Development",
    "subtitle": "Master Computer Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in React Native & Expo App Development. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Computer Science",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 5,
    "reviewsCount": 4260,
    "hours": 54,
    "lessonsCount": 25,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "React Native",
      "Expo",
      "Mobile UI"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "rn201_mod1",
        "title": "Module 1: Computer Science Foundations",
        "lessons": [
          {
            "id": "rn201_les1",
            "title": "Introduction & Architecture Blueprint for React Native & Expo App Development",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=0-S5a0eXPoc",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "rn201_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=0-S5a0eXPoc",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "rn201_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "rn201_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=0-S5a0eXPoc",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_go101",
    "id": "go101",
    "title": "Go (Golang) High-Performance Backend Systems",
    "subtitle": "Master Computer Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Go (Golang) High-Performance Backend Systems. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Computer Science",
    "level": "Advanced",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.6,
    "reviewsCount": 4600,
    "hours": 18,
    "lessonsCount": 30,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Golang",
      "Concurrency",
      "gRPC"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "go101_mod1",
        "title": "Module 1: Computer Science Foundations",
        "lessons": [
          {
            "id": "go101_les1",
            "title": "Introduction & Architecture Blueprint for Go (Golang) High-Performance Backend Systems",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=YS4e4q9oBaU",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "go101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=YS4e4q9oBaU",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "go101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "go101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=YS4e4q9oBaU",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_rust301",
    "id": "rust301",
    "title": "Rust Systems Programming & Memory Safety",
    "subtitle": "Master Computer Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Rust Systems Programming & Memory Safety. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Computer Science",
    "level": "Advanced",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.7,
    "reviewsCount": 4940,
    "hours": 22,
    "lessonsCount": 35,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Rust",
      "Cargo",
      "WebAssembly"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "rust301_mod1",
        "title": "Module 1: Computer Science Foundations",
        "lessons": [
          {
            "id": "rust301_les1",
            "title": "Introduction & Architecture Blueprint for Rust Systems Programming & Memory Safety",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=zF34dRivLOw",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "rust301_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=zF34dRivLOw",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "rust301_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "rust301_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=zF34dRivLOw",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_sql101",
    "id": "sql101",
    "title": "SQL & Relational Database Design Masterclass",
    "subtitle": "Master Computer Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in SQL & Relational Database Design Masterclass. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Computer Science",
    "level": "Beginner",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.8,
    "reviewsCount": 5280,
    "hours": 26,
    "lessonsCount": 40,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "PostgreSQL",
      "MySQL",
      "SQL"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "sql101_mod1",
        "title": "Module 1: Computer Science Foundations",
        "lessons": [
          {
            "id": "sql101_les1",
            "title": "Introduction & Architecture Blueprint for SQL & Relational Database Design Masterclass",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "sql101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "sql101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "sql101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_gql201",
    "id": "gql201",
    "title": "GraphQL & Apollo Server Integration",
    "subtitle": "Master Computer Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in GraphQL & Apollo Server Integration. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Computer Science",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.9,
    "reviewsCount": 5620,
    "hours": 30,
    "lessonsCount": 45,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "GraphQL",
      "Apollo",
      "Node.js"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "gql201_mod1",
        "title": "Module 1: Computer Science Foundations",
        "lessons": [
          {
            "id": "gql201_les1",
            "title": "Introduction & Architecture Blueprint for GraphQL & Apollo Server Integration",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=eIQh0qcvfF4",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "gql201_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=eIQh0qcvfF4",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "gql201_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "gql201_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=eIQh0qcvfF4",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_ts101",
    "id": "ts101",
    "title": "TypeScript Pro: Type-Safe Applications",
    "subtitle": "Master Computer Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in TypeScript Pro: Type-Safe Applications. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Computer Science",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 5,
    "reviewsCount": 5960,
    "hours": 34,
    "lessonsCount": 50,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "TypeScript",
      "Generics",
      "React"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "ts101_mod1",
        "title": "Module 1: Computer Science Foundations",
        "lessons": [
          {
            "id": "ts101_les1",
            "title": "Introduction & Architecture Blueprint for TypeScript Pro",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=ahCwqrYpIto",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "ts101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=ahCwqrYpIto",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "ts101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "ts101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=ahCwqrYpIto",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_ml301",
    "id": "ml301",
    "title": "Advanced Machine Learning Architectures",
    "subtitle": "Master Data Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Advanced Machine Learning Architectures. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Data Science",
    "level": "Advanced",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.6,
    "reviewsCount": 6300,
    "hours": 38,
    "lessonsCount": 55,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Python",
      "PyTorch",
      "Transformers",
      "MLOps"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "ml301_mod1",
        "title": "Module 1: Data Science Foundations",
        "lessons": [
          {
            "id": "ml301_les1",
            "title": "Introduction & Architecture Blueprint for Advanced Machine Learning Architectures",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=vmEHCJofslg",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "ml301_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=vmEHCJofslg",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "ml301_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "ml301_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=vmEHCJofslg",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_ds101",
    "id": "ds101",
    "title": "Data Science Fundamentals with Pandas & NumPy",
    "subtitle": "Master Data Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Data Science Fundamentals with Pandas & NumPy. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Data Science",
    "level": "Beginner",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.7,
    "reviewsCount": 6640,
    "hours": 42,
    "lessonsCount": 20,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "ds101_mod1",
        "title": "Module 1: Data Science Foundations",
        "lessons": [
          {
            "id": "ds101_les1",
            "title": "Introduction & Architecture Blueprint for Data Science Fundamentals with Pandas & NumPy",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=vmEHCJofslg",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "ds101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=vmEHCJofslg",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "ds101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "ds101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=vmEHCJofslg",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_dl201",
    "id": "dl201",
    "title": "Deep Learning Specialization with TensorFlow",
    "subtitle": "Master Data Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Deep Learning Specialization with TensorFlow. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Data Science",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.8,
    "reviewsCount": 6980,
    "hours": 46,
    "lessonsCount": 25,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "TensorFlow",
      "Keras",
      "Neural Networks"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "dl201_mod1",
        "title": "Module 1: Data Science Foundations",
        "lessons": [
          {
            "id": "dl201_les1",
            "title": "Introduction & Architecture Blueprint for Deep Learning Specialization with TensorFlow",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=tPYj3N1ORhA",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "dl201_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=tPYj3N1ORhA",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "dl201_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "dl201_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=tPYj3N1ORhA",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_nlp301",
    "id": "nlp301",
    "title": "Natural Language Processing & Large Language Models",
    "subtitle": "Master Data Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Natural Language Processing & Large Language Models. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Data Science",
    "level": "Advanced",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.9,
    "reviewsCount": 7320,
    "hours": 50,
    "lessonsCount": 30,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "NLP",
      "BERT",
      "GPT",
      "HuggingFace"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "nlp301_mod1",
        "title": "Module 1: Data Science Foundations",
        "lessons": [
          {
            "id": "nlp301_les1",
            "title": "Introduction & Architecture Blueprint for Natural Language Processing & Large Language Models",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=zjkBMFhNj_g",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "nlp301_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=zjkBMFhNj_g",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "nlp301_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "nlp301_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=zjkBMFhNj_g",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_cv201",
    "id": "cv201",
    "title": "Computer Vision & OpenCV Image Processing",
    "subtitle": "Master Data Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Computer Vision & OpenCV Image Processing. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Data Science",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 5,
    "reviewsCount": 7660,
    "hours": 54,
    "lessonsCount": 35,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "OpenCV",
      "YOLO",
      "Computer Vision"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "cv201_mod1",
        "title": "Module 1: Data Science Foundations",
        "lessons": [
          {
            "id": "cv201_les1",
            "title": "Introduction & Architecture Blueprint for Computer Vision & OpenCV Image Processing",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=oXlwWbU8l2o",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "cv201_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=oXlwWbU8l2o",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "cv201_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "cv201_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=oXlwWbU8l2o",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_bi101",
    "id": "bi101",
    "title": "PowerBI & Tableau Data Visualization",
    "subtitle": "Master Data Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in PowerBI & Tableau Data Visualization. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Data Science",
    "level": "Beginner",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.6,
    "reviewsCount": 8000,
    "hours": 18,
    "lessonsCount": 40,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "PowerBI",
      "Tableau",
      "Analytics"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "bi101_mod1",
        "title": "Module 1: Data Science Foundations",
        "lessons": [
          {
            "id": "bi101_les1",
            "title": "Introduction & Architecture Blueprint for PowerBI & Tableau Data Visualization",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=3u7MQz1EyPY",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "bi101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=3u7MQz1EyPY",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "bi101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "bi101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=3u7MQz1EyPY",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_r101",
    "id": "r101",
    "title": "R Programming for Statistical Analysis",
    "subtitle": "Master Data Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in R Programming for Statistical Analysis. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Data Science",
    "level": "Beginner",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.7,
    "reviewsCount": 8340,
    "hours": 22,
    "lessonsCount": 45,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "R",
      "Statistics",
      "ggplot2"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "r101_mod1",
        "title": "Module 1: Data Science Foundations",
        "lessons": [
          {
            "id": "r101_les1",
            "title": "Introduction & Architecture Blueprint for R Programming for Statistical Analysis",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=_V8eKsto3Ug",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "r101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=_V8eKsto3Ug",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "r101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "r101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=_V8eKsto3Ug",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_bigdata301",
    "id": "bigdata301",
    "title": "Apache Spark & Big Data Engineering",
    "subtitle": "Master Data Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Apache Spark & Big Data Engineering. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Data Science",
    "level": "Advanced",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.8,
    "reviewsCount": 8680,
    "hours": 26,
    "lessonsCount": 50,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Spark",
      "Hadoop",
      "PySpark"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "bigdata301_mod1",
        "title": "Module 1: Data Science Foundations",
        "lessons": [
          {
            "id": "bigdata301_les1",
            "title": "Introduction & Architecture Blueprint for Apache Spark & Big Data Engineering",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=0m_1d1f0Oio",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "bigdata301_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=0m_1d1f0Oio",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "bigdata301_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "bigdata301_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=0m_1d1f0Oio",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_mlops201",
    "id": "mlops201",
    "title": "MLOps: Productionizing Machine Learning Models",
    "subtitle": "Master Data Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in MLOps: Productionizing Machine Learning Models. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Data Science",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.9,
    "reviewsCount": 9020,
    "hours": 30,
    "lessonsCount": 55,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "MLflow",
      "Docker",
      "FastAPI"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "mlops201_mod1",
        "title": "Module 1: Data Science Foundations",
        "lessons": [
          {
            "id": "mlops201_les1",
            "title": "Introduction & Architecture Blueprint for MLOps",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=nu_pCVPKzTk",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "mlops201_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=nu_pCVPKzTk",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "mlops201_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "mlops201_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=nu_pCVPKzTk",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_stats101",
    "id": "stats101",
    "title": "Applied Statistics & Probability for Tech",
    "subtitle": "Master Data Science with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Applied Statistics & Probability for Tech. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Data Science",
    "level": "Beginner",
    "price": 0,
    "originalPrice": 0,
    "rating": 5,
    "reviewsCount": 9360,
    "hours": 34,
    "lessonsCount": 20,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Statistics",
      "Hypothesis Testing",
      "Math"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "stats101_mod1",
        "title": "Module 1: Data Science Foundations",
        "lessons": [
          {
            "id": "stats101_les1",
            "title": "Introduction & Architecture Blueprint for Applied Statistics & Probability for Tech",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=Vfo5le26QgY",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "stats101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=Vfo5le26QgY",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "stats101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "stats101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=Vfo5le26QgY",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_des102",
    "id": "des102",
    "title": "UI/UX Principles: Glassmorphism & Tonal Depth",
    "subtitle": "Master Design with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in UI/UX Principles: Glassmorphism & Tonal Depth. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Design",
    "level": "Beginner",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.6,
    "reviewsCount": 9700,
    "hours": 38,
    "lessonsCount": 25,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Figma",
      "UI/UX",
      "CSS3",
      "Design"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "des102_mod1",
        "title": "Module 1: Design Foundations",
        "lessons": [
          {
            "id": "des102_les1",
            "title": "Introduction & Architecture Blueprint for UI/UX Principles",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "des102_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "des102_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "des102_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_figma201",
    "id": "figma201",
    "title": "Figma Auto-Layout & Design Tokens Masterclass",
    "subtitle": "Master Design with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Figma Auto-Layout & Design Tokens Masterclass. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Design",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.7,
    "reviewsCount": 10040,
    "hours": 42,
    "lessonsCount": 30,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Figma",
      "Prototyping",
      "Design Systems"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "figma201_mod1",
        "title": "Module 1: Design Foundations",
        "lessons": [
          {
            "id": "figma201_les1",
            "title": "Introduction & Architecture Blueprint for Figma Auto-Layout & Design Tokens Masterclass",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "figma201_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "figma201_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "figma201_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_anim101",
    "id": "anim101",
    "title": "Web Animation with Framer Motion & GSAP",
    "subtitle": "Master Design with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Web Animation with Framer Motion & GSAP. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Design",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.8,
    "reviewsCount": 10380,
    "hours": 46,
    "lessonsCount": 35,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Framer Motion",
      "GSAP",
      "CSS Animation"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "anim101_mod1",
        "title": "Module 1: Design Foundations",
        "lessons": [
          {
            "id": "anim101_les1",
            "title": "Introduction & Architecture Blueprint for Web Animation with Framer Motion & GSAP",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=zS4wH0q6oT8",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "anim101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=zS4wH0q6oT8",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "anim101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "anim101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=zS4wH0q6oT8",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_3d101",
    "id": "3d101",
    "title": "Blender 3D Modeling & Shader Art for Beginners",
    "subtitle": "Master Design with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Blender 3D Modeling & Shader Art for Beginners. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Design",
    "level": "Beginner",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.9,
    "reviewsCount": 10720,
    "hours": 50,
    "lessonsCount": 40,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Blender",
      "3D Modeling",
      "Render"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "3d101_mod1",
        "title": "Module 1: Design Foundations",
        "lessons": [
          {
            "id": "3d101_les1",
            "title": "Introduction & Architecture Blueprint for Blender 3D Modeling & Shader Art for Beginners",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=TPrnSACiTJ4",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "3d101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=TPrnSACiTJ4",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "3d101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "3d101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=TPrnSACiTJ4",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_brand101",
    "id": "brand101",
    "title": "Brand Identity & Visual Design Systems",
    "subtitle": "Master Design with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Brand Identity & Visual Design Systems. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Design",
    "level": "Beginner",
    "price": 0,
    "originalPrice": 0,
    "rating": 5,
    "reviewsCount": 11060,
    "hours": 54,
    "lessonsCount": 45,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Branding",
      "Typography",
      "Logo Design"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "brand101_mod1",
        "title": "Module 1: Design Foundations",
        "lessons": [
          {
            "id": "brand101_les1",
            "title": "Introduction & Architecture Blueprint for Brand Identity & Visual Design Systems",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=YqQx75OPRa0",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "brand101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=YqQx75OPRa0",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "brand101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "brand101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=YqQx75OPRa0",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_webdes201",
    "id": "webdes201",
    "title": "Responsive Web Layouts & Micro-interactions",
    "subtitle": "Master Design with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Responsive Web Layouts & Micro-interactions. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Design",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.6,
    "reviewsCount": 11400,
    "hours": 18,
    "lessonsCount": 50,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "CSS Grid",
      "Flexbox",
      "UI/UX"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "webdes201_mod1",
        "title": "Module 1: Design Foundations",
        "lessons": [
          {
            "id": "webdes201_les1",
            "title": "Introduction & Architecture Blueprint for Responsive Web Layouts & Micro-interactions",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=1PnVor36_40",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "webdes201_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=1PnVor36_40",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "webdes201_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "webdes201_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=1PnVor36_40",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_sketch101",
    "id": "sketch101",
    "title": "Vector Illustration & Iconography in Illustrator",
    "subtitle": "Master Design with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Vector Illustration & Iconography in Illustrator. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Design",
    "level": "Beginner",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.7,
    "reviewsCount": 11740,
    "hours": 22,
    "lessonsCount": 55,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Illustrator",
      "Vector",
      "Icons"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "sketch101_mod1",
        "title": "Module 1: Design Foundations",
        "lessons": [
          {
            "id": "sketch101_les1",
            "title": "Introduction & Architecture Blueprint for Vector Illustration & Iconography in Illustrator",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=IBouHFosI10",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "sketch101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=IBouHFosI10",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "sketch101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "sketch101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=IBouHFosI10",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_uxres201",
    "id": "uxres201",
    "title": "User Research, Wireframing & Usability Testing",
    "subtitle": "Master Design with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in User Research, Wireframing & Usability Testing. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Design",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.8,
    "reviewsCount": 12080,
    "hours": 26,
    "lessonsCount": 20,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "User Research",
      "Wireframes",
      "Testing"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "uxres201_mod1",
        "title": "Module 1: Design Foundations",
        "lessons": [
          {
            "id": "uxres201_les1",
            "title": "Introduction & Architecture Blueprint for User Research, Wireframing & Usability Testing",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=7U5F-cW2_9Y",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "uxres201_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=7U5F-cW2_9Y",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "uxres201_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "uxres201_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=7U5F-cW2_9Y",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_pm101",
    "id": "pm101",
    "title": "Agile Product Management & Scrum Framework",
    "subtitle": "Master Business with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Agile Product Management & Scrum Framework. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Business",
    "level": "Beginner",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.9,
    "reviewsCount": 12420,
    "hours": 30,
    "lessonsCount": 25,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Product Management",
      "Agile",
      "Scrum"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "pm101_mod1",
        "title": "Module 1: Business Foundations",
        "lessons": [
          {
            "id": "pm101_les1",
            "title": "Introduction & Architecture Blueprint for Agile Product Management & Scrum Framework",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=2u0cWmWwKac",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "pm101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=2u0cWmWwKac",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "pm101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "pm101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=2u0cWmWwKac",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_mkt201",
    "id": "mkt201",
    "title": "Digital Marketing & SEO Growth Strategies",
    "subtitle": "Master Business with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Digital Marketing & SEO Growth Strategies. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Business",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 5,
    "reviewsCount": 12760,
    "hours": 34,
    "lessonsCount": 30,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "SEO",
      "Content Marketing",
      "Analytics"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "mkt201_mod1",
        "title": "Module 1: Business Foundations",
        "lessons": [
          {
            "id": "mkt201_les1",
            "title": "Introduction & Architecture Blueprint for Digital Marketing & SEO Growth Strategies",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=xsVTqzratPs",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "mkt201_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=xsVTqzratPs",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "mkt201_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "mkt201_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=xsVTqzratPs",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_fin101",
    "id": "fin101",
    "title": "Financial Modeling & Corporate Valuation",
    "subtitle": "Master Business with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Financial Modeling & Corporate Valuation. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Business",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.6,
    "reviewsCount": 13100,
    "hours": 38,
    "lessonsCount": 35,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Finance",
      "Excel",
      "Valuation"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "fin101_mod1",
        "title": "Module 1: Business Foundations",
        "lessons": [
          {
            "id": "fin101_les1",
            "title": "Introduction & Architecture Blueprint for Financial Modeling & Corporate Valuation",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=3x_V56860E8",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "fin101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=3x_V56860E8",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "fin101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "fin101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=3x_V56860E8",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_startup101",
    "id": "startup101",
    "title": "Startup Founder Handbook: Zero to Seed Round",
    "subtitle": "Master Business with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Startup Founder Handbook: Zero to Seed Round. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Business",
    "level": "Beginner",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.7,
    "reviewsCount": 13440,
    "hours": 42,
    "lessonsCount": 40,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Entrepreneurship",
      "Pitch Deck",
      "Venture Capital"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "startup101_mod1",
        "title": "Module 1: Business Foundations",
        "lessons": [
          {
            "id": "startup101_les1",
            "title": "Introduction & Architecture Blueprint for Startup Founder Handbook",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=C27RVfg2E5g",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "startup101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=C27RVfg2E5g",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "startup101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "startup101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=C27RVfg2E5g",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_saas201",
    "id": "saas201",
    "title": "SaaS Metrics, Churn Reduction & Pricing Strategy",
    "subtitle": "Master Business with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in SaaS Metrics, Churn Reduction & Pricing Strategy. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Business",
    "level": "Advanced",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.8,
    "reviewsCount": 13780,
    "hours": 46,
    "lessonsCount": 45,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "SaaS",
      "MRR",
      "CAC",
      "LTV"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "saas201_mod1",
        "title": "Module 1: Business Foundations",
        "lessons": [
          {
            "id": "saas201_les1",
            "title": "Introduction & Architecture Blueprint for SaaS Metrics, Churn Reduction & Pricing Strategy",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=aG-0V88p8C8",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "saas201_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=aG-0V88p8C8",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "saas201_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "saas201_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=aG-0V88p8C8",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_lead101",
    "id": "lead101",
    "title": "Executive Leadership & Engineering Team Building",
    "subtitle": "Master Business with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Executive Leadership & Engineering Team Building. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Business",
    "level": "Advanced",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.9,
    "reviewsCount": 14120,
    "hours": 50,
    "lessonsCount": 50,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Leadership",
      "Management",
      "Communication"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "lead101_mod1",
        "title": "Module 1: Business Foundations",
        "lessons": [
          {
            "id": "lead101_les1",
            "title": "Introduction & Architecture Blueprint for Executive Leadership & Engineering Team Building",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=lmyZMtPVodo",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "lead101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=lmyZMtPVodo",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "lead101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "lead101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=lmyZMtPVodo",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_sales101",
    "id": "sales101",
    "title": "B2B Enterprise Sales & Negotiation Techniques",
    "subtitle": "Master Business with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in B2B Enterprise Sales & Negotiation Techniques. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Business",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 5,
    "reviewsCount": 14460,
    "hours": 54,
    "lessonsCount": 55,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "B2B Sales",
      "Negotiation",
      "CRM"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "sales101_mod1",
        "title": "Module 1: Business Foundations",
        "lessons": [
          {
            "id": "sales101_les1",
            "title": "Introduction & Architecture Blueprint for B2B Enterprise Sales & Negotiation Techniques",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=7642Y3J95j4",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "sales101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=7642Y3J95j4",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "sales101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "sales101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=7642Y3J95j4",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_sec101",
    "id": "sec101",
    "title": "Cybersecurity Fundamentals & Ethical Hacking",
    "subtitle": "Master Cybersecurity with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Cybersecurity Fundamentals & Ethical Hacking. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Cybersecurity",
    "level": "Beginner",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.6,
    "reviewsCount": 14800,
    "hours": 18,
    "lessonsCount": 20,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Ethical Hacking",
      "Linux",
      "Network Security"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "sec101_mod1",
        "title": "Module 1: Cybersecurity Foundations",
        "lessons": [
          {
            "id": "sec101_les1",
            "title": "Introduction & Architecture Blueprint for Cybersecurity Fundamentals & Ethical Hacking",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=inWWhr5tnEA",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "sec101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=inWWhr5tnEA",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "sec101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "sec101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=inWWhr5tnEA",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_sec201",
    "id": "sec201",
    "title": "Web Application Penetration Testing & OWASP Top 10",
    "subtitle": "Master Cybersecurity with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Web Application Penetration Testing & OWASP Top 10. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Cybersecurity",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.7,
    "reviewsCount": 15140,
    "hours": 22,
    "lessonsCount": 25,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "OWASP",
      "BurpSuite",
      "XSS",
      "SQLi"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "sec201_mod1",
        "title": "Module 1: Cybersecurity Foundations",
        "lessons": [
          {
            "id": "sec201_les1",
            "title": "Introduction & Architecture Blueprint for Web Application Penetration Testing & OWASP Top 10",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=2e6iFwP1u5M",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "sec201_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=2e6iFwP1u5M",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "sec201_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "sec201_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=2e6iFwP1u5M",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_sec301",
    "id": "sec301",
    "title": "Network Security Protocols & WireShark Analysis",
    "subtitle": "Master Cybersecurity with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Network Security Protocols & WireShark Analysis. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Cybersecurity",
    "level": "Advanced",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.8,
    "reviewsCount": 15480,
    "hours": 26,
    "lessonsCount": 30,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "WireShark",
      "TCP/IP",
      "Firewalls"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "sec301_mod1",
        "title": "Module 1: Cybersecurity Foundations",
        "lessons": [
          {
            "id": "sec301_les1",
            "title": "Introduction & Architecture Blueprint for Network Security Protocols & WireShark Analysis",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=lZAoFs75_cs",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "sec301_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=lZAoFs75_cs",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "sec301_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "sec301_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=lZAoFs75_cs",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_sec401",
    "id": "sec401",
    "title": "Cloud Security Architecture & IAM Enforcement",
    "subtitle": "Master Cybersecurity with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Cloud Security Architecture & IAM Enforcement. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Cybersecurity",
    "level": "Advanced",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.9,
    "reviewsCount": 15820,
    "hours": 30,
    "lessonsCount": 35,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Cloud Security",
      "IAM",
      "Encryption"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "sec401_mod1",
        "title": "Module 1: Cybersecurity Foundations",
        "lessons": [
          {
            "id": "sec401_les1",
            "title": "Introduction & Architecture Blueprint for Cloud Security Architecture & IAM Enforcement",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=r3sRz81xJ9w",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "sec401_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=r3sRz81xJ9w",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "sec401_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "sec401_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=r3sRz81xJ9w",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_sec501",
    "id": "sec501",
    "title": "Cryptography & Public Key Infrastructure (PKI)",
    "subtitle": "Master Cybersecurity with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Cryptography & Public Key Infrastructure (PKI). Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Cybersecurity",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 5,
    "reviewsCount": 16160,
    "hours": 34,
    "lessonsCount": 40,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Cryptography",
      "RSA",
      "TLS/SSL"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "sec501_mod1",
        "title": "Module 1: Cybersecurity Foundations",
        "lessons": [
          {
            "id": "sec501_les1",
            "title": "Introduction & Architecture Blueprint for Cryptography & Public Key Infrastructure (PKI)",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=GSIDS_lvRv4",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "sec501_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=GSIDS_lvRv4",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "sec501_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "sec501_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=GSIDS_lvRv4",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_cloud101",
    "id": "cloud101",
    "title": "Docker Containers & Containerization Mastery",
    "subtitle": "Master Cloud & DevOps with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Docker Containers & Containerization Mastery. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Cloud & DevOps",
    "level": "Beginner",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.6,
    "reviewsCount": 16500,
    "hours": 38,
    "lessonsCount": 45,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Docker",
      "Containers",
      "DevOps"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "cloud101_mod1",
        "title": "Module 1: Cloud & DevOps Foundations",
        "lessons": [
          {
            "id": "cloud101_les1",
            "title": "Introduction & Architecture Blueprint for Docker Containers & Containerization Mastery",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=pTFZFxd4hOI",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "cloud101_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=pTFZFxd4hOI",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "cloud101_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "cloud101_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=pTFZFxd4hOI",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_cloud201",
    "id": "cloud201",
    "title": "Kubernetes Cluster Management & Helm Charts",
    "subtitle": "Master Cloud & DevOps with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Kubernetes Cluster Management & Helm Charts. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Cloud & DevOps",
    "level": "Advanced",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.7,
    "reviewsCount": 16840,
    "hours": 42,
    "lessonsCount": 50,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Kubernetes",
      "K8s",
      "Helm"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "cloud201_mod1",
        "title": "Module 1: Cloud & DevOps Foundations",
        "lessons": [
          {
            "id": "cloud201_les1",
            "title": "Introduction & Architecture Blueprint for Kubernetes Cluster Management & Helm Charts",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=X48VuDVv0do",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "cloud201_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=X48VuDVv0do",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "cloud201_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "cloud201_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=X48VuDVv0do",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_cloud301",
    "id": "cloud301",
    "title": "AWS Cloud Practitioner & Solutions Architect",
    "subtitle": "Master Cloud & DevOps with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in AWS Cloud Practitioner & Solutions Architect. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Cloud & DevOps",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.8,
    "reviewsCount": 17180,
    "hours": 46,
    "lessonsCount": 55,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "AWS",
      "EC2",
      "S3",
      "Cloud"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "cloud301_mod1",
        "title": "Module 1: Cloud & DevOps Foundations",
        "lessons": [
          {
            "id": "cloud301_les1",
            "title": "Introduction & Architecture Blueprint for AWS Cloud Practitioner & Solutions Architect",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=3hLmDS179YE",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "cloud301_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=3hLmDS179YE",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "cloud301_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "cloud301_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=3hLmDS179YE",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_cloud401",
    "id": "cloud401",
    "title": "Terraform Infrastructure as Code (IaC)",
    "subtitle": "Master Cloud & DevOps with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in Terraform Infrastructure as Code (IaC). Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Cloud & DevOps",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 4.9,
    "reviewsCount": 17520,
    "hours": 50,
    "lessonsCount": 20,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "Terraform",
      "IaC",
      "CloudFormation"
    ],
    "instructorName": "Dr. Elena Rostova",
    "instructorRole": "Former AI Research Lead, TechCorp",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4",
    "thumbnail": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "cloud401_mod1",
        "title": "Module 1: Cloud & DevOps Foundations",
        "lessons": [
          {
            "id": "cloud401_les1",
            "title": "Introduction & Architecture Blueprint for Terraform Infrastructure as Code (IaC)",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=7xngnjfIlK4",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "cloud401_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=7xngnjfIlK4",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "cloud401_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "cloud401_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=7xngnjfIlK4",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  },
  {
    "_id": "crs_cloud501",
    "id": "cloud501",
    "title": "GitHub Actions & CI/CD Pipeline Automation",
    "subtitle": "Master Cloud & DevOps with hands-on projects, live code architectures, and professional templates.",
    "description": "Comprehensive industry-standard training in GitHub Actions & CI/CD Pipeline Automation. Includes practical modules, real-world case studies, architectural blueprints, and full certification upon completion.",
    "category": "Cloud & DevOps",
    "level": "Intermediate",
    "price": 0,
    "originalPrice": 0,
    "rating": 5,
    "reviewsCount": 17860,
    "hours": 54,
    "lessonsCount": 25,
    "languages": [
      "English",
      "Hindi"
    ],
    "techStack": [
      "GitHub Actions",
      "CI/CD",
      "Automation"
    ],
    "instructorName": "Prof. Marcus Vance",
    "instructorRole": "Principal Systems Architect",
    "instructorBio": "Dedicated educator specializing in modern software architecture, cloud engineering, and high-performance computing.",
    "instructorAvatar": "https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP",
    "thumbnail": "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=1200&q=80",
    "status": "published",
    "featured": false,
    "modules": [
      {
        "id": "cloud501_mod1",
        "title": "Module 1: Cloud & DevOps Foundations",
        "lessons": [
          {
            "id": "cloud501_les1",
            "title": "Introduction & Architecture Blueprint for GitHub Actions & CI/CD Pipeline Automation",
            "duration": "22:15",
            "videoUrl": "https://www.youtube.com/watch?v=R8_veQiYBjI",
            "isLocked": false,
            "type": "video"
          },
          {
            "id": "cloud501_les2",
            "title": "Core Fundamentals & Development Setup",
            "duration": "18:40",
            "videoUrl": "https://www.youtube.com/watch?v=R8_veQiYBjI",
            "isLocked": false,
            "type": "video"
          }
        ]
      },
      {
        "id": "cloud501_mod2",
        "title": "Module 2: Advanced Deep Dive & Production Deployment",
        "lessons": [
          {
            "id": "cloud501_les3",
            "title": "Practical Masterclass & Real-World Lab",
            "duration": "25:10",
            "videoUrl": "https://www.youtube.com/watch?v=R8_veQiYBjI",
            "isLocked": false,
            "type": "video"
          }
        ]
      }
    ],
    "includes": [
      "Full video lessons",
      "Hands-on project templates",
      "Certificate of completion",
      "Lifetime access"
    ]
  }
],
  orders: [
    {
      _id: 'ord_1001',
      id: 'ord_1001',
      userId: 'usr_alex',
      userName: 'Alex Morgan',
      items: [{ courseId: 'cs201', title: 'Advanced Data Structures & Algorithms', price: 0 }],
      totalAmount: 0,
      paymentStatus: 'completed',
      paymentMethod: 'Credit Card (Simulated)',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
  ],
  progress: {},
};

// Initialize file persistence from disk if available
if (!loadStateFromFile()) {
  saveStateToFile();
}

const isMongoConnected = () => mongoose.connection.readyState === 1;

export const dbStore = {
  // USER OPERATIONS
  async findUserByEmail(email) {
    if (!email) return null;
    const query = email.toLowerCase().trim();
    if (isMongoConnected()) {
      return await User.findOne({ email: query });
    }
    return memoryStore.users.find((u) => u.email?.toLowerCase() === query) || null;
  },

  async findUserByPhone(phone) {
    if (!phone) return null;
    const query = phone.trim();
    if (isMongoConnected()) {
      return await User.findOne({ phone: query });
    }
    return memoryStore.users.find((u) => u.phone === query) || null;
  },

  async findUserById(id) {
    if (!id) return null;
    if (isMongoConnected()) {
      try {
        return await User.findById(id);
      } catch (err) {
        return await User.findOne({ id });
      }
    }
    return memoryStore.users.find((u) => u.id === id || u._id === id) || null;
  },

  async createUser(userData) {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: userData.name,
      email: userData.email.toLowerCase().trim(),
      phone: userData.phone || '',
      password: userData.password,
      role: userData.role || 'student',
      avatar: userData.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC',
      enrolledCourses: ['web101', 'cs201'],
      wishlist: [],
      createdAt: new Date().toISOString(),
    };

    if (isMongoConnected()) {
      const created = await User.create(newUser);
      saveStateToFile();
      return created;
    }

    newUser._id = newUser.id;
    memoryStore.users.push(newUser);
    saveStateToFile();
    return newUser;
  },

  async getAllUsers() {
    if (isMongoConnected()) {
      return await User.find({}).select('-password');
    }
    return memoryStore.users.map(({ password, ...rest }) => rest);
  },

  async updateUser(userId, updateData) {
    let result = null;
    if (isMongoConnected()) {
      try {
        result = await User.findByIdAndUpdate(userId, updateData, { new: true });
      } catch (err) {
        result = await User.findOneAndUpdate({ id: userId }, updateData, { new: true });
      }
    } else {
      const idx = memoryStore.users.findIndex((u) => u.id === userId || u._id === userId);
      if (idx !== -1) {
        memoryStore.users[idx] = { ...memoryStore.users[idx], ...updateData };
        const { password, ...rest } = memoryStore.users[idx];
        result = rest;
      }
    }
    saveStateToFile();
    return result;
  },

  async deleteUser(userId) {
    let result = null;
    if (isMongoConnected()) {
      try {
        result = await User.findByIdAndDelete(userId);
      } catch (err) {
        result = await User.findOneAndDelete({ id: userId });
      }
    } else {
      const idx = memoryStore.users.findIndex((u) => u.id === userId || u._id === userId);
      if (idx !== -1) {
        result = memoryStore.users.splice(idx, 1)[0];
      }
    }
    saveStateToFile();
    return result;
  },

  // COURSE OPERATIONS
  async getAllCourses(filters = {}) {
    let coursesList = [];
    if (isMongoConnected()) {
      coursesList = await Course.find({});
    } else {
      coursesList = [...memoryStore.courses];
    }

    if (filters.category && filters.category !== 'All') {
      coursesList = coursesList.filter((c) => c.category?.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.level && filters.level !== 'All') {
      coursesList = coursesList.filter((c) => c.level?.toLowerCase() === filters.level.toLowerCase());
    }

    if (filters.search) {
      const query = filters.search.toLowerCase().trim();
      coursesList = coursesList.filter(
        (c) =>
          c.title?.toLowerCase().includes(query) ||
          c.description?.toLowerCase().includes(query) ||
          c.techStack?.some((t) => t.toLowerCase().includes(query))
      );
    }

    if (filters.sort === 'rating') {
      coursesList.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return coursesList;
  },

  async getCourses(filters = {}) {
    return this.getAllCourses(filters);
  },

  async getCourseById(id) {
    if (isMongoConnected()) {
      try {
        return await Course.findById(id);
      } catch (err) {
        return await Course.findOne({ id });
      }
    }
    return memoryStore.courses.find((c) => c.id === id || c._id === id) || null;
  },

  async createCourse(courseData) {
    const courseId = courseData.id || `crs_${Date.now()}`;
    const newCourse = {
      _id: courseId,
      id: courseId,
      title: courseData.title,
      subtitle: courseData.subtitle || 'Comprehensive Course',
      description: courseData.description || 'Master modern concepts with real-world projects.',
      category: courseData.category || 'Computer Science',
      level: courseData.level || 'Intermediate',
      price: courseData.price || 0,
      originalPrice: courseData.originalPrice || 0,
      rating: courseData.rating || 5.0,
      reviewsCount: courseData.reviewsCount || 1,
      hours: courseData.hours || 12,
      lessonsCount: courseData.lessonsCount || (courseData.modules ? courseData.modules.reduce((acc, m) => acc + (m.lessons ? m.lessons.length : 0), 0) : 5),
      languages: courseData.languages || ['English'],
      techStack: courseData.techStack || ['Software Engineering'],
      instructorName: courseData.instructorName || 'Dr. Elena Rostova',
      instructorRole: courseData.instructorRole || 'Lead Educator',
      instructorBio: courseData.instructorBio || 'Expert industry educator building modern educational content.',
      instructorAvatar: courseData.instructorAvatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC',
      thumbnail: courseData.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      status: courseData.status || 'published',
      featured: courseData.featured !== undefined ? courseData.featured : true,
      modules: courseData.modules || [],
      includes: courseData.includes || ['Full video lessons', 'Certificate of completion', 'Lifetime access'],
      createdAt: new Date().toISOString(),
    };

    if (isMongoConnected()) {
      const created = await Course.create(newCourse);
      saveStateToFile();
      return created;
    }

    newCourse._id = newCourse.id;
    memoryStore.courses.unshift(newCourse);
    saveStateToFile();
    return newCourse;
  },

  async deleteCourse(id) {
    if (isMongoConnected()) {
      try {
        await Course.findByIdAndDelete(id);
      } catch (err) {
        await Course.findOneAndDelete({ id });
      }
    } else {
      const idx = memoryStore.courses.findIndex((c) => c.id === id || c._id === id);
      if (idx !== -1) {
        memoryStore.courses.splice(idx, 1);
      }
    }
    saveStateToFile();
    return true;
  },

  async deleteAllCourses() {
    if (isMongoConnected()) {
      await Course.deleteMany({});
    }
    memoryStore.courses = [];
    saveStateToFile();
    return true;
  },

  // ORDER OPERATIONS
  async createOrder(orderData) {
    const newOrder = {
      id: `ord_${Date.now()}`,
      userId: orderData.userId,
      userName: orderData.userName || 'Student User',
      items: orderData.items || [],
      totalAmount: orderData.totalAmount || 0,
      paymentStatus: 'completed',
      paymentMethod: orderData.paymentMethod || 'Free Checkout',
      createdAt: new Date().toISOString(),
    };

    if (isMongoConnected()) {
      await Order.create(newOrder);
    } else {
      newOrder._id = newOrder.id;
      memoryStore.orders.unshift(newOrder);
    }

    // Auto-enroll user in course items
    if (orderData.userId && orderData.items) {
      const courseIdsToEnroll = orderData.items.map((i) => i.courseId);
      if (isMongoConnected()) {
        await User.findByIdAndUpdate(orderData.userId, {
          $addToSet: { enrolledCourses: { $each: courseIdsToEnroll } },
        });
      } else {
        const usr = memoryStore.users.find((u) => u.id === orderData.userId || u._id === orderData.userId);
        if (usr) {
          usr.enrolledCourses = Array.from(new Set([...(usr.enrolledCourses || []), ...courseIdsToEnroll]));
        }
      }
    }

    return newOrder;
  },

  async getOrdersByUser(userId) {
    if (isMongoConnected()) {
      return await Order.find({ userId });
    }
    return memoryStore.orders.filter((o) => o.userId === userId);
  },

  async getAllOrders() {
    if (isMongoConnected()) {
      return await Order.find({});
    }
    return memoryStore.orders;
  },

  // PROGRESS OPERATIONS
  async getProgress(userId, courseId) {
    const key = `${userId}_${courseId}`;
    if (isMongoConnected()) {
      let prog = await Progress.findOne({ userId, courseId });
      if (!prog) {
        prog = await Progress.create({ userId, courseId, completedLessons: [], percentage: 0, certificateEarned: false });
      }
      return prog;
    }

    if (!memoryStore.progress[key]) {
      memoryStore.progress[key] = {
        userId,
        courseId,
        completedLessons: [],
        percentage: 0,
        certificateEarned: false,
      };
    }
    return memoryStore.progress[key];
  },

  async saveProgress(userId, courseId, updateData) {
    const key = `${userId}_${courseId}`;
    if (isMongoConnected()) {
      return await Progress.findOneAndUpdate(
        { userId, courseId },
        { ...updateData, updatedAt: new Date() },
        { new: true, upsert: true }
      );
    }

    memoryStore.progress[key] = {
      ...(memoryStore.progress[key] || { userId, courseId }),
      ...updateData,
    };
    return memoryStore.progress[key];
  },

  // STATS
  async getStats() {
    let totalUsers = 0;
    let totalCourses = 0;
    let totalOrders = 0;

    if (isMongoConnected()) {
      totalUsers = await User.countDocuments();
      totalCourses = await Course.countDocuments();
      totalOrders = await Order.countDocuments();
    } else {
      totalUsers = memoryStore.users.length;
      totalCourses = memoryStore.courses.length;
      totalOrders = memoryStore.orders.length;
    }

    return { totalUsers, totalCourses, totalOrders, totalEnrollments: (memoryStore.enrollments || []).length, totalRevenue: 0 };
  },

  // ENROLLMENT OPERATIONS
  async createEnrollment(data) {
    const newEnrollment = {
      id: `enr_${Date.now()}`,
      userId: data.userId,
      userName: data.userName || data.name || 'Student User',
      userEmail: data.userEmail || data.email || 'student@example.com',
      userPhone: data.userPhone || data.phone || 'N/A',
      profession: data.profession || 'Student',
      goal: data.goal || 'Skill Upgrade',
      courseId: data.courseId,
      courseTitle: data.courseTitle || 'Platform Course',
      createdAt: new Date().toISOString(),
      status: 'Active',
    };

    if (!memoryStore.enrollments) memoryStore.enrollments = [];
    memoryStore.enrollments.unshift(newEnrollment);
    saveStateToFile();
    return newEnrollment;
  },

  async getAllEnrollments() {
    if (!memoryStore.enrollments) memoryStore.enrollments = [];
    return memoryStore.enrollments;
  },

  async deleteEnrollment(id) {
    if (!memoryStore.enrollments) memoryStore.enrollments = [];
    const idx = memoryStore.enrollments.findIndex((e) => e.id === id || e._id === id);
    if (idx !== -1) {
      const removed = memoryStore.enrollments.splice(idx, 1)[0];
      saveStateToFile();
      return removed;
    }
    return null;
  },
};
