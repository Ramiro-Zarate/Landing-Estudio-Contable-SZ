import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import styles from './Servicios.module.css'
import {
  IconApertura,
  IconFiscal,
  IconSueldos,
  IconTramites,
  IconConsultoria,
} from './ServiciosIcons.jsx'

const consultorias = [
  {
    titulo: "Apertura de Agencias",
    descripcion: "Planificamos la mejor opción para tu encuadre impositivo y generamos todas las altas correspondientes en los distintos organismos.",
    Icon: IconApertura,
    detalle: "Te acompañamos en cada etapa del nacimiento de tu agencia: definimos el encuadre impositivo más conveniente y gestionamos todas las inscripciones y registros requeridos para que arranques a operar con todo en regla.",
    incluye: ["Inscripciones Impositivas", "Registros de Marca", "Registro de Base de Datos", "Inscripción en registro Faevyt", "Sellos de calidad"],
  },
  {
    titulo: "Impuestos",
    descripcion: "Liquidamos tus impuestos en base a las particularidades del sector, sobre todo en cuanto al IVA e Ingresos Brutos.",
    Icon: IconFiscal,
    detalle: "Nos especializamos en el tratamiento impositivo propio de las agencias de viajes y turismo, cuidando cada detalle del IVA y de los Ingresos Brutos para que pagues lo correcto y aproveches los beneficios del sector.",
    incluye: ["IVA: Servicios gravados a tasas del 21%, 10,5%, exentos o no alcanzados", "Ingresos Brutos: Tratamiento de servicios en comisión", "Convenio Multilateral: Liquidación para todas las jurisdicciones", "SICORE: Régimen de percepciones", "Impuesto a los Débitos y Créditos: Recupero de dicho impuesto", "Sircreb: Solicitud de reducción de alícuotas de retención"],
  },
  {
    titulo: "Recursos humanos",
    descripcion: "Analizamos las distintas opciones de contratación del personal buscando un equilibrio entre costo y beneficio.",
    Icon: IconSueldos,
    detalle: "Evaluamos las alternativas de contratación de tu equipo para encontrar el esquema más conveniente, equilibrando el costo laboral con el beneficio y el cumplimiento de las normativas vigentes.",
    incluye: ["Empleados en relación de dependencia", "Servicios tercerizados", "Contratación de colaboradores"],
  },
  {
    titulo: "Facturación",
    descripcion: "Podés tercerizar con nuestro equipo de trabajo las emisiones de facturas o podemos brindarte una capacitación a medida para el personal de la Agencia para realizar estas tareas.",
    Icon: IconTramites,
    detalle: "Nos ocupamos de la facturación de tu agencia por vos o capacitamos a tu personal para que la realice de forma correcta, cubriendo desde los viajes individuales hasta las ventas corporativas y las operaciones con extranjeros.",
    incluye: ["Capacitaciones", "Facturación de viajes individuales", "Facturación de salidas grupales", "Facturación de ventas corporativas", "Facturas a extranjeros (Factura T)"],
  },
  {
    titulo: "Consultoría para estudios",
    descripcion: "Si tenés un estudio contable y desconocés las particularidades impositivas del sector, podemos ayudarte para que puedas asesorar tus clientes o podés tercerizar con nosotros dichos servicios.",
    Icon: IconConsultoria,
    detalle: "Compartimos nuestro conocimiento específico del sector turístico con otros estudios contables, ya sea para capacitarlos en estas particularidades o para tomar en forma tercerizada la gestión impositiva y contable de sus clientes del rubro.",
    incluye: ["Capacitaciones", "Delegación de tareas", "Consultorías"],
  },
]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function flipTransform(originRect, modalRect) {
  const cardCenterX = originRect.left + originRect.width / 2
  const cardCenterY = originRect.top + originRect.height / 2
  const modalCenterX = modalRect.left + modalRect.width / 2
  const modalCenterY = modalRect.top + modalRect.height / 2
  const scale = Math.max(
    0.6,
    Math.min(
      originRect.width / modalRect.width,
      originRect.height / modalRect.height
    )
  )
  return {
    tx: cardCenterX - modalCenterX,
    ty: cardCenterY - modalCenterY,
    scale,
  }
}

function ConsultoriaCard({ consultoria, onClick, onHoverStart, onHoverEnd }) {
  return (
    <article className={styles.svCard}>
      <button
        type="button"
        className={styles.svTrigger}
        onClick={onClick}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        aria-label={`${consultoria.titulo} - ${consultoria.descripcion}`}
      >
        <div className={styles.svIconWrap}>
          <consultoria.Icon />
        </div>
        <div className={styles.cardText}>
          <p className={styles.svCardTitle}>{consultoria.titulo}</p>
          <p className={styles.svCardDesc}>{consultoria.descripcion}</p>
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
      </button>
    </article>
  )
}

function ConsultoriaModal({ consultoria, originRect, onClose }) {
  const modalRef = useRef(null)
  const closeRef = useRef(null)
  const closingRef = useRef(false)
  const [backdropFaded, setBackdropFaded] = useState(false)

  useLayoutEffect(() => {
    if (!modalRef.current || !originRect) return

    const modal = modalRef.current

    if (prefersReducedMotion()) {
      setBackdropFaded(true)
      setTimeout(() => closeRef.current?.focus(), 50)
      return
    }

    const modalRect = modal.getBoundingClientRect()
    const { tx, ty, scale } = flipTransform(originRect, modalRect)

    modal.style.transformOrigin = 'center center'
    modal.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`
    modal.style.opacity = '0'

    void modal.offsetHeight

    requestAnimationFrame(() => {
      modal.style.transition = 'transform 0.12s cubic-bezier(0.2, 0, 0, 1)'
      modal.style.transform = 'translate(0, 0) scale(1)'
      modal.style.opacity = '1'
      setBackdropFaded(true)
    })

    const focusTimer = setTimeout(() => closeRef.current?.focus(), 150)

    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      clearTimeout(focusTimer)
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
    }
  }, [originRect])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    if (closingRef.current) return
    closingRef.current = true

    if (!modalRef.current || !originRect || prefersReducedMotion()) {
      onClose()
      return
    }

    const modal = modalRef.current
    const modalRect = modal.getBoundingClientRect()
    const { tx, ty, scale } = flipTransform(originRect, modalRect)

    modal.style.transition = 'transform 0.1s cubic-bezier(0.2, 0, 0, 1)'
    modal.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`
    modal.style.opacity = '0'

    setTimeout(onClose, 100)
  }

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
        aria-labelledby="consultoria-modal-title"
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
          <consultoria.Icon />
        </div>
        <h3 className={styles.modalTitle} id="consultoria-modal-title">
          {consultoria.titulo}
        </h3>
        <p className={styles.modalDesc}>{consultoria.descripcion}</p>
        <p className={styles.modalDetalle}>{consultoria.detalle}</p>
        <h4 className={styles.modalIncluyeTitle}>Qué incluye</h4>
        <ul className={styles.modalIncluye}>
          {consultoria.incluye.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Consultoria() {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [originRect, setOriginRect] = useState(null)
  const lastClickedRef = useRef(null)
  const hoverTimerRef = useRef(null)

  const openModal = (index, el) => {
    lastClickedRef.current = el
    setOriginRect(el.getBoundingClientRect())
    setSelectedIndex(index)
  }

  const handleCardClick = (index, event) => {
    clearTimeout(hoverTimerRef.current)
    openModal(index, event.currentTarget)
  }

  const handleHoverStart = (index, event) => {
    clearTimeout(hoverTimerRef.current)
    const el = event.currentTarget
    hoverTimerRef.current = setTimeout(() => {
      openModal(index, el)
    }, 2000)
  }

  const handleHoverEnd = () => {
    clearTimeout(hoverTimerRef.current)
  }

  useEffect(() => {
    return () => clearTimeout(hoverTimerRef.current)
  }, [])

  const handleClose = () => {
    clearTimeout(hoverTimerRef.current)
    setSelectedIndex(null)
    setOriginRect(null)
    setTimeout(() => lastClickedRef.current?.focus(), 50)
  }

  return (
    <section className={`${styles.serviciosSection} ${styles.consultoriaSection}`} id="consultoria">
      <div className={styles.serviciosInner}>
        <span className={styles.badgeServicios}>Consultoría</span>
        <h2 className={styles.svHeading}>
          Consultoría en Agencias de Viaje<br />y Turismo
        </h2>
        <p className={`${styles.svSub} ${styles.svSubConsultoria}`}>
          Entendiendo las particularidades impositivas y contables que representa una Agencia de Viajes y Turismo, creamos un departamento exclusivo para brindar asesoramiento personalizado, el cual, sustentado en más de 15 años de experiencia en el sector y constantes capacitaciones, te ayudará a desarrollar tu negocio de la manera más eficiente.
        </p>
        <p className={`${styles.svSub} ${styles.svSubConsultoriaLast}`}>
          Si tenés una Agencia de Viajes o si estás planificando la apertura de una, contactanos desde cualquier punto del país que vamos a coordinar una entrevista en nuestro Estudio, en tu Empresa o a través de una reunión virtual y vamos a asesorarte en cada paso desde la apertura e inscripciones necesarias, el desarrollo y planificación administrativa, y el seguimiento impositivo / contable permanente para que cumplas con las exigencias y normativas vigentes.
        </p>

        <div className={styles.svGrid}>
          {consultorias.map((c, i) => (
            <ConsultoriaCard
              key={c.titulo}
              consultoria={c}
              onClick={(e) => handleCardClick(i, e)}
              onHoverStart={(e) => handleHoverStart(i, e)}
              onHoverEnd={handleHoverEnd}
            />
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <ConsultoriaModal
          consultoria={consultorias[selectedIndex]}
          originRect={originRect}
          onClose={handleClose}
        />
      )}
    </section>
  )
}
