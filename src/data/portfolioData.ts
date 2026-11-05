export interface ProjectItem {
  id: string;
  title: string;
  titleFa: string;
  shortDesc: string;
  shortDescFa: string;
  status: 'Active' | 'Architectural Case Study' | 'Technical Exploration';
  statusFa: string;
  tags: string[];
  iconType: 'butterfly' | 'cart' | 'chat';
  challenges: string[];
  challengesFa: string[];
  implementationDetails: string[];
  implementationDetailsFa: string[];
  endpoints: { method: string; path: string; desc: string; descFa: string }[];
  githubUrl: string;
  liveUrl?: string;
}

export interface SkillCategory {
  name: string;
  nameFa: string;
  skills: {
    name: string;
    description: string;
    descriptionFa: string;
    focus: string;
    focusFa: string;
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  titleFa: string;
  readTime: string;
  readTimeFa: string;
  date: string;
  category: string;
  summary: string;
  summaryFa: string;
  content: string[];
  contentFa: string[];
}

export const PERSONAL_INFO = {
  name: 'Zeinab Soufi Neyestani',
  shortName: 'Zeinab Soufi',
  nameFa: 'زینب صوفی نیستانی',
  shortNameFa: 'زینب صوفی',
  role: 'Python & Django Backend Developer',
  roleFa: 'توسعه‌دهنده بک‌اند پایتون و جنگو',
  tagline: 'Building Scalable Solutions with Django 🤍',
  taglineFa: 'توسعه راهکارهای مقیاس‌پذیر با پایتون و جنگو 🤍',
  bio: "I'm a passionate backend developer focused on Python, Django, and creating efficient, scalable, and elegant systems.",
  bioFa: 'توسعه‌دهنده متعهد بک‌اند با تمرکز بر پایتون، جنگو و طراحی سیستم‌های امن، مقیاس‌پذیر و پایدار.',
  email: 'z.soofi.n@gmail.com',
  githubUrl: 'https://github.com/Atrasoufi',
  linkedinUrl: 'https://www.linkedin.com',
  telegramUrl: 'https://t.me',
  location: 'Tehran, Iran',
  locationFa: 'تهران، ایران',
};

export const CORE_TECH_BADGES = [
  'Python',
  'Django',
  'DRF',
  'PostgreSQL',
  'SQL',
  'Docker',
  'Linux',
  'Git',
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Core Language & Frameworks',
    nameFa: 'زبان و فریم‌ورک‌های اصلی',
    skills: [
      {
        name: 'Python',
        description: 'Object-Oriented Programming, data structures, generators, decorators, and asynchronous programming (asyncio).',
        descriptionFa: 'برنامه‌نویسی شی‌گرا، ساختمان داده‌ها، ژنراتورها، دکوراتورها و برنامه‌نویسی ناهمگام (asyncio).',
        focus: 'Clean Code & Scalable Architecture',
        focusFa: 'کد تمیز و معماری پایدار',
      },
      {
        name: 'Django',
        description: 'Modular MTV architecture, robust ORM query optimization, signals, middleware, and built-in security features.',
        descriptionFa: 'معماری ماژولار، بهینه‌سازی کوئری‌های ORM، سیگنال‌ها، میدل‌ورها و سیستم امنیتی داخلی.',
        focus: 'Modular Apps & Production Security',
        focusFa: 'اپ‌های ماژولار و امنیت پروداکشن',
      },
      {
        name: 'Django REST Framework',
        description: 'RESTful API engineering, ModelSerializers, JWT authentication, ViewSets, permissions, and OpenAPI documentation.',
        descriptionFa: 'طراحی APIهای RESTful، سریالایزرها، احراز هویت توکن/JWT، ویوست‌ها و مستندسازی خودکار.',
        focus: 'Robust API Design & Serialization',
        focusFa: 'طراحی API استاندارد و سریالایزرها',
      },
      {
        name: 'Celery',
        description: 'Asynchronous task queues, background workers, and scheduled periodic tasks integrated with Redis broker.',
        descriptionFa: 'صف تسک‌های ناهمگام، ورکرها در پس‌زمینه و تسک‌های زمان‌بندی‌شده با کارگزاری ردیس.',
        focus: 'Background Processing & Task Queues',
        focusFa: 'پردازش غیرهمگام در پس‌زمینه',
      },
    ],
  },
  {
    name: 'Databases & Storage',
    nameFa: 'پایگاه‌های داده و ذخیره‌سازی',
    skills: [
      {
        name: 'PostgreSQL',
        description: 'Relational schema design, ACID transactions, complex indexing, JSONB data, and query plan analysis.',
        descriptionFa: 'طراحی پایگاه داده رابطه‌ای، تراکنش‌های امن ACID، ایندکس‌گذاری پیشرفته و آنالیز کوئری‌ها.',
        focus: 'Relational Modeling & Query Tuning',
        focusFa: 'مدل‌سازی رابطه‌ای و تیونینگ کوئری',
      },
      {
        name: 'SQL',
        description: 'Complex JOINs, aggregation pipelines, window functions, and subquery performance tuning.',
        descriptionFa: 'دستورات JOIN پیشرفته، گروه‌بندی داده‌ها، توابع پنجره‌ای و بهبود بهره‌وری کوئری‌ها.',
        focus: 'Data Integrity & Query Analysis',
        focusFa: 'یکپارچگی داده و تحلیل سرعت',
      },
      {
        name: 'Redis',
        description: 'In-memory caching, session storage, task broker for Celery, and real-time channel layer for WebSockets.',
        descriptionFa: 'کشینگ درون حافظه، مدیریت نشست‌ها، کارگزار پیام سلری و کانال‌های ارتباطی وب‌سوکت.',
        focus: 'High-Throughput Caching & Queues',
        focusFa: 'کشینگ پرسرعت و صفوف پیام',
      },
    ],
  },
  {
    name: 'DevOps, Tools & Linux',
    nameFa: 'دواپس، ابزارها و لینوکس',
    skills: [
      {
        name: 'Docker',
        description: 'Multi-stage containerization for Django apps, Docker Compose for multi-service environments (Web, DB, Redis).',
        descriptionFa: 'کانتینرسازی چندمرحله‌ای برای برنامه‌های جنگو و ارکستراسیون با Docker Compose.',
        focus: 'Reproducible Deployments',
        focusFa: 'محیط‌های ایزوله و استقرار یکپارچه',
      },
      {
        name: 'Git & GitHub',
        description: 'Version control workflows, feature branching, clean commit conventions, and pull request reviews.',
        descriptionFa: 'مدیریت سورس کد، برنچینگ اصولی، کامیت‌های معنادار و بازبینی کدهای پول‌ریکوئست.',
        focus: 'Collaborative Engineering Workflows',
        focusFa: 'جریان کاری تیمی و کنترل نسخه',
      },
      {
        name: 'Linux',
        description: 'Bash scripting, systemd service management, file system permissions, and server monitoring.',
        descriptionFa: 'اسکریپت‌نویسی بش، مدیریت سرویس‌های systemd، مجوزهای امنیتی و نظارت بر منابع سرور.',
        focus: 'Server Administration & Shell Scripting',
        focusFa: 'مدیریت سرور لینوکس و شل اسکریپت',
      },
    ],
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio Website',
    titleFa: 'وب‌سایت شخصی و پورتفولیو',
    shortDesc: 'Interactive dark-pink neon glassmorphism portfolio with complete bilingual support (FA/EN) and Django architecture readiness.',
    shortDescFa: 'پورتفولیوی تعاملی دارک‌نئون با استایل گلس‌مورفیسم، پشتیبانی دوزبانه کامل و معماری آماده اتصال به تمپلیت‌های جنگو.',
    status: 'Active',
    statusFa: 'در حال توسعه فعال',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Django Ready', 'i18n'],
    iconType: 'butterfly',
    challenges: [
      'Maintaining 60fps glassmorphism and ambient particle animation without causing frame drops.',
      'Full bilingual RTL/LTR dynamic typography (Vazirmatn for Persian, Outfit/Plus Jakarta Sans for English).',
      'Architecting reusable HTML/CSS components directly portable into Django templates.',
    ],
    challengesFa: [
      'اجرای روان انیمیشن‌های ذرات و افکت‌های گلس‌مورفیسم بدون افت فریم در نمایشگرهای مختلف.',
      'مدیریت روان ساختار دوزبانه راست‌به‌چپ و چپ‌به‌دست با فونت‌های بهینه‌سازی شده وزیرمتن و اوت‌فیت.',
      'طراحی ماژولار کامپوننت‌ها جهت سهولت انتقال به تگ‌های include جنگو.',
    ],
    implementationDetails: [
      'Pure CSS variables for dynamic neon glow and theme tokens.',
      'Accessible dialog modals with keyboard Escape listeners and focus rings.',
      'Interactive Python terminal simulator demonstrating Django REST endpoints.',
    ],
    implementationDetailsFa: [
      'استفاده از متغیرهای CSS مدرن برای رنگ‌های نئونی و درخشش بدون وابستگی سنگین.',
      'مودال‌های منطبق بر استانداردهای دسترسی‌پذیری و پشتیبانی از کلید Escape.',
      'شبیه‌ساز پنجره ترمینال پایتون با امکان کپی کد و تست تعاملی پاسخ API.',
    ],
    endpoints: [
      { method: 'GET', path: '/api/v1/profile/', desc: 'Returns developer bio, status, and active stacks', descFa: 'اطلاعات بیوگرافی و استک‌های فعال' },
      { method: 'GET', path: '/api/v1/projects/', desc: 'Lists featured projects with technology tags', descFa: 'لیست پروژه‌های منتخب و فناوری‌ها' },
      { method: 'POST', path: '/api/v1/contact/', desc: 'Receives and validates contact messages', descFa: 'ثبت و اعتبارسنجی پیام‌های تماس' },
    ],
    githubUrl: 'https://github.com/Atrasoufi/zeinab-portfolio',
  },
  {
    id: 'ecommerce-api',
    title: 'E-Commerce REST API',
    titleFa: 'سرویس API فروشگاهی مقیاس‌پذیر',
    shortDesc: 'High-performance modular REST API built with Django REST Framework, PostgreSQL, Redis caching, and Celery order processing.',
    shortDescFa: 'وب‌سرویس RESTful ماژولار و کارآمد با جنگو، پستگرس‌کیوال، کشینگ ردیس و پردازش پس‌زمینه سفارش‌ها توسط سلری.',
    status: 'Architectural Case Study',
    statusFa: 'مطالعه معماری مهندسی',
    tags: ['Python', 'Django', 'DRF', 'PostgreSQL', 'Redis', 'Celery'],
    iconType: 'cart',
    challenges: [
      'Preventing the N+1 query problem across deeply nested category and product relations.',
      'Handling high-concurrency order placement and inventory reservation using database transactions.',
      'Designing clean token-based JWT authentication with refresh rotation.',
    ],
    challengesFa: [
      'جلوگیری از مشکل N+1 در کوئری‌های تودرتوی دسته‌بندی‌ها و محصولات با select_related و prefetch_related.',
      'مدیریت تراکنش‌های امن هنگام رزرو موجودی کالا در خریدهای همزمان با select_for_update.',
      'پیاده‌سازی احراز هویت امن JWT به همراه چرخش توکن‌های تازه‌سازی.',
    ],
    implementationDetails: [
      'Django ORM query tuning with select_related and prefetch_related reducing queries by over 70%.',
      'Celery workers handling invoice generation and email notifications asynchronously.',
      'Redis cache-aside pattern on high-read catalog endpoints.',
    ],
    implementationDetailsFa: [
      'تیونینگ کوئری‌های دیتابیس با متدهای استاندارد جنگو برای کاهش تاخیر پاسخ.',
      'ورکرهای ناهمگام سلری برای ارسال فاکتور و ایمیل‌ها در پس‌زمینه.',
      'الگوی کشینگ Cache-Aside با ردیس برای کاتالوگ کالاهای پربازدید.',
    ],
    endpoints: [
      { method: 'POST', path: '/api/auth/token/', desc: 'Obtains access & refresh JWT tokens', descFa: 'دریافت توکن‌های امن دسترسی و رفرش' },
      { method: 'GET', path: '/api/products/', desc: 'Paginated product catalog with filtering & search', descFa: 'کاتالوگ صفحه‌بندی شده همراه با فیلتر و جستجو' },
      { method: 'POST', path: '/api/orders/', desc: 'Creates new order inside transactional block', descFa: 'ثبت سفارش جدید در قالب تراکنش اتمیک' },
    ],
    githubUrl: 'https://github.com/Atrasoufi/ecommerce-drf-api',
  },
  {
    id: 'chat-service',
    title: 'Real-Time Notification Service',
    titleFa: 'سرویس اعلان و ارتباطات Real-Time',
    shortDesc: 'Asynchronous event-driven messaging service leveraging Django Channels, ASGI, WebSockets, and Redis pub/sub.',
    shortDescFa: 'سرویس رویدادمحور و ناهمگام با استفاده از Django Channels، سرور ASGI، وب‌سوکت و لایه پیام‌رسانی Redis.',
    status: 'Technical Exploration',
    statusFa: 'پروژه کاوش فنی',
    tags: ['Python', 'Django Channels', 'WebSockets', 'Redis', 'ASGI', 'Docker'],
    iconType: 'chat',
    challenges: [
      'Managing persistent stateful WebSocket connections alongside standard stateless HTTP endpoints.',
      'Horizontal scaling using Redis Channel Layer for cross-worker broadcast messages.',
      'Authenticating WebSocket handshakes securely via token headers and query parameters.',
    ],
    challengesFa: [
      'مدیریت همزمان اتصالات پایدار وب‌سوکت در کنار اندپوینت‌های بدون‌وضعیت HTTP.',
      'مقیاس‌پذیری افقی از طریق Redis Channel Layer جهت ارسال سراسری پیام‌ها.',
      'احراز هویت کلاینت‌ها در مرحله Handshake اولیه وب‌سوکت.',
    ],
    implementationDetails: [
      'ASGI Daphne server deployment inside isolated Docker containers.',
      'Custom WebSocket consumer with JSON parsing and presence tracking.',
      'Redis backplane handling group broadcasting and active user tracking.',
    ],
    implementationDetailsFa: [
      'استقرار سرور ASGI دافنه در کانتینر ایزوله داکر.',
      'کانسیومر اختصاصی وب‌سوکت با پردازش رویدادهای JSON و پایش کاربران آنلاین.',
      'بک‌پلیین ردیس برای برودکست گروه‌ها و پیام‌های آنی.',
    ],
    endpoints: [
      { method: 'WS', path: '/ws/chat/<room_name>/', desc: 'Real-time duplex WebSocket channel', descFa: 'کانال دوطرفه Real-Time وب‌سوکت' },
      { method: 'GET', path: '/api/channels/history/', desc: 'Retrieves historical message logs', descFa: 'دریافت تاریخچه پیام‌های قبلی' },
    ],
    githubUrl: 'https://github.com/Atrasoufi',
  },
];

export const EDUCATION_DATA = {
  degree: 'Bachelor of Science in Computer Engineering',
  degreeFa: 'کارشناسی مهندسی کامپیوتر (نرم‌افزار)',
  institution: 'University Computer Engineering Department',
  institutionFa: 'دانشکده مهندسی کامپیوتر',
  period: '2019 — 2023',
  periodFa: '۱۳۹۸ — ۱۴۰۲',
  foundations: [
    { title: 'Data Structures & Algorithms', titleFa: 'ساختمان داده‌ها و الگوریتم‌ها' },
    { title: 'Database Design & Relational Algebra', titleFa: 'طراحی پایگاه‌های داده و جبر رابطه‌ای' },
    { title: 'Operating Systems & Linux Architecture', titleFa: 'سیستم‌های عامل و معماری لینوکس' },
    { title: 'Computer Networks & TCP/IP Protocols', titleFa: 'شبکه‌های کامپیوتری و پروتکل‌های ارتباطی' },
    { title: 'Software Engineering & System Modeling', titleFa: 'مهندسی نرم‌افزار و تحلیل سیستم‌ها' },
  ],
  continuousLearning: [
    { name: 'Advanced Django & REST Architecture', nameFa: 'معماری پیشرفته جنگو و طراحی API' },
    { name: 'PostgreSQL Performance Optimization', nameFa: 'بهینه‌سازی کارایی و کوئری‌های پستگرس' },
    { name: 'Containerization & Docker Workflows', nameFa: 'کانتینرسازی سرویس‌ها با داکر' },
    { name: 'Asynchronous Programming with Python', nameFa: 'برنامه‌نویسی ناهمگام با پایتون' },
  ],
};

export const TECH_STACK_ITEMS = [
  { name: 'Python', color: '#3776AB', icon: 'python', label: 'Primary Language' },
  { name: 'Django', color: '#092E20', icon: 'django', label: 'Backend Framework' },
  { name: 'PostgreSQL', color: '#336791', icon: 'postgres', label: 'Relational DB' },
  { name: 'Docker', color: '#2496ED', icon: 'docker', label: 'Containerization' },
  { name: 'GitHub', color: '#F12D91', icon: 'github', label: 'Version Control' },
  { name: 'Linux', color: '#FCC624', icon: 'linux', label: 'OS & Server Admin' },
  { name: 'VS Code', color: '#007ACC', icon: 'vscode', label: 'Primary Editor' },
  { name: 'Git', color: '#F05032', icon: 'git', label: 'SCM Tooling' },
];

export const GITHUB_ACTIVITY_DATA = {
  totalLast30Days: 412,
  bars: [12, 18, 14, 22, 19, 15, 24, 20, 16, 21, 14, 18, 22, 25, 17, 19],
  isVisualizationNotice: true,
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'drf-query-optimization',
    title: 'Taming the N+1 Query Problem in Django REST Framework',
    titleFa: 'حل ریشه‌ای مشکل N+1 در کوئری‌های جنگو و DRF',
    readTime: '6 min read',
    readTimeFa: '۶ دقیقه مطالعه',
    date: 'Oct 2024',
    category: 'Django & Databases',
    summary: 'How to leverage select_related, prefetch_related, and Prefetch objects to drop database latency by 70% in high-traffic endpoints.',
    summaryFa: 'بررسی کاربردی متدهای select_related و prefetch_related جهت بهینه‌سازی بار دیتابیس و کاهش چشمگیر زمان پاسخ API.',
    content: [
      'When building REST APIs with Django, one of the most common performance bottlenecks is the infamous N+1 query issue.',
      'Django ORM executes queries lazily. While this provides great flexibility, failing to pre-fetch related models results in hundreds of separate database round-trips.',
      'By combining select_related for single-valued relationships (ForeignKey, OneToOne) and prefetch_related for multi-valued sets, you ensure queries are batched efficiently.',
    ],
    contentFa: [
      'یکی از متداول‌ترین گلوگاه‌های کارایی در وب‌سرویس‌های جنگو، ایجاد درخواست‌های متعدد به دیتابیس معروف به مسئله N+1 است.',
      'سیستم ORM جنگو کوئری‌ها را به صورت تنبل (Lazy) اجرا می‌کند که در صورت عدم واکشی پیش‌دستانه روابط، موجب ارسال صدها درخواست مجزا به پایگاه داده می‌شود.',
      'با بهره‌گیری هوشمندانه از select_related برای روابط یک‌به‌یک و ForeignKey، و prefetch_related برای مجموعه‌های چندگانه، کلیه داده‌ها در کوتاه‌ترین زمان واکشی می‌شوند.',
    ],
  },
  {
    id: 'postgres-indexing-strategies',
    title: 'Indexing Strategies Every Backend Developer Should Know in PostgreSQL',
    titleFa: 'راهکارهای ایندکس‌گذاری حیاتی در PostgreSQL برای توسعه‌دهندگان بک‌اند',
    readTime: '8 min read',
    readTimeFa: '۸ دقیقه مطالعه',
    date: 'Sep 2024',
    category: 'PostgreSQL',
    summary: 'A deep dive into B-Tree, GIN, and Partial indexes, and how to analyze execution plans with EXPLAIN ANALYZE.',
    summaryFa: 'تحلیل دقیق ایندکس‌های B-Tree، GIN و Partial و نحوه بررسی پلان‌های اجرای کوئری با EXPLAIN ANALYZE.',
    content: [
      'A great schema is nothing without the right indexes. In PostgreSQL, default B-Tree indexes handle equality and range queries beautifully.',
      'When dealing with JSONB fields or full-text search, GIN indexes become indispensable.',
      'Always verify your assumptions using EXPLAIN (ANALYZE, BUFFERS) before deploying indexes to production.',
    ],
    contentFa: [
      'طراحی دقیق جداول بدون ایندکس‌گذاری صحیح در ترافیک بالا پاسخگو نخواهد بود. ایندکس‌های پیش‌فرض B-Tree برای جستجوهای برابری و بازه‌ای فوق‌العاده‌اند.',
      'هنگام کار با فیلدهای مدرن JSONB یا جستجوی متنی، ایندکس‌های GIN گزینه‌ای بی‌رقیب هستند.',
      'همواره با دستور EXPLAIN ANALYZE رفتار بهینه‌ساز کوئری را قبل از استقرار در محیط پروداکشن اعتبارسنجی کنید.',
    ],
  },
  {
    id: 'django-channels-websockets',
    title: 'Architecting Real-Time Services with Django Channels & Redis',
    titleFa: 'معماری سرویس‌های Real-Time با Django Channels و Redis',
    readTime: '7 min read',
    readTimeFa: '۷ دقیقه مطالعه',
    date: 'Aug 2024',
    category: 'Architecture & Channels',
    summary: 'Moving beyond synchronous HTTP: setting up ASGI, Daphne, WebSocket consumers, and Redis channel layers.',
    summaryFa: 'فراتر از پروتکل همگام HTTP: راه‌اندازی سرور ASGI، وب‌سوکت‌ها و لایه ارتباطی ردیس برای پیام‌رسانی بلادرنگ.',
    content: [
      'Modern web applications often require bi-directional, push-based communication for notifications, chat, and live metrics.',
      'Django Channels extends Django beyond synchronous HTTP to handle WebSockets, chat protocols, and IoT devices.',
      'Combining Channels with a Redis backend provides seamless multi-worker broadcasting.',
    ],
    contentFa: [
      'برنامه‌های امروزی نیازمند تبادل بلادرنگ پیام‌ها برای اعلان‌ها و گفتگوها هستند.',
      'جنگو چنلز قابلیت‌های جنگو را فراتر از وب سنتی برده و امکان پاسخگویی به پروتکل‌های ناهمگام وب‌سوکت را فراهم می‌سازد.',
      'ترکیب چنلز با بک‌اند ردیس امکان مقیاس‌پذیری و انتشار آسان پیام بین ورکرها را مهیا می‌کند.',
    ],
  },
];
