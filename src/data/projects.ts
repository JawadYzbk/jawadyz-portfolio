export type Category = 'business' | 'desktop' | 'opensource';
export type Localized = { en: string; ar: string };

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  /** Wide banners are letterboxed instead of cropped. */
  fit?: 'contain';
};

export type Project = {
  id: string;
  title: string;
  category: Category;
  role: Localized;
  summary: Localized;
  details: Localized;
  tags: string[];
  featured?: boolean;
  image?: ProjectImage;
  repo?: string;
  live?: string;
};

export const categories: Category[] = ['business', 'desktop', 'opensource'];

const creator = { en: 'Creator & developer', ar: 'صاحب المشروع والمطوّر' };
const fullstack = { en: 'Full-stack developer', ar: 'تطوير متكامل' };
const contributor = { en: 'Open-source contributor', ar: 'مساهم في مشروع مفتوح المصدر' };

export const projects: Project[] = [
  {
    id: 'nexaisp',
    title: 'NexaISP',
    category: 'business',
    featured: true,
    role: fullstack,
    summary: {
      en: 'One workspace for the moving parts of an ISP.',
      ar: 'بيئة عمل موحّدة لإدارة عمليات مزوّد الإنترنت.',
    },
    details: {
      en: 'Built a tenant-aware ISP operations platform that brings subscriber CRM, service provisioning, billing, collections, field work, inventory, support, and network operations into one workspace. Documented integrations cover payment providers, MikroTik RouterOS, RADIUS, and customer messaging. Built with Laravel, Inertia.js, React, TypeScript, and Redis.',
      ar: 'طوّرت منصة لإدارة عمليات مزوّدي الإنترنت تراعي تعدد المستأجرين، وتجمع إدارة المشتركين وتفعيل الخدمات والفوترة والتحصيل والعمل الميداني والمخزون والدعم وعمليات الشبكة في بيئة عمل واحدة. تشمل التكاملات الموثّقة مزوّدي الدفع وMikroTik RouterOS وRADIUS ومراسلة العملاء. مبنية باستخدام Laravel وInertia.js وReact وTypeScript وRedis.',
    },
    tags: ['Laravel', 'React', 'Inertia.js', 'TypeScript', 'Redis'],
    image: {
      src: '/images/nexaisp.webp',
      width: 1440,
      height: 1662,
      alt: {
        en: 'NexaISP operations dashboard with customer, service, and finance summaries',
        ar: 'لوحة عمليات NexaISP مع ملخصات المشتركين والخدمات والمالية',
      },
    },
    repo: 'https://github.com/JawadYzbk/ISPResellerPlatform',
  },
  {
    id: 'genetics',
    title: 'Rust Genetics Lab',
    category: 'desktop',
    featured: true,
    role: creator,
    summary: {
      en: 'From a clone inventory to an actionable breeding plan.',
      ar: 'من مخزون النباتات إلى خطة تهجين قابلة للتنفيذ.',
    },
    details: {
      en: 'Built a React and TypeScript planning application combining clone inventory, inventory-aware breeding routes, OCR scanning, and farm planning. It runs as a standalone web application and inside Rust+ Desktop. An unofficial community project, independent of Facepunch Studios.',
      ar: 'بنيت تطبيق تخطيط يجمع مخزون النباتات ومسارات التهجين التي تراعي المخزون والمسح بتقنية OCR وتخطيط المزارع. يعمل كتطبيق ويب مستقل وداخل Rust+ Desktop باستخدام React وTypeScript. مشروع مجتمعي غير رسمي ومستقل عن Facepunch Studios.',
    },
    tags: ['React', 'TypeScript', 'OCR'],
    image: {
      src: '/images/genetics.webp',
      width: 1600,
      height: 1296,
      alt: {
        en: 'Rust Genetics Lab breeding workspace with gene inputs and ranked routes',
        ar: 'مساحة التهجين في Rust Genetics Lab مع مدخلات الجينات والمسارات المرتّبة',
      },
    },
    repo: 'https://github.com/JawadYzbk/rust-genetics-lab',
    live: 'https://genetics.rustplusdesktop.cloud/',
  },
  {
    id: 'rustplus',
    title: 'Rust+ Desktop',
    category: 'opensource',
    featured: true,
    role: contributor,
    summary: {
      en: 'Intelligence, maps, and integrations for a desktop companion.',
      ar: 'أنظمة معلومات وخرائط وتكاملات لتطبيق مكتبي مرافق.',
    },
    details: {
      en: 'Contribute to the collaborative, unofficial Rust+ Desktop companion. My work includes the intelligence system, background logic, architectural improvements, advanced shop search, 3D map features, integration fixes, and release maintenance. Built with C#/.NET, WPF, and the Rust+ Companion API. Not affiliated with Facepunch Studios.',
      ar: 'أساهم في تطبيق Rust+ Desktop المرافق غير الرسمي. تشمل مساهماتي نظام المعلومات والمنطق الخلفي وتحسين البنية والبحث المتقدم عن المتاجر والخرائط ثلاثية الأبعاد وإصلاح التكاملات وصيانة الإصدارات باستخدام C#/.NET وWPF. غير تابع لـFacepunch Studios.',
    },
    tags: ['C#', '.NET', 'WPF', 'Rust+ API'],
    image: {
      src: '/images/rustplus.webp',
      width: 1600,
      height: 196,
      fit: 'contain',
      alt: {
        en: 'Rust+ Desktop unofficial desktop app header artwork',
        ar: 'الصورة التعريفية لتطبيق Rust+ Desktop غير الرسمي',
      },
    },
    repo: 'https://github.com/JawadYzbk/rustplus-desktop',
    live: 'https://rustplusdesktop.cloud/',
  },
  {
    id: 'tracker',
    title: 'Rust Player Tracker Plus',
    category: 'desktop',
    featured: true,
    role: creator,
    summary: {
      en: 'Turn server activity into a history you can explore.',
      ar: 'تحويل نشاط الخوادم إلى سجل قابل للاستكشاف.',
    },
    details: {
      en: 'Built a full-stack analytics platform for Rust server activity. It combines BattleMetrics data, historical player sessions, live lookup, activity heatmaps, and trends, with a background polling worker and Rust+ pairing and notifications. Built with Next.js, React, TypeScript, Prisma, and PostgreSQL. Public signup is currently disabled.',
      ar: 'بنيت منصة تحليلات متكاملة لنشاط خوادم Rust. تجمع بيانات BattleMetrics وسجل جلسات اللاعبين والبحث المباشر وخرائط النشاط الحرارية والاتجاهات، مع عامل استطلاع يعمل في الخلفية وميزات الاقتران والإشعارات عبر Rust+. مبنية باستخدام Next.js وReact وTypeScript وPrisma وPostgreSQL. التسجيل العام معطّل حاليًا.',
    },
    tags: ['Next.js', 'React', 'Prisma', 'PostgreSQL'],
    image: {
      src: '/images/tracker.webp',
      width: 1600,
      height: 813,
      alt: {
        en: 'Rust Player Tracker Plus dashboard with tracked servers, players, and sessions',
        ar: 'لوحة Rust Player Tracker Plus مع الخوادم المتتبَّعة واللاعبين والجلسات',
      },
    },
    repo: 'https://github.com/JawadYzbk/rustplayertrackerplus',
  },
  {
    id: 'update',
    title: 'Update Studio',
    category: 'desktop',
    featured: true,
    role: creator,
    summary: {
      en: 'Git changes, packaged for a safer Windows deployment.',
      ar: 'تغييرات Git في حزم لنشر التطبيقات على Windows.',
    },
    details: {
      en: 'Built a Python utility that packages a selected Git commit range into a self-contained Windows updater. It preserves deployment configuration and uploads, backs up affected application files, checks application health, and restores files when an update fails. Includes logs and English/Arabic installers.',
      ar: 'طوّرت أداة Python لتحويل نطاق من إيداعات Git إلى برنامج تحديث مستقل على Windows. تحافظ على إعدادات النشر والملفات المرفوعة، وتنسخ ملفات التطبيق احتياطيًا وتتحقق من سلامته وتستعيد الملفات عند فشل التحديث، مع سجلات نشر وواجهات تثبيت بالعربية والإنجليزية.',
    },
    tags: ['Python', 'Windows', 'Git'],
    image: {
      src: '/images/update-studio.webp',
      width: 982,
      height: 712,
      alt: {
        en: 'Update Studio window with package configuration and release output',
        ar: 'نافذة Update Studio مع إعداد الحزمة ونتائج الإصدار',
      },
    },
    repo: 'https://github.com/JawadYzbk/UpdateStudio',
  },
  {
    id: 'optical',
    title: 'Optical Clinic',
    category: 'business',
    role: fullstack,
    summary: {
      en: 'Patient records, appointments, prescriptions, and payments.',
      ar: 'سجلات المرضى والمواعيد والوصفات والمدفوعات.',
    },
    details: {
      en: 'Developed a Laravel-based clinic management application bringing patient records, appointment scheduling, optical prescriptions, and payment tracking into one interface. Includes multilingual support and Arabic right-to-left layouts for everyday clinical and administrative workflows.',
      ar: 'طوّرت تطبيق إدارة عيادات باستخدام Laravel، يجمع سجلات المرضى وجدولة المواعيد ووصفات البصريات وتتبع المدفوعات. يدعم لغات متعددة وواجهات عربية من اليمين إلى اليسار للإجراءات الطبية والإدارية اليومية.',
    },
    tags: ['Laravel', 'React', 'MySQL'],
    repo: 'https://github.com/JawadYzbk/opticalClinic-react',
  },
  {
    id: 'web-platform',
    title: 'RustPlus Web Platform',
    category: 'business',
    role: creator,
    summary: {
      en: 'A web home and backend for the Rust+ Desktop ecosystem.',
      ar: 'منصة ويب وخدمات خلفية لمنظومة Rust+ Desktop.',
    },
    details: {
      en: 'Created the web platform and supporting backend using Laravel and React. It brings the public product experience and cloud-related workflows together around the open-source desktop application. The live site credits my platform work.',
      ar: 'أنشأت منصة الويب والخدمات الخلفية باستخدام Laravel وReact لربط تجربة المنتج العامة وإجراءات الخدمات السحابية حول التطبيق المكتبي مفتوح المصدر. يذكر الموقع المباشر مساهمتي في بناء المنصة.',
    },
    tags: ['Laravel', 'React', 'API integration'],
    live: 'https://rustplusdesktop.cloud/',
  },
  {
    id: 'abbas',
    title: 'Abbas Center',
    category: 'business',
    role: fullstack,
    summary: {
      en: 'An Arabic publishing platform for research and learning.',
      ar: 'منصة نشر عربية للبحث والتعلّم.',
    },
    details: {
      en: 'Developed a responsive Arabic web platform for articles, research, books, documents, educational series, and training resources. Built with Laravel, Inertia.js, React, and Tailwind CSS, with searchable content and right-to-left layouts.',
      ar: 'طوّرت منصة عربية متجاوبة للمقالات والأبحاث والكتب والوثائق والسلاسل التعليمية وموارد التدريب باستخدام Laravel وInertia.js وReact وTailwind CSS، مع محتوى قابل للبحث وتخطيط من اليمين إلى اليسار.',
    },
    tags: ['Laravel', 'Inertia.js', 'React'],
    live: 'https://abbascenter.org/',
  },
  {
    id: 'sandok',
    title: 'Sandok Taadod',
    category: 'business',
    role: fullstack,
    summary: {
      en: 'Cooperative fund administration on a shared local network.',
      ar: 'إدارة صندوق تعاوني عبر شبكة محلية مشتركة.',
    },
    details: {
      en: 'Developed a local-network platform for cooperative fund administration and community financial tracking. It organizes fund records and administrative workflows in a shared local environment. Public source code and a live demo are not currently available.',
      ar: 'طوّرت منصة شبكة محلية لإدارة صندوق تعاوني وتتبع الشؤون المالية المجتمعية. تنظّم سجلات الصندوق والإجراءات الإدارية ضمن بيئة محلية مشتركة. لا يتوفر حاليًا كود مصدري عام أو عرض مباشر.',
    },
    tags: ['Local network', 'Financial workflows'],
  },
  {
    id: 'rustlink',
    title: 'RustLink',
    category: 'opensource',
    role: contributor,
    summary: {
      en: 'Map and shop improvements for an Electron companion.',
      ar: 'تحسين الخرائط والمتاجر في تطبيق Electron مرافق.',
    },
    details: {
      en: 'Extended an existing unofficial Rust+ companion based on the upstream Atlas project. My version improves map grids, zoom-aware labels, vending-machine search, shop views, and traveling-vendor support. Uses Vue, Electron, and the Rust+ WebSocket protocol.',
      ar: 'أضفت تحسينات لتطبيق مرافق غير رسمي قائم على مشروع Atlas، تشمل شبكة الخريطة وتسميات التكبير والبحث عن آلات البيع وواجهات المتاجر ودعم البائع المتجول. يعتمد على Vue وElectron وبروتوكول Rust+ WebSocket.',
    },
    tags: ['Vue', 'Electron', 'WebSocket'],
    repo: 'https://github.com/JawadYzbk/rustLink',
  },
  {
    id: 'atten',
    title: 'Atten',
    category: 'opensource',
    role: { en: 'Windows contributor', ar: 'مساهم في إصدار Windows' },
    summary: {
      en: 'Bringing local text-to-speech to Windows.',
      ar: 'إتاحة تحويل النص إلى صوت محليًا على Windows.',
    },
    details: {
      en: 'Developed Windows support for the existing open-source Atten text-to-speech application. My contribution includes Windows application support and speech-model integration, with local voice generation and audio export for offline use.',
      ar: 'طوّرت دعم Windows لتطبيق Atten القائم والمفتوح المصدر لتحويل النص إلى صوت. تشمل مساهمتي دعم التطبيق وتكامل نماذج الكلام لتوليد الصوت وتصديره محليًا دون اتصال.',
    },
    tags: ['Windows', '.NET', 'Text-to-speech'],
    repo: 'https://github.com/JawadYzbk/atten',
  },
  {
    id: 'flocafe',
    title: 'FloCafe',
    category: 'opensource',
    role: contributor,
    summary: {
      en: 'An offline-first point of sale for food businesses.',
      ar: 'نظام نقاط بيع يعمل دون اتصال لمشاريع الطعام.',
    },
    details: {
      en: 'Contribute to an existing free, open-source point-of-sale application for cafes, restaurants, and food businesses. It brings orders, customer records, receipts, and local data management into a desktop workflow that can operate offline.',
      ar: 'أساهم في تطبيق نقاط بيع مجاني ومفتوح المصدر للمقاهي والمطاعم ومشاريع الطعام. يجمع الطلبات وسجلات العملاء والإيصالات وإدارة البيانات المحلية في تطبيق مكتبي يعمل دون اتصال.',
    },
    tags: ['Next.js', 'Electron', 'SQLite'],
    repo: 'https://github.com/JawadYzbk/FloCafe',
  },
  {
    id: 'portfolio',
    title: 'Jawad.dev',
    category: 'business',
    role: creator,
    summary: {
      en: 'This bilingual home for my work.',
      ar: 'هذا الموقع الثنائي اللغة لعرض أعمالي.',
    },
    details: {
      en: 'Designed and developed this portfolio with Next.js, TypeScript, Tailwind CSS, and Motion. It has English and Arabic layouts, light and dark themes, filterable project exploration, real application images, and a contact form.',
      ar: 'صمّمت وطوّرت هذا الموقع باستخدام Next.js وTypeScript وTailwind CSS وMotion. يضم تخطيطًا عربيًا وإنجليزيًا ومظهرين فاتحًا وداكنًا واستكشافًا للمشاريع مع التصفية وصورًا فعلية للتطبيقات ونموذج تواصل.',
    },
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Motion'],
    repo: 'https://github.com/JawadYzbk/jawadyz-portfolio',
  },
];
