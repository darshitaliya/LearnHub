// Comprehensive Subject-Specific Quiz Engine & Dynamic Course-Name Quiz Generator

export const SUBJECT_QUIZZES = {
  // 1. PHP & Laravel & MySQL
  php: {
    subject: 'PHP & MySQL Web Development',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'Which PHP database extension provides prepared statements and data-access abstraction across multiple database systems?',
        options: ['PDO (PHP Data Objects)', 'mysql_query() (Deprecated)', 'fopen() file handler', 'eval() executor'],
        correctAnswer: 0,
        explanation: 'PDO is the standard, secure database abstraction interface in modern PHP that prevents SQL injection attacks.',
      },
      {
        id: 2,
        question: 'Which superglobal in PHP is used to collect form data submitted with method="post"?',
        options: ['$_POST', '$_GET', '$_SERVER', '$_REQUEST_POST'],
        correctAnswer: 0,
        explanation: '$_POST is the associative array containing variables sent via HTTP POST.',
      },
      {
        id: 3,
        question: 'What is the purpose of Composer in modern PHP development?',
        options: ['Dependency and package management for PHP libraries', 'A visual GUI database designer', 'A web browser built for PHP', 'A PHP code encryption tool'],
        correctAnswer: 0,
        explanation: 'Composer manages third-party libraries and generates PSR-compliant autoloaders.',
      },
      {
        id: 4,
        question: 'In PHP 8+, how can class properties be declared and initialized directly inside constructor parameters?',
        options: ['Constructor Property Promotion: public function __construct(public string $name) {}', 'Through global variables', 'Using $this->bind() in header', 'By defining XML metadata files'],
        correctAnswer: 0,
        explanation: 'PHP 8 introduced Constructor Property Promotion to drastically reduce boilerplate code.',
      },
      {
        id: 5,
        question: 'Which function must be executed before sending any HTML output to initialize or resume a user session?',
        options: ['session_start()', 'session_begin()', 'init_cookie()', 'start_php_session()'],
        correctAnswer: 0,
        explanation: 'session_start() initializes the session and sends session cookies in HTTP response headers.',
      },
    ],
  },

  // 2. Python & Django & Flask
  python: {
    subject: 'Python Programming & Frameworks',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is the fundamental difference between a Python List and a Python Tuple?',
        options: ['Lists are mutable (can be changed), while Tuples are immutable (cannot be changed after creation)', 'Tuples can only store numbers', 'Lists use parentheses () while Tuples use square brackets []', 'Lists execute on GPU only'],
        correctAnswer: 0,
        explanation: 'Lists are mutable sequences [], whereas tuples are immutable fixed sequences ().',
      },
      {
        id: 2,
        question: 'What does the `yield` keyword do inside a Python function?',
        options: ['Turns the function into a Generator that yields values lazily one-by-one to save memory', 'Stops the program with an exception', 'Imports external C libraries', 'Deletes variables from RAM'],
        correctAnswer: 0,
        explanation: 'Yield returns a generator iterator that computes elements on demand without loading everything in memory.',
      },
      {
        id: 3,
        question: 'What is a Python Decorator (@decorator)?',
        options: ['A function that takes another function as an argument to extend its behavior dynamically', 'A graphical styling tool for Tkinter', 'A comment tag for documentation', 'A module installer'],
        correctAnswer: 0,
        explanation: 'Decorators wrap existing functions to add logging, authentication, caching, or rate limiting cleanly.',
      },
      {
        id: 4,
        question: 'What does the Global Interpreter Lock (GIL) in CPython do?',
        options: ['Ensures only one thread executes Python bytecode at a time to keep reference counts thread-safe', 'Locks the database file', 'Encrypts source code on disk', 'Prevents script debugging'],
        correctAnswer: 0,
        explanation: 'The GIL synchronizes thread execution in CPython to protect memory management and reference counting.',
      },
      {
        id: 5,
        question: 'Which built-in Python data structure uses a Hash Table to provide average O(1) key-value lookups?',
        options: ['Dictionary (dict)', 'List (list)', 'Tuple (tuple)', 'Linked List'],
        correctAnswer: 0,
        explanation: 'Python dicts are optimized hash tables that provide O(1) average lookup, insertion, and deletion.',
      },
    ],
  },

  // 3. Java & Spring Boot
  java: {
    subject: 'Java Enterprise & Spring Boot',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is the primary role of the Java Virtual Machine (JVM)?',
        options: ['To execute compiled Java bytecode (.class files) across any operating system', 'A desktop IDE for writing Java code', 'A relational database server', 'A hardware accelerator on CPU'],
        correctAnswer: 0,
        explanation: 'The JVM provides platform independence ("Write Once, Run Anywhere") by interpreting and JIT-compiling bytecode into native instructions.',
      },
      {
        id: 2,
        question: 'In Spring Boot, what design pattern does Dependency Injection (@Autowired) implement?',
        options: ['Inversion of Control (IoC)', 'Singleton Pattern', 'Factory Method', 'Observer Pattern'],
        correctAnswer: 0,
        explanation: 'Dependency Injection is a form of Inversion of Control where the Spring IoC Container manages object lifecycles.',
      },
      {
        id: 3,
        question: 'What is the difference between an Interface and an Abstract Class in Java?',
        options: ['A class can implement multiple interfaces, but can only inherit from one abstract class', 'Interfaces can have constructors with state', 'Abstract classes cannot have method implementations', 'Interfaces are only for UI'],
        correctAnswer: 0,
        explanation: 'Java supports multiple interface inheritance, whereas single class inheritance applies to abstract classes.',
      },
      {
        id: 4,
        question: 'How does Java Garbage Collection manage heap memory automatically?',
        options: ['Identifies and reclaims objects that are no longer reachable by any running thread', 'Deletes old files from hard disk', 'Shuts down background threads', 'Recompiles code every 5 minutes'],
        correctAnswer: 0,
        explanation: 'The Java GC continuously tracks object references and frees unreferenced memory on the heap.',
      },
      {
        id: 5,
        question: 'Which Java Collection class is optimized for high-concurrency multi-threaded access without locking the whole table?',
        options: ['ConcurrentHashMap', 'HashMap', 'ArrayList', 'Vector'],
        correctAnswer: 0,
        explanation: 'ConcurrentHashMap provides thread safety using bucket-level locks and lock-free CAS operations.',
      },
    ],
  },

  // 4. C & C++ & DSA
  cpp: {
    subject: 'C++ Systems Programming & DSA',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'In C++, what is RAII (Resource Acquisition Is Initialization)?',
        options: ['Binding resource management (memory, file handles, sockets) to object lifetimes so destructors release them automatically', 'A compiler flag for speed', 'A library for graphics', 'A command to reboot the operating system'],
        correctAnswer: 0,
        explanation: 'RAII guarantees that allocated resources are cleanly released when objects exit their scope.',
      },
      {
        id: 2,
        question: 'What is the time complexity to access an element by index in a contiguous Array / std::vector?',
        options: ['O(1) Constant Time', 'O(N) Linear Time', 'O(log N) Logarithmic Time', 'O(N^2)'],
        correctAnswer: 0,
        explanation: 'Arrays store elements contiguously, calculating memory addresses via pointer offsets in constant O(1) time.',
      },
      {
        id: 3,
        question: 'What is the purpose of `std::unique_ptr` in modern C++?',
        options: ['A smart pointer with exclusive ownership of a dynamic object that calls delete automatically on destruction', 'A pointer that allows shared access from 100 threads', 'A pointer to GPU VRAM', 'A pointer that cannot be deleted'],
        correctAnswer: 0,
        explanation: 'std::unique_ptr ensures single ownership without memory leaks or double-free errors.',
      },
      {
        id: 4,
        question: 'Which sorting algorithm guarantees O(N log N) worst-case time complexity while maintaining stability?',
        options: ['Merge Sort', 'Quick Sort', 'Bubble Sort', 'Selection Sort'],
        correctAnswer: 0,
        explanation: 'Merge Sort guarantees O(N log N) time in all cases and preserves duplicate element relative order.',
      },
      {
        id: 5,
        question: 'What is the difference between Stack and Heap memory in C++?',
        options: ['Stack memory is managed automatically in LIFO order; Heap memory is allocated dynamically and managed by the programmer / smart pointers', 'Stack is on hard disk, Heap is in CPU', 'Heap is limited to 1MB', 'Stack cannot store numbers'],
        correctAnswer: 0,
        explanation: 'Stack memory is blazing fast and scoped to function call frames; Heap is flexible dynamic memory.',
      },
    ],
  },

  // 5. JavaScript & TypeScript
  javascript: {
    subject: 'JavaScript & TypeScript Development',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is a JavaScript Closure?',
        options: ['A function that remembers and retains access to its lexical scope variables even when executed outside that scope', 'A tool to close browser windows', 'A syntax error in try/catch', 'A method to delete objects'],
        correctAnswer: 0,
        explanation: 'Closures allow inner functions to access outer scope variables even after the outer function has returned.',
      },
      {
        id: 2,
        question: 'In TypeScript, what is the key difference between an `interface` and a `type` alias?',
        options: ['Interfaces support declaration merging (can be extended multiple times) and are ideal for object contracts; Types can define unions, primitives, and tuples', 'Interfaces only exist in C#', 'Types cannot define objects', 'There is no difference'],
        correctAnswer: 0,
        explanation: 'Interfaces can be merged and extended for object shapes, while types support complex union and mapped types.',
      },
      {
        id: 3,
        question: 'What is the JavaScript Event Loop responsible for?',
        options: ['Managing the execution of asynchronous callbacks, microtasks (Promises), and macrotasks (timers) on a single thread', 'Translating JS to C++', 'Formatting HTML DOM elements', 'Connecting to database ports'],
        correctAnswer: 0,
        explanation: 'The event loop coordinates asynchronous I/O and Promise resolution without blocking the main JavaScript thread.',
      },
      {
        id: 4,
        question: 'What does Promise.all() do when handling an array of Promises?',
        options: ['Resolves when all promises resolve, or rejects immediately as soon as any single promise rejects', 'Runs only the first promise and ignores the rest', 'Runs promises in alphabetical order', 'Converts promises into synchronous alerts'],
        correctAnswer: 0,
        explanation: 'Promise.all waits for all promises to fulfill concurrently or short-circuits on the first rejection.',
      },
      {
        id: 5,
        question: 'What is the purpose of the `async/await` syntax in JavaScript?',
        options: ['Syntactic sugar over Promises that allows writing asynchronous code with clean synchronous-looking structure', 'Forces the code to run in multi-core background processes', 'Disables error throwing', 'Slows down network requests'],
        correctAnswer: 0,
        explanation: 'Async/await simplifies asynchronous code and makes error handling with try/catch intuitive.',
      },
    ],
  },

  // 6. React & Next.js
  react: {
    subject: 'React & Next.js Frontend Development',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is the main advantage of React Server Components (RSC) in Next.js App Router?',
        options: ['Zero JavaScript bundle overhead for server components, direct database fetching, and improved SEO', 'Disabling JavaScript on client devices', 'Replacing CSS with backend SQL', 'Removing the need for web servers'],
        correctAnswer: 0,
        explanation: 'RSCs render purely on the server, streaming lightweight HTML without inflating the client bundle size.',
      },
      {
        id: 2,
        question: 'When should you use the `useMemo` hook in a React component?',
        options: ['To memoize and cache the result of an expensive calculation between renders', 'To trigger network requests on click', 'To style HTML buttons', 'To create global Redux stores'],
        correctAnswer: 0,
        explanation: 'useMemo caches computed values and only recalculates when its declared dependencies change.',
      },
      {
        id: 3,
        question: 'Why must `key` props on mapped React list items be unique and persistent IDs?',
        options: ['To help the Virtual DOM reconciliation algorithm accurately track item additions, removals, and reordering', 'To apply CSS background colors', 'To sort items alphabetically', 'To enable right-click menus'],
        correctAnswer: 0,
        explanation: 'Unique keys prevent rendering bugs and state misalignment during list updates and re-renders.',
      },
      {
        id: 4,
        question: 'What does `useEffect(() => { ... }, [])` with an empty dependency array do?',
        options: ['Executes the callback effect function once after the component mounts into the DOM', 'Runs on every millisecond continuously', 'Unmounts the component immediately', 'Blocks user interactions'],
        correctAnswer: 0,
        explanation: 'An empty dependency array [] indicates the effect has no reactive dependencies and runs only on mount.',
      },
      {
        id: 5,
        question: 'How do you avoid "prop-drilling" when passing state to deeply nested React children?',
        options: ['Using React Context API (createContext/useContext) or global state managers (Zustand/Redux)', 'Passing props down 25 layers manually', 'Using window.alert()', 'Reloading the page on state changes'],
        correctAnswer: 0,
        explanation: 'Context API and state libraries provide direct global state access to consuming child components.',
      },
    ],
  },

  // 7. Node.js & Express
  nodejs: {
    subject: 'Node.js & Backend API Development',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'How does Node.js handle thousands of concurrent network connections efficiently?',
        options: ['Through its single-threaded non-blocking event-driven I/O model backed by libuv', 'By spawning 10,000 separate operating system processes', 'By disabling security firewalls', 'By converting JavaScript into static HTML'],
        correctAnswer: 0,
        explanation: 'Node.js delegates I/O tasks to background worker pools asynchronously via libuv, keeping the main thread free.',
      },
      {
        id: 2,
        question: 'In Express middleware, what is the purpose of invoking `next()`?',
        options: ['Passes request execution to the next middleware or route handler in the pipeline', 'Sends a 500 error to the client', 'Restarts the Node server', 'Clears session cookies'],
        correctAnswer: 0,
        explanation: 'Calling next() passes the request and response context to subsequent middleware functions.',
      },
      {
        id: 3,
        question: 'Which HTTP response status code signifies that a resource was successfully created on the server?',
        options: ['201 Created', '200 OK', '204 No Content', '400 Bad Request'],
        correctAnswer: 0,
        explanation: 'HTTP 201 Created is the standard REST status code indicating successful resource creation.',
      },
      {
        id: 4,
        question: 'What is CORS (Cross-Origin Resource Sharing) middleware used for?',
        options: ['Configuring HTTP response headers that authorize browsers on external domains to access backend APIs', 'Encrypting passwords in the database', 'Validating email regex patterns', 'Compressing video files'],
        correctAnswer: 0,
        explanation: 'CORS governs browser security policies regarding cross-origin API requests.',
      },
      {
        id: 5,
        question: 'Why should JWTs (JSON Web Tokens) used for authentication be stored in HttpOnly cookies?',
        options: ['Prevents client-side malicious JavaScript (XSS attacks) from accessing and stealing the token', 'Makes the token expire in 1 second', 'Allows the token to be read by all websites', 'Makes the token 100% unencrypted'],
        correctAnswer: 0,
        explanation: 'HttpOnly cookies cannot be read via document.cookie, mitigating XSS token theft.',
      },
    ],
  },

  // 8. Flutter & Dart
  flutter: {
    subject: 'Flutter 3 & Dart Mobile Development',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is the primary UI building block in Flutter?',
        options: ['Widgets', 'Activities', 'ViewControllers', 'DOM Elements'],
        correctAnswer: 0,
        explanation: 'In Flutter, everything is a Widget—from visual buttons to structural padding and layouts.',
      },
      {
        id: 2,
        question: 'What is the difference between a StatelessWidget and a StatefulWidget in Flutter?',
        options: ['StatefulWidget can maintain mutable state and rebuild via setState(), while StatelessWidget is immutable', 'StatelessWidget only works on iOS', 'StatefulWidget cannot have child widgets', 'StatelessWidget runs on GPU only'],
        correctAnswer: 0,
        explanation: 'StatefulWidgets hold dynamic internal state that can update the UI when modified.',
      },
      {
        id: 3,
        question: 'What does Sound Null Safety in Dart guarantee at compile time?',
        options: ['Variables cannot contain null unless explicitly declared with a nullable type (?)', 'Memory is never freed', 'Apps cannot connect to the internet', 'All integers are 128-bit'],
        correctAnswer: 0,
        explanation: 'Sound Null Safety prevents runtime null-dereference crashes before the app even runs.',
      },
      {
        id: 4,
        question: 'What Flutter feature allows developers to see code changes in real-time on a device without losing app state?',
        options: ['Stateful Hot Reload', 'Full Recompilation', 'Clean Build', 'APK Flashing'],
        correctAnswer: 0,
        explanation: 'Stateful Hot Reload injects updated source code directly into the running Dart VM.',
      },
      {
        id: 5,
        question: 'Which reactive architecture pattern is widely used in enterprise Flutter apps to separate business logic from UI?',
        options: ['BLoC (Business Logic Component)', 'Direct Global Variables', 'jQuery Plugins', 'Session Storage'],
        correctAnswer: 0,
        explanation: 'BLoC uses Dart Streams and Sinks to decouple business logic from presentation widgets.',
      },
    ],
  },

  // 9. Machine Learning & AI
  ai_ml: {
    subject: 'AI & Machine Learning Engineering',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What characterizes a Supervised Learning dataset in Machine Learning?',
        options: ['Input feature data paired with ground-truth target labels', 'Unlabeled raw text without any targets', 'Random numerical sequences', 'Only reinforcement reward signals'],
        correctAnswer: 0,
        explanation: 'Supervised learning trains models on labeled input-output pairs.',
      },
      {
        id: 2,
        question: 'What technique prevents deep neural networks from overfitting on training data?',
        options: ['Dropout regularization, L2 weight decay, and early stopping', 'Training on 1 single sample for 1000 epochs', 'Removing test validation sets', 'Doubling model parameters with no data'],
        correctAnswer: 0,
        explanation: 'Dropout randomly deactivates neurons during training to encourage generalized feature learning.',
      },
      {
        id: 3,
        question: 'In PyTorch, which method computes automatic differentiation gradients backward through the loss graph?',
        options: ['loss.backward()', 'optimizer.zero_grad()', 'model.forward()', 'torch.eval()'],
        correctAnswer: 0,
        explanation: 'loss.backward() triggers autograd to calculate gradients for all trainable parameters.',
      },
      {
        id: 4,
        question: 'What does the Softmax activation function do in classification models?',
        options: ['Converts raw logits into a normalized probability distribution that sums to 1.0', 'Calculates mean squared error', 'Multiplies weights by learning rate', 'Sets negative values to infinity'],
        correctAnswer: 0,
        explanation: 'Softmax exponentiates and normalizes outputs into class probabilities.',
      },
      {
        id: 5,
        question: 'Which evaluation metric is best suited for evaluating classifiers on highly imbalanced datasets?',
        options: ['F1-Score / Precision-Recall AUC', 'Basic Accuracy', 'Mean Squared Error', 'Euclidean Distance'],
        correctAnswer: 0,
        explanation: 'F1-Score balances precision and recall, preventing deceptive high accuracy on imbalanced classes.',
      },
    ],
  },

  // 10. DevOps & CI/CD & Cloud
  devops_cloud: {
    subject: 'DevOps, CI/CD & Cloud Infrastructure',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'Where must GitHub Actions CI/CD workflow YAML files be placed in a git repository?',
        options: ['.github/workflows/', '.ci/actions/', 'pipelines/github/', 'config/ci/'],
        correctAnswer: 0,
        explanation: 'GitHub Actions parses workflows stored in the .github/workflows/ directory.',
      },
      {
        id: 2,
        question: 'What is the primary benefit of Multi-Stage Docker builds?',
        options: ['Drastically shrinks final production image sizes by separating build compilers from the lean runtime', 'Runs 10 containers on one port', 'Speeds up CPU overclocking', 'Removes Docker daemon'],
        correctAnswer: 0,
        explanation: 'Multi-stage builds discard intermediate build dependencies and SDKs from the production image.',
      },
      {
        id: 3,
        question: 'In Kubernetes, what is the smallest deployable compute unit?',
        options: ['A Pod', 'A Node Pool', 'A Cluster', 'A Service'],
        correctAnswer: 0,
        explanation: 'A Pod represents a single instance of a running process in Kubernetes containing one or more containers.',
      },
      {
        id: 4,
        question: 'Which tool is industry-standard for Infrastructure as Code (IaC) provisioning on AWS/GCP/Azure?',
        options: ['HashiCorp Terraform', 'Postman', 'Photoshop', 'Notepad++'],
        correctAnswer: 0,
        explanation: 'Terraform allows declarative management and version control of multi-cloud infrastructure.',
      },
      {
        id: 5,
        question: 'How are sensitive API keys and certificates passed safely into CI/CD pipelines?',
        options: ['Encrypted Repository Secrets referenced via environment variables', 'Hardcoded in public git commit messages', 'Written in the README.md', 'Uploaded to public pastebins'],
        correctAnswer: 0,
        explanation: 'Repository secrets keep sensitive credentials encrypted and out of source control.',
      },
    ],
  },

  // 11. Cybersecurity & OWASP
  security: {
    subject: 'Cybersecurity & OWASP Vulnerabilities',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is the primary defense against SQL Injection (SQLi) vulnerabilities?',
        options: ['Parameterized Queries / Prepared Statements and ORMs', 'Client-side JavaScript string replacement', 'Hiding database passwords in comments', 'Changing port from 3306 to 3307'],
        correctAnswer: 0,
        explanation: 'Parameterized queries ensure user input is never interpreted as executable SQL syntax.',
      },
      {
        id: 2,
        question: 'What does a Cross-Site Scripting (XSS) vulnerability allow an attacker to do?',
        options: ['Inject and execute malicious client-side JavaScript in the context of the victim’s browser', 'Turn off the server power supply', 'Directly delete database tables without network access', 'Bypass HTTPS certificate encryption'],
        correctAnswer: 0,
        explanation: 'XSS enables attackers to steal user session cookies and execute actions on behalf of the victim.',
      },
      {
        id: 3,
        question: 'Which HTTP header prevents Clickjacking attacks by forbidding pages from loading in unauthorized iframes?',
        options: ['Content-Security-Policy: frame-ancestors \'none\' (or X-Frame-Options: DENY)', 'Access-Control-Allow-Origin: *', 'Cache-Control: public', 'Accept-Encoding: gzip'],
        correctAnswer: 0,
        explanation: 'CSP frame-ancestors prevents unauthorized sites from embedding your UI into deceptive overlays.',
      },
      {
        id: 4,
        question: 'Why are cryptographically random salt values added when hashing passwords with bcrypt/argon2?',
        options: ['To defeat pre-computed Rainbow Table attacks and ensure identical passwords have unique hashes', 'To compress passwords to 4 bytes', 'To allow recovering lost plaintext passwords', 'To make hash generation instant'],
        correctAnswer: 0,
        explanation: 'Unique salts make precomputed rainbow tables useless against hashed password databases.',
      },
      {
        id: 5,
        question: 'How do Anti-CSRF (Cross-Site Request Forgery) Tokens protect state-changing user requests?',
        options: ['They ensure requests include an unpredictable secret token that third-party sites cannot forge', 'They encrypt the whole computer disk', 'They make HTTP GET requests faster', 'They force users to re-enter their email on every click'],
        correctAnswer: 0,
        explanation: 'CSRF tokens ensure that state-changing requests originated from the authenticated application UI.',
      },
    ],
  },

  // 12. UI/UX Design & Figma
  ui_ux: {
    subject: 'UI/UX Design Systems & Figma',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'In Figma, what feature enables components to dynamically resize and adapt to content changes with padding and spacing?',
        options: ['Auto Layout', 'Smart Animate', 'Vector Networks', 'Masking'],
        correctAnswer: 0,
        explanation: 'Auto Layout creates flexible, responsive frames that behave like CSS Flexbox.',
      },
      {
        id: 2,
        question: 'What is the WCAG AAA minimum contrast ratio standard for normal body text against background colors?',
        options: ['7:1', '1.5:1', '3:1', '10:1'],
        correctAnswer: 0,
        explanation: 'WCAG AAA requires a minimum contrast ratio of 7:1 for regular text for high accessibility.',
      },
      {
        id: 3,
        question: 'What is a Design Token in enterprise design systems?',
        options: ['Named platform-agnostic variables storing design decisions (colors, typography, spacing, shadows)', 'A cryptocurrency for buying Figma templates', 'A physical badge for UI designers', 'An encrypted local storage cookie'],
        correctAnswer: 0,
        explanation: 'Design tokens synchronize design decisions across design tools and frontend codebases.',
      },
      {
        id: 4,
        question: 'Which UX law states that the time to acquire a target depends on the distance to and width of the target?',
        options: ['Fitts\'s Law', 'Hick\'s Law', 'Miller\'s Law', 'Jakob\'s Law'],
        correctAnswer: 0,
        explanation: 'Fitts\'s Law emphasizes making critical call-to-action buttons larger and easier to click.',
      },
      {
        id: 5,
        question: 'What is the purpose of Component Variants in Figma design systems?',
        options: ['Organizing different states (hover, active, disabled) and sizes into a single unified component set', 'Exporting videos from Figma', 'Running SQL queries in Figma', 'Compressing icons'],
        correctAnswer: 0,
        explanation: 'Variants bundle related component states into a single organized component interface.',
      },
    ],
  },

  // 13. SQL & Databases
  databases: {
    subject: 'Relational & NoSQL Database Architecture',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What does ACID represent in relational database transactions?',
        options: ['Atomicity, Consistency, Isolation, Durability', 'Asynchronous, Concurrent, Indexed, Distributed', 'Array, Column, Index, Document', 'Authentication, Cipher, Integrity, Decoding'],
        correctAnswer: 0,
        explanation: 'ACID properties guarantee reliable database transactions despite hardware or system failures.',
      },
      {
        id: 2,
        question: 'In SQL, what is the difference between an INNER JOIN and a LEFT JOIN?',
        options: ['INNER JOIN returns only matching rows from both tables; LEFT JOIN returns all rows from the left table plus matched rows from the right', 'LEFT JOIN deletes rows from the right table', 'INNER JOIN cannot use primary keys', 'There is no difference'],
        correctAnswer: 0,
        explanation: 'LEFT JOIN preserves every record from the left table even when no match exists on the right.',
      },
      {
        id: 3,
        question: 'What is the primary benefit of creating a B-Tree Database Index on indexed query columns?',
        options: ['Transforms full-table sequential scans O(N) into fast logarithmic lookups O(log N)', 'Shrinks table size to 0 bytes', 'Sends notifications on record updates', 'Capitalizes strings automatically'],
        correctAnswer: 0,
        explanation: 'Indexes create sorted auxiliary lookup trees that speed up SELECT query execution.',
      },
      {
        id: 4,
        question: 'In MongoDB, which aggregation stage is used to filter documents before grouping or projection?',
        options: ['$match', '$group', '$project', '$unwind'],
        correctAnswer: 0,
        explanation: '$match acts as the query filter in MongoDB aggregation pipelines.',
      },
      {
        id: 5,
        question: 'What is Database Normalization (1NF to 3NF) primarily designed to prevent?',
        options: ['Data redundancy, duplicate storage, and update/deletion anomalies', 'Slow internet speeds', 'Operating system crashes', 'Browser caching issues'],
        correctAnswer: 0,
        explanation: 'Normalization organizes schema tables to eliminate redundancy and maintain consistent dependencies.',
      },
    ],
  },

  // 14. HTML5 & CSS3
  html_css: {
    subject: 'HTML5, CSS3 & Responsive Web Design',
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'Which HTML5 semantic element represents an independent, self-contained composition (such as an article or post)?',
        options: ['<article>', '<section>', '<div>', '<span>'],
        correctAnswer: 0,
        explanation: '<article> encapsulates standalone content that can be distributed independently.',
      },
      {
        id: 2,
        question: 'In CSS Flexbox, which property aligns flex items along the cross-axis?',
        options: ['align-items', 'justify-content', 'flex-direction', 'flex-wrap'],
        correctAnswer: 0,
        explanation: 'align-items aligns items along the cross-axis, while justify-content aligns along the main axis.',
      },
      {
        id: 3,
        question: 'In CSS Grid, how do you declare 3 equal-width columns that dynamically expand with container width?',
        options: ['grid-template-columns: repeat(3, 1fr);', 'grid-columns: 33%;', 'display: 3-col;', 'columns: 3;'],
        correctAnswer: 0,
        explanation: 'repeat(3, 1fr) distributes container width equally across 3 fractional unit columns.',
      },
      {
        id: 4,
        question: 'What is the CSS specificity hierarchy from highest to lowest?',
        options: ['!important > Inline styles > ID selector (#) > Class (.class) / Attribute > Element selector', 'Element > Class > ID', 'Universal (*) > Tag > ID', 'Inline > Element > Class'],
        correctAnswer: 0,
        explanation: 'CSS specificity evaluates inline styles, IDs, classes/attributes, and element tags.',
      },
      {
        id: 5,
        question: 'What does <meta name="viewport" content="width=device-width, initial-scale=1.0"> accomplish?',
        options: ['Ensures pages render at the actual physical screen width on mobile devices without desktop zoom distortion', 'Loads fonts automatically', 'Disables scrolling', 'Translates text to English'],
        correctAnswer: 0,
        explanation: 'The viewport meta tag establishes the virtual viewport width matching physical device pixels.',
      },
    ],
  },
};

// Dynamic Course Name & Topic Question Generator
function generateCustomCourseQuiz(courseTitle, category) {
  const cleanTitle = courseTitle || 'Course';
  return {
    subject: `${cleanTitle} (${category || 'Specialized Topic'})`,
    title: `${cleanTitle} Official Certification Exam`,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: `In ${cleanTitle}, what is the foundational architectural principle for structuring maintainable and scalable solutions?`,
        options: [
          'Modular separation of concerns with clear domain interfaces and loose coupling',
          'Writing the entire application in a single 10,000-line monolithic file',
          'Hardcoding all configuration parameters and database secrets directly into source code',
          'Disabling automated unit testing and continuous integration',
        ],
        correctAnswer: 0,
        explanation: `Proper modular architecture in ${cleanTitle} ensures maintainability, testability, and scalability.`,
      },
      {
        id: 2,
        question: `When optimizing performance and resource utilization in ${cleanTitle}, what is the recommended industry best practice?`,
        options: [
          'Profiling bottlenecks, implementing efficient algorithms/caching, and reducing redundant I/O operations',
          'Increasing hardware resources without analyzing code efficiency',
          'Removing error logging and monitoring completely',
          'Running synchronous blocking loops on the main execution thread',
        ],
        correctAnswer: 0,
        explanation: `Targeted profiling, caching, and algorithmic optimization maximize throughput and lower latency in ${cleanTitle}.`,
      },
      {
        id: 3,
        question: `How should error handling and exceptions be structured in professional ${cleanTitle} implementations?`,
        options: [
          'Using structured error hierarchies with graceful degradation, detailed context logging, and safe recovery mechanisms',
          'Catching errors and ignoring them silently without logging',
          'Terminating the entire host process on any minor validation failure',
          'Exposing raw database stack traces directly to end users',
        ],
        correctAnswer: 0,
        explanation: `Robust error handling with structured telemetry prevents unexpected crashes and improves system resilience.`,
      },
      {
        id: 4,
        question: `What is the primary security imperative when handling user inputs and state transitions in ${cleanTitle}?`,
        options: [
          'Strict server-side input validation, parameterized queries, and least-privilege access controls',
          'Trusting all client-supplied parameters without verification',
          'Storing unhashed credentials in plain text files',
          'Disabling HTTPS and TLS certificate verification',
        ],
        correctAnswer: 0,
        explanation: `Defense-in-depth security requires input sanitization, least-privilege permissions, and secure communication.`,
      },
      {
        id: 5,
        question: `Which methodology is considered standard for validating correctness and preventing regressions in ${cleanTitle}?`,
        options: [
          'Comprehensive automated testing (Unit, Integration, and End-to-End) integrated into CI/CD pipelines',
          'Deploying untested code directly to production and waiting for user error reports',
          'Manually clicking through two buttons once before release',
          'Deleting version control git history before each release',
        ],
        correctAnswer: 0,
        explanation: `Automated test suites run across CI/CD pipelines guarantee software quality and prevent regressions in ${cleanTitle}.`,
      },
    ],
  };
}

// Master Course Subject Matcher
export function getQuizForCourse(course) {
  if (!course) {
    return { ...SUBJECT_QUIZZES.react, title: 'Web Development Certification Exam' };
  }

  // 1. If course has an embedded custom quiz array
  if (course.quiz && Array.isArray(course.quiz.questions) && course.quiz.questions.length > 0) {
    return {
      subject: course.quiz.subject || course.category || 'Official Assessment',
      title: course.quiz.title || `${course.title} Official Certification Exam`,
      passingScore: course.quiz.passingScore || 70,
      questions: course.quiz.questions,
    };
  }

  const title = (course.title || '').trim();
  const subtitle = (course.subtitle || '').trim();
  const description = (course.description || '').trim();
  const category = (course.category || '').trim();
  const techStack = Array.isArray(course.techStack) ? course.techStack.join(' ') : '';
  const moduleTitles = (course.modules || []).map((m) => m.title).join(' ');
  const lessonTitles = (course.modules || []).flatMap((m) => m.lessons || []).map((l) => l.title).join(' ');

  // Full searchable context string (lowercase)
  const fullText = `${title} ${subtitle} ${description} ${category} ${techStack} ${moduleTitles} ${lessonTitles}`.toLowerCase();

  // Helper to test regex on fullText
  const match = (regex) => regex.test(fullText);

  // 2. Exact Subject Matchers in strict order

  // PHP / Laravel / WordPress / MySQL
  if (match(/\b(php|laravel|symfony|wordpress|codeigniter|lamp|php8)\b/i)) {
    return { ...SUBJECT_QUIZZES.php, title: `${title || 'PHP & MySQL'} Official Certification Exam` };
  }

  // Python / Django / Flask / FastAPI
  if (match(/\b(python|django|flask|fastapi|pandas|numpy|scipy|pypi)\b/i) && !match(/\b(machine learning|deep learning|neural|ai)\b/i)) {
    return { ...SUBJECT_QUIZZES.python, title: `${title || 'Python'} Official Certification Exam` };
  }

  // Machine Learning / AI / Deep Learning
  if (match(/\b(machine learning|deep learning|artificial intelligence|pytorch|tensorflow|scikit|neural|data science|nlp|computer vision|llm|generative ai)\b/i) || match(/\b(ai|ml)\b/i)) {
    return { ...SUBJECT_QUIZZES.ai_ml, title: `${title || 'AI & Machine Learning'} Official Certification Exam` };
  }

  // Flutter / Dart / Mobile Apps
  if (match(/\b(flutter|dart|mobile app|cross-platform|ios|android)\b/i) && !match(/\bjava\b/i)) {
    return { ...SUBJECT_QUIZZES.flutter, title: `${title || 'Flutter & Mobile'} Official Certification Exam` };
  }

  // Cybersecurity / OWASP / Ethical Hacking / Cryptography
  if (match(/\b(security|cybersecurity|owasp|vulnerability|vulnerabilities|hacking|burp|penetration|cryptography|crypto|aes|rsa|tls|encryption)\b/i)) {
    return { ...SUBJECT_QUIZZES.security, title: `${title || 'Cybersecurity'} Official Certification Exam` };
  }

  // DevOps / CI/CD / Docker / Kubernetes / Cloud (GCP/AWS/Azure)
  if (match(/\b(devops|ci\/cd|cicd|docker|kubernetes|gcp|google cloud|aws|azure|github actions|pipeline|pipelines|cloud run|bigquery|terraform)\b/i)) {
    return { ...SUBJECT_QUIZZES.devops_cloud, title: `${title || 'Cloud & DevOps'} Official Certification Exam` };
  }

  // Java & Spring (excluding javascript)
  if (match(/\b(java|spring boot|spring framework|hibernate|jvm|jpa|maven)\b/i) && !match(/\bjavascript\b/i)) {
    return { ...SUBJECT_QUIZZES.java, title: `${title || 'Java Enterprise'} Official Certification Exam` };
  }

  // C++ / C / DSA / Algorithms
  if (match(/\b(c\+\+|cpp|data structure|data structures|algorithm|algorithms|dsa|leetcode|binary search|sorting)\b/i)) {
    return { ...SUBJECT_QUIZZES.cpp, title: `${title || 'C++ & Data Structures'} Official Certification Exam` };
  }

  // UI/UX & Figma
  if (match(/\b(figma|ui\/ux|design system|prototyping|wireframe|wireframing|user interface|user experience)\b/i)) {
    return { ...SUBJECT_QUIZZES.ui_ux, title: `${title || 'UI/UX Design'} Official Certification Exam` };
  }

  // Databases (SQL / MongoDB / NoSQL)
  if (match(/\b(sql|mysql|postgresql|postgres|mongodb|nosql|database|databases|schema)\b/i)) {
    return { ...SUBJECT_QUIZZES.databases, title: `${title || 'Databases'} Official Certification Exam` };
  }

  // Node.js & Express / Backend
  if (match(/\b(node|nodejs|node\.js|express|expressjs|backend|microservices|rest api|restful)\b/i)) {
    return { ...SUBJECT_QUIZZES.nodejs, title: `${title || 'Node.js & Backend'} Official Certification Exam` };
  }

  // HTML / CSS / Responsive Web Design
  if (match(/\b(html|html5|css|css3|flexbox|css grid|bootstrap|responsive web)\b/i)) {
    return { ...SUBJECT_QUIZZES.html_css, title: `${title || 'HTML5 & CSS3'} Official Certification Exam` };
  }

  // JavaScript & TypeScript
  if (match(/\b(javascript|typescript|js|ts|es6|vanilla js)\b/i) && !match(/\breact\b/i)) {
    return { ...SUBJECT_QUIZZES.javascript, title: `${title || 'JavaScript & TypeScript'} Official Certification Exam` };
  }

  // React & Next.js
  if (match(/\b(react|reactjs|react\.js|next|nextjs|next\.js|redux|frontend)\b/i)) {
    return { ...SUBJECT_QUIZZES.react, title: `${title || 'React & Next.js'} Official Certification Exam` };
  }

  // 3. For any other subject or custom course name: DYNAMICALLY generate 5 authentic questions tailored specifically to the course title!
  return generateCustomCourseQuiz(title || 'Course', category || 'Engineering');
}
