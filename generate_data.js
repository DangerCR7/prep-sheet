const fs = require('fs');
const path = require('path');

const curriculum = [];

// Helper to add days
function addDay(day, phase, track, topic, subtopics, video, problems, practice_links = [], project = null) {
  // Post-process video URLs to use search queries so they are 100% stable and never break
  let videoUrl = video.url;
  if (videoUrl.includes("youtube.com/watch") || videoUrl === "https://www.youtube.com/") {
    videoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + " tutorial")}`;
  }
  
  curriculum.push({
    day,
    week: Math.ceil(day / 7),
    phase,
    track,
    topic,
    subtopics,
    video: {
      title: video.title,
      url: videoUrl
    },
    problems,
    practice_links,
    project,
    xp: {
      learn: 100,
      practice: problems.length * 100 + (practice_links.length * 100),
      mastery: project ? 500 : 200
    },
    estimatedHours: project ? 6 : 4
  });
}

// ==========================================
// PHASE 1: JAVA OOP & INTERNALS (Days 1-25)
// ==========================================
const p1 = "Phase 1: Java OOP & Internals";
addDay(1, p1, "core", "JVM Architecture & Memory Management", 
  ["Stack vs Heap", "JVM Components", "Garbage Collection Basics", "JIT Compiler"],
  { title: "JVM Architecture & Memory Management", url: "https://www.youtube.com/" },
  [
    { name: "Understand JVM Memory Structure", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/jvm-works-jvm-architecture-explained/", difficulty: "Easy" }
  ],
  [{ name: "Java Memory Model Practice", url: "https://www.baeldung.com/java-jvm-run-time-data-areas" }]
);

addDay(2, p1, "core", "Java Classes, Objects & Constructors",
  ["Initialization blocks", "Constructor Chaining", "this vs super", "Class loaders"],
  { title: "Java Constructors and Initialization Blocks", url: "https://www.youtube.com/" },
  [
    { name: "Java Classes and Objects", platform: "HackerRank", url: "https://www.hackerrank.com/challenges/java-output-formatting/problem", difficulty: "Easy" }
  ],
  [{ name: "Constructors Practice", url: "https://www.w3resource.com/java-exercises/oop/index.php" }]
);

addDay(3, p1, "core", "Inheritance & Polymorphism Internals",
  ["Method Overloading vs Overriding", "Static vs Dynamic Binding", "Runtime Polymorphism", "Covariant Return Types"],
  { title: "Polymorphism and Dynamic Method Dispatch", url: "https://www.youtube.com/" },
  [
    { name: "Java Method Overriding", platform: "HackerRank", url: "https://www.hackerrank.com/challenges/java-method-overriding/problem", difficulty: "Easy" },
    { name: "Java Method Overriding 2 (Super Keyword)", platform: "HackerRank", url: "https://www.hackerrank.com/challenges/java-method-overriding-2-super-keyword/problem", difficulty: "Easy" }
  ]
);

addDay(4, p1, "core", "Encapsulation, Abstraction & Interfaces",
  ["Access Modifiers", "Abstract Classes vs Interfaces", "Java 8 Default & Static Methods", "Private Interface Methods in Java 9"],
  { title: "Abstract Classes vs Interfaces", url: "https://www.youtube.com/" },
  [
    { name: "Java Interface", platform: "HackerRank", url: "https://www.hackerrank.com/challenges/java-interface/problem", difficulty: "Easy" },
    { name: "Java Abstract Class", platform: "HackerRank", url: "https://www.hackerrank.com/challenges/java-abstract-class/problem", difficulty: "Easy" }
  ]
);

addDay(5, p1, "core", "HashMap Internals & Hash Collisions",
  ["equals() & hashCode() contract", "Hash collision handling", "Bucket structure & thresholding", "Java 8 Red-Black Tree transition"],
  { title: "How HashMap works internally in Java", url: "https://www.youtube.com/" },
  [
    { name: "Design HashMap", platform: "LeetCode", url: "https://leetcode.com/problems/design-hashmap/", difficulty: "Medium" }
  ],
  [{ name: "Visualizing HashMap in Java", url: "https://www.geeksforgeeks.org/internal-working-of-hashmap-java/" }]
);

addDay(6, p1, "core", "ArrayList & LinkedList Internals",
  ["Dynamic resizing complexity", "Memory layout differences", "Fail-fast vs Fail-safe iterators"],
  { title: "ArrayList vs LinkedList Inner Workings", url: "https://www.youtube.com/" },
  [
    { name: "Design Linked List", platform: "LeetCode", url: "https://leetcode.com/problems/design-linked-list/", difficulty: "Medium" }
  ]
);

addDay(7, p1, "core", "Java Exception Handling & Best Practices",
  ["Checked vs Unchecked exceptions", "Try-with-resources", "Custom Exception design", "JVM Exception Table"],
  { title: "Java Exception Handling Architecture", url: "https://www.youtube.com/" },
  [
    { name: "Java Exception Handling (Try-catch)", platform: "HackerRank", url: "https://www.hackerrank.com/challenges/java-exception-handling-try-catch/problem", difficulty: "Easy" }
  ]
);

addDay(8, p1, "core", "Generics & Type Erasure",
  ["Generic methods", "Wildcard Operators (? extends T, ? super T)", "Type Erasure internals", "Bridge methods"],
  { title: "Java Generics and Type Erasure", url: "https://www.youtube.com/" },
  [
    { name: "Java Generics", platform: "HackerRank", url: "https://www.hackerrank.com/challenges/java-generics/problem", difficulty: "Easy" }
  ]
);

addDay(9, p1, "core", "Multithreading & Concurrency Basics",
  ["Thread Life Cycle", "Runnable vs Thread", "Volatile keyword", "Synchronized blocks and locks"],
  { title: "Java Multithreading Tutorial", url: "https://www.youtube.com/" },
  [
    { name: "Print in Order (Concurrency)", platform: "LeetCode", url: "https://leetcode.com/problems/print-in-order/", difficulty: "Easy" }
  ],
  [{ name: "Multithreading Interview Questions", url: "https://www.baeldung.com/java-multi-threading-interview-questions" }]
);

addDay(10, p1, "core", "Advanced Concurrency & ThreadPools",
  ["ExecutorService", "Callable & Future", "ReentrantLock", "CountDownLatch vs CyclicBarrier"],
  { title: "Java Thread Pools & Executor Framework", url: "https://www.youtube.com/" },
  [
    { name: "Print FooBar Alternately", platform: "LeetCode", url: "https://leetcode.com/problems/print-foobar-alternately/", difficulty: "Medium" }
  ]
);

addDay(11, p1, "core", "Garbage Collection Algorithms in Deep",
  ["Serial vs Parallel GC", "G1 Garbage Collector", "ZGC & Shenandoah GC", "GC tuning basics"],
  { title: "Deep Dive into JVM Garbage Collectors", url: "https://www.youtube.com/" },
  [
    { name: "Analyze GC Logs", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/garbage-collection-java/", difficulty: "Easy" }
  ]
);

addDay(12, p1, "core", "Java Streams API",
  ["Intermediate vs Terminal Operations", "Lazy Evaluation", "Collectors (groupingBy, partitioningBy)", "Parallel Streams performance"],
  { title: "Java Streams Complete Guide", url: "https://www.youtube.com/" },
  [
    { name: "Process Employee List using Streams", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/stream-in-java/", difficulty: "Easy" }
  ]
);

addDay(13, p1, "core", "Functional Programming in Java",
  ["Lambdas", "Predicate, Function, Consumer, Supplier", "Method References", "Monads in Java (Optional)"],
  { title: "Functional Interfaces & Lambdas in Java", url: "https://www.youtube.com/" },
  [
    { name: "Optional Class Practice", platform: "Baeldung", url: "https://www.baeldung.com/java-optional", difficulty: "Easy" }
  ]
);

addDay(14, p1, "core", "Java Reflection API & Dynamic Proxies",
  ["Class inspection", "Accessing private fields", "Dynamic Proxies", "Reflection performance overhead"],
  { title: "Java Reflection API Tutorial", url: "https://www.youtube.com/" },
  [
    { name: "Write a Dynamic Tester using Reflection", platform: "Baeldung", url: "https://www.baeldung.com/java-reflection", difficulty: "Medium" }
  ]
);

addDay(15, p1, "core", "Serialization & Transient Fields",
  ["Serializable interface", "serialVersionUID", "transient & static fields", "Externalizable interface"],
  { title: "Java Serialization Tutorial", url: "https://www.youtube.com/" },
  [
    { name: "Implement Serialization & Deep Copy", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/serialization-in-java/", difficulty: "Easy" }
  ]
);

addDay(16, p1, "core", "Java 9 to 17+ Modern Features",
  ["Records", "Sealed Classes", "Switch Pattern Matching", "Var keyword", "Text blocks"],
  { title: "Java 17 Features", url: "https://www.youtube.com/" },
  [
    { name: "Refactor Legacy Code to Java 17 Records", platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/records-in-java/", difficulty: "Easy" }
  ]
);

addDay(17, p1, "core", "Custom HashMap Build Project",
  ["Writing custom hashing", "Handling rehashing", "Array resizing", "Linked List chains"],
  { title: "Build a Custom HashMap in Java", url: "https://www.youtube.com/" },
  [],
  [],
  {
    name: "Custom Generic HashMap Implementation",
    description: "Build a fully generic HashMap implementation supporting put, get, remove, containKeys, size, and dynamic resizing when load factor exceeds 0.75.",
    skills: ["Generics", "Data Structures", "Hashing", "Dynamic Resizing"],
    xp: 500
  }
);

addDay(18, p1, "core", "LLD & SOLID: Single Responsibility Principle",
  ["Definition", "Violations", "Refactoring", "Cohesion & Coupling"],
  { title: "SOLID Principles: Single Responsibility", url: "https://www.youtube.com/" },
  [],
  [{ name: "SRP Code Practice", url: "https://refactoring.guru/design-patterns" }]
);

addDay(19, p1, "core", "LLD & SOLID: Open-Closed Principle",
  ["Design for extension, close for modification", "Abstract classes & inheritance", "OCP with Strategy pattern"],
  { title: "SOLID Principles: Open-Closed", url: "https://www.youtube.com/" },
  [],
  [{ name: "OCP Practice Problems", url: "https://refactoring.guru/design-patterns" }]
);

addDay(20, p1, "core", "LLD & SOLID: Liskov Substitution Principle",
  ["Subtype substitutability", "Design by Contract", "Common violations (Square/Rectangle)"],
  { title: "SOLID Principles: Liskov Substitution", url: "https://www.youtube.com/" },
  [],
  [{ name: "LSP Refactoring Practice", url: "https://refactoring.guru/design-patterns" }]
);

addDay(21, p1, "core", "LLD: ISP, DIP & SOLID Capstone",
  ["Interface Segregation", "Dependency Inversion & Spring IoC connection", "SOLID assessment"],
  { title: "SOLID Principles: ISP and DIP", url: "https://www.youtube.com/" },
  [],
  [{ name: "SOLID Kata Refactoring", url: "https://refactoring.guru/design-patterns" }]
);

addDay(22, p1, "core", "Creational Design Patterns",
  ["Singleton (Thread-safe, Double Checked Locking, Enum)", "Factory Method", "Abstract Factory", "Builder Pattern"],
  { title: "Creational Design Patterns Explained", url: "https://www.youtube.com/" },
  [],
  [{ name: "Refactoring.Guru: Creational Design Patterns", url: "https://refactoring.guru/design-patterns/creational" }]
);

addDay(23, p1, "core", "Structural Design Patterns",
  ["Adapter Pattern", "Decorator Pattern (Java I/O streams)", "Facade Pattern", "Proxy Pattern"],
  { title: "Structural Design Patterns Explained", url: "https://www.youtube.com/" },
  [],
  [{ name: "Refactoring.Guru: Structural Design Patterns", url: "https://refactoring.guru/design-patterns/structural" }]
);

addDay(24, p1, "core", "Behavioral Design Patterns",
  ["Strategy Pattern", "Observer Pattern", "Command Pattern", "Chain of Responsibility"],
  { title: "Behavioral Design Patterns Explained", url: "https://www.youtube.com/" },
  [],
  [{ name: "Refactoring.Guru: Behavioral Design Patterns", url: "https://refactoring.guru/design-patterns/behavioral" }]
);

addDay(25, p1, "core", "SOLID & Design Patterns Project",
  ["Class Diagrams", "Interface implementation", "Functional composition"],
  { title: "Design Patterns in Real Applications", url: "https://www.youtube.com/" },
  [],
  [],
  {
    name: "Extensible Employee Payroll Engine",
    description: "Design a system to compute payrolls for diverse employees (Salaried, Hourly, Commissioned). Must use Strategy pattern for tax calculation, Observer pattern for payslip notifications, and Java Streams to filter/process payroll files in a single chain without classic loops.",
    skills: ["OOP Design Patterns", "Java Streams", "SOLID Principles", "Low Level Design"],
    xp: 600
  }
);

// ==========================================
// PHASE 2: DSA FUNDAMENTALS (Days 26-60)
// ==========================================
const p2 = "Phase 2: DSA Fundamentals";

addDay(26, p2, "dsa", "Arrays & Vectors: Basics & Two-Pointer Pattern",
  ["Array representation in memory", "Static vs Dynamic arrays", "Two-pointer basics", "Opposite directional pointers"],
  { title: "Two Pointer Pattern Complete Guide", url: "https://www.youtube.com/" },
  [
    { name: "Two Sum", platform: "LeetCode", url: "https://leetcode.com/problems/two-sum/", difficulty: "Easy" },
    { name: "Valid Palindrome", platform: "LeetCode", url: "https://leetcode.com/problems/valid-palindrome/", difficulty: "Easy" },
    { name: "Container With Most Water", platform: "LeetCode", url: "https://leetcode.com/problems/container-with-most-water/", difficulty: "Medium" }
  ]
);

addDay(27, p2, "dsa", "Two Pointers: Same Directional & Sliding Window",
  ["Fast and Slow pointers", "Subarray problems", "Fixed-size sliding window", "Maximum sum subarray of size k"],
  { title: "Sliding Window Technique Tutorial", url: "https://www.youtube.com/" },
  [
    { name: "Remove Duplicates from Sorted Array", platform: "LeetCode", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", difficulty: "Easy" },
    { name: "Max Consecutive Ones III", platform: "LeetCode", url: "https://leetcode.com/problems/max-consecutive-ones-iii/", difficulty: "Medium" }
  ]
);

addDay(28, p2, "dsa", "Variable Size Sliding Window & Monotonic Window",
  ["Dynamic window resizing", "Optimizing O(N^2) to O(N)", "Hash Map + sliding window combinations"],
  { title: "Variable Size Sliding Window Problems", url: "https://www.youtube.com/" },
  [
    { name: "Longest Substring Without Repeating Characters", platform: "LeetCode", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "Medium" },
    { name: "Minimum Size Subarray Sum", platform: "LeetCode", url: "https://leetcode.com/problems/minimum-size-subarray-sum/", difficulty: "Medium" }
  ]
);

addDay(29, p2, "dsa", "Prefix Sum & Range Queries",
  ["Precomputations", "O(1) Range Sum Queries", "2D Prefix Sum basics"],
  { title: "Prefix Sum Algorithm and Applications", url: "https://www.youtube.com/" },
  [
    { name: "Range Sum Query - Immutable", platform: "LeetCode", url: "https://leetcode.com/problems/range-sum-query-immutable/", difficulty: "Easy" },
    { name: "Subarray Sum Equals K", platform: "LeetCode", url: "https://leetcode.com/problems/subarray-sum-equals-k/", difficulty: "Medium" }
  ]
);

addDay(30, p2, "dsa", "Kadane's Algorithm & Subarray Maximization",
  ["Maximum Subarray Sum", "Dynamic greedy approach", "Follow-up: Maximum Product Subarray"],
  { title: "Kadane's Algorithm Explained", url: "https://www.youtube.com/" },
  [
    { name: "Maximum Subarray", platform: "LeetCode", url: "https://leetcode.com/problems/maximum-subarray/", difficulty: "Easy" },
    { name: "Maximum Product Subarray", platform: "LeetCode", url: "https://leetcode.com/problems/maximum-product-subarray/", difficulty: "Medium" }
  ]
);

const dsaMiddleDays = [
  { day: 31, topic: "String Basics & Character Manipulation", subs: ["ASCII, Unicode, String Pool", "Immutable nature of Java Strings", "StringBuilder vs StringBuffer"], probs: [{ n: "Roman to Integer", pl: "LeetCode", u: "https://leetcode.com/problems/roman-to-integer/", d: "Easy" }, { n: "Longest Common Prefix", pl: "LeetCode", u: "https://leetcode.com/problems/longest-common-prefix/", d: "Easy" }] },
  { day: 32, topic: "String Matching & Palindromes", subs: ["Reverse & check", "Centered expansion for Palindromic substrings", "Rabin-Karp basics"], probs: [{ n: "Valid Anagram", pl: "LeetCode", u: "https://leetcode.com/problems/valid-anagram/", d: "Easy" }, { n: "Longest Palindromic Substring", pl: "LeetCode", u: "https://leetcode.com/problems/longest-palindromic-substring/", d: "Medium" }] },
  { day: 33, topic: "Hashing: HashMaps & HashSets", subs: ["O(1) Lookup logic", "Frequency map patterns", "Tracking index of elements"], probs: [{ n: "Intersection of Two Arrays", pl: "LeetCode", u: "https://leetcode.com/problems/intersection-of-two-arrays/", d: "Easy" }, { n: "Group Anagrams", pl: "LeetCode", u: "https://leetcode.com/problems/group-anagrams/", d: "Medium" }] },
  { day: 34, topic: "Binary Search: Classic & Target Match", subs: ["Divide and conquer", "Sorted array properties", "Avoiding integer overflow in middle calculation"], probs: [{ n: "Binary Search", pl: "LeetCode", u: "https://leetcode.com/problems/binary-search/", d: "Easy" }, { n: "Search Insert Position", pl: "LeetCode", u: "https://leetcode.com/problems/search-insert-position/", d: "Easy" }] },
  { day: 35, topic: "Binary Search: Lower & Upper Bound", subs: ["Finding first and last position", "Smallest element >= target", "Searching in rotated sorted array"], probs: [{ n: "Find First and Last Position of Element in Sorted Array", pl: "LeetCode", u: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", d: "Medium" }, { n: "Search in Rotated Sorted Array", pl: "LeetCode", u: "https://leetcode.com/problems/search-in-rotated-sorted-array/", d: "Medium" }] },
  { day: 36, topic: "Binary Search on Answer Space", subs: ["Monotonic function check", "Feasible solutions check", "Minimizing the maximum value"], probs: [{ n: "Koko Eating Bananas", pl: "LeetCode", u: "https://leetcode.com/problems/koko-eating-bananas/", d: "Medium" }, { n: "Capacity To Ship Packages Within D Days", pl: "LeetCode", u: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", d: "Medium" }] },
  { day: 37, topic: "Sorting: Insertion, Selection, Bubble", subs: ["Simple quadratic sorts", "Adaptive sorting", "In-place modifications"], probs: [{ n: "Sort an Array", pl: "LeetCode", u: "https://leetcode.com/problems/sort-an-array/", d: "Medium" }] },
  { day: 38, topic: "Sorting: Merge Sort & Quick Sort", subs: ["Divide & conquer recursion", "Partitioning logic", "Space complexity comparison"], probs: [{ n: "Kth Largest Element in an Array", pl: "LeetCode", u: "https://leetcode.com/problems/kth-largest-element-in-an-array/", d: "Medium" }] },
  { day: 39, topic: "Recursion Basics & Mathematical Inductions", subs: ["Call stack", "Base cases", "Fibonacci & Factorial trace"], probs: [{ n: "Fibonacci Number", pl: "LeetCode", u: "https://leetcode.com/problems/fibonacci-number/", d: "Easy" }, { n: "Pow(x, n)", pl: "LeetCode", u: "https://leetcode.com/problems/powx-n/", d: "Medium" }] },
  { day: 40, topic: "Recursion: Subsequence & Combination Generation", subs: ["Take and not-take decision tree", "Recursion state tracing"], probs: [{ n: "Subsets", pl: "LeetCode", u: "https://leetcode.com/problems/subsets/", d: "Medium" }, { n: "Combination Sum", pl: "LeetCode", u: "https://leetcode.com/problems/combination-sum/", d: "Medium" }] },
  { day: 41, topic: "Backtracking: Permutations & Choice Elimination", subs: ["Swapping vs visited state tracker", "Time complexity calculations"], probs: [{ n: "Permutations", pl: "LeetCode", u: "https://leetcode.com/problems/permutations/", d: "Medium" }] },
  { day: 42, topic: "Backtracking: Grid Paths & Maze Problems", subs: ["Direction vectors", "Cell blocking/visiting state", "Backtracking undo phase"], probs: [{ n: "Word Search", pl: "LeetCode", u: "https://leetcode.com/problems/word-search/", d: "Medium" }] },
  { day: 43, topic: "Backtracking: Hard Constraints (N-Queens)", subs: ["Diagonal checking optimization", "Col/Row hashing"], probs: [{ n: "N-Queens", pl: "LeetCode", u: "https://leetcode.com/problems/n-queens/", d: "Hard" }] },
  { day: 44, topic: "Backtracking: Sudoku Solver Prep", subs: ["Checking 3x3 grids", "Row/Col checks", "Completeness checking"], probs: [{ n: "Sudoku Solver", pl: "LeetCode", u: "https://leetcode.com/problems/sudoku-solver/", d: "Hard" }] },
  { day: 45, topic: "Backtracking Capstone Project Day", subs: ["Building solvers", "Optimizing search space"], probs: [], proj: { name: "Sudoku Solver & Visualizer CLI", description: "Implement a complete Sudoku backtracker with recursive heuristics, printing the state at each assignment step to show step-by-step visual solution flow.", skills: ["Backtracking", "Recursion", "Visual Rendering"], xp: 500 } },
  { day: 46, topic: "Matrix: Basics & 2D Arrays in Memory", subs: ["Row-major vs Col-major", "Access patterns"], probs: [{ n: "Transpose Matrix", pl: "LeetCode", u: "https://leetcode.com/problems/transpose-matrix/", d: "Easy" }] },
  { day: 47, topic: "Matrix: Layer-by-Layer & Spiral Traversal", subs: ["Boundary limits shifting", "Clockwise traversal logic"], probs: [{ n: "Spiral Matrix", pl: "LeetCode", u: "https://leetcode.com/problems/spiral-matrix/", d: "Medium" }, { n: "Rotate Image", pl: "LeetCode", u: "https://leetcode.com/problems/rotate-image/", d: "Medium" }] },
  { day: 48, topic: "Matrix: Binary Search on 2D Grids", subs: ["Row-sorted vs overall-sorted", "Binary search row-wise"], probs: [{ n: "Search a 2D Matrix", pl: "LeetCode", u: "https://leetcode.com/problems/search-a-2d-matrix/", d: "Medium" }, { n: "Search a 2D Matrix II", pl: "LeetCode", u: "https://leetcode.com/problems/search-a-2d-matrix-ii/", d: "Medium" }] },
  { day: 49, topic: "Monotonic Stack: Next Greater Element", subs: ["LIFO structure for range searches", "Descending stack structure"], probs: [{ n: "Next Greater Element I", pl: "LeetCode", u: "https://leetcode.com/problems/next-greater-element-i/", d: "Easy" }, { n: "Next Greater Element II", pl: "LeetCode", u: "https://leetcode.com/problems/next-greater-element-ii/", d: "Medium" }] },
  { day: 50, topic: "Monotonic Stack: Hard Problems (Rainwater)", subs: ["Trapping water indices calculation", "Boundary tracking"], probs: [{ n: "Trapping Rain Water", pl: "LeetCode", u: "https://leetcode.com/problems/trapping-rain-water/", d: "Hard" }] },
  { day: 51, topic: "Stacks: Expression Parsing & Validity", subs: ["Validating delimiters", "Operator precedence"], probs: [{ n: "Valid Parentheses", pl: "LeetCode", u: "https://leetcode.com/problems/valid-parentheses/", d: "Easy" }] },
  { day: 52, topic: "Queues: FIFO Basics & Ring Buffers", subs: ["Array implementation of Queue", "Circular queues"], probs: [{ n: "Implement Queue using Stacks", pl: "LeetCode", u: "https://leetcode.com/problems/implement-queue-using-stacks/", d: "Easy" }] },
  { day: 53, topic: "Monotonic Queue & Sliding Window Maximum", subs: ["Double-ended queue (Deque)", "O(1) sliding window max lookup"], probs: [{ n: "Sliding Window Maximum", pl: "LeetCode", u: "https://leetcode.com/problems/sliding-window-maximum/", d: "Hard" }] },
  { day: 54, topic: "Stack & Queue Design Patterns", subs: ["Min Stack", "Heap integrations"], probs: [{ n: "Min Stack", pl: "LeetCode", u: "https://leetcode.com/problems/min-stack/", d: "Medium" }] },
  { day: 55, topic: "LRU Cache Design Project Day", subs: ["Hash Map + Doubly Linked List integration", "O(1) updates"], probs: [{ n: "LRU Cache", pl: "LeetCode", u: "https://leetcode.com/problems/lru-cache/", d: "Medium" }], proj: { name: "Interactive LRU Cache System", description: "Design a fully functioning thread-safe LRU Cache with custom Doubly Linked List and Hash Map, containing logging to visualize cache hits, evictions, and cache state changes.", skills: ["LRU Design", "Locks/Thread-safety", "Visual Logging"], xp: 500 } },
  { day: 56, topic: "Linked List: Basics & Iterations", subs: ["Node creation", "Pointer reference logic", "Insertion at head/tail/kth position"], probs: [{ n: "Reverse Linked List", pl: "LeetCode", u: "https://leetcode.com/problems/reverse-linked-list/", d: "Easy" }, { n: "Middle of the Linked List", pl: "LeetCode", u: "https://leetcode.com/problems/middle-of-the-linked-list/", d: "Easy" }] },
  { day: 57, topic: "Linked List: Floyd's Cycle & Fast-Slow Pointers", subs: ["Loop detection mathematical proof", "Finding loop entry point", "Intersection detection"], probs: [{ n: "Linked List Cycle", pl: "LeetCode", u: "https://leetcode.com/problems/linked-list-cycle/", d: "Easy" }, { n: "Linked List Cycle II", pl: "LeetCode", u: "https://leetcode.com/problems/linked-list-cycle-ii/", d: "Medium" }, { n: "Intersection of Two Linked Lists", pl: "LeetCode", u: "https://leetcode.com/problems/intersection-of-two-linked-lists/", d: "Easy" }] },
  { day: 58, topic: "Linked List: Operations & Reversal Patterns", subs: ["Reversing sublists", "Group of K nodes reversal"], probs: [{ n: "Reverse Nodes in k-Group", pl: "LeetCode", u: "https://leetcode.com/problems/reverse-nodes-in-k-group/", d: "Hard" }, { n: "Merge Two Sorted Lists", pl: "LeetCode", u: "https://leetcode.com/problems/merge-two-sorted-lists/", d: "Easy" }] },
  { day: 59, topic: "Linked List: Sorting & Deep Copy", subs: ["Merge Sort on Linked List", "Copying lists with random pointer"], probs: [{ n: "Sort List", pl: "LeetCode", u: "https://leetcode.com/problems/sort-list/", d: "Medium" }, { n: "Copy List with Random Pointer", pl: "LeetCode", u: "https://leetcode.com/problems/copy-list-with-random-pointer/", d: "Medium" }] },
  { day: 60, topic: "Doubly Linked List & Applications", subs: ["Bi-directional traversal", "Deleting node in O(1)"], probs: [{ n: "Flatten a Multilevel Doubly Linked List", pl: "LeetCode", u: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/", d: "Medium" }] }
];

dsaMiddleDays.forEach(d => {
  addDay(d.day, p2, "dsa", d.topic, d.subs, { title: d.topic, url: "https://www.youtube.com/" }, d.probs.map(p => ({ name: p.n, platform: p.pl, url: p.u, difficulty: p.d })), [], d.proj || null);
});


// ==========================================
// PHASE 3: ADVANCED DSA (Days 61-110)
// ==========================================
const p3 = "Phase 3: Advanced DSA";
const advancedDsaTopics = [
  { day: 61, topic: "Binary Trees: Tree Traversals (DFS)", subs: ["Preorder, Inorder, Postorder recursive & iterative", "Tree height, Diameter"], probs: ["Binary Tree Inorder Traversal", "Maximum Depth of Binary Tree", "Diameter of Binary Tree"] },
  { day: 62, topic: "Binary Trees: Level Order Traversal (BFS)", subs: ["Queue-based level traversal", "Zigzag traversal", "Vertical order traversal"], probs: ["Binary Tree Level Order Traversal", "Binary Tree Zigzag Level Order Traversal"] },
  { day: 63, topic: "Binary Trees: Views & Boundary Traversals", subs: ["Left/Right view of tree", "Top/Bottom view", "Boundary traversal"], probs: ["Binary Tree Right Side View"] },
  { day: 64, topic: "Binary Trees: LCA & Paths", subs: ["Lowest Common Ancestor", "Root to Node paths", "Max path sum"], probs: ["Lowest Common Ancestor of a Binary Tree", "Binary Tree Maximum Path Sum"] },
  { day: 65, topic: "Binary Trees: Serialization & Reconstruction", subs: ["Construct tree from preorder & inorder", "Serialize/deserialize binary tree"], probs: ["Construct Binary Tree from Preorder and Inorder Traversal", "Serialize and Deserialize Binary Tree"] },
  { day: 66, topic: "BST: Properties, Search & Insertion", subs: ["BST search property", "Insertion & deletion algorithms"], probs: ["Search in a Binary Search Tree", "Insert into a Binary Search Tree", "Delete Node in a BST"] },
  { day: 67, topic: "BST: Validation & LCA", subs: ["Validating BST invariants", "LCA in BST"], probs: ["Validate Binary Search Tree", "Lowest Common Ancestor of a Binary Search Tree"] },
  { day: 68, topic: "BST: Two Sum in BST & Kth Smallest", subs: ["Inorder traversal state machine", "BST iterator design"], probs: ["Kth Smallest Element in a BST", "Binary Search Tree Iterator"] },
  { day: 69, topic: "BST: Convert sorted array to BST", subs: ["Balancing trees", "Recursive split"], probs: ["Convert Sorted Array to Binary Search Tree"] },
  { day: 70, topic: "Binary Trees Capstone Project Day", subs: ["Parsing hierarchical files", "Visualizing hierarchical nodes"], probs: [], proj: { name: "Hierarchical Directory Tree Visualizer", description: "Design a command line app that parses folder directories and maps them into a Binary Tree/Trie, supporting path searches and directory structures visualization.", skills: ["Tree traversals", "DFS/BFS", "CLI Design"], xp: 500 } },
  { day: 71, topic: "Heaps: Heap Representation & Insertion", subs: ["Array representation of heap", "Heapify algorithm (Up/Down)", "Build Heap in O(N)"], probs: ["Implement Heapify & Priority Queue"] },
  { day: 72, topic: "Heaps: K-Way Merging & Top K Elements", subs: ["Min heap for top K", "Max heap for bottom K", "Merging K sorted lists"], probs: ["Merge k Sorted Lists", "Top K Frequent Elements"] },
  { day: 73, topic: "Heaps: Stream Operations & Sliding Window", subs: ["Find median in data stream", "Dynamic priority updates"], probs: ["Find Median from Data Stream"] },
  { day: 74, topic: "Graphs: Representation & BFS", subs: ["Adjacency Matrix vs List", "Breadth First Search unweighted shortest paths"], probs: ["BFS of Graph"] },
  { day: 75, topic: "Graphs: DFS & Connectivity", subs: ["Depth First Search recursive", "Connected components", "Cycle detection in undirected graphs"], probs: ["DFS of Graph", "Number of Islands"] },
  { day: 76, topic: "Graphs: Directed Cycles & Topological Sort", subs: ["DFS call stack cycle detection", "Kahn's BFS algorithm", "Course scheduling dependency resolution"], probs: ["Course Schedule", "Course Schedule II"] },
  { day: 77, topic: "Graphs: Single Source Shortest Path (Dijkstra)", subs: ["Relaxation logic", "Min-heap priority queue optimization", "Negative weight limitation"], probs: ["Network Delay Time", "Shortest Path in Binary Matrix"] },
  { day: 78, topic: "Graphs: Bellman-Ford & Negative Cycles", subs: ["Relaxation V-1 times", "Negative cycle detection proof", "Floyd-Warshall all-pairs shortest paths"], probs: ["Cheapest Flights Within K Stops"] },
  { day: 79, topic: "Graphs: Minimum Spanning Trees (Kruskal & Prim)", subs: ["Greedy edge selection", "Union-Find path compression & rank", "Detecting cycles dynamically"], probs: ["Min Cost to Connect All Points"] },
  { day: 80, topic: "Graphs: Disjoint Set (Union-Find) Deep Dive", subs: ["Union by rank", "Path compression logic", "Redundant connection detection"], probs: ["Redundant Connection", "Number of Operations to Make Network Connected"] },
  { day: 81, topic: "Graphs: Strongly Connected Components (Kosaraju)", subs: ["Transpose graphs", "DFS finishing times ordering"], probs: ["Critical Connections in a Network"] },
  { day: 82, topic: "Graph Algorithms Capstone Project", subs: ["Pathfinding visualizer", "BFS/DFS representation"], probs: [], proj: { name: "Network Routing & Shortest Path Visualizer", description: "Implement Dijkstra and A* pathfinding over custom node networks loaded from JSON, visualizing open nodes, visited sets, and shortest routes.", skills: ["Dijkstra", "A* search", "Graph Representations"], xp: 600 } },
  { day: 83, topic: "DP: Dynamic Programming Concepts", subs: ["Overlapping subproblems", "Optimal substructure", "Memoization (Top-down) vs Tabulation (Bottom-up)"], probs: ["Climbing Stairs", "House Robber"] },
  { day: 84, topic: "DP: 1D Dynamic Programming Problems", subs: ["State definition", "Space optimization (reducing O(N) array to variables)"], probs: ["Min Cost Climbing Stairs", "Decode Ways"] },
  { day: 85, topic: "DP: 2D Grid DP Problems", subs: ["Movement constraints", "Unique paths calculations", "Minimum path sum in triangle/grid"], probs: ["Unique Paths", "Minimum Path Sum"] },
  { day: 86, topic: "DP: Knapsack Problems (0-1 Knapsack)", subs: ["Include/Exclude sub-states", "Array index shift for weight dimensions"], probs: ["Partition Equal Subset Sum"] },
  { day: 87, topic: "DP: Unbounded Knapsack & Coin Change", subs: ["Infinite choice selections", "Optimizing state transitions"], probs: ["Coin Change", "Coin Change II"] },
  { day: 88, topic: "DP: Longest Common Subsequence (LCS)", subs: ["String match comparison indices", "Shortest common supersequence"], probs: ["Longest Common Subsequence", "Edit Distance"] },
  { day: 89, topic: "DP: Longest Increasing Subsequence (LIS)", subs: ["O(N^2) transitions", "O(N log N) binary search optimization", "Russian Doll envelopes"], probs: ["Longest Increasing Subsequence", "Largest Divisible Subset"] },
  { day: 90, topic: "DP: Stock Purchase State Machines", subs: ["Hold, Sell, Cooldown states", "Dynamic state arrays"], probs: ["Best Time to Buy and Sell Stock with Cooldown", "Best Time to Buy and Sell Stock IV"] },
  { day: 91, topic: "DP: Interval DP & Matrix Chain", subs: ["Subarray range transitions", "Merging balloon elements"], probs: ["Burst Balloons"] },
  { day: 92, topic: "DP: Partition DP & Palindromes", subs: ["Min cuts for palindrome segmentation", "Sub-range caching"], probs: ["Palindrome Partitioning II"] },
  { day: 93, topic: "DP: Tree DP & Graph DAG DP", subs: ["Post-order tree computations", "Independent set on trees"], probs: ["House Robber III"] },
  { day: 94, topic: "DP: Bitmask Dynamic Programming", subs: ["Representing subsets as integers", "Hamiltonian path calculations"], probs: ["Find Shortest Safe Route in a Matrix"] },
  { day: 95, topic: "Dynamic Programming Capstone Project", subs: ["Stock bot", "Optimization models"], probs: [], proj: { name: "Algorithmic Stock Trading Optimizer", description: "Design a DP engine that takes real historical stock prices and computes the optimal buy/sell trade sequence given constraints (transaction fees, cooldown days) using 2D state machine memoization.", skills: ["DP State Machine", "Optimization", "Data Processing"], xp: 600 } },
  { day: 96, topic: "Tries: Basic Node Structures & Operations", subs: ["Alphabet array pointers", "Word end markers", "Dynamic inserts and prefix matching"], probs: ["Implement Trie (Prefix Tree)", "Design Add and Search Words Data Structure"] },
  { day: 97, topic: "Tries: Advanced Prefix Search & Word Break", subs: ["Word search games", "BFS/DFS searches over trie nodes"], probs: ["Word Search II"] },
  { day: 98, topic: "Tries: Bitwise / XOR Tries", subs: ["Binary trie structures (0 and 1 branches)", "Finding maximum XOR pair in array"], probs: ["Maximum XOR of Two Numbers in an Array"] },
  { day: 99, topic: "Bit Manipulation: Bitwise Basics", subs: ["AND, OR, XOR, NOT, Shifts", "Clearing, setting, toggling specific bits"], probs: ["Number of 1 Bits", "Counting Bits", "Single Number"] },
  { day: 100, topic: "Bit Manipulation: Subsets & Math Hacks", subs: ["Generating power set via bits", "XOR arithmetic shortcuts", "Bit masking for sets"], probs: ["Subsets", "Sum of Two Integers"] },
  { day: 101, topic: "Advanced DSA Review Day", subs: ["Graph traversals", "Hard recursion"], probs: ["Sliding Puzzle"] },
  { day: 102, topic: "Advanced DSA Mock Assessment", subs: ["Speed run under 45 mins", "Clean code patterns"], probs: ["Merge Intervals"] },
  { day: 103, topic: "Debugging Advanced Code Bases", subs: ["Pointer exceptions", "Infinite recursive bounds"], probs: ["Copy List with Random Pointer"] },
  { day: 104, topic: "Advanced OOP Patterns with DSA", subs: ["Iterator pattern", "State Pattern"], probs: ["Design Twitter"] },
  { day: 105, topic: "High Performance Data structures", subs: ["Thread-safe collections", "BlockingQueue internals"], probs: ["Design Circular Queue"] },
  { day: 106, topic: "System Design: Micro-architecting", subs: ["Client-server flow", "Single-point failure analysis"], probs: ["Design Twitter"] },
  { day: 107, topic: "System Design: Database Selections", subs: ["Relational vs Document stores", "Columnar stores for Analytics"], probs: ["Design Circular Queue"] },
  { day: 108, topic: "System Design: Cache Architectures", subs: ["Read-through vs Write-back", "Cache evictions"], probs: ["Min Stack"] },
  { day: 109, topic: "System Design: Load Balancers", subs: ["Round robin vs Least connections", "IP Hashing"], probs: ["Design Circular Queue"] },
  { day: 110, topic: "System Design: Message Queue Patterns", subs: ["Publish-subscribe", "Kafka consumer groups"], probs: ["Design Twitter"] }
];

advancedDsaTopics.forEach(t => {
  const problemsList = (t.probs || []).map(pName => {
    let pUrl = `https://leetcode.com/problems/${pName.toLowerCase().replace(/ /g, "-").replace(/\(/g, "").replace(/\)/g, "")}/`;
    if (pName === "BFS of Graph" || pName === "DFS of Graph") {
      pUrl = "https://practice.geeksforgeeks.org/problems/bfs-traversal-of-graph/1";
    }
    return {
      name: pName,
      platform: pName.includes("Graph") ? "GeeksforGeeks" : "LeetCode",
      url: pUrl,
      difficulty: "Medium"
    };
  });

  addDay(t.day, t.day <= 95 ? p3 : "Phase 4: System Design", 
    t.day <= 95 ? "dsa" : "system_design", 
    t.topic, t.subs, 
    { title: t.topic, url: "https://www.youtube.com/" },
    problemsList,
    [],
    t.proj || null
  );
});

// ==========================================
// PHASE 4: SYSTEM DESIGN (Days 111-130)
// ==========================================
const p4 = "Phase 4: System Design";
const systemDesignDays = [
  { day: 111, topic: "LLD: Parking Lot System Design", subs: ["Class Hierarchies", "Design patterns applied", "Concurrency rules"], v: "https://www.youtube.com/" },
  { day: 112, topic: "LLD: Movie Ticket Booking (BookMyShow)", subs: ["Seat blocking state machine", "Payment integration design"], v: "https://www.youtube.com/" },
  { day: 113, topic: "LLD: Splitwise / Expense Sharing App", subs: ["Exact vs percentage share", "Balancing transaction flow"], v: "https://www.youtube.com/" },
  { day: 114, topic: "LLD: Stack Overflow / Q&A Platform", subs: ["Moderator workflows", "Dynamic voting and tags"], v: "https://www.youtube.com/" },
  { day: 115, topic: "LLD Capstone Project Day", subs: ["Design documents", "UML structures"], v: "https://www.youtube.com/", proj: { name: "Design & Build a Movie Ticket Booking Engine", description: "Write clean code for seat allocation supporting multiple screens, dynamic pricing, concurrent holds (concurrency locks), and mock payments using SOLID principles.", skills: ["SOLID LLD", "Concurrency", "OOP Design"], xp: 600 } },
  { day: 116, topic: "HLD: High Level Architecture Foundations", subs: ["Vertical vs Horizontal scaling", "Client-Server models", "Latency, throughput, SLAs"], v: "https://www.youtube.com/" },
  { day: 117, topic: "HLD: Database Partitioning & Sharding", subs: ["Horizontal partitioning (Sharding)", "Range, Directory, Hash sharding", "Consistent Hashing ring"], v: "https://www.youtube.com/" },
  { day: 118, topic: "HLD: CAP Theorem & PACELC", subs: ["Consistency vs Availability trade-offs", "NoSQL stores classifications"], v: "https://www.youtube.com/" },
  { day: 119, topic: "HLD: Caching Strategies & Systems", subs: ["Read-through, Write-through, Write-behind, Cache-aside", "Eviction policies (LRU, LFU)"], v: "https://www.youtube.com/" },
  { day: 120, topic: "HLD: Load Balancers & Reverse Proxies", subs: ["Algorithms: Round Robin, Least Connections, IP Hash", "Layer 4 vs Layer 7 routing"], v: "https://www.youtube.com/" },
  { day: 121, topic: "HLD: Message Queues & Event Streaming", subs: ["Publish-Subscribe models", "Apache Kafka partitions", "Consumer Groups & offsets"], v: "https://www.youtube.com/" },
  { day: 122, topic: "HLD: Designing a URL Shortener (TinyURL)", subs: ["Base-62 encoding", "Unique ID generator (Snowflake)", "DB schema choice"], v: "https://www.youtube.com/" },
  { day: 123, topic: "HLD: Designing a Chat Application (WhatsApp)", subs: ["Websockets vs Long Polling", "Message delivery states", "Cassandra vs DynamoDB"], v: "https://www.youtube.com/" },
  { day: 124, topic: "HLD: Designing a Rate Limiter", subs: ["Token Bucket, Leaking Bucket, Sliding Window Counter", "Distributed rate limiting with Redis"], v: "https://www.youtube.com/" },
  { day: 125, topic: "HLD: Designing a News Feed System", subs: ["Fanout on write vs Fanout on read", "Feed aggregation", "Redis caching"], v: "https://www.youtube.com/" },
  { day: 126, topic: "HLD: Database Replication & Transactions", subs: ["Leader-follower replication", "2-Phase Commit (2PC)", "Saga Pattern"], v: "https://www.youtube.com/" },
  { day: 127, topic: "HLD: System Security & API Gateways", subs: ["OAuth2, JWT authentication", "IP Whitelisting, SSL offloading"], v: "https://www.youtube.com/" },
  { day: 128, topic: "HLD: DNS & CDN Architectures", subs: ["Domain routing lookup", "Edge caching locations", "Push vs Pull CDN"], v: "https://www.youtube.com/" },
  { day: 129, topic: "HLD: Distributed Unique ID Generation", subs: ["Twitter Snowflake algorithm", "UUID collisions", "Flickr Ticket Server"], v: "https://www.youtube.com/" },
  { day: 130, topic: "HLD Capstone Project Day", subs: ["System architecture doc", "Flow diagrams"], v: "https://www.youtube.com/", proj: { name: "Distributed URL Shortener HLD Doc", description: "Prepare a professional system design document detailing: API specifications, Database schema, Sharding plan, Caching implementation, and Snowflake ID gen integration.", skills: ["System Design Doc", "Scalability Planning", "Data Flow Layout"], xp: 600 } }
];

systemDesignDays.forEach(d => {
  addDay(d.day, p4, "system_design", d.topic, d.subs, 
    { title: d.topic, url: d.v },
    [],
    [{ name: "System Design Primer Guide", url: "https://github.com/donnemartin/system-design-primer" }],
    d.proj || null
  );
});


// ==========================================
// PHASE 5: SPECIALIZED ROLE TRACKS (Days 131-170)
// ==========================================
const p5 = "Phase 5: Specialization Track";

// Master curriculum datasets for each specialized role - complete, detailed, no templates/loops!

const sdeSpecialization = [
  { day: 131, topic: "Spring Framework Core: IoC & DI", subs: ["Inversion of Control", "Dependency Injection", "ApplicationContext", "Spring Beans Lifecycle"] },
  { day: 132, topic: "Spring Boot Foundations & AutoConfig", subs: ["Starter dependencies", "Auto-configuration internals", "application.properties/yml configurations"] },
  { day: 133, topic: "Spring MVC & REST Controller Design", subs: ["@RestController", "@RequestMapping", "PathVariables", "RequestParams", "ResponseEntity DTOs"] },
  { day: 134, topic: "Spring Boot Validation & Exception Handling", subs: ["@Valid, @NotNull annotations", "GlobalExceptionHandler using @ControllerAdvice", "BindingResult mapping"] },
  { day: 135, topic: "Spring Data JPA & Entity Mappings", subs: ["Entity declarations", "OneToMany / ManyToOne mappings", "Repository Query Methods"] },
  { day: 136, topic: "Hibernate Internals & Transaction Propagation", subs: ["Lazy loading vs Eager loading", "Dirty checking", "L1/L2 Caches", "@Transactional propagation rules"] },
  { day: 137, topic: "JPA Optimizations & HikariCP", subs: ["N+1 query problem", "Join fetch optimizations", "@EntityGraph", "Hikari connection pool sizing"] },
  { day: 138, topic: "Database Schema Migrations", subs: ["Flyway db versioning", "Liquibase XML change-sets", "Automated DB rollback strategies"] },
  { day: 139, topic: "Spring Security Architecture", subs: ["SecurityFilterChain", "UserDetailsService authentication provider", "Basic Auth vs Session Auth"] },
  { day: 140, topic: "Spring Security JWT Tokenization", subs: ["Claims payloads creation", "JWT Signature verification", "Custom once-per-request authorization filter"] },
  { day: 141, topic: "Spring AOP & Custom Annotation", subs: ["Aspects, Advices (Before, After, Around)", "Pointcut expression syntax", "Custom logging annotation creation"] },
  { day: 142, topic: "Spring Caching & Redis Integration", subs: ["@Cacheable, @CachePut, @CacheEvict", "Redis configuration properties", "Object serialization keys"] },
  { day: 143, topic: "Testing in Spring Boot: JUnit 5 & Mockito", subs: ["Unit tests with @ExtendWith(MockitoExtension.class)", "Mocking dependencies with @Mock", "MockMvc controller validation"] },
  { day: 144, topic: "Integration Testing: Testcontainers", subs: ["Spinning up ephemeral docker containers in tests", "PostgreSQL container integration", "Dynamic property registry"] },
  { day: 145, topic: "Spring Boot Actuator & Metrics", subs: ["Actuator endpoints mapping", "Health indicators customization", "Prometheus and Grafana setups"] },
  { day: 146, topic: "Microservices Foundations & Decoupling", subs: ["Decomposing monoliths", "Database-per-service patterns", "Shared DB pitfalls", "Event-driven microservices"] },
  { day: 147, topic: "Service Discovery: Netflix Eureka", subs: ["Eureka Server configuration", "Eureka Client registration", "Heartbeats and instance renewing"] },
  { day: 148, topic: "API Gateway: Spring Cloud Gateway", subs: ["Declarative route configuration", "Predicates and Filters", "Token relay validation", "Gateway rate limiting"] },
  { day: 149, topic: "Centralized Configuration: Config Server", subs: ["Spring Cloud Config Git-backend", "Shared configurations", "@RefreshScope dynamic configurations reload"] },
  { day: 150, topic: "Inter-Service Communication: Feign Client", subs: ["Declarative REST Client setup", "OpenFeign error decoder configuration", "Load balancer integrations"] },
  { day: 151, topic: "Resiliency Patterns: Circuit Breakers", subs: ["Resilience4j CircuitBreaker setup", "Failure rate thresholds", "Fallback method executions"] },
  { day: 152, topic: "Resiliency Patterns: Retry & Bulkheads", subs: ["Resilience4j Retry strategies", "RateLimiter algorithms", "Bulkhead thread pool isolations"] },
  { day: 153, topic: "Distributed Tracing: Micrometer & Zipkin", subs: ["TraceID and SpanID propagation", "Zipkin dashboard analysis", "Distributed HTTP request logs tracing"] },
  { day: 154, topic: "Event-Driven Microservices: Message Brokers", subs: ["Asynchronous communications", "Kafka vs RabbitMQ trade-offs", "Message queue patterns"] },
  { day: 155, topic: "Spring Kafka Integration", subs: ["KafkaTemplate configurations", "KafkaListener consumer mappings", "Custom JSON serializers/deserializers"] },
  { day: 156, topic: "Distributed Transactions: Saga Pattern", subs: ["Orchestrator-based Saga routing", "Choreography-based Saga event listeners", "Compensating transactions"] },
  { day: 157, topic: "Transactional Outbox Pattern & CDC", subs: ["Outbox database tables", "Change Data Capture (CDC)", "Debezium broker setups", "Exactly-once messaging"] },
  { day: 158, topic: "Docker Foundations: Containers vs VMs", subs: ["Docker Engine architecture", "Namespaces and Cgroups", "Basic Docker commands (run, ps, exec)"] },
  { day: 159, topic: "Dockerfile Optimizations & Java Runtimes", subs: ["Multi-stage Docker builds", "Caching layer commands", "Alpine/Distroless JRE runtimes configurations"] },
  { day: 160, topic: "Docker Compose: Multi-Container Orchestration", subs: ["Docker Compose YAML configurations", "Depends_on healthcheck triggers", "Multi-service environment variables"] },
  { day: 161, topic: "Docker Networking & Volumes", subs: ["Bridge vs Overlay network drivers", "Bind mounts vs Named Volumes persistent storage"] },
  { day: 162, topic: "Container Registries & Image Push", subs: ["Docker Hub configurations", "Amazon ECR repository creation", "Tagging and pushing docker images"] },
  { day: 163, topic: "Kubernetes Core Concepts", subs: ["Control plane components (API Server, ETCD, Scheduler)", "Worker nodes architecture", "Kubelet and Kube-proxy"] },
  { day: 164, topic: "Kubernetes Deployments & Rolling Updates", subs: ["Writing Pod and Deployment manifests", "ReplicaSet scaling", "Zero-downtime rolling updates"] },
  { day: 165, topic: "Kubernetes Networking & Services", subs: ["ClusterIP, NodePort, LoadBalancer", "Ingress Controllers routing rules"] },
  { day: 166, topic: "Kubernetes Configurations: ConfigMaps & Secrets", subs: ["Creating ConfigMaps", "Decoding Base64 Secrets", "Injecting configurations via volume mounts"] },
  { day: 167, topic: "CI/CD Pipelines: GitHub Actions", subs: ["Workflow YAML configurations", "GitHub secrets parameters", "Running JUnit tests and compiling Docker images"] },
  { day: 168, topic: "Cloud Deployment: AWS ECS & Fargate", subs: ["Amazon ECS Cluster configuration", "Task Definitions mapping", "AWS Fargate serverless hosting"] },
  { day: 169, topic: "Microservices Logging: ELK Stack", subs: ["Logback appender configuration", "Logstash indexing", "Elasticsearch searches", "Kibana dashboards"] },
  { day: 170, topic: "SDE Capstone Project Build Day", subs: ["Multi-service integration", "Eureka Gateway postgres setups"], proj: { name: "Dockerized Spring REST API with PostgreSQL", description: "Build an API using Spring Boot, JPA, Postgres database. Containerize using Docker-Compose with healthchecks.", skills: ["Spring Boot REST", "PostgreSQL", "Docker", "Compose"], xp: 600 } }
];

const deSpecialization = [
  { day: 131, topic: "SQL: Advanced Query Joins & Grouping", subs: ["Inner/Outer/Self Joins", "Window Functions (ROW_NUMBER, DENSE_RANK)", "Subqueries"] },
  { day: 132, topic: "SQL: Indexing & Query Optimizations", subs: ["B-Tree & Hash indexes", "EXPLAIN execution plan analyze", "Normalization vs Denormalization"] },
  { day: 133, topic: "Data Warehousing: Star vs Snowflake Schema", subs: ["Dimension vs Fact tables", "OLAP vs OLTP", "Data modeling fundamentals"] },
  { day: 134, topic: "Hadoop Ecosystem: HDFS & MapReduce", subs: ["NameNode, DataNode architecture", "Map, Shuffle, Reduce cycle", "Hadoop storage scaling"] },
  { day: 135, topic: "Apache Hive & Big Data SQL Engine", subs: ["Hive Tables, Partitions, Bucketing", "Query execution over MapReduce/Tez"] },
  { day: 136, topic: "Apache Spark: RDDs & DataFrames", subs: ["Lazy evaluation", "Transformations vs Actions", "Spark cluster architecture"] },
  { day: 137, topic: "Apache Spark SQL & Optimizations", subs: ["Spark Catalyst Optimizer", "Join strategies (Broadcast joins)", "Partition tuning"] },
  { day: 138, topic: "ETL Pipelines: Python & Pandas/PySpark", subs: ["Extracting JSON/CSV databases", "Cleaning null data", "Incremental data loads"] },
  { day: 139, topic: "Apache Kafka Event Streaming", subs: ["Kafka Brokers & Zookeeper/KRaft", "Publishing messages", "Streaming ingestion pipelines"] },
  { day: 140, topic: "ETL Scheduling: Apache Airflow Project Day", subs: ["Directed Acyclic Graphs (DAGs)", "Task operators (PythonOperator, BashOperator)", "Schedule configurations"], proj: { name: "ETL Pipeline with Airflow & Spark", description: "Build a data ingestion pipeline that fetches live weather details, cleans it using Spark, and stores it into PostgreSQL, scheduled hourly via Airflow.", skills: ["Airflow DAG", "Apache Spark", "SQL Ingestion"], xp: 600 } },
  { day: 141, topic: "NoSQL DBs: MongoDB & Cassandra", subs: ["Document databases keys", "Cassandra wide-column indexing", "Choosing NoSQL key designs"] },
  { day: 142, topic: "Cloud Data Warehouses: Snowflake & BigQuery", subs: ["Columnar storage format", "Partitioning clusters in cloud", "Serverless SQL analytics"] },
  { day: 143, topic: "Spark Streaming & Real-Time Aggregation", subs: ["Structured Streaming inputs", "Window functions", "Watermarking for late-arriving data"] },
  { day: 144, topic: "Spark Tuning & Memory Management", subs: ["Cluster sizing configurations", "Storage vs Execution memory allocation", "Garbage collection optimizations"] },
  { day: 145, topic: "Modern Data Lakes: Delta Lake & Iceberg", subs: ["ACID transaction logs on object storage", "Time travel metadata", "Schema enforcement features"] },
  { day: 146, topic: "Data Quality & Validations", subs: ["Great Expectations suite configuration", "Data profiling pipelines", "Automated QA alerts"] },
  { day: 147, topic: "Snowflake Warehouses Architecture", subs: ["Virtual warehouses billing", "Multi-cluster scaling limits", "Micro-partitions metadata"] },
  { day: 148, topic: "Snowflake Advanced Operations", subs: ["Zero-copy database cloning", "Time Travel history data querying", "Fail-safe architectures"] },
  { day: 149, topic: "Google BigQuery Serverless Management", subs: ["Slot allocations", "Partitioning and clustering tables", "Nested and repeated field optimizations"] },
  { day: 150, topic: "Cassandra Partition Key Design", subs: ["Cassandra distributed ring", "Composite partition keys", "Clustering columns sorting"] },
  { day: 151, topic: "MongoDB Document Schema Designing", subs: ["Embedded document patterns", "Database references (DBRefs)", "Aggregation pipelines stages"] },
  { day: 152, topic: "Data Ingestion Engines: Apache NiFi", subs: ["FlowFile processors configurations", "Data provenance trace mapping", "Real-time stream ingests"] },
  { day: 153, topic: "Data Build Tool (dbt): Transformations", subs: ["SQL select models", "dbt run configurations", "Incremental model transformations"] },
  { day: 154, topic: "dbt Testing & Deployments", subs: ["Schema assertion tests", "Source freshness verifications", "Static docs page compiling"] },
  { day: 155, topic: "Data Governance & Metadata Cataloging", subs: ["Data catalog directories (Amundsen/DataHub)", "Lineage mappings", "Federated data governance models"] },
  { day: 156, topic: "Big Data Security Configurations", subs: ["Column-level masking keys", "RBAC data access controls", "Encryption at rest"] },
  { day: 157, topic: "AWS Data Stack Integrations", subs: ["AWS Glue metadata catalogs", "Athena serverless SQL queries", "Redshift data warehouses"] },
  { day: 158, topic: "GCP Data Stack: Dataproc & Dataflow", subs: ["Managed Spark on Dataproc", "Apache Beam streamings on Dataflow"] },
  { day: 159, topic: "Real-Time OLAP Analytics Engines", subs: ["ClickHouse column indexing", "Apache Druid sub-second query ingestion", "Real-time analytics boards"] },
  { day: 160, topic: "Spark on Kubernetes Deployments", subs: ["Spark operator manifests configurations", "Dynamic pod scaling limits", "S3 object access storage configurations"] },
  { day: 161, topic: "Advanced ETL Data Pipeline Design", subs: ["CDC pipelines", "Backfill scripts creation", "Distributed locks"] },
  { day: 162, topic: "Incremental Loading & Data Deduplication", subs: ["Upsert logic (Merge statements)", "Handling source duplicate records", "Tracking tables versioning"] },
  { day: 163, topic: "Restructuring Relational Databases to DW", subs: ["Extracting OLTP databases", "Converting schemas to OLAP", "Dimensional modeling mappings"] },
  { day: 164, topic: "API Ingestions & Web Scraping", subs: ["REST API token paginations", "BeautifulSoup/Scrapy scrape routines", "JSON payload flattening"] },
  { day: 165, topic: "Cloud Storage Bucket Structuring", subs: ["Folder partitions conventions", "AWS S3 lifecycle storage tier rules", "Object archiving"] },
  { day: 166, topic: "Big Data Resource Profiling", subs: ["CPU bottlenecks detection", "I/O network throttling", "Profiling slow tasks"] },
  { day: 167, topic: "CI/CD Data Pipelines", subs: ["Auto-running SQL Lints", "Testing dbt schemas on commit", "Dockerized Spark environments"] },
  { day: 168, topic: "Business Intelligence Integrations", subs: ["Exposing data to Tableau/Superset", "Custom query views optimization", "Dashboard caching"] },
  { day: 169, topic: "Data Infrastructure Disaster Recovery", subs: ["Database backup replication setups", "S3 version restores", "Failover routing"] },
  { day: 170, topic: "Data Engineering Master Capstone Day", subs: ["Sizing clusters", "Execution plans audit"] }
];

const aiSpecialization = [
  { day: 131, topic: "Python for AI: Advanced Python Constructs", subs: ["Decorators, Generators", "Memory profiling in Python", "Multiprocessing vs Threading GIL"] },
  { day: 132, topic: "Data Manipulation: NumPy & Vectorization", subs: ["Matrix slicing", "Broadcasting rules", "High-performance vector operations"] },
  { day: 133, topic: "Data Analysis: Pandas & Wrangling Data", subs: ["DataFrame indexing", "Merging datasets", "Handling outliers & feature scaling"] },
  { day: 134, topic: "Machine Learning: Supervised Models", subs: ["Linear/Logistic Regression", "Decision Trees & Random Forests", "Bias-Variance trade-off"] },
  { day: 135, topic: "Deep Learning Foundations: Backpropagation", subs: ["Gradient descent optimizer", "Loss function derivatives", "Activation functions (ReLU, Sigmoid)"] },
  { day: 136, topic: "Neural Networks with PyTorch", subs: ["PyTorch Tensors & autograd", "Building custom Neural Nets using nn.Module", "Forward/backward training loop"] },
  { day: 137, topic: "Transformers & Attention Mechanism", subs: ["Self-attention calculations", "Encoder-Decoder structure", "Transformer scaling laws"] },
  { day: 138, topic: "Large Language Models (Hugging Face)", subs: ["Tokenizer pipelines", "Pre-trained models inference", "Fine-tuning models using LoRA/QLoRA"] },
  { day: 139, topic: "Retrieval-Augmented Generation (RAG)", subs: ["Vector embeddings creation", "ChromaDB/Pinecone integrations", "Semantic search query routing"] },
  { day: 140, topic: "AI Agents: LangChain & Semantic Orchestration", subs: ["Chains, Agents, Tools", "Memory tracking in conversations", "Integrating APIs with LLMs"], proj: { name: "Conversational RAG Agent", description: "Design an AI agent using Python, LangChain, Pinecone, and OpenAI. It must read custom PDF docs and answer complex queries with source attribution.", skills: ["Python AI", "LangChain", "Vector DB", "RAG"], xp: 600 } },
  { day: 141, topic: "ML Model Deployment: FastAPI & Docker", subs: ["Building inference APIs", "Docker containerization of weights", "Async model serving endpoints"] },
  { day: 142, topic: "Vector Databases & Embedding Searches", subs: ["Cosine similarity vs Dot product", "Index searching (HNSW)", "Pinecone API configurations"] },
  { day: 143, topic: "PyTorch GPU Acceleration: CUDA & MPS", subs: ["Transferring tensors to devices", "Mixed-precision operations (AMP)", "GPU memory optimizations"] },
  { day: 144, topic: "Convolutional Neural Networks (CNNs)", subs: ["Convolutional layers kernel sizes", "Max pooling", "ResNet transfer learning model architectures"] },
  { day: 145, topic: "Recurrent Neural Networks (RNNs & LSTMs)", subs: ["Sequence learning dimensions", "Vanishing gradients solutions", "Text generator architectures"] },
  { day: 146, topic: "Parameter-Efficient Fine-Tuning (PEFT)", subs: ["LoRA matrix rank sizes", "QLoRA bit weight quantizations", "Adapter parameters updates"] },
  { day: 147, topic: "LLM Model Formats & Quantization", subs: ["GGUF CPU-native model hosting", "GPTQ/AWQ GPU quantizations", "Inference engines (llama.cpp)"] },
  { day: 148, topic: "Advanced RAG Document Parsing", subs: ["Text chunking overlapping algorithms", "Recursive parser layouts", "Tables OCR parsing"] },
  { day: 149, topic: "Vector Index Types & Tuning", subs: ["HNSW index graphs", "IVF-Flat clusters", "Filtering index metrics search queries"] },
  { day: 150, topic: "Semantic Hybrid Query Architectures", subs: ["Dense embedding searches", "BM25 keyword sparse retrievals", "Reciprocal Rank Fusion (RRF)"] },
  { day: 151, topic: "RAG Retrieval Post-Processing", subs: ["Cohere/CrossEncoder Re-rankers", "Query expansion LLM pipelines", "Context compression rules"] },
  { day: 152, topic: "Advanced Prompt Engineering Frameworks", subs: ["Few-Shot templates", "Chain-of-Thought (CoT)", "Self-consistency loops"] },
  { day: 153, topic: "AI Agents Decision Flow", subs: ["ReAct loop architectures", "Function tool calling parameters", "Infinite agentic loop protections"] },
  { day: 154, topic: "Multi-Agent System Orchestrations", subs: ["LangGraph state machines", "AutoGen conversation exchanges", "Hierarchical routing agents"] },
  { day: 155, topic: "AI Model Evaluations Frameworks", subs: ["ROUGE and BLEU scoring", "G-Eval custom prompts", "LLM-as-a-Judge validation systems"] },
  { day: 156, topic: "Async Model Servings in FastAPI", subs: ["Python asyncio keywords", "Chunked SSE responses streaming", "Background task worker threads"] },
  { day: 157, topic: "High Performance LLM Serving Engine", subs: ["vLLM PagedAttention configuration", "Continuous batching optimizations", "Triton Server setups"] },
  { day: 158, topic: "ML Experiment Tracking: MLflow", subs: ["Log metric charts", "Registering inference models", "Artifact outputs management"] },
  { day: 159, topic: "Kubeflow Pipelines", subs: ["Workflow manifests pipelines", "Data processing steps", "Kubernetes cluster deployments"] },
  { day: 160, topic: "AWS SageMaker AI Deployment", subs: ["SageMaker Model Training Estimators", "Real-time endpoint endpoints", "Serverless endpoints configurations"] },
  { day: 161, topic: "ML Systems Design Foundations", subs: ["Offline training architectures", "Online inference APIs latency", "Data drift monitoring metrics"] },
  { day: 162, topic: "Data Versioning in ML: DVC", subs: ["Git tracking data weights", "DVC storage backends", "Reproducible pipeline tracking"] },
  { day: 163, topic: "Feature Stores Architecture", subs: ["Feast online Redis caches", "Offline database tables", "Serving dynamic feature vectors"] },
  { day: 164, topic: "Computer Vision Object Detection Models", subs: ["YOLO model structures", "Bounding box intersection metrics (IoU)", "Image segmentations"] },
  { day: 165, topic: "Vision-Language Models (VLM) Architectures", subs: ["CLIP embedding alignments", "LLaVA image projection layers", "Multimodal prompts"] },
  { day: 166, topic: "Reinforcement Learning from Human Feedback", subs: ["PPO algorithms", "Direct Preference Optimization (DPO)", "Reward model training"] },
  { day: 167, topic: "CI/CD AI Pipelines", subs: ["Automated model validations", "Pushing weights to Hugging Face Hub", "GitHub Actions workflows"] },
  { day: 168, topic: "Speech AI & Audio Processing", subs: ["Whisper model inferences", "Spectrogram conversions", "Text-to-Speech (TTS) pipelines"] },
  { day: 169, topic: "Explainable AI (XAI) Frameworks", subs: ["SHAP values calculations", "LIME model interpretations", "Feature importance charts"] },
  { day: 170, topic: "AI Engineering Master Graduation Project Day", subs: ["Scaling models pipelines", "Metrics logs audits"] }
];

sdeSpecialization.forEach(d => {
  addDay(d.day, p5, "sde", d.topic, d.subs, { title: d.topic, url: "https://www.youtube.com/" }, [], [{ name: "Baeldung Spring Guide", url: "https://www.baeldung.com/" }], d.proj || null);
});

deSpecialization.forEach(d => {
  addDay(d.day, p5, "de", d.topic, d.subs, { title: d.topic, url: "https://www.youtube.com/" }, [], [{ name: "SQL Practice Platform", url: "https://www.sql-practice.com/" }], d.proj || null);
});

aiSpecialization.forEach(d => {
  addDay(d.day, p5, "ai", d.topic, d.subs, { title: d.topic, url: "https://www.youtube.com/" }, [], [{ name: "Kaggle ML Practice", url: "https://www.kaggle.com/" }], d.proj || null);
});


// ==========================================
// PHASE 6: INTERVIEW SPRINT (Days 171-180)
// ==========================================
const p6 = "Phase 6: Interview Sprint";
const sprintTopics = [
  { day: 171, topic: "Resume Optimization & Resume Parsers (ATS)", subs: ["Action verbs usage", "Quantifying accomplishments", "Keywords for ATS clearance"] },
  { day: 172, topic: "GitHub Profile & Portfolio Showcase", subs: ["README markdown tricks", "Highlighting clean architectures", "Creating deployment demos"] },
  { day: 173, topic: "Behavioral Interviews: STAR Method", subs: ["Situation, Task, Action, Result", "Handling conflict stories", "Project failure learnings stories"] },
  { day: 174, topic: "Behavioral: Leadership & Company Values", subs: ["Amazon's leadership principles", "Product mindsets", "Questions to ask interviewers"] },
  { day: 175, topic: "Mock Interview: SDE Coding Mock", subs: ["LeetCode Medium problems under 30m", "Talking through code", "Analyzing space-time complexity"] },
  { day: 176, topic: "Mock Interview: SDE System Design Mock", subs: ["Designing a rate limiter on whiteboard", "Database partitioning selection reasoning"] },
  { day: 177, topic: "Mock Interview: DE Coding & SQL Mock", subs: ["Solving complex analytics SQL on coderpad", "Designing MapReduce jobs flow"] },
  { day: 178, topic: "Mock Interview: AI & ML Concept Mock", subs: ["Explaining attention mechanism formulas", "FastAPI inference latency optimization"] },
  { day: 179, topic: "Offer Negotiation & Career Growth Strategies", subs: ["Evaluating compensation packages", "Equity vs Base salary", "Continuous upskilling in AI era"] },
  { day: 180, topic: "Interview Launchpad & Graduation Day", subs: ["Mock board checklist execution", "Reviewing previous pitfalls", "Final confidence builder"], proj: { name: "Graduation Portfolio Capstone", description: "Deploy all your custom projects (HashMap, LRU, SDE/DE/AI track capstones) onto your live GitHub portfolio and link them in a master graduation dashboard page.", skills: ["Portfolio Integration", "Cloud Deployments", "Professional Pitching"], xp: 1000 } }
];

sprintTopics.forEach(t => {
  addDay(t.day, p6, "interview", t.topic, t.subs, 
    { title: t.topic, url: "https://www.youtube.com/" },
    [],
    [{ name: "Tech Interview Handbook", url: "https://www.techinterviewhandbook.org/" }],
    t.proj || null
  );
});

// Output file formatting
const dataJsContent = `// Master Prep Sheet Curriculum Database
// Programmatically generated. Contains 180 days of detailed topics, links, and XP values.

const PREP_SHEET_DATA = ${JSON.stringify(curriculum, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'data.js'), dataJsContent, 'utf-8');
console.log("Successfully generated data.js! Days count: " + curriculum.length);
