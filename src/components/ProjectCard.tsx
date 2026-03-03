import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import React from "react";

interface ProjectCardProps {
  key?: React.Key;
  name: string;
  description: string;
  githubUrl: string;
  demoUrl?: string;
  tags: string[];
  color: string;
  delay?: number;
}

export default function ProjectCard({
  name,
  description,
  githubUrl,
  demoUrl,
  tags,
  color,
  delay = 0,
}: ProjectCardProps) {
  const mainUrl = demoUrl || githubUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col justify-between p-6 h-full rounded-2xl bg-white/60 backdrop-blur-md border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 overflow-hidden`}
    >
      {/* Subtle gradient background on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${color.split(" ")[0]}`}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <a 
            href={mainUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xl font-serif font-semibold text-gray-900 tracking-wide group-hover:text-rose-600 transition-colors duration-300 hover:underline decoration-rose-300 underline-offset-4"
          >
            {name}
          </a>
          <div className="flex gap-2 ml-4 shrink-0">
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
              title="GitHub Repository"
            >
              <Github size={16} strokeWidth={2} />
            </a>
            {demoUrl && (
              <a 
                href={demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-rose-50 text-rose-400 hover:bg-rose-100 hover:text-rose-600 transition-colors duration-300"
                title="Live Demo"
              >
                <ExternalLink size={16} strokeWidth={2} />
              </a>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-6 font-light">
          {description}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`px-3 py-1 text-xs rounded-full border bg-white/50 backdrop-blur-sm transition-colors duration-300 ${color}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
