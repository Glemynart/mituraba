import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Cloud, Droplets, Music, Info, Volume2, Image as ImageIcon, HelpCircle, Check, X, BookText } from "lucide-react";

/*  MITURABÁ — Versión con:
    - Lluvia animada + control de intensidad
    - Intro “La búsqueda”
    - Decisiones éticas (acordeones)
    - Mitos (usan las MISMAS imágenes que la Galería)
    - Galería con lightbox + navegación por teclado
    - Muro de memorias (local)
    - Quiz
    - NUEVO: sección “Crónica” (texto largo)
*/

export default function MiturabaInteractive() {
  const { scrollYProgress } = useScroll();
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [rainOn, setRainOn] = useState(false);
  const [rainIntensity, setRainIntensity] = useState(0.4); // 0..1
  const [showEthics, setShowEthics] = useState(null);

  // --- Sonido ambiental
  useEffect(() => {
    const a = new Audio("/audios/ambiente-lluvia.wav");
    a.loop = true;
    a.volume = rainIntensity;
    if (rainOn) a.play();
    else { a.pause(); a.currentTime = 0; }
    return () => a.pause();
  }, [rainOn, rainIntensity]);

  // --- TEXTOS
  const ethics = useMemo(() => [
    { title: "Proteger a la fuente", text: "Omitimos entrevistas y rostros. En el territorio aún hay actores armados; nuestra prioridad fue no exponer a nadie." },
    { title: "Verificar antes que narrar", text: "Al cruzar documentos, un dato clave no coincidía. Decidimos no afirmar lo que no podíamos comprobar." },
    { title: "Cambiar la forma de contar", text: "Dejamos el stop motion por tiempos y viramos del minidocumental a una ficción simbólica: menos literal, más respetuosa." },
    { title: "No revictimizar el lugar", text: "Evitamos nombres y señalamientos. Bajo del Oso hoy es un sitio tranquilo: preferimos el símbolo (huellas rojas, lluvia) a la crudeza." },
  ], []);

  // IMÁGENES DEL PROYECTO (Galería)
  const gallery = useMemo(() => ([
    { src: "/img/porton-bananera.jpg", alt: "Entrada bananera" },
    { src: "/img/nina-lluvia.jpg", alt: "Niña jugando bajo el chorro" },
    { src: "/img/dibujo-nino-1.jpg", alt: "Dibujo infantil 1" },
    { src: "/img/arbol-noche.jpg", alt: "Árbol y raíces" },
    { src: "/img/dibujo-ninos-varios.jpg", alt: "Dibujos infantiles varios" },
  ]), []);

  // MITOS — usan las MISMAS imágenes de "gallery" (sin duplicar)
  const myths = useMemo(() => ([
    { title: "El lugar donde siempre llueve", img: gallery[2].src, body: "Los niños salpican agua sobre sus dibujos: la memoria se moja, pero no se borra." },
    { title: "Historias de miedo (que alegran)", img: gallery[4].src, body: "A los 4–9 años les llaman así. Entre risas y abrazos, el miedo se vuelve compañía." },
    { title: "Las huellas que hablan", img: gallery[0].src, body: "Un hombre baja del bus. Sus botas dejan rastro rojo: recordar sin mostrar la violencia." },
    { title: "La guardiana del río", img: gallery[3].src, body: "Una figura cuida que el agua lleve historias, no olvido. Si la escuchas, pide respeto." },
    { title: "La casa del árbol", img: gallery[1].src, body: "Debajo del follaje, la ronda infantil suena más fuerte que la tormenta." },
  ]), [gallery]);

  // Estado para mitos (modal)
  const [mythOpen, setMythOpen] = useState(null);

  // Sonidito al abrir mito
  const clickAudio = useRef(null);
  useEffect(() => {
    clickAudio.current = new Audio("/audios/ambiente-lluvia.wav");
    clickAudio.current.volume = 0.35;
  }, []);
  const playClick = () => { try { if (clickAudio.current){ clickAudio.current.currentTime = 0.1; clickAudio.current.play(); } } catch {} };

  // LIGHTBOX GALERÍA
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox.open) return;
      if (e.key === "Escape") setLightbox({ open: false, index: 0 });
      if (e.key === "ArrowRight") setLightbox((s) => ({ open: true, index: (s.index + 1) % gallery.length }));
      if (e.key === "ArrowLeft")  setLightbox((s) => ({ open: true, index: (s.index - 1 + gallery.length) % gallery.length }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox.open, gallery.length]);

  // MURO DE MEMORIAS (local)
  const [memoryInput, setMemoryInput] = useState("");
  const [memories, setMemories] = useState([]);
  const addMemory = () => {
    if (!memoryInput.trim()) return;
    setMemories((m) => [{ text: memoryInput.trim(), t: Date.now() }, ...m].slice(0, 20));
    setMemoryInput("");
  };

  // QUIZ
  const questions = [
    { q: "¿Qué prioriza MITURABÁ al narrar?", a: ["El impacto sensacionalista", "La protección y el respeto", "Mostrar rostros y nombres"], correct: 1 },
    { q: "¿Qué simbolizan las huellas rojas?", a: ["Decoración de escena", "Alegría del carnaval", "Recuerdo del pasado sin crudeza"], correct: 2 },
    { q: "Cuando un dato no se puede comprobar, ¿qué hacemos?", a: ["Lo publicamos igual", "Lo omitimos y verificamos", "Lo exageramos"], correct: 1 },
  ];
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  // CRÓNICA (texto largo) — reemplaza estos párrafos por tu texto
  const cronica = [
    "¿Quién preservará la memoria cuando esta se mezcla con la violencia? MITURABÁ nace de esa pregunta, y de la decisión de narrar desde la infancia y el territorio.",
    "Empezamos convencidos de que conocíamos la historia. Al volver al territorio y contrastar fuentes, entendimos que recordar exige cuidado: revisar, dudar y, a veces, callar.",
    "Optamos por proteger a la fuente y a su hija; verificamos cada dato y elegimos no afirmar lo que no pudimos comprobar.",
    "Cambiamos de forma: del minidocumental literal a una ficción simbólica. Preferimos la metáfora —huellas rojas, lluvia, ronda— a la crudeza.",
    "Bajo del Oso hoy es un lugar de viento y vegetación. No nombrarlo fue también una forma de no volver a herirlo.",
    "Los niños nos compartieron historias que ellos mismos llaman ‘de miedo’, pero entre risas y abrazos. La memoria, mojada por la lluvia, no desaparece: se vuelve canción.",
  ];
  const [showFull, setShowFull] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100 relative overflow-x-hidden">
      {/* Barra de progreso */}
      <motion.div style={{ width: barWidth }} className="fixed top-0 left-0 h-1 bg-sky-500 z-50" />

      {/* Lluvia visual */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <RainLayer intensity={rainIntensity} />
      </div>

      {/* HERO */}
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                MITURABÁ
                <span className="block text-lg md:text-2xl font-light text-slate-300 mt-3">La lluvia no borra la memoria</span>
              </h1>
              <p className="mt-6 text-slate-300 max-w-prose">
                Una crónica interactiva sobre memoria, infancia y territorio. De lo que fue el proceso de rodaje del teaser "MITURABÁ"
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#recorrido" className="inline-flex items-center gap-2 rounded-2xl bg-sky-600/90 hover:bg-sky-500 px-5 py-3 shadow-lg shadow-sky-900/40 transition">
                  <Droplets className="w-5 h-5" /> Iniciar recorrido
                </a>
                <button onClick={() => setRainOn(!rainOn)} className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 hover:border-slate-500 px-4 py-3">
                  <Volume2 className="w-5 h-5" /> {rainOn ? "Pausar lluvia" : "Reproducir lluvia"}
                </button>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  Intensidad:
                  <input type="range" min="0" max="1" step="0.05" value={rainIntensity}
                    onChange={(e) => setRainIntensity(parseFloat(e.target.value))} className="w-28 accent-sky-500" />
                </div>
              </div>
            </div>
            <HeroCard />
          </div>
        </div>
      </section>

      {/* INTRO – La búsqueda */}
      <section className="relative z-10 py-10 md:py-16">
        <div className="mx-auto max-w-3xl px-6 text-slate-300 leading-relaxed">
          <p>
            Empezamos convencidos de que conocíamos la historia. Al volver al territorio y contrastar fuentes, entendimos
            que recordar exige cuidado: revisar, dudar y, a veces, callar. De esa elección nace MITURABÁ: un intento por
            preservar la memoria sin convertirla en espectáculo.
          </p>
        </div>
      </section>

      {/* DECISIONES ÉTICAS */}
      <section id="recorrido" className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <header className="flex items-center gap-3 mb-8">
            <Info className="w-6 h-6 text-sky-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Decisiones éticas del proyecto</h2>
          </header>
          <ul className="grid md:grid-cols-2 gap-6">
            {ethics.map((e, i) => (
              <li key={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl">
                <button onClick={() => setShowEthics(showEthics === i ? null : i)} className="w-full text-left">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sky-400 text-sm uppercase tracking-wider">Paso {i + 1}</p>
                      <h3 className="text-xl md:text-2xl font-semibold mt-1">{e.title}</h3>
                    </div>
                    <motion.span initial={{ rotate: 0 }} animate={{ rotate: showEthics === i ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }} className="text-slate-400">⌄</motion.span>
                  </div>
                  <AnimatePresence initial={false}>
                    {showEthics === i && (
                      <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        className="mt-3 text-slate-300">{e.text}</motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MITOS — usan imágenes de Galería */}
      <section id="mitos" className="relative z-10 py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="mx-auto max-w-6xl px-6">
          <header className="flex items-center gap-3 mb-8">
            <Cloud className="w-6 h-6 text-sky-300" />
            <h2 className="text-2xl md:text-3xl font-bold">Mitos del territorio</h2>
          </header>

          <div className="grid md:grid-cols-5 gap-4">
            {myths.map((m, i) => (
              <motion.button key={i} onClick={() => { setMythOpen(i); playClick(); }}
                whileHover={{ y: -4 }} className="rounded-2xl p-3 bg-slate-900/60 border border-slate-800 shadow-xl text-left">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-2 bg-slate-800/40 border border-slate-700">
                  <img src={m.img} alt={m.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4" /><p className="font-semibold text-sm">{m.title}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* MODAL DE MITO */}
        <AnimatePresence>
          {mythOpen !== null && (
            <motion.div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMythOpen(null)}>
              <motion.div onClick={(e) => e.stopPropagation()}
                className="bg-slate-900/90 border border-slate-700 rounded-3xl p-5 max-w-2xl w-full"
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>
                <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 border border-slate-700">
                  <img src={myths[mythOpen].img} alt={myths[mythOpen].title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{myths[mythOpen].title}</h3>
                <p className="text-slate-300">{myths[mythOpen].body}</p>
                <div className="mt-4 text-right">
                  <button onClick={() => setMythOpen(null)} className="rounded-xl px-4 py-2 border border-slate-600 hover:border-slate-400">Cerrar</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* AUDIO / RITUAL */}
      <section id="audio" className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <header className="flex items-center gap-3 mb-4">
            <Music className="w-6 h-6 text-sky-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Lluvia & ritual</h2>
          </header>
          <p className="text-slate-300 mb-4">
            Lluvia y ronda infantil como ritual de memoria. El agua cae sobre el papel, pero el dibujo persiste:
            recordar también es jugar.
          </p>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <audio controls className="w-full">
              <source src="/audios/ambiente-lluvia.wav" type="audio/wav" />
            </audio>
            <p className="text-xs text-slate-400 mt-3">Sustituye este audio por voces o canción propia (colócala en <code>/public/audios/</code>).</p>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="relative z-10 py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Galería</h2>
          <p className="text-slate-300 mb-8">
            Territorio, juego, símbolo. Esta galería recoge paisajes, escenas y dibujos infantiles que inspiran el proyecto.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {gallery.map((g, idx) => (
              <button key={idx} onClick={() => setLightbox({ open: true, index: idx })}
                className="aspect-[4/3] rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl overflow-hidden">
                <img src={g.src} alt={g.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox({ open: false, index: 0 })}>
            <img src={gallery[lightbox.index].src} alt={gallery[lightbox.index].alt}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MURO DE MEMORIAS (local) */}
      <section id="memorias" className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <header className="flex items-center gap-3 mb-4">
            <ImageIcon className="w-6 h-6 text-sky-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Muro de memorias</h2>
          </header>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <input value={memoryInput} onChange={(e) => setMemoryInput(e.target.value)}
                placeholder="Escribe una palabra/recuerdo…" className="w-full rounded-xl bg-slate-900/60 border border-slate-700 px-4 py-3 outline-none focus:border-slate-400" />
              <button onClick={addMemory} className="mt-2 w-full rounded-xl bg-sky-600/90 hover:bg-sky-500 px-4 py-3">Agregar</button>
              <p className="text-xs text-slate-400 mt-2">*Esto se guarda solo en esta sesión (sin backend).</p>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-3">
              <AnimatePresence>
                {memories.map((m) => (
                  <motion.div key={m.t} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                    className="rounded-xl border border-slate-700 bg-slate-900/60 p-3 text-sm">{m.text}</motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* QUIZ */}
      <section id="quiz" className="relative z-10 py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="mx-auto max-w-5xl px-6">
          <header className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-sky-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Quiz rápido</h2>
          </header>
          <div className="space-y-6">
            {questions.map((qq, qi) => (
              <div key={qi} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <p className="font-semibold mb-3">{qi + 1}. {qq.q}</p>
                <div className="grid md:grid-cols-3 gap-3">
                  {qq.a.map((opt, oi) => {
                    const selected = answers[qi] === oi;
                    const correct = qq.correct === oi;
                    const show = answers[qi] !== null;
                    return (
                      <button key={oi} onClick={() => setAnswers((arr) => arr.map((v, idx) => (idx === qi ? oi : v)))}
                        className={`rounded-xl px-4 py-3 border transition text-left
                          ${selected ? "border-sky-400" : "border-slate-700 hover:border-slate-500"}
                          ${show && correct ? "bg-emerald-600/30" : "" }
                          ${show && selected && !correct ? "bg-rose-600/20" : "" }`}>
                        <div className="flex items-center gap-2">
                          {show ? (correct ? <Check className="w-4 h-4"/> : selected ? <X className="w-4 h-4"/> : null) : null}
                          <span>{opt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NUEVO — CRÓNICA COMPLETA */}
      <section id="cronica" className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <header className="flex items-center gap-3 mb-4">
            <BookText className="w-6 h-6 text-sky-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Crónica</h2>
          </header>

          {/* Intro corta siempre visible */}
          <p className="text-slate-300 mb-4">
            Un relato sobre memoria, infancia y territorio. Aquí puedes leer la crónica completa del proyecto.
          </p>

          {/* Cuerpo extensible */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            {(showFull ? cronica : cronica.slice(0, 2)).map((p, i) => (
              <p key={i} className={`text-slate-200 ${i ? "mt-4" : ""}`}>{p}</p>
            ))}

            <div className="mt-6">
              <button onClick={() => setShowFull(!showFull)}
                className="rounded-xl border border-slate-600 hover:border-slate-400 px-4 py-2">
                {showFull ? "Ver menos" : "Leer crónica completa"}
              </button>
            </div>
          </div>

          {/* Tip: si prefieres un PDF/Doc embebido, incrústalo aquí con <iframe src="URL" /> */}
        </div>
      </section>

      {/* CIERRE */}
      <footer className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">¿Qué historia del territorio no debe borrarse?</h3>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
            Deja una palabra, un recuerdo o un mito local. Este tejido de voces es MITURABÁ.
          </p>
          <a href="#" className="inline-flex items-center gap-2 mt-6 rounded-2xl bg-sky-600/90 hover:bg-sky-500 px-6 py-3 shadow-lg shadow-sky-900/40 transition">
            Compartir memoria
          </a>
          <p className="text-xs text-slate-500 mt-4">Prototipo – MITURABÁ</p>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Componentes auxiliares ---------- */

function HeroCard() {
  return (
    <div className="relative">
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 shadow-2xl p-6 overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-semibold">Crónica + Infancia + Territorio</h2>
          <p className="text-slate-300 mt-2 text-sm">
            MITURABÁ es una apuesta por la memoria desde la niñez. En vez de mostrar la violencia de forma cruda,
            recurre a la calidez, la metáfora y el juego.
          </p>
        </div>
        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 600 300" className="w-full h-full">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="80" r="60" fill="url(#g)" />
            <circle cx="220" cy="140" r="40" fill="url(#g)" />
            <circle cx="360" cy="60" r="70" fill="url(#g)" />
            <circle cx="480" cy="120" r="50" fill="url(#g)" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function RainLayer({ intensity = 0.4 }) {
  const drops = Math.round(40 + intensity * 80); // 40..120
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.10),_transparent_60%)]" />
      <div className="absolute inset-0">
        {Array.from({ length: drops }).map((_, i) => (
          <span
            key={i}
            className="absolute top-[-10%] h-28 w-px bg-sky-400/40 animate-[raindrop_1.6s_linear_infinite]"
            style={{
              left: `${(i * 97) % 100}%`,
              animationDelay: `${(i % 15) * 0.08}s`,
              transform: `translateY(${(i % 5) * 10}px)`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes raindrop {
          0% { transform: translateY(-20vh); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(120vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
