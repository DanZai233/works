import { motion } from "motion/react";
import { Github, BookOpen, Mail, Heart } from "lucide-react";
import ParticleBackground from "./components/ParticleBackground";
import ProjectCard from "./components/ProjectCard";
import ThemeToggle from "./components/ThemeToggle";

const projects = [
  {
    name: "MYGallery",
    description: "一个简约、美观、功能完整的个人照片墙系统，人人都可以自部署自己的照片展示空间。",
    githubUrl: "https://github.com/DanZai233/MYGallery",
    tags: ["Web", "Gallery", "Self-hosted"],
    color: "text-rose-600 border-rose-100 bg-rose-50/50",
  },
  {
    name: "Aim Trainer Pro (AIMBOT)",
    description: "高性能瞄准训练器，提升你的游戏反应与精准度。",
    githubUrl: "https://github.com/DanZai233/AIMBOT",
    demoUrl: "https://aim.danzaii.cn",
    tags: ["Game", "Training", "Performance"],
    color: "text-sky-600 border-sky-100 bg-sky-50/50",
  },
  {
    name: "MoodCard",
    description: "记录与分享你的心情卡片，定格每一个细腻的瞬间。",
    githubUrl: "https://github.com/DanZai233/MoodCard",
    demoUrl: "https://mood.danzaii.cn",
    tags: ["Design", "Card", "Mood"],
    color: "text-amber-600 border-amber-100 bg-amber-50/50",
  },
  {
    name: "Chromatopoetry",
    description: "色彩与诗意的交织，将文字转化为视觉的艺术。",
    githubUrl: "https://github.com/DanZai233/Chromatopoetry",
    demoUrl: "https://color.danzaii.cn",
    tags: ["Art", "Poetry", "Color"],
    color: "text-emerald-600 border-emerald-100 bg-emerald-50/50",
  },
  {
    name: "Toiletime",
    description: "离开工位时添加一条说明，让同事知道你去哪了。",
    githubUrl: "https://github.com/DanZai233/Toiletime",
    demoUrl: "https://time.danzaii.cn",
    tags: ["Utility", "Work", "Life"],
    color: "text-purple-600 border-purple-100 bg-purple-50/50",
  },
  {
    name: "NewsChronicle-AI",
    description: "基于 AI 的新闻纪事本，智能聚合与分析每日热点。",
    githubUrl: "https://github.com/DanZai233/NewsChronicle-AI",
    demoUrl: "https://news.danzaii.cn",
    tags: ["AI", "News", "Data"],
    color: "text-slate-600 border-slate-200 bg-slate-50/50",
  },
  {
    name: "PixelBead",
    description: "像素拼豆生成器，将图片转化为可制作的拼豆图纸。",
    githubUrl: "https://github.com/DanZai233/PixelBead",
    demoUrl: "https://pindou.danzaii.cn",
    tags: ["Pixel Art", "Tool", "Craft"],
    color: "text-cyan-600 border-cyan-100 bg-cyan-50/50",
  },
  {
    name: "Record-ME",
    description: "轻量级记录工具，随时随地留下你的想法与灵感。",
    githubUrl: "https://github.com/DanZai233/Record-ME",
    tags: ["Note", "Record", "Lightweight"],
    color: "text-orange-600 border-orange-100 bg-orange-50/50",
  },
  {
    name: "Tianji",
    description: "天机不可泄露，探寻未知的奥秘与可能。",
    githubUrl: "https://github.com/DanZai233/Tianji",
    demoUrl: "https://tianji.danzaii.cn",
    tags: ["Mystery", "Exploration", "Discovery"],
    color: "text-lime-600 border-lime-100 bg-lime-50/50",
  }
];

export default function App() {
  return (
    <div className="min-h-screen relative font-sans selection:bg-rose-100 selection:text-rose-900 dark:selection:bg-rose-900 dark:selection:text-rose-100">
      <ParticleBackground />

      {/* Theme Toggle Button */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-32">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm mb-8 text-sm text-gray-600 font-medium tracking-wide dark:bg-gray-800/60 dark:border-gray-700/40 dark:text-gray-300">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            一只小羊羔的窝
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 tracking-tight" style={{ color: 'var(--title-color)' }}>
            所作，
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-300">
              所为
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed font-light mb-10 mx-auto md:mx-0 dark:text-gray-400">
            在网上闭眼冲浪！这里记录着我的一些开源项目与奇思妙想。
            <br className="hidden md:block" />
            从实用的工具到有趣的玩具，每一行代码都是生活的注脚。
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a
              href="https://github.com/DanZai233"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a
              href="http://blog.danzaii.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-md text-gray-700 border border-gray-200 hover:border-rose-200 hover:text-rose-600 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 dark:bg-gray-800/80 dark:border-gray-700 dark:text-gray-300 dark:hover:border-rose-800 dark:hover:text-rose-400"
            >
              <BookOpen size={18} />
              <span>Blog</span>
            </a>
          </div>
        </motion.header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              {...project}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-32 pt-8 border-t border-gray-200/50 text-center text-gray-400 text-sm flex flex-col items-center gap-2 dark:border-gray-700/50"
        >
          <p className="flex items-center gap-1">
            Made with <Heart size={14} className="text-rose-400" /> by DanZai233
          </p>
          <p>
            © {new Date().getFullYear()} 一只小羊羔的窝. All rights reserved.
          </p>
        </motion.footer>
      </main>

      {/* Decorative background elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-rose-100/30 blur-[120px] pointer-events-none z-0 dark:bg-rose-900/20" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-100/30 blur-[120px] pointer-events-none z-0 dark:bg-orange-900/20" />
    </div>
  );
}
