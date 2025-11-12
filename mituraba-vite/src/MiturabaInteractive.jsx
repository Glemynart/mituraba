import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Cloud, Droplets, Music, Info, ExternalLink, Volume2 } from "lucide-react";

export default function MiturabaInteractive() {
  const { scrollYProgress } = useScroll();
  const rainOpacity = useTransform(scrollYProgress, [0, 1], [0.15, 0.6]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  const [showEthics, setShowEthics] = useState(null);
  const [cloudOpen, setCloudOpen] = useState(null);

  const ethics = useMemo(
    () => [
      {
        title: "Proteger a la fuente",
        text:
          "Se omite entrevista a la fuente y a su hija por seguridad en Currulao. La historia se narra desde el respeto, sin exposición directa.",
      },
      {
        title: "Verificación de hechos",
        text:
          "Al revisar documentos oficiales, el niño del relato no aparece entre las 24 víctimas. Se decide no afirmar lo no comprobado.",
      },
      {
        title: "Cambio de formato",
        text:
          "Dejar de lado el stop motion por tiempo y virar hacia el terreno real. Del mini documental a la ficción simbólica (teaser).",
      },
      {
        title: "No revictimizar",
        text:
          "No se nombra la finca; se evita cargar el territorio con nuevas asociaciones negativas. Se opta por metáforas: huellas rojas, lluvia.",
      },
    ],
    []
  );

  const myths = useMemo(
    () => [
      {
        title: "El lugar donde siempre llueve",
        body:
          "Una ronda infantil, dibujos y juego: la memoria se canta y se moja, pero no se borra.",
      },
      {
        title: "Las huellas que hablan",
        body:
          "Botas que dejan rastro rojo: símbolo del pasado violento sin mostrarlo de forma cruda.",
      },
      {
        title: "La guardiana del río",
        body:
          "Leyenda local que recuerda a quienes ya no están y protege a quienes crecen.",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100 relative overflow-x-hidden">
      <motion.div
        style={{ opacity: rainOpacity }}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
      >
        <RainLayer />
      </motion.div>

      <section className="relative z-10">
        <motion.div style={{ scale: heroScale }} className="mx-auto max-w-6xl px-6 pt-20 pb-16 md:pt-28">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                MITURABÁ
                <span className="block text-lg md:text-2xl font-light text-slate-300 mt-3">
                  La lluvia no borra la memoria
                </span>
              </h1>
              <p className="mt-6 text-slate-300 max-w-prose">
                Crónica interactiva sobre memoria, infancia y territorio en Currulao. Una experiencia que elige la
                calidez y el símbolo para hablar del duelo colectivo, sin revictimizar.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#recorrido" className="inline-flex items-center gap-2 rounded-2xl bg-sky-600/90 hover:bg-sky-500 px-5 py-3 shadow-lg shadow-sky-900/40 transition">
                  <Droplets className="w-5 h-5" />
                  Iniciar recorrido
                </a>
                <a href="#audio" className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 hover:border-slate-500 px-5 py-3">
                  <Music className="w-5 h-5" />
                  Escuchar lluvia
                </a>
              </div>
            </div>
            <div className="relative">
              <HeroCard />
            </div>
          </div>
        </motion.div>
      </section>

      <section id="recorrido" className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <header className="flex items-center gap-3 mb-8">
            <Info className="w-6 h-6 text-sky-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Decisiones éticas del proyecto</h2>
          </header>

          <ul className="grid md:grid-cols-2 gap-6">
            {ethics.map((e, i) => (
              <li key={i} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl">
                <button
                  onClick={() => setShowEthics(showEthics === i ? null : i)}
                  className="w-full text-left"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sky-400 text-sm uppercase tracking-wider">Paso {i + 1}</p>
                      <h3 className="text-xl md:text-2xl font-semibold mt-1">{e.title}</h3>
                    </div>
                    <motion.span
                      initial={{ rotate: 0 }}
                      animate={{ rotate: showEthics === i ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="text-slate-400"
                    >
                      ⌄
                    </motion.span>
                  </div>
                  <AnimatePresence initial={false}>
                    {showEthics === i && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-3 text-slate-300"
                      >
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

      <section id="mitos" className="relative z-10 py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="mx-auto max-w-6xl px-6">
          <header className="flex items-center gap-3 mb-8">
            <Cloud className="w-6 h-6 text-sky-300" />
            <h2 className="text-2xl md:text-3xl font-bold">Mitos del territorio</h2>
          </header>

          <div className="grid md:grid-cols-3 gap-6">
            {myths.map((m, i) => (
              <motion.button
                key={i}
                onClick={() => setCloudOpen(cloudOpen === i ? null : i)}
                whileHover={{ y: -4 }}
                className="rounded-3xl p-6 bg-slate-900/60 border border-slate-800 shadow-xl text-left"
              >
                <div className="flex items-center gap-3">
                  <Cloud className="w-6 h-6" />
                  <p className="font-semibold">{m.title}</p>
                </div>
                <AnimatePresence initial={false}>
                  {cloudOpen === i && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="mt-3 text-slate-300"
                    >
                      {m.body}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>

          <p className="mt-6 text-sm text-slate-400">
            Consejo: puedes grabar voces infantiles leyendo/ cantando y añadirlas como audio emergente al abrir cada nube.
          </p>
        </div>
      </section>

      <section id="audio" className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <header className="flex items-center gap-3 mb-4">
            <Volume2 className="w-6 h-6 text-sky-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Lluvia & canción</h2>
          </header>
          <p className="text-slate-300 mb-4">Inserta aquí el audio ambiente de lluvia o la ronda infantil (formato .mp3 / .wav).</p>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <audio controls className="w-full">
              <source src="" type="audio/mpeg" />
            </audio>
            <p className="text-xs text-slate-400 mt-3">⚠️ TODO: añade la URL del audio en el atributo &lt;source src=\"...\" /&gt;.</p>
          </div>
        </div>
      </section>

      <section id="galeria" className="relative z-10 py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Galería y teaser</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="aspect-[4/3] rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl flex items-center justify-center"
              >
                <span className="text-slate-500 text-sm">Imagen/Frame {n} — reemplaza</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <a
              href="#"
              className="rounded-3xl p-6 border border-slate-800 bg-slate-900/60 hover:bg-slate-900 transition flex items-center justify-between"
            >
              <div>
                <p className="text-lg font-semibold">Ver teaser del proyecto</p>
                <p className="text-slate-400 text-sm">Pega el enlace del video (YouTube, Vimeo o archivo directo).</p>
              </div>
              <ExternalLink className="w-5 h-5" />
            </a>
            <div className="rounded-3xl p-6 border border-slate-800 bg-slate-900/60">
              <p className="text-lg font-semibold">QR para exposición presencial</p>
              <p className="text-slate-400 text-sm">Imprime un QR que lleve a esta web. (Puedes generarlo en qrcode-monkey o similar.)</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">¿Qué historia del territorio no debe borrarse?</h3>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
            Invita a tu audiencia a dejar una palabra o recuerdo. Si publicas esto, enlaza un formulario (Google Forms / Typeform)
            para recopilar memorias locales como parte del proyecto.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 mt-6 rounded-2xl bg-sky-600/90 hover:bg-sky-500 px-6 py-3 shadow-lg shadow-sky-900/40 transition"
          >
            Compartir memoria
          </a>
          <p className="text-xs text-slate-500 mt-4">Prototipo – MITURABÁ</p>
        </div>
      </footer>
    </div>
  );
}

function HeroCard() {
  return (
    <div className="relative">
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 shadow-2xl p-6 overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-semibold">Crónica + Infancia + Territorio</h2>
          <p className="text-slate-300 mt-2 text-sm">
            MITURABÁ es una apuesta por la memoria de la región desde la niñez. En vez de mostrar la violencia de forma cruda,
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

function RainLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.10),_transparent_60%)]" />
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-[-10%] h-28 w-px bg-sky-400/40 animate-[raindrop_1.6s_linear_infinite]"
            style={{
              left: `${(i * 2.5) % 100}%`,
              animationDelay: `${(i % 10) * 0.12}s`,
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
