import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Cloud, Droplets, Music, Info, Volume2 } from "lucide-react";

// MITURABÁ – Componente principal (Vite + React + Tailwind + Framer Motion)
// - Lluvia animada en background
// - Intro “La búsqueda”
// - Decisiones éticas (acordeones)
// - Mitos (nubes clicables + audio corto)
// - Galería con lightbox (usa tus fotos)
// - Sección de audio/ritual de lluvia
// - Cierre con CTA (listo para embeder formulario si quieres)

export default function MiturabaInteractive() {
  const { scrollYProgress } = useScroll();
  const rainOpacity = useTransform(scrollYProgress, [0, 1], [0.15, 0.6]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  const [showEthics, setShowEthics] = useState(null);
  const [cloudOpen, setCloudOpen] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [caption, setCaption] = useState("");
  const [rainOn, setRainOn] = useState(false);

  // Sonido ambiental (toggle en el hero)
  useEffect(() => {
    const a = new Audio("/audios/ambiente-lluvia.wav");
    a.loop = true;
    if (rainOn) a.play();
    else {
      a.pause();
      a.currentTime = 0;
    }
    return () => {
      a.pause();
    };
  }, [rainOn]);

  // TEXTOS – Decisiones éticas
  const ethics = useMemo(
    () => [
      {
        title: "Proteger a la fuente",
        text:
          "Omitimos entrevistas y rostros. En el territorio aún hay actores armados; nuestra prioridad fue no exponer a nadie.",
      },
      {
        title: "Verificar antes que narrar",
        text:
          "Al cruzar documentos, un dato clave no coincidía. Decidimos no afirmar lo que no podíamos comprobar.",
      },
      {
        title: "Cambiar la forma de contar",
        text:
          "Dejamos el stop motion por tiempos y viramos del minidocumental a una ficción simbólica: menos literal, más respetuosa.",
      },
      {
        title: "No revictimizar el lugar",
        text:
          "Evitamos nombres y señalamientos. Bajo del Oso hoy es un sitio tranquilo: preferimos el símbolo (huellas rojas, lluvia) a la crudeza.",
      },
    ],
    []
  );

  // TEXTOS – Mitos (nubes)
  const myths = useMemo(
    () => [
      {
        title: "El lugar donde siempre llueve",
        body:
          "Los niños cantan y salpican agua sobre sus dibujos: la memoria se moja, pero no se borra.",
      },
      {
        title: "Historias de miedo (que alegran)",
        body:
          "A los 4–9 años les llaman así. Entre risas nerviosas y abrazos, el miedo se vuelve juego y compañía.",
      },
      {
        title: "Las huellas que hablan",
        body:
          "Un hombre baja del bus. Sus botas dejan rastro rojo: un gesto para recordar sin mostrar la violencia.",
      },
    ],
    []
  );

  // Audio corto al abrir cada mito (por ahora reutilizamos el ambiente; puedes poner archivos distintos)
  const mythAudios = useMemo(
    () => myths.map(() => new Audio("/audios/ambiente-lluvia.wav")),
    [myths]
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100 relative overflow-x-hidden">
      {/* Capa de lluvia */}
      <motion.div style={{ opacity: rainOpacity }} aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <RainLayer />
      </motion.div>

      {/* HERO */}
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
                Una crónica interactiva sobre memoria, infancia y territorio en Currulao. Elegimos la calidez y el símbolo
                para hablar del duelo colectivo sin abrir heridas: la lluvia, el juego y los dibujos como formas de recordar.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#recorrido"
                  className="inline-flex items-center gap-2 rounded-2xl bg-sky-600/90 hover:bg-sky-500 px-5 py-3 shadow-lg shadow-sky-900/40 transition"
                >
                  <Droplets className="w-5 h-5" />
                  Iniciar recorrido
                </a>
                <button
                  onClick={() => setRainOn(!rainOn)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 hover:border-slate-500 px-5 py-3"
                >
                  <Volume2 className="w-5 h-5" />
                  {rainOn ? "Pausar lluvia" : "Reproducir lluvia"}
                </button>
              </div>
            </div>
            <div className="relative">
              <HeroCard />
            </div>
          </div>
        </motion.div>
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

      {/* MITOS – Nubes clicables con audio */}
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
                onClick={() => {
                  setCloudOpen(cloudOpen === i ? null : i);
                  try {
                    const a = mythAudios[i];
                    a.currentTime = 0;
                    a.play();
                  } catch {}
                  setCaption(m.body);
                  setTimeout(() => setCaption(""), 4000);
                }}
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

          {/* Subtítulo flotante al activar una nube */}
          <AnimatePresence>
            {caption && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/70 border border-slate-700 px-4 py-2 rounded-xl text-sm"
              >
                {caption}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* AUDIO / RITUAL DE LLUVIA */}
      <section id="audio" className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <header className="flex items-center gap-3 mb-4">
            <Music className="w-6 h-6 text-sky-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Lluvia & ritual</h2>
          </header>
          <p className="text-slate-300 mb-4">
            Lluvia y ronda infantil como ritual de memoria. El agua cae sobre el papel, pero el dibujo persiste: recordar también es jugar.
          </p>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <audio controls className="w-full">
              <source src="/audios/ambiente-lluvia.wav" type="audio/wav" />
            </audio>
            <p className="text-xs text-slate-400 mt-3">
              Consejo: puedes sustituir el audio por voces infantiles o una canción propia.
            </p>
          </div>
        </div>
      </section>

      {/* GALERÍA con lightbox */}
      <section id="galeria" className="relative z-10 py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Galería</h2>
          <p className="text-slate-300 mb-8">
            Territorio, juego, símbolo. Esta galería recoge paisajes, escenas cotidianas y dibujos infantiles que inspiran el proyecto.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "/img/porton-bananera.jpg",
              "/img/nina-lluvia.jpg",
              "/img/dibujo-nino-1.jpg",
              "/img/arbol-noche.jpg",
              "/img/dibujo-ninos-varios.jpg",
            ].map((src, idx) => (
              <button
                key={idx}
                onClick={() => setLightboxSrc(src)}
                className="aspect-[4/3] rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl overflow-hidden"
              >
                <img src={src} alt={`Imagen ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxSrc(null)}
          >
            <img src={lightboxSrc} alt="Ampliada" className="max-h-[90vh] max-w-[90vw] rounded-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CIERRE / CTA */}
      <footer className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">¿Qué historia del territorio no debe borrarse?</h3>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
            Deja una palabra, un recuerdo o un mito local. Este tejido de voces es MITURABÁ.
          </p>

          {/* Si quieres formulario embebido, reemplaza # por tu URL o usa un iframe debajo */}
          <a
            href="#"
            className="inline-flex items-center gap-2 mt-6 rounded-2xl bg-sky-600/90 hover:bg-sky-500 px-6 py-3 shadow-lg shadow-sky-900/40 transition"
          >
            Compartir memoria
          </a>

          {/* Ejemplo de embed (opcional):
          <div className="mt-8 rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/60">
            <iframe src="TU_EMBED_DE_GOOGLE_FORMS" className="w-full h-[640px]" loading="lazy" title="Compartir memoria" />
          </div>
          */}
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
