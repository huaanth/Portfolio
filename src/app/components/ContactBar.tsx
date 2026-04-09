import { Linkedin, Github, Mail } from "lucide-react";

export function ContactBar() {
  return (
    <div className="fixed bottom-8 right-8 flex gap-6">
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-black/80 hover:bg-black flex items-center justify-center transition-colors"
      >
        <Linkedin className="w-5 h-5 text-white" />
      </a>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-black/80 hover:bg-black flex items-center justify-center transition-colors"
      >
        <Github className="w-5 h-5 text-white" />
      </a>
      <a
        href="mailto:anthony@example.com"
        className="w-12 h-12 rounded-full bg-black/80 hover:bg-black flex items-center justify-center transition-colors"
      >
        <Mail className="w-5 h-5 text-white" />
      </a>
    </div>
  );
}
