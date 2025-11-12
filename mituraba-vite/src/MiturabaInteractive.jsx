import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Cloud, Droplets, Music, Info, Volume2, BookText } from "lucide-react";

/* MITURABÁ – versión base con:
   - Lluvia visual
   - Audio de fondo (truenos-lluvia.mp3) controlado por botón
   - Audio anterior (ambiente-lluvia.wav) solo como reproductor opcional
   - Ética (acordeones), Mitos (texto), Crónica, Galería con lightbox, Cierre
*/

export default function MiturabaInteractive() {
  const { scrollYProgress } = useScroll();
  const rainOpacity = useTransform(scrollYProgress, [0, 1], [0.15, 0.6]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  const [showEthics, setShowEthics] = useState(null);
  const [cloudOpen, setCloudOpen] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [caption, setCaption] = useState("");
  const [bgPlaying, setBgPlaying] = useState(false);

  // 🔊 AUDIO DE FONDO (nuevo): truenos-lluvia.mp3
  const bgAudioRef = useRef(null);
  useEffect(() => {
    if (!bgAudioRef.current) {
      const a = new Audio("/audios/truenos-lluvia.mp3");
      a.loop = true;
      a.volume = 0.55;
      bgAudioRef.current = a;
    }
    const a = bgAudioRef.current;
    if (bgPlaying) {
      // user gesture needed on first play in muchos navegadores
      a.play().catch(() => {
        // si falla por autoplay, mantenemos el botón para reintentar
        setBgPlaying(false);
      });
    } else {
      a.pause();
      a.currentTime = 0;
    }
    return () => {
      a.pause();
    };
  }, [bgPlaying]);

  // Ética
  const ethics = useMemo(() => [
    { title: "Proteger a la fuente", text: "Omitimos entrevistas y rostros. En el territorio aún hay actores armados; nuestra prioridad fue no exponer a nadie." },
    { title: "Verificar antes que narrar", text: "Al cruzar documentos, un dato clave no coincidía. Decidimos no afirmar lo que no podíamos comprobar." },
    { title: "Cambiar la forma de contar", text: "Dejamos el stop motion por tiempos y viramos del minidocumental a una ficción simbólica: menos literal, más respetuosa." },
    { title: "No revictimizar el lugar", text: "Evitamos nombres y señalamientos. Preferimos el símbolo (huellas rojas, lluvia) a la crudeza." },
  ], []);

  // Mitos (sin reproducir audios automáticos; solo texto/animación)
  const myths = useMemo(() => [
    { title: "El lugar donde siempre llueve", body: "Los niños salpican agua sobre sus dibujos: la memoria se moja, pero no se borra." },
    { title: "Historias de miedo (que alegran)", body: "A los 4–9 años les llaman así. Entre risas y abrazos, el miedo se vuelve juego y compañía." },
    { title: "Las huellas que hablan", body: "Un hombre baja del bus. Sus botas dejan rastro rojo: recordar sin mostrar la violencia." },
  ], []);

  // CRÓNICA (tu texto completo; plegado por defecto)
  const cronicaParrafos = useMemo(() => [
    "MITURABÁ: ¿Quién preservará la memoria cuando esta se mezcla con la violencia?",
    "Iniciamos una búsqueda que creíamos hallada, en las manos, incapaz de colarse entre los minuciosos espacios de los dedos, como quienes dicen: “ya fue”. Nosotros conocíamos todo, o eso suponíamos, dado que el semestre pasado tuvimos la fortuna de investigar sobre él, recopilar datos y perspectivas adicionales.",
    "¿El proyecto se mantuvo igual hasta el final? Solo lo que se mantiene igual es porque no tiene fondo ni tela de dónde cortar. Esa es nuestra respuesta.",
    "Inicialmente partimos de una reportería en la que la fuente principal nos contaba cómo su mejor amigo de infancia perdió la vida en la masacre de Bajo del Oso de 1995. De allí surgió el mito de que, por esa masacre, ese lugar se mantiene oscuro y con mucha lluvia. La idea inicial era narrarlo mediante la técnica de animación stop motion, junto con una entrevista a la hija de la fuente.",
    "¿Cómo terminó todo? Como primera decisión ética, preferimos proteger a la fuente y a su hija, dado que en el sector de Currulao aún existen agentes armados. Por lo tanto, se decidió omitir la entrevista y buscar una manera distinta de narrar.",
    "Desde lo estético, tuvimos que dejar de lado la animación. Si bien era nuestro sueño utilizarla, no contábamos con el tiempo necesario para ello —a nivel de la escultura de los personajes y la animación en los programas—, así que tuvimos que sumergirnos en el terreno real: ¿Cómo se ve Bajo del Oso? ¿Y quiénes contarán los mitos?",
    "Al investigar, nuestra primera opción fue realizar un mini documental. Sin embargo, al revisar documentos oficiales nos percatamos de que el niño mencionado en la anécdota de la fuente no figuraba entre las 24 víctimas de la masacre, lo que nos llevó a tomar nuestra segunda decisión ética.",
    "¿Contar o no contar algo que pudo —o no— ser verdad? Como grupo decidimos guardar la historia para otra ocasión, cuando dispongamos de más tiempo para pulirla e investigar más al respecto. No queríamos reabrir heridas pasadas en la comunidad con historias cuya veracidad no podíamos confirmar más allá de un testimonio.",
    "Proteger las memorias de la comunidad y de sus víctimas fue prioridad. La nueva tarea era no solo mostrar el mito, sino también una masacre igual de dolorosa que la muerte de un amigo de infancia.",
    "Por otro lado, el mito al que bautizamos “El lugar donde siempre llueve” era una parte esencial, quizás lo que haría más simbólico —y menos traumático— revivir un hecho tan doloroso para la región. Con esa intención, decidimos realizar nuestra investigación con niños, la parte más frágil, creativa y cercana a la magia con la que se adorna la realidad.",
    "Como investigadora, comencé con mi público más cercano: mis vecinos del barrio La Esperanza, en el corregimiento de Currulao. Niños de cuatro a nueve años con quienes jugué y compartí. Al cabo de unos días, terminé preguntándoles si sabían lo que eran los mitos y las leyendas, asumiendo que responderían que sí.",
    "En este caso, la respuesta fue no. Los niños no sabían qué eran los mitos ni las leyendas. Por el contrario, se mostraron muy emocionados; ellos las llamaban “historias de miedo”. Comencé con lo más básico: leerles las historias que me pedían y desconocían: La Llorona, La Patasola, La Bruja. Lo curioso fue que, en vez de miedo, les causaban mucha alegría. Abrazos entre todos para no sentir terror y risas nerviosas acompañaron cada relato. La calidez era el tono principal, algo contrario a lo lúgubre con lo que solemos imaginar los escenarios donde se cuentan los mitos y las leyendas.",
    "Fue entonces cuando comprendimos la necesidad de que las nuevas generaciones conozcan la memoria del territorio, y que esta no sea un asunto trivial u olvidado. Desde este enfoque nació MITURABÁ, una apuesta por la memoria de la región y su reivindicación mediante mitos contados a los niños del territorio, en este caso, del corregimiento de Currulao.",
    "Desde lo estético, la primera pregunta fue: ¿Cómo mostrar y enseñar el mito? Decidimos hacerlo mediante una canción infantil, una ronda pegajosa, algo que mostrara otra cara: la de los niños que también narran su territorio. La segunda decisión fue abandonar la ambigüedad de abordarlo desde el terror, y hacerlo desde la calidez y la emoción que sienten los niños al escuchar estas historias, a través de un ritual que ellos llaman “la lluvia”.",
    "Exploramos los espacios y jugamos con ellos. Utilizamos colores cálidos, dibujos infantiles y composiciones cuidadas, respetando la intención narrativa sin que pareciera un trabajo prefabricado o sensacionalista.",
    "Lo mismo ocurrió con Bajo del Oso y, posteriormente, con la locación de Currulao, donde grabamos lo simbólico de la masacre. Allí tuvimos que tomar varias decisiones éticas y estéticas: ¿Ser crudos o simbólicos? ¿Decir el nombre de la finca o no?",
    "A esas alturas ya comprendimos que no era un mini documental, sino un proyecto de ficción, lo que implicó escribir el guion desde cero. No uno, ni dos, sino cuatro guiones. Finalmente, el formato elegido —dado el poco tiempo que teníamos— fue el teaser: imágenes cortas pero profundas.",
    "Optamos por no mostrar el nombre de la finca, pues no queríamos revictimizar el lugar ni asociarlo con una carga negativa. Desde lo visual, Bajo del Oso no se veía como un lugar lúgubre, sino muy agradable, con mucha vegetación; las casas se mezclaban con la carretera; muy oscuro eso sí, con nubes de lluvia y mucho viento, pero un ambiente cálido. Por esta razón en lugar de utilizar gritos, exceso de sangre o tonalidades frías, elegimos mostrar todo mediante el simbolismo: las escenas en Currulao donde un hombre se baja de un bus y camina con botas que dejan huellas rojas, metáfora de la masacre cometida por las FARC contra trabajadores bananeros.",
    "También evitamos primeros planos de los rostros de los niños, dado que no deja de ser un tema sensible.",
    "¿Se logró terminar el proyecto? La respuesta es sí. Mi persona, Mariana Moncada González, junto con el director de fotografía Alexis David Quintero Sepúlveda, logramos grabar todas las escenas en dos días. La escena más retadora fue lograr la lluvia. Inicialmente queríamos que los niños jugaran mientras llovía, pero esta nunca llegó.",
    "Así que, desde lo estético, optamos por una escena en la que los niños salpican con agua sus dibujos, como simbolismo de que la memoria no se puede borrar con la lluvia: esta sigue más viva que nunca.",
    "Ahora que hemos culminado el proyecto, cada vez que salgo de mi casa me encuentro con un: “Mariana, ¿podemos cantar la canción de la lluvia?”. Dibujos que dejan en la puerta de mi casa me recuerdan el tiempo que dedicamos a tejer una historia sensible, significativa y profunda.",
    "Como realizadores, nos llevamos experiencias muy amenas. Aprendimos a narrar no desde el “nosotros”, no desde la revictimización, sino desde el respeto por los imaginarios colectivos y su manera de afrontar el duelo del conflicto armado mediante la construcción de mitos y leyendas.",
    "Hoy nos honra mostrar este producto, ser parte de un nuevo tejido de memoria desde la niñez del Corregimiento de Currulao."
  ], []);
  const [cronicaAbierta, setCronicaAbierta] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100 relative overflow-x-hidden">
      {/* Lluvia visual */}
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
                <strong>Una crónica interactiva sobre memoria, infancia y territorio. De lo que fue el proceso de rodaje del teaser "MITURABÁ".</strong>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#recorrido" className="inline-flex items-center gap-2 rounded-2xl bg-sky-600/90 hover:bg-sky-500 px-5 py-3 shadow-lg shadow-sky-900/40 transition">
                  <Droplets className="w-5 h-5" /> Iniciar recorrido
                </a>
                <button
                  onClick={() => setBgPlaying((p) => !p)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 hover:border-slate-500 px-5 py-3"
                >
                  <Volume2 className="w-5 h-5" /> {bgPlaying ? "Pausar fondo" : "Reproducir fondo"}
                </button>
              </div>
            </div>
            <div className="relative"><HeroCard /></div>
          </div>
        </motion.div>
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
                    <motion.span initial={{ rotate: 0 }} animate={{ rotate: showEthics === i ? 180 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="text-slate-400">⌄</motion.span>
                  </div>
                  <AnimatePresence initial={false}>
                    {showEthics === i && (
                      <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-3 text-slate-300">{e.text}</motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MITOS */}
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
                  setCaption(m.body);
                  setTimeout(() => setCaption(""), 4000);
                }}
                whileHover={{ y: -4 }}
                className="rounded-3xl p-6 bg-slate-900/60 border border-slate-800 shadow-xl text-left"
              >
                <div className="flex items-center gap-3"><Cloud className="w-6 h-6" /><p className="font-semibold">{m.title}</p></div>
                <AnimatePresence initial={false}>
                  {cloudOpen === i && (
                    <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-3 text-slate-300">{m.body}</motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
          <AnimatePresence>
            {caption && (
              <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/70 border border-slate-700 px-4 py-2 rounded-xl text-sm">
                {caption}
              </motion.div>
            )}
          </AnimatePresence>
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
            {(cronicaAbierta ? cronicaParrafos : cronicaParrafos.slice(0, 2)).map((p, i) => (
              <p key={i} className={`text-slate-200 ${i ? "mt-4" : ""}`}>{p}</p>
            ))}
            <div className="mt-6">
              <button onClick={() => setCronicaAbierta((v) => !v)} className="rounded-xl border border-slate-600 hover:border-slate-400 px-4 py-2">
                {cronicaAbierta ? "Ver menos" : "Leer crónica completa"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIO OPCIONAL / RITUAL (NO de fondo) */}
      <section id="audio" className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <header className="flex items-center gap-3 mb-4">
            <Music className="w-6 h-6 text-sky-400" />
            <h2 className="text-2xl md:text-3xl font-bold">Lluvia & ritual</h2>
          </header>
          <p className="text-slate-300 mb-4">
            Reproductor opcional (no suena de fondo): voces, canciones o ambiente del rodaje.
          </p>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <audio controls className="w-full">
              <source src="/audios/ambiente-lluvia.wav" type="audio/wav" />
            </audio>
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="relative z-10 py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Galería</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              "/img/porton-bananera.jpg",
              "/img/nina-lluvia.jpg",
              "/img/dibujo-nino-1.jpg",
              "/img/arbol-noche.jpg",
              "/img/dibujo-ninos-varios.jpg",
            ].map((src, idx) => (
              <button key={idx} onClick={() => setLightboxSrc(src)} className="aspect-[4/3] rounded-3xl bg-slate-900/60 border border-slate-800 shadow-xl overflow-hidden">
                <img src={src} alt={`Imagen ${idx+1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setLightboxSrc(null)}>
            <img src={lightboxSrc} alt="Ampliada" className="max-h-[90vh] max-w-[90vw] rounded-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CIERRE */}
      <footer className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold">¿Qué historia del territorio no debe borrarse?</h3>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
            Deja una palabra, un recuerdo o un mito local. Este tejido de voces es MITURABÁ.
          </p>
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

function RainLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.10),_transparent_60%)]" />
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-[-10%] h-28 w-px bg-sky-400/40 animate-[raindrop_1.6s_linear_infinite]"
            style={{ left: `${(i * 2.5) % 100}%`, animationDelay: `${(i % 10) * 0.12}s`, transform: `translateY(${(i % 5) * 10}px)` }}
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
