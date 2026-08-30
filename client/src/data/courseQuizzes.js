// Course-Specific Technical Quiz Question Banks & Dynamic Quiz Generator

export const COURSE_QUIZZES = {
  // 1. CI/CD Pipelines with GitHub Actions & Docker
  ci_cd: {
    title: 'CI/CD Pipelines with GitHub Actions & Docker Certification Exam',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'Which directory must GitHub Actions workflow YAML files be placed in within a repository?',
        options: [
          '.github/workflows/',
          '.ci/actions/',
          '.pipelines/github/',
          'workflows/.github/',
        ],
        correctAnswer: 0,
        explanation: 'GitHub Actions automatically parses workflow configurations located in the .github/workflows/ directory.',
      },
      {
        id: 2,
        question: 'What is the primary difference between continuous delivery and continuous deployment?',
        options: [
          'Continuous delivery requires manual approval before deploying to production, whereas continuous deployment deploys automatically.',
          'Continuous deployment only builds Docker images, whereas continuous delivery also writes unit tests.',
          'Continuous delivery is only used for mobile apps, while continuous deployment is for web apps.',
          'There is no functional difference between the two terms.',
        ],
        correctAnswer: 0,
        explanation: 'Continuous Delivery prepares releases ready for deployment requiring human signoff; Continuous Deployment automates release directly into production.',
      },
      {
        id: 3,
        question: 'In a Dockerfile, which instruction specifies the executable that will always run when the container starts?',
        options: [
          'ENTRYPOINT',
          'RUN',
          'FROM',
          'COPY',
        ],
        correctAnswer: 0,
        explanation: 'ENTRYPOINT sets the default command and executable that cannot be easily overridden during docker run.',
      },
      {
        id: 4,
        question: 'How do you securely pass API secrets and tokens to a GitHub Actions step?',
        options: [
          'Store them in GitHub Repository Secrets and reference them via ${{ secrets.SECRET_NAME }}',
          'Hardcode them in the public workflow YAML file',
          'Add them to the README.md file',
          'Pass them as URL parameters in git commit messages',
        ],
        correctAnswer: 0,
        explanation: 'Repository and Organization Secrets encrypt sensitive variables and expose them to runner contexts via ${{ secrets.NAME }}.',
      },
      {
        id: 5,
        question: 'What is a Multi-Stage Docker build primarily used for?',
        options: [
          'Reducing the final container image size by discarding intermediate build dependencies and tools',
          'Running multiple distinct containers on the same port',
          'Speeding up git clone times inside the container',
          'Preventing containers from shutting down when an error occurs',
        ],
        correctAnswer: 0,
        explanation: 'Multi-stage builds allow separating build-time compilers from the lean production runtime, drastically shrinking production container images.',
      },
    ],
  },

  // 2. AI & Machine Learning
  ai_ml: {
    title: 'AI & Machine Learning Masterclass Assessment',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'In Supervised Machine Learning, what defines the training dataset?',
        options: [
          'Input features paired with ground-truth target labels',
          'Only unlabeled raw features without target labels',
          'A random sequence of unstructured binary files',
          'Reinforcement reward matrices with time-lagged feedback',
        ],
        correctAnswer: 0,
        explanation: 'Supervised learning algorithms learn mapping functions from input data (features) to known corresponding target outputs (labels).',
      },
      {
        id: 2,
        question: 'What technique is used to prevent neural networks from overfitting on training data?',
        options: [
          'Dropout regularization, L2 weight decay, and early stopping',
          'Increasing model parameters without adding data',
          'Training on the exact same batch for unlimited epochs',
          'Removing validation sets completely',
        ],
        correctAnswer: 0,
        explanation: 'Dropout randomly deactivates neurons during training, forcing networks to learn robust, generalized representations and preventing overfitting.',
      },
      {
        id: 3,
        question: 'In PyTorch, which function computes the gradients of a loss tensor with respect to graph leaves?',
        options: [
          'loss.backward()',
          'optimizer.zero_grad()',
          'torch.optimize()',
          'loss.forward()',
        ],
        correctAnswer: 0,
        explanation: 'loss.backward() computes automatic differentiation (autograd) backwards through the computational graph.',
      },
      {
        id: 4,
        question: 'What is the purpose of the Softmax activation function in classification neural networks?',
        options: [
          'Converts raw model logits into a normalized probability distribution that sums to 1.0',
          'Calculates mean squared error between scalars',
          'Multiplies weights by learning rate constants',
          'Discards all negative values and sets them to infinity',
        ],
        correctAnswer: 0,
        explanation: 'Softmax exponentiates logits and normalizes them across output classes so each output corresponds to an interpretable probability.',
      },
      {
        id: 5,
        question: 'Which metric is best suited for evaluating a classification model on highly imbalanced datasets?',
        options: [
          'F1-Score / Precision-Recall AUC',
          'Simple Accuracy',
          'Mean Squared Error (MSE)',
          'Cosine Similarity',
        ],
        correctAnswer: 0,
        explanation: 'Simple accuracy can be deceiving on imbalanced sets (e.g. 99% negative class), whereas F1-Score balances precision and recall for minority classes.',
      },
    ],
  },

  // 3. Google Cloud Platform (GCP) & GKE
  gcp_cloud: {
    title: 'Google Cloud Platform (GCP) Infrastructure & GKE Exam',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is Google Kubernetes Engine (GKE) primarily used for?',
        options: [
          'Orchestrating, deploying, and auto-scaling containerized applications on Google Cloud',
          'Hosting static HTML websites without containers',
          'Managing relational SQL schema migrations only',
          'Translating human audio into text transcripts',
        ],
        correctAnswer: 0,
        explanation: 'GKE is a fully managed Kubernetes environment providing high availability, auto-scaling, and cluster management for containers.',
      },
      {
        id: 2,
        question: 'Which GCP service provides serverless, scalable SQL querying across petabytes of enterprise data?',
        options: [
          'BigQuery',
          'Compute Engine',
          'Cloud Spanner',
          'Cloud Firestore',
        ],
        correctAnswer: 0,
        explanation: 'BigQuery is GCP’s serverless, highly-scalable, cost-effective multicloud data warehouse designed for business agility.',
      },
      {
        id: 3,
        question: 'What is Cloud Run in the GCP ecosystem?',
        options: [
          'A fully managed serverless platform that automatically scales containers based on incoming HTTP traffic',
          'A physical Ethernet cable between data centers',
          'A desktop application for editing JavaScript code',
          'A virtual machine that cannot connect to the internet',
        ],
        correctAnswer: 0,
        explanation: 'Cloud Run lets you run containerized applications serverless without managing underlying cluster infrastructure, scaling from zero to thousands.',
      },
      {
        id: 4,
        question: 'In Kubernetes (GKE), what is the smallest deployable computing unit that can be created and managed?',
        options: [
          'A Pod',
          'A Node Pool',
          'A Ingress Controller',
          'A Namespace',
        ],
        correctAnswer: 0,
        explanation: 'A Pod represents a single instance of a running process in a cluster and encapsulates one or more co-located containers.',
      },
      {
        id: 5,
        question: 'Which tool is industry-standard for defining Infrastructure as Code (IaC) declaratively on GCP?',
        options: [
          'Terraform (HCL)',
          'Photoshop',
          'Postman',
          'Notepad',
        ],
        correctAnswer: 0,
        explanation: 'HashiCorp Terraform enables engineers to version-control, provision, and maintain GCP resources declaratively using code.',
      },
    ],
  },

  // 4. Applied Cryptography & Security
  cryptography: {
    title: 'Applied Cryptography & TLS 1.3 Architecture Exam',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is the key characteristic of Symmetric Encryption algorithms like AES-GCM?',
        options: [
          'The same secret key is used for both encryption and decryption',
          'One key is public and a different mathematical key is private',
          'Encrypted data cannot ever be decrypted by any party',
          'Keys must be printed on physical paper to work',
        ],
        correctAnswer: 0,
        explanation: 'Symmetric encryption uses a single shared secret key for both cipher operations, offering blazing speed for bulk payload encryption.',
      },
      {
        id: 2,
        question: 'What major speed enhancement was introduced in the TLS 1.3 handshake protocol compared to TLS 1.2?',
        options: [
          '1-RTT full handshake and 0-RTT resumption, eliminating an entire round trip',
          'Removing digital certificates completely',
          'Replacing TCP with broadcast radio frequencies',
          'Disabling encryption for images and CSS',
        ],
        correctAnswer: 0,
        explanation: 'TLS 1.3 reduced handshake latency from 2-RTT to 1-RTT for new connections and introduced 0-RTT Early Data for known sessions.',
      },
      {
        id: 3,
        question: 'Why are cryptographically secure salt values added when hashing user passwords (e.g. bcrypt/argon2)?',
        options: [
          'To defeat pre-computed Rainbow Table attacks and ensure identical passwords have unique hashes',
          'To compress password strings down to 8 bytes',
          'To allow recovering plaintext passwords if lost',
          'To accelerate hash calculations on CPUs',
        ],
        correctAnswer: 0,
        explanation: 'A unique salt ensures that two users with the same password have completely different hashes, neutralizing rainbow table attacks.',
      },
      {
        id: 4,
        question: 'What mathematical property makes RSA asymmetric encryption secure against unauthorized decryption?',
        options: [
          'The computational difficulty of factoring large prime number products',
          'The length of the email address used in registration',
          'The CPU clock speed of the client computer',
          'The HTTP status code returned by the server',
        ],
        correctAnswer: 0,
        explanation: 'RSA security relies on the hardness of the integer factorization problem for large semiprime integers.',
      },
      {
        id: 5,
        question: 'What is the purpose of a Digital Signature in PKI (Public Key Infrastructure)?',
        options: [
          'To provide non-repudiation, sender authentication, and message integrity verification',
          'To compress PDF documents for faster emailing',
          'To convert HTTP requests into CSS stylesheets',
          'To hide the IP address of DNS servers',
        ],
        correctAnswer: 0,
        explanation: 'Digital signatures mathematically guarantee that a message was created by a known sender and was not altered in transit.',
      },
    ],
  },

  // 5. Flutter 3 & Dart
  flutter: {
    title: 'Flutter 3 & Dart Mobile Development Certification Exam',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is the fundamental UI building block in Flutter applications?',
        options: [
          'Widgets',
          'Activities',
          'Fragments',
          'DOM Elements',
        ],
        correctAnswer: 0,
        explanation: 'In Flutter, almost everything is a Widget—from structural elements (like buttons and text) to layout models (like padding and rows).',
      },
      {
        id: 2,
        question: 'What is the difference between a StatelessWidget and a StatefulWidget in Flutter?',
        options: [
          'StatefulWidget can rebuild its UI dynamically when internal mutable state changes via setState(), while StatelessWidget is immutable.',
          'StatelessWidget can only be used on Android devices.',
          'StatefulWidget does not allow build() methods.',
          'StatelessWidget runs on a background thread while StatefulWidget runs on GPU.',
        ],
        correctAnswer: 0,
        explanation: 'StatefulWidgets maintain mutable state over time and rebuild their subtree when setState() is called.',
      },
      {
        id: 3,
        question: 'Which Dart feature guarantees that variables cannot be assigned null unless explicitly marked with a question mark (?)?',
        options: [
          'Sound Null Safety',
          'Garbage Collection',
          'Hot Reload',
          'Async / Await',
        ],
        correctAnswer: 0,
        explanation: 'Dart Sound Null Safety eliminates null-reference exceptions at compile-time by enforcing non-nullable types by default.',
      },
      {
        id: 4,
        question: 'In Flutter, what mechanism allows instant code updates in running apps without losing application state?',
        options: [
          'Stateful Hot Reload',
          'Full Re-compilation',
          'USB Debugging',
          'APK Re-installation',
        ],
        correctAnswer: 0,
        explanation: 'Hot Reload injects updated source code files into the running Dart Virtual Machine, preserving app state for fast developer iteration.',
      },
      {
        id: 5,
        question: 'Which architecture pattern is popular in production Flutter apps for reactive, stream-based state management?',
        options: [
          'BLoC (Business Logic Component) / Provider',
          'jQuery Plugin Architecture',
          'Direct Global Variables',
          'Cookie Session Storage',
        ],
        correctAnswer: 0,
        explanation: 'BLoC separates UI presentation from business logic using reactive Dart Streams and Events.',
      },
    ],
  },

  // 6. Web Security & OWASP
  web_security: {
    title: 'Web Application Security & OWASP Vulnerabilities Exam',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is the most effective defense against SQL Injection (SQLi) vulnerabilities?',
        options: [
          'Using Parameterized Queries / Prepared Statements and Object-Relational Mappers (ORMs)',
          'Filtering out single quote characters on client-side JavaScript only',
          'Storing database passwords in HTML comments',
          'Changing the database port number from 3306 to 3307',
        ],
        correctAnswer: 0,
        explanation: 'Parameterized queries ensure the database engine treats user input strictly as parameters rather than executable SQL syntax.',
      },
      {
        id: 2,
        question: 'What does Cross-Site Scripting (XSS) allow an attacker to do?',
        options: [
          'Inject and execute malicious client-side JavaScript in the context of a victim\'s browser session',
          'Shut down the web server\'s physical power supply',
          'Directly delete rows from a MySQL database without a web server',
          'Bypass HTTPS certificate encryption at the ISP layer',
        ],
        correctAnswer: 0,
        explanation: 'XSS occurs when unvalidated user input is rendered in the DOM, allowing attacker scripts to steal session tokens or impersonate users.',
      },
      {
        id: 3,
        question: 'Which HTTP response header is used to prevent Clickjacking attacks in modern browsers?',
        options: [
          'Content-Security-Policy: frame-ancestors \'none\' (or X-Frame-Options: DENY)',
          'Access-Control-Allow-Origin: *',
          'Cache-Control: no-cache',
          'Accept-Encoding: gzip, deflate',
        ],
        correctAnswer: 0,
        explanation: 'CSP frame-ancestors and X-Frame-Options instruct browsers not to render the page inside iframes on other domains.',
      },
      {
        id: 4,
        question: 'How do Anti-CSRF (Cross-Site Request Forgery) Tokens protect state-changing user requests?',
        options: [
          'They ensure requests include an unpredictable, secret token validated by the server that external third-party sites cannot read',
          'They encrypt the entire database on disk',
          'They make HTTP GET requests faster',
          'They force users to enter their password on every mouse click',
        ],
        correctAnswer: 0,
        explanation: 'CSRF tokens ensure that state-changing actions (like transfers or password changes) originated intentionally from the legitimate site.',
      },
      {
        id: 5,
        question: 'What does the HttpOnly flag on a session cookie accomplish?',
        options: [
          'Prevents client-side scripts (such as JavaScript XSS) from accessing the cookie document.cookie',
          'Forces the cookie to only be transmitted over unencrypted HTTP',
          'Deletes the cookie after 5 seconds',
          'Prevents the web server from reading the cookie',
        ],
        correctAnswer: 0,
        explanation: 'HttpOnly blocks client-side JavaScript from reading sensitive session cookies, neutralizing cookie-theft XSS attacks.',
      },
    ],
  },

  // 7. Full-Stack MERN & Next.js
  mern_fullstack: {
    title: 'Full-Stack MERN & Next.js 14 Architecture Exam',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is the primary benefit of React Server Components (RSC) in Next.js App Router?',
        options: [
          'Zero client-side bundle impact for server components, direct backend data access, and faster initial page loads',
          'Removing JavaScript support from web browsers',
          'Replacing CSS stylesheets with PHP templates',
          'Disabling all interactive buttons',
        ],
        correctAnswer: 0,
        explanation: 'Server components render on the server, keeping large dependencies out of client JavaScript bundles while fetching data directly.',
      },
      {
        id: 2,
        question: 'In MongoDB, what does indexing a field (e.g. { email: 1 }) achieve?',
        options: [
          'Greatly accelerates search query performance by avoiding full collection scans',
          'Encrypts the field using quantum algorithms',
          'Automatically deletes duplicate documents every hour',
          'Limits the maximum number of users to 100',
        ],
        correctAnswer: 0,
        explanation: 'Indexes create ordered B-tree data structures allowing MongoDB to locate documents in logarithmic time (O(log N)) rather than scanning every document (O(N)).',
      },
      {
        id: 3,
        question: 'What is the purpose of Middleware in Express.js?',
        options: [
          'Functions that execute during the request-response cycle to perform authentication, logging, error handling, or validation',
          'A physical cable connecting database servers',
          'A tool used only for designing CSS gradients',
          'A replacement for Node.js event loops',
        ],
        correctAnswer: 0,
        explanation: 'Express middleware functions intercept incoming HTTP requests, process data (like verifying JWTs), and call next() or send responses.',
      },
      {
        id: 4,
        question: 'What does useEffect with an empty dependency array [] represent in a React functional component?',
        options: [
          'The effect runs exactly once after the component mounts',
          'The effect runs on every single render continuously in an infinite loop',
          'The component is destroyed immediately',
          'State updates are blocked completely',
        ],
        correctAnswer: 0,
        explanation: 'An empty dependency array [] tells React to execute the effect only when the component is initially mounted into the DOM.',
      },
      {
        id: 5,
        question: 'In REST API design, which HTTP method is idempotent and used to completely replace an existing resource?',
        options: [
          'PUT',
          'POST',
          'PATCH',
          'DELETE',
        ],
        correctAnswer: 0,
        explanation: 'PUT is idempotent and replaces the target resource representation in its entirety with the request payload.',
      },
    ],
  },

  // 8. Modern UI/UX Design & Figma
  ui_ux: {
    title: 'Modern UI/UX Design Systems & Prototyping Exam',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'In Figma, what feature allows components and frames to automatically resize based on their content and padding?',
        options: [
          'Auto Layout',
          'Smart Animate',
          'Vector Networks',
          'Color Styles',
        ],
        correctAnswer: 0,
        explanation: 'Auto Layout lets you create responsive designs that automatically adapt when text changes or items are added.',
      },
      {
        id: 2,
        question: 'What is the standard WCAG AAA contrast ratio requirement for regular body text against background colors?',
        options: [
          '7:1',
          '1.5:1',
          '3:1',
          '10:1',
        ],
        correctAnswer: 0,
        explanation: 'WCAG AAA requires a minimum contrast ratio of 7:1 for normal text (and 4.5:1 for large text).',
      },
      {
        id: 3,
        question: 'What is a Design Token in enterprise design systems?',
        options: [
          'Named variables storing design decisions like colors, typography, spacing, and elevation in platform-agnostic formats',
          'A cryptocurrency used to buy Figma licenses',
          'A physical badge worn by graphic designers',
          'An encrypted password stored in local storage',
        ],
        correctAnswer: 0,
        explanation: 'Design tokens encapsulate design choices (e.g., color-primary: #4F46E5) for seamless cross-platform synchronization between design and code.',
      },
      {
        id: 4,
        question: 'Which UX law states that the time required to rapidly move to a target area is a function of the ratio between distance and target width?',
        options: [
          'Fitts\'s Law',
          'Hick\'s Law',
          'Miller\'s Law',
          'Jakob\'s Law',
        ],
        correctAnswer: 0,
        explanation: 'Fitts\'s Law emphasizes making high-priority interactive targets larger and closer to the user\'s pointer.',
      },
      {
        id: 5,
        question: 'What is the purpose of interactive component variants in Figma?',
        options: [
          'Grouping related states (e.g. default, hover, active, disabled) into a single reusable component set',
          'Exporting MP4 videos directly from Figma',
          'Writing backend SQL queries inside Figma frames',
          'Compressing vector icons to raster JPGs',
        ],
        correctAnswer: 0,
        explanation: 'Component variants organize different states, sizes, and hierarchies under a unified component interface for design consistency.',
      },
    ],
  },

  // 9. Data Structures & Algorithms
  dsa: {
    title: 'Data Structures & Algorithms in Java & C++ Exam',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is the average and worst-case time complexity of accessing an element in an Array by its index?',
        options: [
          'O(1) Constant Time',
          'O(N) Linear Time',
          'O(log N) Logarithmic Time',
          'O(N^2) Quadratic Time',
        ],
        correctAnswer: 0,
        explanation: 'Arrays allocate contiguous memory blocks, allowing constant-time O(1) random access via base address offset calculation.',
      },
      {
        id: 2,
        question: 'Which data structure follows the First-In, First-Out (FIFO) principle?',
        options: [
          'Queue',
          'Stack',
          'Binary Search Tree',
          'Max-Heap',
        ],
        correctAnswer: 0,
        explanation: 'Queues enforce FIFO ordering where elements are added at the rear and removed from the front.',
      },
      {
        id: 3,
        question: 'What is the optimal time complexity of Merge Sort algorithm on an array of N elements?',
        options: [
          'O(N log N) in all cases (best, average, worst)',
          'O(N^2) in the worst case',
          'O(N) Linear Time',
          'O(1) Constant Space',
        ],
        correctAnswer: 0,
        explanation: 'Merge Sort uses divide-and-conquer to split arrays in log N levels and merges them in O(N) time per level, guaranteeing O(N log N).',
      },
      {
        id: 4,
        question: 'In a Hash Table with good hash distribution, what is the average time complexity for insertion, lookup, and deletion?',
        options: [
          'O(1) Average Time',
          'O(N log N)',
          'O(N!) Factorial Time',
          'O(sqrt(N))',
        ],
        correctAnswer: 0,
        explanation: 'Hash maps map keys to bucket indices directly via hash functions, achieving O(1) average lookup and insertion.',
      },
      {
        id: 5,
        question: 'What algorithmic technique solves complex optimization problems by breaking them down into simpler overlapping subproblems with memoization?',
        options: [
          'Dynamic Programming (DP)',
          'Greedy Heuristic Selection',
          'Brute Force Permutation',
          'Randomized Monte Carlo Search',
        ],
        correctAnswer: 0,
        explanation: 'Dynamic Programming stores solutions to subproblems to avoid redundant recalculation, converting exponential complexity to polynomial time.',
      },
    ],
  },
};

// Smart Quiz Resolver: maps any course to its curated technical exam or dynamically generates one
export function getQuizForCourse(course) {
  if (!course) return COURSE_QUIZZES.mern_fullstack;

  // If the course already has a custom quiz defined on itself
  if (course.quiz && Array.isArray(course.quiz.questions) && course.quiz.questions.length > 0) {
    return {
      title: course.quiz.title || `${course.title} Official Certification Exam`,
      passingScore: course.quiz.passingScore || 70,
      questions: course.quiz.questions,
    };
  }

  const str = `${course.id || ''} ${course._id || ''} ${course.title || ''} ${course.category || ''} ${course.techStack?.join(' ') || ''}`.toLowerCase();

  if (str.includes('ci/cd') || str.includes('docker') || str.includes('actions') || str.includes('pipeline') || str.includes('devops')) {
    return COURSE_QUIZZES.ci_cd;
  }
  if (str.includes('ai') || str.includes('machine learning') || str.includes('neural') || str.includes('pytorch') || str.includes('python')) {
    return COURSE_QUIZZES.ai_ml;
  }
  if (str.includes('gcp') || str.includes('cloud') || str.includes('gke') || str.includes('kubernetes') || str.includes('bigquery')) {
    return COURSE_QUIZZES.gcp_cloud;
  }
  if (str.includes('crypto') || str.includes('aes') || str.includes('rsa') || str.includes('tls') || str.includes('encryption')) {
    return COURSE_QUIZZES.cryptography;
  }
  if (str.includes('flutter') || str.includes('dart') || str.includes('mobile') || str.includes('ios') || str.includes('android')) {
    return COURSE_QUIZZES.flutter;
  }
  if (str.includes('security') || str.includes('owasp') || str.includes('vulnerab') || str.includes('hacking') || str.includes('burp')) {
    return COURSE_QUIZZES.web_security;
  }
  if (str.includes('design') || str.includes('figma') || str.includes('ui') || str.includes('ux') || str.includes('prototype')) {
    return COURSE_QUIZZES.ui_ux;
  }
  if (str.includes('algorithm') || str.includes('dsa') || str.includes('data structure') || str.includes('c++') || str.includes('java')) {
    return COURSE_QUIZZES.dsa;
  }

  // Default to MERN / Modern Full-Stack web dev
  return {
    title: `${course.title || 'Course'} Official Certification Exam`,
    passingScore: 70,
    questions: COURSE_QUIZZES.mern_fullstack.questions.map((q, idx) => ({
      ...q,
      id: idx + 1,
    })),
  };
}
