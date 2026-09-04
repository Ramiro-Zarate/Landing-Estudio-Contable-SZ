import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import styles from './Servicios.module.css'
import {
  IconContabilidad,
  IconImpuestos,
  IconSueldos,
  IconFiscal,
  IconAuditoria,
  IconConstitucion,
  IconInspecciones,
  IconAsociaciones,
  IconTramites,
  IconOtros,
} from './ServiciosIcons.jsx'

const servicios = [
  {
    titulo: "Contabilidad",
    descripcion: "Brindamos reportes contables basados en el proceso de información procesada a través de nuestro sistema de Gestión Contable.",
    Icon: IconContabilidad,
    detalle: "Llevamos el registro completo y actualizado de todas las operaciones contables, con conciliaciones bancarias mensuales, ajustes por inflación cuando corresponda, y reportes ejecutivos para tener el control financiero al día.",
    incluye: ["Contabilidad general", "Registro y control de operaciones", "Análisis de cuentas", "Libros contables", "Balances", "Estados contables", "Conciliaciones bancarias"],
  },
  {
    titulo: "Impuestos",
    descripcion: "Gestionamos la presentación y pago de todos los tributos nacionales, provinciales y municipales, con planificación fiscal estratégica para optimizar la carga tributaria dentro del marco legal.",
    Icon: IconImpuestos,
    detalle: "Nuestro equipo se encarga de mantenerte al día con todas tus obligaciones tributarias en los tres niveles de gobierno, monitoreando vencimientos y planificando cada presentación para minimizar riesgos y aprovechar los beneficios fiscales disponibles.",
    incluye: ["Monotributo (altas / Bajas / Modificaciones / Recategorizaciones)", "IVA", "Ganancias", "Bienes personales", "Retenciones y percepciones", "Ingresos Brutos", "Convenio Multilateral", "Tasas municipales"],
  },
  {
    titulo: "Sueldos y jornales",
    descripcion: "Liquidamos diversos convenios colectivos (Comercio / Turismo / Pasteleros / UOM / construcción / Lavaderos / Camioneros); te enviamos los recibos digitalizados junto con las boletas de pago correspondientes a cada Convenio Colectivo.",
    Icon: IconSueldos,
    detalle: "Nos encargamos de la liquidación mensual del personal en relación de dependencia, incluyendo recibos digitales, certificaciones, y cumplimiento de cargas sociales en tiempo y forma.",
    incluye: ["Altas como empleador", "Gestionamos tu ART", "Altas / bajas y modificaciones de empleados", "Liquidaciones mensuales y quincenales", "Aguinaldos", "Vacaciones", "Liquidaciones Finales", "Cargas sociales", "Boletas sindicales", "Certificaciones de Trabajo", "Libros de Sueldo Digital"],
  },
  {
    titulo: "Administración",
    descripcion: "Trabajamos en conjunto con las empresas para la organización y reorganización de procesos administrativos a medida de cada una de ellas para la optimización de recursos.",
    Icon: IconFiscal,
    detalle: "Acompañamos la gestión diaria de tu empresa, ordenando procesos y controles internos para ganar eficiencia y transparencia. Nos adaptamos a la realidad de cada organización y proponemos mejoras concretas que se traducen en ahorro de tiempo y recursos.",
    incluye: ["Análisis de costos", "Análisis de rentabilidad", "Organización administrativa", "Controles de procesos internos", "Recursos humanos", "Implementación de sistemas de gestión"],
  },
  {
    titulo: "Inspecciones",
    descripcion: "Atendemos fiscalizaciones e inspecciones de los distintos Organismos de Control y Recaudación.",
    Icon: IconInspecciones,
    detalle: "Te acompañamos durante las fiscalizaciones de los organismos de control, preparando la documentación requerida, revisando los descargos y gestionando las instancias administrativas para defender tus derechos y minimizar el impacto de las inspecciones.",
    incluye: ["ARCA", "ARBA", "AGIP", "Ministerio de Trabajo", "Sindicatos", "Municipalidades"],
  },
  {
    titulo: "Sociedades",
    descripcion: "Acompañamos el proceso completo de apertura de tu sociedad, desde la elección del tipo societario hasta la inscripción en los organismos correspondientes, incluyendo el asesoramiento jurídico-contable inicial.",
    Icon: IconConstitucion,
    detalle: "Te guiamos paso a paso en la constitución de tu sociedad, asesorándote en la elección del tipo societario y gestionando la inscripción en los organismos correspondientes, para que arranques con todo en regla desde el primer día.",
    incluye: ["Constitución de Sociedades en IGJ / DPPJ", "Inscripciones", "Modificaciones societarias", "Libros y Actas", "Trámites ante organismos", "Disolución y Liquidación"],
  },
  {
    titulo: "Auditorías y Control",
    descripcion: "Revisión independiente de tus estados financieros y registros contables, generando un dictamen profesional que brinda confianza a socios, inversores y organismos de control.",
    Icon: IconAuditoria,
    detalle: "Realizamos auditorías contables y revisiones independientes de tus estados financieros y registros, con un enfoque objetivo que aporta confianza a socios, inversores y organismos de control, y detecta oportunidades de mejora en tu gestión interna.",
    incluye: ["Auditorías contables", "Revisión de Estados Contables", "Control interno", "Análisis de documentación"],
  },
  {
    titulo: "Asociaciones Civiles",
    descripcion: "Colaboramos con Asociaciones sin fines de lucro en el desarrollo de actividades y el cumplimiento fiscal y contable especifico.",
    Icon: IconAsociaciones,
    detalle: "Acompañamos a asociaciones y entidades sin fines de lucro en su desarrollo, ocupándonos del cumplimiento contable y fiscal específico de estas organizaciones, la gestión de exenciones y la rendición de cuentas ante los organismos correspondientes.",
    incluye: ["Constitución de asociaciones y mutuales", "Gestión fiscal", "Exenciones", "Contabilidad y balanaces", "Regularizaciones", "Rendiciones de cuenta"],
  },
  {
    titulo: "Tramites y Certificaciones",
    descripcion: "Preparamos distintos informes de acuerdo a los requerimientos de distintos organismos y entidades financieras.",
    Icon: IconTramites,
    detalle: "Emitimos certificaciones e informes contables ajustados a los requerimientos de bancos y organismos, y realizamos los trámites necesarios para que tu empresa esté siempre en regla ante cualquier entidad.",
    incluye: ["Certificación de Ventas", "Certificacion de Ingresos", "Certificación de Origen de Fondos", "Informes sobre Activos Fijos", "Transmisión gratuita de bienes"],
  },
  {
    titulo: "Otros servicios",
    descripcion: "Realizamos todos aquellos trámites para mantener en orden tus proyectos y empresas de acuerdo a las multiples exigencias de los distintos organismos.",
    Icon: IconOtros,
    detalle: "Ofrecemos una amplia gama de trámites y gestiones complementarias para que tu empresa cumpla con todas las exigencias de los distintos organismos, manteniéndote siempre al día y sin preocupaciones.",
    incluye: ["SIRADIG", "Moratorias", "Planes de pago", "Personal de casas particulares", "Pericias contables", "Seguros", "Registro de Marcas", "Facturación", "Registro Pyme"],
  },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function flipTransform(originRect, modalRect) {
  const cardCenterX = originRect.left + originRect.width / 2;
  const cardCenterY = originRect.top + originRect.height / 2;
  const modalCenterX = modalRect.left + modalRect.width / 2;
  const modalCenterY = modalRect.top + modalRect.height / 2;
  const scale = Math.max(
    0.6,
    Math.min(
      originRect.width / modalRect.width,
      originRect.height / modalRect.height
    )
  );
  return {
    tx: cardCenterX - modalCenterX,
    ty: cardCenterY - modalCenterY,
    scale,
  };
}

function ServicioCard({ servicio, onClick, onHoverStart, onHoverEnd }) {
  return (
    <article className={styles.svCard}>
      <button
        type="button"
        className={styles.svTrigger}
        onClick={onClick}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
      >
        <div className={styles.svIconWrap}>
          <servicio.Icon />
        </div>
        <div className={styles.cardText}>
          <p className={styles.svCardTitle}>{servicio.titulo}</p>
          <p className={styles.svCardDesc}>{servicio.descripcion}</p>
        </div>
        
        <svg
          className={styles.svExpandIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
        <div className={styles.svAccentBar} />
        <span className="sr-only">Ver más sobre {servicio.titulo}</span>
      </button>
    </article>
  );
}

function ServicioModal({ servicio, originRect, onClose }) {
  const modalRef = useRef(null);
  const closeRef = useRef(null);
  const closingRef = useRef(false);
  const [backdropFaded, setBackdropFaded] = useState(false);

  useLayoutEffect(() => {
    if (!modalRef.current || !originRect) return;

    const modal = modalRef.current;

    if (prefersReducedMotion()) {
      setBackdropFaded(true);
      setTimeout(() => closeRef.current?.focus(), 50);
      return;
    }

    const modalRect = modal.getBoundingClientRect();
    const { tx, ty, scale } = flipTransform(originRect, modalRect);

    modal.style.transformOrigin = 'center center';
    modal.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    modal.style.opacity = '0';

    void modal.offsetHeight;

    requestAnimationFrame(() => {
      modal.style.transition =
        'transform 0.12s cubic-bezier(0.2, 0, 0, 1)';
      modal.style.transform = 'translate(0, 0) scale(1)';
      modal.style.opacity = '1';
      setBackdropFaded(true);
    });

    const focusTimer = setTimeout(() => closeRef.current?.focus(), 150);

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [originRect]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;

    if (!modalRef.current || !originRect || prefersReducedMotion()) {
      onClose();
      return;
    }

    const modal = modalRef.current;
    const modalRect = modal.getBoundingClientRect();
    const { tx, ty, scale } = flipTransform(originRect, modalRect);

    modal.style.transition =
      'transform 0.1s cubic-bezier(0.2, 0, 0, 1)';
    modal.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    modal.style.opacity = '0';

    setTimeout(onClose, 100);
  };

  return (
    <div
      className={`${styles.modalBackdrop} ${backdropFaded ? styles.backdropVisible : ''}`}
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="servicio-modal-title"
      >
        <button
          ref={closeRef}
          className={styles.modalClose}
          onClick={handleClose}
          aria-label="Cerrar"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className={styles.modalIconWrap}>
          <servicio.Icon />
        </div>
        <h3 className={styles.modalTitle} id="servicio-modal-title">
          {servicio.titulo}
        </h3>
        <p className={styles.modalDesc}>{servicio.descripcion}</p>
        <p className={styles.modalDetalle}>{servicio.detalle}</p>
        <h4 className={styles.modalIncluyeTitle}>Qué incluye</h4>
        <ul className={styles.modalIncluye}>
          {servicio.incluye.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Servicios() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [originRect, setOriginRect] = useState(null);
  const lastClickedRef = useRef(null);
  const hoverTimerRef = useRef(null);

  const openModal = (index, el) => {
    lastClickedRef.current = el;
    setOriginRect(el.getBoundingClientRect());
    setSelectedIndex(index);
  };

  const handleCardClick = (index, event) => {
    clearTimeout(hoverTimerRef.current);
    openModal(index, event.currentTarget);
  };

  const handleHoverStart = (index, event) => {
    clearTimeout(hoverTimerRef.current);
    const el = event.currentTarget;
    hoverTimerRef.current = setTimeout(() => {
      openModal(index, el);
    }, 2000);
  };

  const handleHoverEnd = () => {
    clearTimeout(hoverTimerRef.current);
  };

  useEffect(() => {
    return () => clearTimeout(hoverTimerRef.current);
  }, []);

  const handleClose = () => {
    clearTimeout(hoverTimerRef.current);
    setSelectedIndex(null);
    setOriginRect(null);
    setTimeout(() => lastClickedRef.current?.focus(), 50);
  };

  return (
    <section className={styles.serviciosSection} id="servicios">
      <div className={styles.serviciosInner}>
        <span className={styles.badgeServicios}>Nuestros Servicios</span>
        <h2 className={styles.svHeading}>
          Todo lo que tu empresa<br />necesita, en un solo lugar
        </h2>
        <p className={styles.svSub}>
          Brindamos soluciones contables y fiscales integrales para que puedas
          enfocarte en hacer crecer tu negocio.
        </p>

        <div className={styles.svGrid}>
          {servicios.map((s, i) => (
            <ServicioCard
              key={s.titulo}
              servicio={s}
              onClick={(e) => handleCardClick(i, e)}
              onHoverStart={(e) => handleHoverStart(i, e)}
              onHoverEnd={handleHoverEnd}
            />
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <ServicioModal
          servicio={servicios[selectedIndex]}
          originRect={originRect}
          onClose={handleClose}
        />
      )}
    </section>
  );
}
