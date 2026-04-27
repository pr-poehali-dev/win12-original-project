import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";

// ===== ЗНАК WINDOWS (SVG) =====
const WindowsLogo = ({ size = 22, glow = false }: { size?: number; glow?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={glow ? "win-logo" : ""}>
    <path d="M0 3.449L9.75 2.1V11.551H0V3.449Z" fill="#7c3aed"/>
    <path d="M10.949 1.949L24 0V11.4H10.949V1.949Z" fill="#9333ea"/>
    <path d="M0 12.6H9.75V22.051L0 20.699V12.6Z" fill="#8b5cf6"/>
    <path d="M10.949 12.6H24V24L10.949 22.051V12.6Z" fill="#a78bfa"/>
  </svg>
);

// ===== ЧАСТИЦЫ НА ФОНЕ =====
const Particles = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.4 + 0.1,
    color: i % 3 === 0 ? "rgba(124,58,237,0.6)" : i % 3 === 1 ? "rgba(167,139,250,0.4)" : "rgba(99,102,241,0.5)",
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
        />
      ))}
      <div className="absolute" style={{ width: 500, height: 500, left: "10%", top: "-10%", background: "radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)", borderRadius: "50%", animation: "orbitFloat 20s ease-in-out infinite", filter: "blur(40px)" }} />
      <div className="absolute" style={{ width: 400, height: 400, right: "5%", bottom: "10%", background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)", borderRadius: "50%", animation: "orbitFloat 25s ease-in-out infinite reverse", filter: "blur(30px)" }} />
      <div className="absolute" style={{ width: 300, height: 300, left: "50%", top: "30%", background: "radial-gradient(ellipse, rgba(167,139,250,0.1) 0%, transparent 70%)", borderRadius: "50%", animation: "orbitFloat 15s ease-in-out infinite 3s", filter: "blur(20px)" }} />
    </div>
  );
};

// ===== ВИДЖЕТЫ =====
const WeatherWidget = () => (
  <div className="glass rounded-2xl p-4 animate-widget liquid-distort" style={{ animationDelay: "0.1s", minWidth: 200 }}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-white/60 text-xs">Москва</span>
      <span className="text-white/40 text-xs">Сейчас</span>
    </div>
    <div className="flex items-center gap-3">
      <div className="text-4xl">⛅</div>
      <div>
        <div className="text-white text-2xl font-semibold">+14°</div>
        <div className="text-white/50 text-xs">Переменная облачность</div>
      </div>
    </div>
    <div className="flex gap-2 mt-3">
      {["Пн", "Вт", "Ср", "Чт", "Пт"].map((d, i) => (
        <div key={d} className="flex flex-col items-center text-xs text-white/50">
          <span>{d}</span>
          <span>{["☀️","⛅","🌧","⛅","☀️"][i]}</span>
          <span className="text-white/70">{["+16","+12","+8","+11","+17"][i]}</span>
        </div>
      ))}
    </div>
  </div>
);

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const h = time.getHours().toString().padStart(2, "0");
  const m = time.getMinutes().toString().padStart(2, "0");
  const s = time.getSeconds().toString().padStart(2, "0");
  const days = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];
  const months = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
  return (
    <div className="glass rounded-2xl p-5 animate-widget liquid-distort" style={{ animationDelay: "0.2s", minWidth: 200 }}>
      <div className="text-center">
        <div className="text-white font-bold" style={{ fontSize: 42, letterSpacing: -1 }}>
          {h}<span style={{ animation: "clockBlink 1s ease-in-out infinite" }} className="inline-block">:</span>{m}
        </div>
        <div className="text-white/50 text-sm">{s}с</div>
        <div className="text-white/60 text-sm mt-1">{days[time.getDay()]}, {time.getDate()} {months[time.getMonth()]}</div>
      </div>
    </div>
  );
};

const StatsWidget = () => (
  <div className="glass rounded-2xl p-4 animate-widget liquid-distort" style={{ animationDelay: "0.3s", minWidth: 200 }}>
    <div className="text-white/60 text-xs mb-3 font-medium">Производительность</div>
    {[
      { label: "CPU", val: 23, color: "#7c3aed" },
      { label: "RAM", val: 67, color: "#a78bfa" },
      { label: "Диск", val: 12, color: "#6366f1" },
      { label: "GPU", val: 45, color: "#8b5cf6" },
    ].map(s => (
      <div key={s.label} className="mb-2">
        <div className="flex justify-between text-xs text-white/50 mb-1">
          <span>{s.label}</span><span>{s.val}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${s.val}%`, background: `linear-gradient(90deg, ${s.color}, #c4b5fd)`, boxShadow: `0 0 8px ${s.color}` }} />
        </div>
      </div>
    ))}
  </div>
);

const NotesWidget = () => (
  <div className="glass rounded-2xl p-4 animate-widget liquid-distort" style={{ animationDelay: "0.35s", minWidth: 200 }}>
    <div className="text-white/60 text-xs mb-3 font-medium">📝 Заметки</div>
    {["Купить продукты", "Встреча в 15:00", "Обновить проект"].map((n, i) => (
      <div key={i} className="flex items-center gap-2 mb-2 text-sm text-white/70">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
        {n}
      </div>
    ))}
  </div>
);

// ===== КОНТЕНТ ОКОН =====
const FileExplorerContent = () => {
  const items = [
    { name: "Рабочий стол", icon: "Monitor", type: "folder" },
    { name: "Документы", icon: "FileText", type: "folder" },
    { name: "Загрузки", icon: "Download", type: "folder" },
    { name: "Изображения", icon: "Image", type: "folder" },
    { name: "Музыка", icon: "Music", type: "folder" },
    { name: "Видео", icon: "Video", type: "folder" },
    { name: "Проект.zip", icon: "Archive", type: "file" },
    { name: "Отчёт.docx", icon: "FileText", type: "file" },
    { name: "Презентация.pptx", icon: "File", type: "file" },
  ];
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 p-3 glass border-b border-white/10">
        <button className="glass rounded-lg p-1.5"><Icon name="ChevronLeft" size={14} className="text-white/70" /></button>
        <button className="glass rounded-lg p-1.5"><Icon name="ChevronRight" size={14} className="text-white/70" /></button>
        <button className="glass rounded-lg p-1.5"><Icon name="RotateCcw" size={14} className="text-white/70" /></button>
        <div className="flex-1 glass rounded-lg px-3 py-1.5 text-white/60 text-sm">📁 Этот компьютер</div>
        <button className="glass rounded-lg p-1.5"><Icon name="Search" size={14} className="text-white/70" /></button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-40 border-r border-white/10 p-2 space-y-1">
          {["Быстрый доступ","Этот ПК","Рабочий стол","Документы","Загрузки","Сеть"].map(n => (
            <div key={n} className="text-white/50 text-xs px-2 py-1.5 rounded-lg hover:bg-white/10 cursor-pointer transition-colors">{n}</div>
          ))}
        </div>
        <div className="flex-1 p-3 grid grid-cols-3 gap-2 content-start overflow-auto">
          {items.map(item => (
            <div key={item.name} className="flex flex-col items-center p-2 rounded-xl hover:bg-white/10 cursor-pointer transition-all group">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-1 group-hover:scale-110 transition-transform"
                style={{ background: item.type === "folder" ? "rgba(124,58,237,0.25)" : "rgba(99,102,241,0.2)" }}>
                <Icon name={item.icon} size={22} className="text-purple-300" fallback="File" />
              </div>
              <span className="text-white/70 text-xs text-center leading-tight">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SettingsContent = () => {
  const [selected, setSelected] = useState("Персонализация");
  const sections = ["Система","Bluetooth","Сеть","Персонализация","Приложения","Время","Конфиденциальность","Обновление"];
  return (
    <div className="h-full flex">
      <div className="w-48 border-r border-white/10 p-3 space-y-1 overflow-auto">
        <div className="flex items-center gap-2 mb-4 p-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">П</div>
          <div><div className="text-white text-sm font-medium">Пользователь</div><div className="text-white/40 text-xs">Локальная запись</div></div>
        </div>
        {sections.map(s => (
          <button key={s} onClick={() => setSelected(s)}
            className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-all ${selected === s ? "bg-purple-600/40 text-white border border-purple-500/40" : "text-white/60 hover:bg-white/10 hover:text-white"}`}>
            {s}
          </button>
        ))}
      </div>
      <div className="flex-1 p-5 overflow-auto">
        <h2 className="text-white text-lg font-semibold mb-4">{selected}</h2>
        <div className="space-y-3">
          {[
            { label: "Тема оформления", val: "Тёмная (Liquid Glass)" },
            { label: "Цвет акцента", val: "Фиолетовый" },
            { label: "Прозрачность", val: "Включена" },
            { label: "Анимации", val: "Включены" },
          ].map(item => (
            <div key={item.label} className="glass rounded-xl p-3 flex justify-between items-center">
              <span className="text-white/70 text-sm">{item.label}</span>
              <span className="text-purple-300 text-sm font-medium">{item.val}</span>
            </div>
          ))}
          {Array.from({length: 2}, (_, i) => (
            <div key={i} className="glass rounded-xl p-3 flex justify-between items-center">
              <div>
                <div className="text-white/80 text-sm">Параметр {i + 1}</div>
                <div className="text-white/40 text-xs mt-0.5">Описание настройки</div>
              </div>
              <div className={`w-10 h-5 rounded-full transition-colors ${i % 2 === 0 ? "bg-purple-500" : "bg-white/20"} relative cursor-pointer`}>
                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${i % 2 === 0 ? "right-0.5" : "left-0.5"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TerminalContent = () => {
  const [lines, setLines] = useState(["Windows PowerShell", "Copyright (C) Microsoft Corporation.", "", "PS C:\\Users\\Пользователь> "]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const run = (cmd: string) => {
    const responses: Record<string, string[]> = {
      "dir": ["29.04.2025  Документы","29.04.2025  Загрузки","29.04.2025  Рабочий стол"],
      "ver": ["Microsoft Windows [Version 11.0.26100]"],
      "whoami": ["пк\\пользователь"],
      "help": ["dir — папка", "ver — версия", "whoami — пользователь"],
    };
    const r = responses[cmd.toLowerCase().trim()];
    if (cmd.toLowerCase() === "cls") { setLines(["PS C:\\Users\\Пользователь> "]); return; }
    setLines(prev => [...prev.slice(0,-1), `PS C:\\Users\\Пользователь> ${cmd}`, ...(r || [`'${cmd}' не является командой. Введите help.`]), "", "PS C:\\Users\\Пользователь> "]);
  };
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);
  return (
    <div className="h-full flex flex-col bg-black/60 font-mono text-sm p-3 overflow-auto cursor-text"
      onClick={e => (e.currentTarget.querySelector("input") as HTMLInputElement)?.focus()}>
      {lines.map((l, i) => <div key={i} className={l.startsWith("PS ") ? "text-cyan-300" : "text-gray-200"}>{l}</div>)}
      <div className="flex"><input value={input} onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter" && input.trim()) { run(input); setInput(""); } }}
        className="bg-transparent outline-none text-white flex-1 font-mono" autoFocus /></div>
      <div ref={endRef} />
    </div>
  );
};

const BrowserContent = () => (
  <div className="h-full flex flex-col">
    <div className="flex items-center gap-2 p-2 glass border-b border-white/10">
      <button className="glass rounded-lg p-1.5"><Icon name="ChevronLeft" size={13} className="text-white/70" /></button>
      <button className="glass rounded-lg p-1.5"><Icon name="ChevronRight" size={13} className="text-white/70" /></button>
      <button className="glass rounded-lg p-1.5"><Icon name="RotateCcw" size={13} className="text-white/70" /></button>
      <div className="flex-1 glass rounded-xl px-3 py-1.5 text-white/50 text-sm flex items-center gap-2">
        <Icon name="Lock" size={12} className="text-green-400" />
        <span>https://windows.microsoft.com</span>
      </div>
      <button className="glass rounded-lg p-1.5"><Icon name="MoreHorizontal" size={13} className="text-white/70" /></button>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center gap-5 p-8">
      <WindowsLogo size={64} glow />
      <div className="text-white/70 text-lg font-medium">Microsoft Edge</div>
      <div className="w-full max-w-sm glass rounded-2xl flex items-center gap-3 px-4 py-3">
        <Icon name="Search" size={16} className="text-white/40" />
        <span className="text-white/30 text-sm">Поиск или адрес сайта...</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {["🎵 Музыка","📰 Новости","🛒 Покупки","⚽ Спорт","🎮 Игры","🌍 Карты","💼 Работа","📷 Фото"].map(s => (
          <div key={s} className="glass rounded-xl p-3 text-white/60 text-xs text-center hover:bg-white/10 cursor-pointer">{s}</div>
        ))}
      </div>
    </div>
  </div>
);

const CalcContent = () => {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState("");
  const [op, setOp] = useState("");
  const [newNum, setNewNum] = useState(true);
  const press = (val: string) => {
    if (val === "AC") { setDisplay("0"); setPrev(""); setOp(""); setNewNum(true); return; }
    if (val === "±") { setDisplay(d => d.startsWith("-") ? d.slice(1) : "-" + d); return; }
    if (val === "%") { setDisplay(d => String(parseFloat(d) / 100)); return; }
    if (["+","-","×","÷"].includes(val)) { setPrev(display); setOp(val); setNewNum(true); return; }
    if (val === "=") {
      const a = parseFloat(prev), b = parseFloat(display);
      const res = op === "+" ? a+b : op === "-" ? a-b : op === "×" ? a*b : op === "÷" && b !== 0 ? a/b : b;
      setDisplay(String(parseFloat(res.toFixed(10)))); setOp(""); setPrev(""); setNewNum(true); return;
    }
    if (val === ".") { if (!display.includes(".")) setDisplay(d => d + "."); return; }
    setDisplay(d => newNum ? val : d === "0" ? val : d + val);
    setNewNum(false);
  };
  const flat: string[][] = [["AC","±","%","÷"],["7","8","9","×"],["4","5","6","-"],["1","2","3","+"],["0",".","="]];
  return (
    <div className="h-full flex flex-col bg-black/30 select-none">
      <div className="flex-1 flex items-end justify-end px-5 pt-4">
        <div className="text-white/40 text-sm">{op ? `${prev} ${op}` : ""}</div>
      </div>
      <div className="text-right px-5 pb-3">
        <div className="text-white font-light" style={{ fontSize: 52 }}>{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-1.5 p-3">
        {flat.map((row, ri) => row.map((btn: string, ci: number) => {
          const isOp = ["+","-","×","÷"].includes(btn);
          const isEq = btn === "=";
          const isFn = ["AC","±","%"].includes(btn);
          return (
            <button key={`${ri}-${ci}`} onClick={() => press(btn)}
              className={`rounded-2xl h-14 font-medium text-lg transition-all active:scale-95
                ${isOp ? "bg-purple-600/70 hover:bg-purple-500/80 text-white" : ""}
                ${isEq ? "bg-purple-500 hover:bg-purple-400 text-white" : ""}
                ${isFn ? "bg-white/20 hover:bg-white/30 text-white" : ""}
                ${!isOp && !isEq && !isFn ? "bg-white/10 hover:bg-white/20 text-white" : ""}`}>
              {btn}
            </button>
          );
        }))}
      </div>
    </div>
  );
};

const MusicContent = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [current, setCurrent] = useState(0);
  const tracks = [
    { title: "Midnight Purple", artist: "Neon Dreams", dur: "3:42" },
    { title: "Glass Rain", artist: "Aurora", dur: "4:18" },
    { title: "Liquid Sky", artist: "Synthwave", dur: "5:01" },
    { title: "Violet Hours", artist: "Crystal Method", dur: "3:55" },
    { title: "Deep Space", artist: "Orbital", dur: "6:20" },
  ];
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setProgress(p => p >= 100 ? 0 : p + 0.3), 300);
    return () => clearInterval(t);
  }, [playing]);
  return (
    <div className="h-full flex flex-col">
      <div className="relative flex-none h-40 overflow-hidden flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #2d0a6b, #1a0a4a, #0d1a5c)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.4) 0%, transparent 70%)" }} />
        <div className="relative text-center">
          <div className="text-6xl mb-2" style={{ animation: playing ? "spin 8s linear infinite" : "none" }}>💿</div>
          <div className="text-white font-semibold">{tracks[current].title}</div>
          <div className="text-white/50 text-sm">{tracks[current].artist}</div>
        </div>
      </div>
      <div className="px-4 pt-3">
        <div className="h-1.5 bg-white/10 rounded-full cursor-pointer" onClick={e => {
          const r = e.currentTarget.getBoundingClientRect();
          setProgress(((e.clientX - r.left) / r.width) * 100);
        }}>
          <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400 relative" style={{ width: `${progress}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full" />
          </div>
        </div>
        <div className="flex justify-between text-white/40 text-xs mt-1">
          <span>{Math.floor(progress * 0.042)}:{String(Math.floor((progress * 2.52) % 60)).padStart(2,"0")}</span>
          <span>{tracks[current].dur}</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-6 py-3">
        <button onClick={() => setCurrent(c => Math.max(0,c-1))}><Icon name="SkipBack" size={20} className="text-white/50" /></button>
        <button onClick={() => setPlaying(p => !p)}
          className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-all hover:scale-110"
          style={{ boxShadow: "0 0 20px rgba(124,58,237,0.5)" }}>
          <Icon name={playing ? "Pause" : "Play"} size={20} className="text-white" />
        </button>
        <button onClick={() => setCurrent(c => Math.min(tracks.length-1,c+1))}><Icon name="SkipForward" size={20} className="text-white/50" /></button>
      </div>
      <div className="flex-1 overflow-auto px-3 pb-2">
        {tracks.map((t, i) => (
          <div key={i} onClick={() => { setCurrent(i); setPlaying(true); setProgress(0); }}
            className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all ${current === i ? "bg-purple-600/30 border border-purple-500/30" : "hover:bg-white/10"}`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${current === i ? "bg-purple-500 text-white" : "bg-white/10 text-white/40"}`}>{i+1}</div>
            <div className="flex-1">
              <div className={`text-sm font-medium ${current === i ? "text-purple-300" : "text-white/70"}`}>{t.title}</div>
              <div className="text-white/40 text-xs">{t.artist}</div>
            </div>
            <span className="text-white/30 text-xs">{t.dur}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ===== ОКНО =====
interface WindowState {
  id: string; title: string; icon: string;
  x: number; y: number; width: number; height: number;
  minimized: boolean; maximized: boolean; zIndex: number; content: string;
}

const AppWindow = ({ win, onClose, onMinimize, onMaximize, onFocus, onMove }: {
  win: WindowState;
  onClose: (id: string) => void; onMinimize: (id: string) => void;
  onMaximize: (id: string) => void; onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
}) => {
  const dragRef = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null);
  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".win-ctrl")) return;
    onFocus(win.id);
    dragRef.current = { startX: e.clientX, startY: e.clientY, winX: win.x, winY: win.y };
    const move = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      onMove(win.id, dragRef.current.winX + ev.clientX - dragRef.current.startX, dragRef.current.winY + ev.clientY - dragRef.current.startY);
    };
    const up = () => { dragRef.current = null; window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", up); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };
  const contentMap: Record<string, React.ReactNode> = {
    explorer: <FileExplorerContent />, settings: <SettingsContent />,
    terminal: <TerminalContent />, browser: <BrowserContent />,
    calc: <CalcContent />, music: <MusicContent />,
  };
  if (win.minimized) return null;
  const style = win.maximized
    ? { top: 0, left: 0, width: "100vw", height: "calc(100vh - 56px)", borderRadius: 0 }
    : { top: win.y, left: win.x, width: win.width, height: win.height };
  return (
    <div className="fixed glass-dark rounded-2xl overflow-hidden animate-window-open flex flex-col"
      style={{ ...style, zIndex: win.zIndex, boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)" }}
      onClick={() => onFocus(win.id)}>
      <div className="window-titlebar flex items-center gap-2 px-3 py-2.5 cursor-move flex-none" onMouseDown={onMouseDown}>
        <div className="flex gap-1.5">
          <div className="win-ctrl w-3 h-3 rounded-full bg-red-400 hover:bg-red-500" onClick={e => { e.stopPropagation(); onClose(win.id); }} />
          <div className="win-ctrl w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500" onClick={e => { e.stopPropagation(); onMinimize(win.id); }} />
          <div className="win-ctrl w-3 h-3 rounded-full bg-green-400 hover:bg-green-500" onClick={e => { e.stopPropagation(); onMaximize(win.id); }} />
        </div>
        <div className="flex items-center gap-2 flex-1 justify-center pr-12">
          <Icon name={win.icon} size={14} className="text-white/60" fallback="Square" />
          <span className="text-white/70 text-sm font-medium">{win.title}</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{contentMap[win.content] || <div className="p-6 text-white/50 text-center">Контент</div>}</div>
    </div>
  );
};

// ===== МЕНЮ ПУСК =====
const StartMenu = ({ onOpen, onClose }: { onOpen: (app: string) => void; onClose: () => void }) => {
  const [search, setSearch] = useState("");
  const pinned = [
    { name: "Проводник", emoji: "📁", id: "explorer" },
    { name: "Edge", emoji: "🌐", id: "browser" },
    { name: "Настройки", emoji: "⚙️", id: "settings" },
    { name: "Терминал", emoji: "🖥️", id: "terminal" },
    { name: "Калькулятор", emoji: "🔢", id: "calc" },
    { name: "Музыка", emoji: "🎵", id: "music" },
    { name: "Фото", emoji: "🖼️", id: "explorer" },
    { name: "Камера", emoji: "📷", id: "explorer" },
    { name: "Почта", emoji: "📧", id: "browser" },
    { name: "Карты", emoji: "🗺️", id: "browser" },
    { name: "Заметки", emoji: "📝", id: "explorer" },
    { name: "Xbox", emoji: "🎮", id: "browser" },
  ];
  const recent = [
    { name: "Документ.docx", emoji: "📄", time: "5 мин назад" },
    { name: "Проект.zip", emoji: "📦", time: "1 ч назад" },
    { name: "Фото_2025.jpg", emoji: "🖼️", time: "2 ч назад" },
    { name: "Таблица.xlsx", emoji: "📊", time: "Вчера" },
    { name: "Презентация.pptx", emoji: "📑", time: "Вчера" },
    { name: "Архив.rar", emoji: "🗜️", time: "3 дня назад" },
  ];
  const filtered = search ? pinned.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) : pinned;
  return (
    <div className="glass-dark rounded-3xl p-5 w-[580px]"
      style={{ position: "fixed", bottom: 68, left: "50%", transform: "translateX(-50%)", animation: "startMenuOpen 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards", boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1)", zIndex: 200 }}>
      <div className="glass rounded-2xl flex items-center gap-3 px-4 py-3 mb-5">
        <Icon name="Search" size={16} className="text-white/40" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск приложений, файлов..."
          className="bg-transparent outline-none text-white placeholder-white/30 flex-1 text-sm" autoFocus />
        <Icon name="Mic" size={14} className="text-white/30" />
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white/70 text-sm font-semibold">Закреплённые</span>
          <span className="text-white/30 text-xs glass rounded-lg px-2 py-0.5 cursor-pointer hover:bg-white/10">Все приложения →</span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {filtered.map(app => (
            <button key={app.name} onClick={() => { onOpen(app.id); onClose(); }}
              className="flex flex-col items-center p-2.5 rounded-2xl hover:bg-white/10 transition-all"
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08) translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; }}>
              <div className="text-2xl mb-1.5">{app.emoji}</div>
              <span className="text-white/60 text-xs text-center leading-tight">{app.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 pt-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white/70 text-sm font-semibold">Недавние</span>
          <span className="text-white/30 text-xs">Ещё →</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {recent.map(f => (
            <div key={f.name} className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/10 cursor-pointer transition-all">
              <span className="text-xl">{f.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="text-white/70 text-xs truncate">{f.name}</div>
                <div className="text-white/30 text-xs">{f.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 mt-4 pt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">П</div>
          <span className="text-white/70 text-sm">Пользователь</span>
        </div>
        <div className="flex gap-2">
          <button className="glass rounded-xl p-2 hover:bg-white/15 transition-colors"><Icon name="Settings" size={16} className="text-white/60" /></button>
          <button className="glass rounded-xl p-2 hover:bg-red-500/30 transition-colors"><Icon name="Power" size={16} className="text-white/60" /></button>
        </div>
      </div>
    </div>
  );
};

// ===== ТРЕЙ ЧАСЫ =====
const SystemTray = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  const h = time.getHours().toString().padStart(2,"0");
  const m = time.getMinutes().toString().padStart(2,"0");
  const months = ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"];
  return (
    <div className="flex items-center gap-3 px-3 cursor-pointer hover:bg-white/10 rounded-xl py-1 transition-colors">
      <div className="flex items-center gap-1.5 text-white/60">
        <Icon name="Volume2" size={14} /><Icon name="Wifi" size={14} /><Icon name="Battery" size={14} />
      </div>
      <div className="text-white/80 text-sm text-right">
        <div className="font-semibold leading-tight">{h}:{m}</div>
        <div className="text-white/40 text-xs leading-tight">{time.getDate()} {months[time.getMonth()]}</div>
      </div>
    </div>
  );
};

// ===== УВЕДОМЛЕНИЕ =====
interface Notification { id: number; title: string; body: string; icon: string; time: string; }

const NotifToast = ({ notif, onDismiss }: { notif: Notification; onDismiss: (id: number) => void }) => (
  <div className="glass rounded-2xl p-3 mb-2 animate-notif cursor-pointer hover:bg-white/12 transition-colors"
    style={{ width: 320, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }} onClick={() => onDismiss(notif.id)}>
    <div className="flex items-start gap-3">
      <div className="text-2xl flex-none">{notif.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-white/80 text-sm font-semibold truncate">{notif.title}</span>
          <span className="text-white/30 text-xs ml-2">{notif.time}</span>
        </div>
        <p className="text-white/50 text-xs leading-relaxed">{notif.body}</p>
      </div>
    </div>
  </div>
);

// ===== ГЛАВНЫЙ КОМПОНЕНТ =====
export default function Index() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [startOpen, setStartOpen] = useState(false);
  const [zCounter, setZCounter] = useState(100);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showWidgets, setShowWidgets] = useState(false);

  const taskbarApps = [
    { id: "explorer", name: "Проводник", emoji: "📁" },
    { id: "browser",  name: "Edge",       emoji: "🌐" },
    { id: "settings", name: "Настройки",  emoji: "⚙️" },
    { id: "terminal", name: "Терминал",   emoji: "🖥️" },
    { id: "calc",     name: "Калькулятор",emoji: "🔢" },
    { id: "music",    name: "Музыка",     emoji: "🎵" },
  ];

  const appDefs: Record<string, { title: string; icon: string; w: number; h: number }> = {
    explorer: { title: "Проводник",     icon: "FolderOpen", w: 680, h: 460 },
    settings: { title: "Параметры",     icon: "Settings",   w: 640, h: 480 },
    terminal: { title: "PowerShell",    icon: "Terminal",   w: 580, h: 380 },
    browser:  { title: "Microsoft Edge",icon: "Globe",      w: 720, h: 500 },
    calc:     { title: "Калькулятор",   icon: "Hash",       w: 320, h: 480 },
    music:    { title: "Медиаплеер",    icon: "Music",      w: 360, h: 520 },
  };

  const openApp = useCallback((id: string) => {
    const def = appDefs[id];
    if (!def) return;
    setWindows(prev => {
      const existing = prev.find(w => w.content === id);
      if (existing) {
        setZCounter(z => { const nz = z+1; return nz; });
        return prev.map(w => w.id === existing.id ? { ...w, minimized: false, zIndex: zCounter+1 } : w);
      }
      const newZ = zCounter + 1; setZCounter(newZ);
      const cx = window.innerWidth/2, cy = window.innerHeight/2;
      return [...prev, { id: `${id}-${Date.now()}`, title: def.title, icon: def.icon,
        x: Math.max(20, cx - def.w/2 + prev.length*20), y: Math.max(20, cy - def.h/2 + prev.length*20),
        width: def.w, height: def.h, minimized: false, maximized: false, zIndex: newZ, content: id }];
    });
  }, [zCounter, appDefs]);

  const closeWindow    = (id: string) => setWindows(ws => ws.filter(w => w.id !== id));
  const minimizeWindow = (id: string) => setWindows(ws => ws.map(w => w.id === id ? { ...w, minimized: true } : w));
  const maximizeWindow = (id: string) => setWindows(ws => ws.map(w => w.id === id ? { ...w, maximized: !w.maximized } : w));
  const focusWindow    = (id: string) => { const nz = zCounter+1; setZCounter(nz); setWindows(ws => ws.map(w => w.id === id ? { ...w, zIndex: nz } : w)); };
  const moveWindow     = (id: string, x: number, y: number) => setWindows(ws => ws.map(w => w.id === id ? { ...w, x: Math.max(0,x), y: Math.max(0,y) } : w));

  const pushNotif = useCallback((n: Omit<Notification,"id">) => {
    const id = Date.now();
    setNotifications(ns => [...ns, { ...n, id }]);
    setTimeout(() => setNotifications(ns => ns.filter(x => x.id !== id)), 5000);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => pushNotif({ title: "Windows 11", body: "Двойной клик по иконкам — открыть приложение.", icon: "🪟", time: "сейчас" }), 1500);
    const t2 = setTimeout(() => pushNotif({ title: "Обновления", body: "Установлены обновления безопасности.", icon: "🛡️", time: "только что" }), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const desktopIcons = [
    { name: "Этот компьютер", emoji: "🖥️", id: "explorer" },
    { name: "Корзина", emoji: "🗑️", id: "explorer" },
    { name: "Документы", emoji: "📁", id: "explorer" },
    { name: "Edge", emoji: "🌐", id: "browser" },
    { name: "Настройки", emoji: "⚙️", id: "settings" },
    { name: "Музыка", emoji: "🎵", id: "music" },
  ];

  return (
    <div className="fixed inset-0 wallpaper overflow-hidden" onClick={() => startOpen && setStartOpen(false)}>
      {/* Частицы фона */}
      <Particles />

      {/* Виджеты */}
      {showWidgets && (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          <ClockWidget /><WeatherWidget /><StatsWidget /><NotesWidget />
        </div>
      )}

      {/* Иконки рабочего стола */}
      <div className="absolute top-4 left-4 flex flex-col gap-4">
        {desktopIcons.map((icon, i) => (
          <div key={icon.name} className="desktop-icon flex flex-col items-center gap-1 w-16 animate-fade-up"
            style={{ animationDelay: `${i * 0.07}s`, animationFillMode: "backwards" }}
            onDoubleClick={() => openApp(icon.id)}>
            <div className="text-3xl w-14 h-14 glass rounded-2xl flex items-center justify-center hover:bg-white/15 transition-all"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>{icon.emoji}</div>
            <span className="text-white text-xs text-center leading-tight px-1 py-0.5 rounded-md"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}>{icon.name}</span>
          </div>
        ))}
      </div>

      {/* Окна */}
      {windows.map(win => (
        <AppWindow key={win.id} win={win} onClose={closeWindow} onMinimize={minimizeWindow}
          onMaximize={maximizeWindow} onFocus={focusWindow} onMove={moveWindow} />
      ))}

      {/* Меню Пуск */}
      {startOpen && <StartMenu onOpen={openApp} onClose={() => setStartOpen(false)} />}

      {/* Уведомления */}
      <div className="fixed top-4 right-4 z-50">
        {notifications.map(n => <NotifToast key={n.id} notif={n} onDismiss={id => setNotifications(ns => ns.filter(x => x.id !== id))} />)}
      </div>

      {/* Панель задач */}
      <div className="fixed bottom-0 left-0 right-0 h-14 z-40" style={{ background: "var(--win-taskbar)", backdropFilter: "blur(32px) saturate(200%)" }}>
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.3), transparent)" }} />
        <div className="h-full flex items-center justify-center gap-1 px-4">
          {/* Поиск */}
          <button className="taskbar-btn glass rounded-xl px-3 py-1.5 flex items-center gap-2 mr-2" onClick={e => e.stopPropagation()}>
            <Icon name="Search" size={14} className="text-white/60" />
            <span className="text-white/50 text-xs hidden sm:block">Поиск</span>
          </button>

          {/* Знак Windows */}
          <button className="taskbar-btn p-2.5 rounded-xl hover:bg-white/10 transition-all mr-2"
            onClick={e => { e.stopPropagation(); setStartOpen(p => !p); }}>
            <WindowsLogo size={22} glow />
          </button>

          {/* Виджеты */}
          <button className={`taskbar-btn p-2.5 rounded-xl transition-all mr-2 ${showWidgets ? "bg-white/15" : "hover:bg-white/10"}`}
            onClick={e => { e.stopPropagation(); setShowWidgets(p => !p); }} title="Виджеты">
            <Icon name="LayoutGrid" size={18} className="text-white/70" />
          </button>

          <div className="w-px h-6 bg-white/15 mx-1" />

          {/* Приложения */}
          {taskbarApps.map(app => {
            const isOpen = windows.some(w => w.content === app.id && !w.minimized);
            return (
              <button key={app.id}
                className={`taskbar-btn relative p-2 rounded-xl transition-all ${isOpen ? "active bg-white/15" : "hover:bg-white/10"}`}
                onClick={e => { e.stopPropagation(); openApp(app.id); }} title={app.name}>
                <span className="text-xl">{app.emoji}</span>
                {isOpen && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-purple-400" style={{ boxShadow: "0 0 6px rgba(167,139,250,0.8)" }} />}
              </button>
            );
          })}

          <div className="w-px h-6 bg-white/15 mx-1" />

          {/* Трей */}
          <SystemTray />

          {/* Уведомления */}
          <button className="taskbar-btn p-2 rounded-xl hover:bg-white/10 relative"
            onClick={e => { e.stopPropagation(); pushNotif({ title: "Центр уведомлений", body: "Все уведомления просмотрены.", icon: "🔔", time: "сейчас" }); }}>
            <Icon name="Bell" size={16} className="text-white/60" />
            {notifications.length > 0 && (
              <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold" style={{ fontSize: 9 }}>{notifications.length}</div>
            )}
          </button>

          {/* Показать рабочий стол */}
          <div className="h-full w-1.5 ml-1 border-l border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            onClick={e => { e.stopPropagation(); setWindows(ws => ws.map(w => ({ ...w, minimized: true }))); }} title="Показать рабочий стол" />
        </div>
      </div>
    </div>
  );
}