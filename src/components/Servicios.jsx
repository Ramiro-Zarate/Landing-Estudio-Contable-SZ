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
    grupo: "Contabilidad e impuestos",
    descripcion: "Brindamos reportes contables basados en el proceso de información procesada a través de nuestro sistema de Gestión Contable.",
    Icon: IconContabilidad,
    incluye: ["Contabilidad general", "Registro y control de operaciones", "Análisis de cuentas", "Libros contables", "Balances", "Estados contables", "Conciliaciones bancarias"],
  },
  {
    titulo: "Impuestos",
    grupo: "Contabilidad e impuestos",
    descripcion: "Gestionamos la presentación y pago de todos los tributos nacionales, provinciales y municipales, con planificación fiscal estratégica para optimizar la carga tributaria dentro del marco legal.",
    Icon: IconImpuestos,
    incluye: ["IVA", "Ganancias", "Bienes personales", "Retenciones y percepciones", "Ingresos Brutos", "Convenio Multilateral", "Tasas municipales", "Monotributo (altas / bajas / modificaciones / recategorizaciones)"],
  },
  {
    titulo: "Sueldos y jornales",
    grupo: "Sueldos y administración",
    descripcion: "Liquidamos diversos convenios colectivos (Comercio / Turismo / Pasteleros / UOM / Construcción / Lavaderos / Camioneros); te enviamos los recibos digitalizados junto con las boletas de pago correspondientes a cada Convenio Colectivo.",
    Icon: IconSueldos,
    incluye: ["Altas como empleador", "Gestionamos tu ART", "Altas / bajas y modificaciones de empleados", "Liquidaciones mensuales y quincenales", "Aguinaldos", "Vacaciones", "Liquidaciones finales", "Cargas sociales", "Boletas sindicales", "Certificaciones de trabajo", "Libros de sueldo digital"],
  },
  {
    titulo: "Administración",
    grupo: "Sueldos y administración",
    descripcion: "Trabajamos en conjunto con las empresas para la organización y reorganización de procesos administrativos a medida de cada una de ellas para la optimización de recursos.",
    Icon: IconFiscal,
    incluye: ["Análisis de costos", "Análisis de rentabilidad", "Organización administrativa", "Controles de procesos internos", "Recursos humanos", "Implementación de sistemas de gestión"],
  },
  {
    titulo: "Sociedades",
    grupo: "Sociedades y control",
    descripcion: "Acompañamos el proceso completo de apertura de tu sociedad, desde la elección del tipo societario hasta la inscripción en los organismos correspondientes, incluyendo el asesoramiento jurídico-contable inicial.",
    Icon: IconConstitucion,
    incluye: ["Constitución de Sociedades en IGJ / DPPJ", "Inscripciones", "Modificaciones societarias", "Libros y Actas", "Trámites ante organismos", "Disolución y Liquidación"],
  },
  {
    titulo: "Auditorías y Control",
    grupo: "Sociedades y control",
    descripcion: "Revisión independiente de tus estados financieros y registros contables, generando un dictamen profesional que brinda confianza a socios, inversores y organismos de control.",
    Icon: IconAuditoria,
    incluye: ["Auditorías contables", "Revisión de Estados Contables", "Control interno", "Análisis de documentación"],
  },
  {
    titulo: "Asociaciones Civiles",
    grupo: "Sociedades y control",
    descripcion: "Colaboramos con Asociaciones sin fines de lucro en el desarrollo de actividades y el cumplimiento fiscal y contable específico.",
    Icon: IconAsociaciones,
    incluye: ["Constitución de asociaciones y mutuales", "Gestión fiscal", "Exenciones", "Contabilidad y balances", "Regularizaciones", "Rendiciones de cuenta"],
  },
  {
    titulo: "Inspecciones",
    grupo: "Trámites, inspecciones y otros",
    descripcion: "Atendemos fiscalizaciones e inspecciones de los distintos Organismos de Control y Recaudación.",
    Icon: IconInspecciones,
    incluye: ["ARCA", "ARBA", "AGIP", "Ministerio de Trabajo", "Sindicatos", "Municipalidades"],
  },
  {
    titulo: "Trámites y Certificaciones",
    grupo: "Trámites, inspecciones y otros",
    descripcion: "Preparamos distintos informes de acuerdo a los requerimientos de distintos organismos y entidades financieras.",
    Icon: IconTramites,
    incluye: ["Certificación de Ventas", "Certificación de Ingresos", "Certificación de Origen de Fondos", "Informes sobre Activos Fijos", "Transmisión gratuita de bienes"],
  },
  {
    titulo: "Otros servicios",
    grupo: "Trámites, inspecciones y otros",
    descripcion: "Realizamos todos aquellos trámites para mantener en orden tus proyectos y empresas de acuerdo a las múltiples exigencias de los distintos organismos.",
    Icon: IconOtros,
    incluye: ["SIRADIG", "Moratorias", "Planes de pago", "Personal de casas particulares", "Pericias contables", "Seguros", "Registro de Marcas", "Facturación", "Registro Pyme"],
  },
];

const grupoOrden = [
  "Contabilidad e impuestos",
  "Sueldos y administración",
  "Sociedades y control",
  "Trámites, inspecciones y otros",
];

const grupos = grupoOrden.map((titulo) => ({
  titulo,
  items: servicios
    .map((servicio, index) => ({ servicio, index }))
    .filter(({ servicio }) => servicio.grupo === titulo),
}));

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
        <span className={styles.svCardCta} aria-hidden="true">Ver detalle</span>
        <div className={styles.svAccentBar} />
        <span className="sr-only">Ver más sobre {servicio.titulo}</span>
      </button>
    </article>
  );
}

function ServicioModal({ servicio, originRect, onClose, closeOnLeave }) {
  const modalRef = useRef(null);
  const closeRef = useRef(null);
  const closingRef = useRef(false);
  const closeTimerRef = useRef(null);
  const [backdropFaded, setBackdropFaded] = useState(false);

  const handleMouseMove = (e) => {
    if (!closeOnLeave || !originRect) return;
    const { clientX, clientY } = e;
    const inCard =
      clientX >= originRect.left - 8 &&
      clientX <= originRect.right + 8 &&
      clientY >= originRect.top - 8 &&
      clientY <= originRect.bottom + 8;
    const modalRect = modalRef.current?.getBoundingClientRect();
    const inModal = modalRect
      ? clientX >= modalRect.left - 16 &&
        clientX <= modalRect.right + 16 &&
        clientY >= modalRect.top - 16 &&
        clientY <= modalRect.bottom + 16
      : false;

    if (inCard || inModal) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
      return;
    }

    if (!closeTimerRef.current) {
      closeTimerRef.current = setTimeout(() => {
        closeTimerRef.current = null;
        handleClose();
      }, 250);
    }
  };

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
      if (e.key === 'Escape') {
        handleClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
      clearTimeout(closeTimerRef.current);
    };
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
      onMouseMove={handleMouseMove}
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
  const openedViaRef = useRef(null);

  const openModal = (index, el, via) => {
    openedViaRef.current = via;
    lastClickedRef.current = el;
    setOriginRect(el.getBoundingClientRect());
    setSelectedIndex(index);
  };

  const handleCardClick = (index, event) => {
    clearTimeout(hoverTimerRef.current);
    openModal(index, event.currentTarget, 'click');
  };

  const handleHoverStart = (index, event) => {
    clearTimeout(hoverTimerRef.current);
    const el = event.currentTarget;
    hoverTimerRef.current = setTimeout(() => {
      openModal(index, el, 'hover');
    }, 1000);
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
        <h2 className={styles.svHeading}>
          Todo lo que tu empresa<br />necesita, en un solo lugar
        </h2>
        <p className={styles.svSub}>
          Brindamos soluciones contables y fiscales integrales para que puedas
          enfocarte en hacer crecer tu negocio.
        </p>

        {grupos.map((grupo) => (
          <div key={grupo.titulo} className={styles.svGroup}>
            <h3 className={styles.svGroupTitle}>{grupo.titulo}</h3>
            <div className={styles.svGrid}>
              {grupo.items.map(({ servicio, index }) => (
                <ServicioCard
                  key={servicio.titulo}
                  servicio={servicio}
                  onClick={(e) => handleCardClick(index, e)}
                  onHoverStart={(e) => handleHoverStart(index, e)}
                  onHoverEnd={handleHoverEnd}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <ServicioModal
          servicio={servicios[selectedIndex]}
          originRect={originRect}
          onClose={handleClose}
          closeOnLeave={openedViaRef.current === 'hover'}
        />
      )}
    </section>
  );
}
