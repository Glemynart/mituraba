import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Droplets, Music, Info, Volume2, HelpCircle, Check, X, BookText } from "lucide-react";

/*  MITURABÁ — Versión con:
    - Audio fondo AUTOPLAY (/audios/truenos-lluvia.mp3) + slider de volumen
    - Audio ritual AUTOPLAY al ver la sección (/audios/ambiente-lluvia.wav)
    - Decisiones éticas + estéticas (acordeones)
    - Crónica (larga, colapsable)
    - Galería (13 fotos)
    - Videos por SESIONES/LOCACIONES (3 + 2 + 2) con título y descripción
    - Quiz
*/

export default function MiturabaInteractive() {
  const { scrollYProgress } = useScroll();
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const [rainIntensity, setRainIntensity] = useState(0.4);
  const [rainVisible, setRainVisible] = useState(true);

  // ---- Audio de fondo (truenos) ----
  const bgAudioRef = useRef(null);
  const [bgNeedsGesture, setBgNeedsGesture] = useState(false);
  useEffect(() => {
    if (!bgAudioRef.current) {
      const a = new Audio("/audios/truenos-lluvia.mp3");
      a.loop = true;
      a.volume = Math.min(1, Math.max(0, rainIntensity));
      bgAudioRef.current = a;
      a.play().catch(() => setBgNeedsGesture(true));
    } else {
      bgAudioRef.current.volume = Math.min(1, Math.max(0, rainIntensity));
    }
  }, [rainIntensity]);
  const enableBgAudio = () => {
    bgAudioRef.current?.play().then(() => setBgNeedsGesture(false)).catch(() => setBgNeedsGesture(true));
  };

  // ---- Decisiones éticas ----
  const [showEthics, setShowEthics] = useState(null);
  const ethics = useMemo(() => [
    { title: "Proteger a la fuente", text: "Omitimos entrevistas y rostros. En el territorio aún hay actores armados; nuestra prioridad fue no exponer a nadie." },
    { title: "Verificar antes que narrar", text: "Al cruzar documentos, un dato clave no coincidía. Decidimos no afirmar lo que no podíamos comprobar." },
    { title: "Cambiar la forma de contar", text: "Dejamos el stop motion por tiempos y viramos del minidocumental a una ficción simbólica: menos literal, más respetuosa." },
    { title: "No revictimizar el lugar", text: "Evitamos nombres y señalamientos. Bajo del Oso hoy es tranquilo: preferimos el símbolo (huellas rojas, lluvia) a la crudeza." },
  ], []);

  // ---- Decisiones estéticas ----
  const [showEstetica, setShowEstetica] = useState(null);
  const estetica = [
    { title: "1. Tono cálido frente a lo lúgubre", text: "Atmósfera cálida y emocional, opuesta a la oscuridad típica.", quote: "“La calidez era el tono principal…”" },
    { title: "2. Lenguaje infantil y musical", text: "Mitos a través de una canción y ronda infantil.", quote: "“Decidimos hacerlo mediante una canción infantil…”" },
    { title: "3. Simbolismo en lugar de crudeza", text: "Metáforas visuales como huellas rojas en vez de sangre.", quote: "“Mostramos todo mediante el simbolismo…”" },
    { title: "4. Colores cálidos y estética natural", text: "Vegetación, viento y nubes con sensación acogedora.", quote: "“Bajo del Oso no se veía lúgubre…”" },
    { title: "5. Agua como símbolo de memoria", text: "La lluvia como permanencia, no borrado.", quote: "" },
  ];

  // ---- Crónica ----
  const cronica = [
    `MITURABÁ: ¿Quién preservará la memoria cuando esta se mezcla con la violencia?`,
    `Iniciamos una búsqueda que creíamos hallada, ... (texto completo que compartiste)`,
    `¿El proyecto se mantuvo igual hasta el final?
Solo lo que se mantiene igual es porque no tiene fondo ni tela de dónde cortar. Esa es nuestra respuesta.`,
    `Inicialmente partimos de una reportería ...`,
    `¿Cómo terminó todo?
Como primera decisión ética, ...`,
    `Desde lo estético, ... ¿Y quiénes contarán los mitos?`,
    `Al investigar, ... segunda decisión ética.`,
    `¿Contar o no contar algo que pudo —o no— ser verdad? ...`,
    `Proteger las memorias ...`,
    `“El lugar donde siempre llueve” ...`,
    `Como investigadora, ...`,
    `En este caso, la respuesta fue no. ...`,
    `Fue entonces cuando comprendimos ...`,
    `Desde lo estético, la primera pregunta fue: ...`,
    `Exploramos los espacios ...`,
    `Lo mismo ocurrió con Bajo del Oso ...`,
    `A esas alturas ya comprendimos ...`,
    `Optamos por no mostrar el nombre de la finca ...`,
    `También evitamos primeros planos ...`,
    `¿Se logró terminar el proyecto?
La respuesta es sí. ...`,
    `Así que, desde lo estético, ...`,
    `Ahora que hemos culminado ...`,
    `Como realizadores, ...`,
    `Hoy nos honra mostrar este producto ...`,
  ];
  const [showFull, setShowFull] = useState(false);

  // ---- Galería (13 fotos) ----
  const gallery = useMemo(() => ([
    { src: "/img/porton-bananera.jpg", alt: "Entrada bananera" },
    { src: "/img/nina-lluvia.jpg", alt: "Niña jugando bajo el chorro" },
    { src: "/img/dibujo-nino-1.jpg", alt: "Dibujo infantil 1" },
    { src: "/img/arbol-noche.jpg", alt: "Árbol y raíces" },
    { src: "/img/dibujo-ninos-varios.jpg", alt: "Dibujos infantiles varios" },
    // 8 nuevas (ajusta rutas reales)
    { src: "/img/foto6.jpg", alt: "Foto 6" },
    { src: "/img/foto7.jpg", alt: "Foto 7" },
    { src: "/img/foto8.jpg", alt: "Foto 8" },
    { src: "/img/foto9.jpg", alt: "Foto 9" },
    { src: "/img/foto10.jpg", alt: "Foto 10" },
    { src: "/img/foto11.jpg", alt: "Foto 11" },
    { src: "/img/foto12.jpg", alt: "Foto 12" },
    { src: "/img/foto13.jpg", alt: "Foto 13" },
  ]), []);

  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox.open) return;
      if (e.key === "Escape") setLightbox({ open: false, index: 0 });
      if (e.key === "ArrowRight") setLightbox(s => ({ open: true, index: (s.index + 1) % gallery.length }));
      if (e.key === "ArrowLeft")  setLightbox(s => ({ open: true, index: (s.index - 1 + gallery.length) % gallery.length }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox.open, gallery.length]);

  // ---- Videos por SESIONES/LOCACIONES ----
  // Reemplaza cada VIDEO_ID_… por tu ID real de YouTube
  const sesiones = [
    {
      location: "Locación 1: Salida del Corregimiento de Currulao.",
      videos: [
        {
          id: "VIDEO_ID_1",
          title: "El bus con el charco rojo",
          desc:
            "Descripción: Reto: Conseguir el polvo rojo para formar el charco; acordar tiempos para el uso del vehículo y la locación; sortear el sol de las 3 p. m.",
        },
        { id: "VIDEO_ID_2", title: "Plano recurso 2 (renómbralo)", desc: "Descripción: Añade aquí el reto/logística principal de este plano." },
        { id: "VIDEO_ID_3", title: "Plano recurso 3 (renómbralo)", desc: "Descripción: Añade aquí la dificultad o hallazgo de esta toma." },
      ],
    },
    {
      location: "Locación 2: Finca Santa Marta Fabio - Bajo del Oso",
      videos: [
        { id: "VIDEO_ID_4", title: "Plano en portón (título alterno)", desc: "Descripción: Lograr la escena sin tránsito de personas y sin perder la luz de la tarde, con tiempo limitado." },
        { id: "VIDEO_ID_5", title: "Plano de apoyo (título alterno)", desc: "Descripción: Ajustes de ritmo y continuidad; coordinación con dueños de la locación." },
      ],
    },
    {
      location: "Locación 3: Barrio La Esperanza - Corregimiento de Currulao.",
      videos: [
        { id: "VIDEO_ID_6", title: "Ronda infantil y lluvia", desc: "Descripción: Manejo de tiempos con niñas y niños; jugar primero, grabar después; control de agua." },
        { id: "VIDEO_ID_7", title: "Dibujos y agua", desc: "Descripción: Lograr textura del papel mojado sin destruir el dibujo; microdetalles a contraluz." },
      ],
    },
  ];

  // ---- Audio ritual (ambiente-lluvia.wav) autoplay al ver sección ----
  const ritualRef = useRef(null);
  const ritualAudioRef = useRef(null);
  const [ritualNeedsGesture, setRitualNeedsGesture] = useState(false);
  useEffect(() => {
    ritualAudioRef.current = new Audio("/audios/ambiente-lluvia.wav");
    ritualAudioRef.current.loop = true;
    ritualAudioRef.current.volume = 0.6;

    const el = ritualRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      async (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.5) {
            try {
              await ritualAudioRef.current.play();
              setRitualNeedsGesture(false);
            } catch {
              setRitualNeedsGesture(true);
            }
          } else {
            ritualAudioRef.current.pause();
          }
        }
      },
      { threshold: [0, 0.5, 1] }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      ritualAudioRef.current.pause();
    };
  }, []);
  const enableRitualAudio = () => {
    ritualAudioRef.current?.play().then(() => setRitualNeedsGesture(false)).catch(() => setRitualNeedsGesture(true));
  };

  // ---- Quiz ----
  const questions = [
    { q: "¿Qué prioriza MITURABÁ al narrar?", a: ["El impacto sensacionalista", "La protección y el respeto", "Mostrar rostros y nombres"], correct: 1 },
    { q: "¿Qué simbolizan las huellas rojas?", a: ["Decoración de escena", "Alegría del carnaval", "Recuerdo del pasado sin crudeza"], correct: 2 },
    { q: "Cuando un dato no se puede comprobar, ¿qué hacemos?", a: ["Lo publicamos igual", "Lo omitimos y verificamos", "Lo exageramos"], correct: 1 },
  ];
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100 relative overflow-x-hidden">
      {/* Progreso */}
      <motion.div style={{ width: barWidth }} className="fixed top-0 left-0 h-1 bg-sky-500 z-50" />

      {/* Lluvia visual */}
      {rainVisible && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <RainLayer intensity={rainIntensity} />
        </div>
      )}

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
                Una crónica interactiva sobre memoria, infancia y territorio. De lo que fue el proceso de creación del teaser "MITURABÁ".
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#etica" className="inline-flex items-center gap-2 rounded-2xl bg-sky-600/90 hover:bg-sky-500 px-5 py-3 shadow-lg shadow-sky-900/40 transition">
                  <Droplets className="w-5 h-5" /> Iniciar recorrido
                </a>

                <button
                  onClick={() => setRainVisible(v => !v)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 hover:border-slate-500 px-4 py-3"
                  aria-pressed={rainVisible}
                >
                  {rainVisible ? "Pausar lluvia" : "Reproducir lluvia"}
                </button>

                <div className="flex items-center gap-2 text-sm text-slate-300">
                  Volumen fondo:
                  <input
                    type="range" min="0" max="1" step="0.05"
                    value={rainIntensity}
                    onChange={(e) => setRainIntensity(parseFloat(e.target.value))}
                    className="w-28 accent-sky-500"
                  />
                </div>
              </div>

              {bgNeedsGesture && (
                <div className="mt-3">
                  <button onClick={enableBgAudio} className="rounded-xl border border-slate-600 hover:border-slate-400 px-4 py-2 inline-flex items-center gap-2">
                    <Volume2 className="w-4 h-4" /> Activar sonido de fondo
                  </button>
                  <p className="text-xs text-slate-500 mt-1">Si el navegador bloquea el autoplay, actívalo aquí.</p>
                </div>
              )}
            </div>

            <HeroCard />
          </div>
        </div>
      </section>

      {/* DECISIONES ÉTICAS */}
      <section id="etica" className="relative z-10 py-16 md:py-24">
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
                      <p className="text-sky-400 text-sm uppercase tracking-wider">PASO {i + 1}</p>
                      <h3 className="text-xl md:text-2xl font-semibold mt-1">{e.title}</h3>
                    </div>
                    <motion.span initial={{ rotate: 0 }} animate={{ rotate: showEthics === i ? 180 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="text-slate-400">⌄</motion.span>
                  </div>
                  <AnimatePresence initial={false}>
                    {showEthics === i && (
                      <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-3 text-slate-300">
                        {e.text}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DECISIONES ESTÉTICAS */}
      <section id="estetica" className="relative z-10 py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="mx-auto max-w-6xl px-6">
          <header className="flex items-center gap-3 mb-8">
            <Info className="w-6 h-6 text-sky-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Decisiones estéticas del proyecto</h2>
          </header>
        <ul className="grid md:grid-cols-2 gap-6">
            {estetica.map((d, i) => (
              <li key={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl">
                <button onClick={() => setShowEstetica(showEstetica === i ? null : i)} className="w-full text-left">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sky-400 text-sm uppercase tracking-wider">Punto {i + 1}</p>
                      <h3 className="text-xl md:text-2xl font-semibold mt-1">{d.title}</h3>
                    </div>
                    <motion.span initial={{ rotate: 0 }} animate={{ rotate: showEstetica === i ? 180 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="text-slate-400">⌄</motion.span>
                  </div>
                  <AnimatePresence initial={false}>
                    {showEstetica === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                        <p className="mt-3 text-slate-300">{d.text}</p>
                        {d.quote && <blockquote className="mt-3 text-slate-400 border-l-2 border-slate-700 pl-3 italic">{d.quote}</blockquote>}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CRÓNICA */}
      <section id="cronica" className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <header className="flex items-center gap-3 mb-4">
            <BookText className="w-6 h-6 text-sky-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Crónica</h2>
          </header>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            {(showFull ? cronica : cronica.slice(0, 3)).map((p, i) => (
              <p key={i} className={`text-slate-200 whitespace-pre-wrap ${i ? "mt-4" : ""}`}>{p}</p>
            ))}
            <div className="mt-6">
              <button onClick={() => setShowFull(!showFull)} className="rounded-xl border border-slate-600 hover:border-slate-400 px-4 py-2">
                {showFull ? "Ver menos" : "Leer crónica completa"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIO / RITUAL */}
      <section id="audio" ref={ritualRef} className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <header className="flex items-center gap-3 mb-4">
            <Music className="w-6 h-6 text-sky-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Lluvia & ritual</h2>
          </header>
          <p className="text-slate-300 mb-4">
            Este ambiente de lluvia se activa automáticamente al llegar aquí (suena junto al fondo). También puedes controlarlo manualmente:
          </p>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <audio controls className="w-full">
              <source src="/audios/ambiente-lluvia.wav" type="audio/wav" />
            </audio>
            {ritualNeedsGesture && (
              <button onClick={enableRitualAudio} className="mt-3 rounded-xl border border-slate-600 hover:border-slate-400 px-4 py-2">
                Activar ritual
              </button>
            )}
            <p className="text-xs text-slate-500 mt-2">Coloca el archivo en <code>/public/audios/ambiente-lluvia.wav</code>.</p>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="relative z-10 py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Galería</h2>
          <p className="text-slate-300 mb-8">Territorio, juego, símbolo. Esta galería recoge paisajes, escenas y dibujos infantiles que inspiran el proyecto.</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {gallery.map((g, idx) => (
              <button key={idx} onClick={() => setLightbox({ open: true, index: idx })} className="aspect-[4/3] rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl overflow-hidden">
                <img src={g.src} alt={g.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SESIONES DE VIDEO */}
      <section id="videos" className="relative z-10 py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold">Videos por locación</h2>

          <div className="space-y-12 mt-8">
            {sesiones.map((sess, si) => (
              <div key={si}>
                <h3 className="text-xl md:text-2xl font-semibold mb-4">{sess.location}</h3>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sess.videos.map((v, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60">
                      <div className="aspect-video bg-black">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${v.id}`}
                          title={v.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-semibold">{v.title}</p>
                        {v.desc && <p className="text-sm text-slate-300 mt-1">{v.desc}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 mt-6">Reemplaza cada <code>VIDEO_ID_n</code> por tu ID real de YouTube. Puedes cambiar títulos y descripciones libremente.</p>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox({ open: false, index: 0 })}>
            <img src={gallery[lightbox.index].src} alt={gallery[lightbox.index].alt} className="max-h-[90vh] max-w-[90vw] rounded-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUIZ */}
      <section id="quiz" className="relative z-10 py-16 md:py-24">
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
                      <button key={oi} onClick={() => setAnswers(arr => arr.map((v, idx) => (idx === qi ? oi : v)))}
                        className={`rounded-xl px-4 py-3 border transition text-left
                          ${selected ? "border-sky-400" : "border-slate-700 hover:border-slate-500"}
                          ${show && correct ? "bg-emerald-600/30" : ""}
                          ${show && selected && !correct ? "bg-rose-600/20" : ""}`}>
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

      {/* CIERRE */}
      <footer className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">¿Qué historia del territorio no debe borrarse?</h3>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">Este tejido de voces es MITURABÁ.</p>
          <p className="text-xs text-slate-500 mt-4">Prototipo – MITURABÁ</p>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Auxiliares ---------- */

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
  const drops = Math.round(40 + intensity * 80);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
      `}</style>
    </div>
  );
}
