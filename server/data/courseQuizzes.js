// Comprehensive Subject-Specific Technical Quiz Question Banks & Strict Token Matcher (Server Copy)

export const COURSE_QUIZZES = {
  // 1. PHP & MySQL Backend Web Engineering
  php: {
    subject: 'PHP & MySQL Backend Engineering',
    title: 'PHP 8 & MySQL Backend Web Engineering Certification Exam',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'Which database extension in PHP is recommended for secure, parameterized database queries across multiple SQL drivers?',
        options: [
          'PDO (PHP Data Objects)',
          'mysql_connect() (Deprecated legacy extension)',
          'fopen() text parser',
          'eval() SQL string evaluator',
        ],
        correctAnswer: 0,
        explanation: 'PDO provides a data-access abstraction layer with built-in prepared statement support, preventing SQL injection.',
      },
      {
        id: 2,
        question: 'Which superglobal array in PHP contains form data submitted via the HTTP POST method?',
        options: [
          '$_POST',
          '$_GET',
          '$_SERVER',
          '$_SESSION',
        ],
        correctAnswer: 0,
        explanation: '$_POST is an associative array of variables passed to the current script via the HTTP POST method.',
      },
      {
        id: 3,
        question: 'What is Composer in the PHP ecosystem?',
        options: [
          'The official dependency and package management tool for PHP libraries',
          'A web browser built for PHP development',
          'A command to reboot the Apache web server',
          'A database compression algorithm',
        ],
        correctAnswer: 0,
        explanation: 'Composer manages project dependencies, libraries, and PSR-4 autoloading for modern PHP applications.',
      },
      {
        id: 4,
        question: 'In Object-Oriented PHP 8+, how do you define a constructor with Constructor Property Promotion?',
        options: [
          'public function __construct(public string $name, public int $age) {}',
          'function create($name, $age) { this.name = name; }',
          'constructor($name, $age) -> Object',
          'init($name, $age) := struct',
        ],
        correctAnswer: 0,
        explanation: 'PHP 8 allows declaring class properties directly inside constructor parameter signatures with visibility modifiers.',
      },
      {
        id: 5,
        question: 'Which function must be invoked before sending any output to initialize or resume a PHP session?',
        options: [
          'session_start()',
          'session_register()',
          'start_cookie()',
          'init_session()',
        ],
        correctAnswer: 0,
        explanation: 'session_start() initializes session data and sends the session cookie header before any HTML/text output is sent.',
      },
    ],
  },

  // 2. Python Programming & Scripting
  python: {
    subject: 'Python Programming',
    title: 'Python Programming, Data Structures & Scripting Exam',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is the key difference between a Python List and a Python Tuple?',
        options: [
          'Lists are mutable (can be modified), whereas Tuples are immutable (cannot be modified after creation)',
          'Tuples can only store numbers, while Lists store text',
          'Lists use parentheses () while Tuples use square brackets []',
          'Tuples execute in GPU memory while Lists execute in CPU memory',
        ],
        correctAnswer: 0,
        explanation: 'Lists are mutable sequences defined with [], whereas tuples are immutable sequences defined with ().',
      },
      {
        id: 2,
        question: 'What does the `yield` keyword in a Python function do?',
        options: [
          'Turns the function into a Generator that produces values lazily on demand without loading all items into memory at once',
          'Terminates the program immediately with an error code',
          'Imports a third-party module from PyPI',
          'Converts variable types from integer to float',
        ],
        correctAnswer: 0,
        explanation: 'Yield produces generator iterators that compute values one by one, saving memory for massive datasets.',
      },
      {
        id: 3,
        question: 'What is the Global Interpreter Lock (GIL) in CPython?',
        options: [
          'A mutex that allows only one native thread to execute Python bytecode at a time in a single process',
          'A hardware lock on motherboard CPUs',
          'A security password required to run Python scripts',
          'A database lock for SQLite databases',
        ],
        correctAnswer: 0,
        explanation: 'The GIL synchronizes thread execution in CPython to prevent race conditions in Python memory management.',
      },
      {
        id: 4,
        question: 'Which built-in Python function is used to apply a function over an iterable and filter elements based on truthiness?',
        options: [
          'filter() and map()',
          'eval() and exec()',
          'sort() and slice()',
          'append() and extend()',
        ],
        correctAnswer: 0,
        explanation: 'filter(func, iterable) filters elements, while map(func, iterable) transforms each item in the sequence.',
      },
      {
        id: 5,
        question: 'What is a Python Decorator?',
        options: [
          'A function that takes another function as an argument and extends its behavior without explicitly modifying it',
          'A graphical CSS theme for Tkinter apps',
          'A comment symbol (#)',
          'A tool used to format code indentation',
        ],
        correctAnswer: 0,
        explanation: 'Decorators (@decorator_name) wrap functions to add logging, authentication, caching, or timing dynamically.',
      },
    ],
  },

  // 3. Machine Learning & Artificial Intelligence
  ai_ml: {
    subject: 'Artificial Intelligence & Machine Learning',
    title: 'AI, Machine Learning & Deep Neural Networks Assessment',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'In Supervised Machine Learning, what defines the training dataset?',
        options: [
          'Input features paired with corresponding ground-truth target labels',
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

  // 4. React & Next.js
  react_next: {
    subject: 'React & Next.js Frontend Development',
    title: 'React 18 & Next.js 14 Enterprise Architecture Exam',
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
        question: 'In React, what hook should be used to memoize expensive calculation results between re-renders?',
        options: [
          'useMemo()',
          'useCallback()',
          'useRef()',
          'useEffect()',
        ],
        correctAnswer: 0,
        explanation: 'useMemo caches the result of a calculation between renders until its dependencies change.',
      },
      {
        id: 3,
        question: 'Why should keys provided to list elements in React be unique and stable IDs rather than array index numbers?',
        options: [
          'To help React correctly identify which items have changed, been added, or removed during virtual DOM reconciliation',
          'To apply CSS border colors',
          'To format numbers as currency',
          'To make API calls faster',
        ],
        correctAnswer: 0,
        explanation: 'Stable keys ensure the Virtual DOM diffing algorithm preserves component state and avoids rendering bugs when list order changes.',
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
        question: 'How do you share state globally across deep React component trees without prop-drilling?',
        options: [
          'React Context API (createContext, useContext) or state libraries (Zustand/Redux)',
          'Passing props through 20 parent levels manually',
          'Using document.getElementById() inside components',
          'Reloading the browser page on every click',
        ],
        correctAnswer: 0,
        explanation: 'Context API and modern state stores provide clean global state access to any consuming child component without prop-drilling.',
      },
    ],
  },

  // 5. Node.js & Express
  node_express: {
    subject: 'Node.js & Backend APIs',
    title: 'Node.js & Express REST API Architecture Exam',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is the Node.js Event Loop primarily responsible for?',
        options: [
          'Offloading asynchronous non-blocking I/O operations and executing callback queues on a single main thread',
          'Compiling C++ code into binary files',
          'Formatting JSON strings into HTML tables',
          'Managing GPU shader pipelines',
        ],
        correctAnswer: 0,
        explanation: 'The event loop processes non-blocking I/O tasks asynchronously via libuv, handling thousands of concurrent network connections efficiently.',
      },
      {
        id: 2,
        question: 'In Express.js, what does the next() function inside a middleware do?',
        options: [
          'Passes control to the next matching middleware function or route handler in the stack',
          'Immediately sends an HTTP 500 error response',
          'Restarts the Node.js server process',
          'Clears all cookies from the client browser',
        ],
        correctAnswer: 0,
        explanation: 'Calling next() passes the request and response objects to the subsequent middleware or route handler in Express.',
      },
      {
        id: 3,
        question: 'Which HTTP status code signifies that a requested resource was successfully created on the server?',
        options: [
          '201 Created',
          '200 OK',
          '204 No Content',
          '400 Bad Request',
        ],
        correctAnswer: 0,
        explanation: 'HTTP 201 Created is the standard REST response indicating that one or more new resources have been successfully created.',
      },
      {
        id: 4,
        question: 'How should unhandled Promise rejections and uncaught exceptions be managed in production Node.js servers?',
        options: [
          'Catch errors with try/catch, use global process.on("unhandledRejection") handlers, log with monitoring tools, and perform graceful shutdown if necessary',
          'Ignore errors and let the process freeze',
          'Delete the node_modules folder',
          'Disable error reporting completely in production',
        ],
        correctAnswer: 0,
        explanation: 'Robust error handling with structured logging and process managers (like PM2 or Docker) ensures server reliability.',
      },
      {
        id: 5,
        question: 'What is CORS (Cross-Origin Resource Sharing) middleware used for in Express APIs?',
        options: [
          'Configuring HTTP response headers that permit web browsers on different domains to make secure API requests',
          'Encrypting hard drives on the server',
          'Translating JavaScript into English',
          'Creating database backups every night',
        ],
        correctAnswer: 0,
        explanation: 'CORS middleware sets Access-Control-Allow-Origin headers to govern cross-origin HTTP requests from client browser frontends.',
      },
    ],
  },

  // 6. Java Enterprise & OOP
  java: {
    subject: 'Java Enterprise & Spring',
    title: 'Java Enterprise, Spring Boot & OOP Certification Exam',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is the role of the JVM (Java Virtual Machine)?',
        options: [
          'Executes compiled Java bytecode (.class files) on any underlying hardware platform ("Write Once, Run Anywhere")',
          'A text editor for typing Java source code',
          'A physical chip installed on computer motherboards',
          'A database query optimizer for Oracle databases',
        ],
        correctAnswer: 0,
        explanation: 'The JVM provides platform independence by converting Java bytecode into native machine instructions at runtime via JIT compilation.',
      },
      {
        id: 2,
        question: 'What is the difference between an Interface and an Abstract Class in Java?',
        options: [
          'A class can implement multiple interfaces, but can only inherit from one abstract class (single inheritance)',
          'Interfaces can have instance variables with state, while abstract classes cannot',
          'Abstract classes cannot have constructors',
          'Interfaces are only available in Android SDK',
        ],
        correctAnswer: 0,
        explanation: 'Java supports multiple interface implementation, allowing classes to adhere to multiple contract specifications while retaining single class inheritance.',
      },
      {
        id: 3,
        question: 'In the Spring Framework, what does Inversion of Control (IoC) and Dependency Injection (DI) accomplish?',
        options: [
          'Spring manages object creation, configuration, and lifecycle dependencies rather than having classes instantiate their own dependencies with "new"',
          'Disables database transactions',
          'Replaces Java with Python at runtime',
          'Converts REST APIs into SOAP XML',
        ],
        correctAnswer: 0,
        explanation: 'IoC Container manages object lifecycle and injects required dependencies (@Autowired) to promote loose coupling and testability.',
      },
      {
        id: 4,
        question: 'What is the purpose of the Garbage Collector in Java?',
        options: [
          'Automatically reclaims heap memory by destroying objects that are no longer reachable by running threads',
          'Deletes unused .java files from the hard drive',
          'Closes browser tabs after 10 minutes',
          'Formats source code to follow Google Java style',
        ],
        correctAnswer: 0,
        explanation: 'Java Garbage Collection automatically manages memory allocation and deallocation, preventing manual memory leaks.',
      },
      {
        id: 5,
        question: 'Which collection class in Java provides thread-safe, high-concurrency key-value storage without locking the entire table?',
        options: [
          'ConcurrentHashMap',
          'HashMap',
          'ArrayList',
          'TreeSet',
        ],
        correctAnswer: 0,
        explanation: 'ConcurrentHashMap uses bucket-level locking and lock-free CAS operations for high-throughput concurrent reads and writes.',
      },
    ],
  },

  // 7. C++ & Data Structures
  cpp_dsa: {
    subject: 'Data Structures & Algorithms (C++ / Java)',
    title: 'Data Structures, Algorithms & Systems Programming Exam',
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

  // 8. CI/CD & DevOps
  ci_cd: {
    subject: 'CI/CD Pipelines & DevOps',
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
          'Continuous delivery requires manual approval before deploying to production, whereas continuous deployment deploys automatically upon passing tests.',
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
          'Reducing the final container image size by discarding intermediate build dependencies and compilers',
          'Running multiple distinct containers on the same port',
          'Speeding up git clone times inside the container',
          'Preventing containers from shutting down when an error occurs',
        ],
        correctAnswer: 0,
        explanation: 'Multi-stage builds allow separating build-time compilers from the lean production runtime, drastically shrinking production container images.',
      },
    ],
  },

  // 9. Google Cloud Platform (GCP) & Cloud Infrastructure
  gcp_cloud: {
    subject: 'Google Cloud Platform (GCP) & GKE',
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

  // 10. Applied Cryptography & Security
  cryptography: {
    subject: 'Applied Cryptography & TLS 1.3',
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

  // 11. Flutter 3 & Dart
  flutter: {
    subject: 'Flutter & Dart Mobile Development',
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

  // 12. Web Security & OWASP
  web_security: {
    subject: 'Web Security & OWASP',
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

  // 13. Modern UI/UX Design & Figma
  ui_ux: {
    subject: 'UI/UX Design Systems & Figma',
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

  // 14. SQL, NoSQL & Databases
  databases: {
    subject: 'Databases (SQL & NoSQL)',
    title: 'Relational & NoSQL Database Architecture Exam',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What does ACID stand for in relational database management systems?',
        options: [
          'Atomicity, Consistency, Isolation, Durability',
          'Asynchronous, Concurrent, Indexed, Distributed',
          'Array, Column, Index, Document',
          'Authentication, Cryptography, Integrity, Decryption',
        ],
        correctAnswer: 0,
        explanation: 'ACID guarantees that database transactions are processed reliably even in the event of hardware failure or errors.',
      },
      {
        id: 2,
        question: 'In SQL, what is the difference between an INNER JOIN and a LEFT JOIN?',
        options: [
          'INNER JOIN returns only rows that match in both tables, while LEFT JOIN returns all rows from the left table and matched rows from the right',
          'LEFT JOIN deletes rows from the right table',
          'INNER JOIN can only be used with primary keys',
          'There is no difference between INNER and LEFT joins',
        ],
        correctAnswer: 0,
        explanation: 'LEFT JOIN retains all records from the primary (left) table even if corresponding matches do not exist in the right table.',
      },
      {
        id: 3,
        question: 'What is the primary benefit of creating a B-Tree Database Index on frequently queried columns?',
        options: [
          'Transforms full-table sequential scans (O(N)) into logarithmic tree traversals (O(log N)), accelerating SELECT query speed',
          'Compresses the table so it uses zero megabytes',
          'Automatically capitalizes customer names',
          'Sends email notifications when records update',
        ],
        correctAnswer: 0,
        explanation: 'Indexes create sorted auxiliary data structures that allow the query planner to quickly locate matching records without scanning the whole table.',
      },
      {
        id: 4,
        question: 'In MongoDB, which pipeline operator is used to filter documents before grouping or projecting in aggregate()?',
        options: [
          '$match',
          '$group',
          '$project',
          '$unwind',
        ],
        correctAnswer: 0,
        explanation: '$match acts as the WHERE clause in MongoDB aggregation pipelines, filtering matching documents early.',
      },
      {
        id: 5,
        question: 'What is Database Normalization (1NF, 2NF, 3NF) primarily designed to achieve?',
        options: [
          'Minimizing duplicate redundant data and preventing insertion, update, and deletion anomalies',
          'Speeding up computer CPU fans',
          'Converting SQL queries to Python bytecode',
          'Limiting tables to 10 rows',
        ],
        correctAnswer: 0,
        explanation: 'Normalization organizes relational tables to eliminate redundancy and maintain consistent data dependencies.',
      },
    ],
  },

  // 15. HTML5, CSS3 & Responsive Web Design
  html_css: {
    subject: 'HTML5, CSS3 & Modern Styling',
    title: 'HTML5 Semantic Layouts, Modern CSS3 & Responsive Design Exam',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'Which HTML5 semantic element should be used to encapsulate self-contained composition that is independently distributable (like a blog post or news story)?',
        options: [
          '<article>',
          '<section>',
          '<div>',
          '<span>',
        ],
        correctAnswer: 0,
        explanation: '<article> represents an independent piece of content that could stand alone in syndication.',
      },
      {
        id: 2,
        question: 'In CSS Flexbox, which property aligns flex items along the cross-axis?',
        options: [
          'align-items',
          'justify-content',
          'flex-direction',
          'flex-wrap',
        ],
        correctAnswer: 0,
        explanation: 'justify-content aligns items along the main axis, while align-items aligns items along the perpendicular cross axis.',
      },
      {
        id: 3,
        question: 'What is the CSS specificity order from highest to lowest?',
        options: [
          '!important > Inline styles > ID selector (#) > Class (.class) / Attribute / Pseudo-class > Element (tag) selector',
          'Element selector > Class selector > ID selector',
          'Tag selector > Universal (*) > ID selector',
          'Inline styles > !important > Element',
        ],
        correctAnswer: 0,
        explanation: 'CSS specificity evaluates inline styles (1,0,0,0), IDs (0,1,0,0), classes (0,0,1,0), and element types (0,0,0,1).',
      },
      {
        id: 4,
        question: 'In CSS Grid, how do you create 3 equal-width columns that automatically fill the container?',
        options: [
          'grid-template-columns: repeat(3, 1fr);',
          'grid-columns: 33.3%;',
          'display: 3-column;',
          'columns: 3;',
        ],
        correctAnswer: 0,
        explanation: 'repeat(3, 1fr) distributes available container space equally across 3 fractional unit columns.',
      },
      {
        id: 5,
        question: 'What is the purpose of the viewport meta tag <meta name="viewport" content="width=device-width, initial-scale=1.0">?',
        options: [
          'Ensures the webpage renders at the native screen width of mobile devices without desktop scale distortion',
          'Loads Google Fonts automatically',
          'Disables touch screen scrolling',
          'Translates website text into Spanish',
        ],
        correctAnswer: 0,
        explanation: 'The viewport meta tag establishes the virtual viewport width matching physical device pixels for responsive design.',
      },
    ],
  },
};

// Precise Subject & Keyword-Boundary Quiz Resolver
export function getQuizForCourse(course) {
  if (!course) return COURSE_QUIZZES.react_next;

  // 1. If course has custom quiz embedded
  if (course.quiz && Array.isArray(course.quiz.questions) && course.quiz.questions.length > 0) {
    return {
      subject: course.quiz.subject || course.category || 'Course Assessment',
      title: course.quiz.title || `${course.title} Official Certification Exam`,
      passingScore: course.quiz.passingScore || 70,
      questions: course.quiz.questions,
    };
  }

  // Combine title, subtitle, description, category, techStack, and module titles
  const moduleTitles = (course.modules || []).map((m) => m.title).join(' ');
  const lessonTitles = (course.modules || []).flatMap((m) => m.lessons || []).map((l) => l.title).join(' ');
  const rawText = `${course.title || ''} ${course.subtitle || ''} ${course.description || ''} ${course.category || ''} ${course.techStack?.join(' ') || ''} ${moduleTitles} ${lessonTitles}`.toLowerCase();

  // 2. Strict Subject Matching

  // PHP / Laravel / WordPress / MySQL Backend
  if (/\b(php|laravel|symfony|wordpress|codeigniter|lamp|php8)\b/i.test(rawText)) {
    return { ...COURSE_QUIZZES.php, title: `${course.title || 'PHP'} Official Certification Exam` };
  }

  // Flutter / Dart / Mobile Apps
  if (/\b(flutter|dart|mobile app|cross-platform|ios|android)\b/i.test(rawText) && !/\bjava\b/i.test(rawText)) {
    return { ...COURSE_QUIZZES.flutter, title: `${course.title || 'Flutter'} Official Certification Exam` };
  }

  // Cryptography / TLS / Encryption
  if (/\b(cryptography|crypto|aes|rsa|tls|encryption|cipher|hash|pki|openssl)\b/i.test(rawText)) {
    return { ...COURSE_QUIZZES.cryptography, title: `${course.title || 'Cryptography'} Official Certification Exam` };
  }

  // Web Security / OWASP / Ethical Hacking
  if (/\b(owasp|security|cybersecurity|vulnerability|vulnerabilities|hacking|burp|penetration|xss|sqli|csrf)\b/i.test(rawText)) {
    return { ...COURSE_QUIZZES.web_security, title: `${course.title || 'Web Security'} Official Certification Exam` };
  }

  // CI/CD / Docker / DevOps / GitHub Actions
  if (/\b(ci\/cd|cicd|docker|devops|github actions|pipeline|pipelines|continuous integration|continuous deployment)\b/i.test(rawText)) {
    return { ...COURSE_QUIZZES.ci_cd, title: `${course.title || 'DevOps'} Official Certification Exam` };
  }

  // Google Cloud / GCP / Cloud Infrastructure
  if (/\b(gcp|google cloud|bigquery|cloud run|gke|kubernetes|aws|azure|cloud infrastructure|terraform)\b/i.test(rawText)) {
    return { ...COURSE_QUIZZES.gcp_cloud, title: `${course.title || 'Cloud Computing'} Official Certification Exam` };
  }

  // Machine Learning / AI / Deep Learning (Strict Word Boundary)
  if (
    /\b(machine learning|deep learning|artificial intelligence|pytorch|tensorflow|scikit|neural|data science|nlp|computer vision|llm)\b/i.test(rawText) ||
    /\b(ai|ml)\b/i.test(rawText)
  ) {
    return { ...COURSE_QUIZZES.ai_ml, title: `${course.title || 'AI & Machine Learning'} Official Certification Exam` };
  }

  // Python Core
  if (/\b(python|django|flask|numpy|pandas|scipy)\b/i.test(rawText)) {
    return { ...COURSE_QUIZZES.python, title: `${course.title || 'Python'} Official Certification Exam` };
  }

  // Java & Spring (excluding javascript)
  if (/\b(java|spring boot|spring framework|hibernate|jvm|jpa)\b/i.test(rawText) && !/\bjavascript\b/i.test(rawText)) {
    return { ...COURSE_QUIZZES.java, title: `${course.title || 'Java Enterprise'} Official Certification Exam` };
  }

  // C++ / Data Structures & Algorithms
  if (/\b(c\+\+|cpp|data structure|data structures|algorithm|algorithms|dsa|leetcode|binary search|sorting)\b/i.test(rawText)) {
    return { ...COURSE_QUIZZES.cpp_dsa, title: `${course.title || 'Data Structures & Algorithms'} Official Certification Exam` };
  }

  // UI/UX & Figma
  if (/\b(figma|ui\/ux|ui|ux|design system|prototyping|wireframe|wireframing|user interface|user experience)\b/i.test(rawText)) {
    return { ...COURSE_QUIZZES.ui_ux, title: `${course.title || 'UI/UX Design'} Official Certification Exam` };
  }

  // Databases (SQL / MongoDB / NoSQL)
  if (/\b(sql|mysql|postgresql|postgres|mongodb|nosql|database|databases|schema|queries)\b/i.test(rawText)) {
    return { ...COURSE_QUIZZES.databases, title: `${course.title || 'Database Systems'} Official Certification Exam` };
  }

  // Node.js & Express / Backend REST APIs
  if (/\b(node|nodejs|node\.js|express|expressjs|backend|microservices|rest api|restful)\b/i.test(rawText)) {
    return { ...COURSE_QUIZZES.node_express, title: `${course.title || 'Node.js & Backend'} Official Certification Exam` };
  }

  // HTML / CSS / Responsive Web Design
  if (/\b(html|html5|css|css3|flexbox|css grid|web design|responsive web)\b/i.test(rawText)) {
    return { ...COURSE_QUIZZES.html_css, title: `${course.title || 'Web Design'} Official Certification Exam` };
  }

  // React & Next.js / Modern Full-Stack
  return {
    ...COURSE_QUIZZES.react_next,
    title: `${course.title || 'Full-Stack Web Engineering'} Official Certification Exam`,
  };
}
