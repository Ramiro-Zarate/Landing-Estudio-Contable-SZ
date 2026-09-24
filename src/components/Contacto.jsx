import {useRef, useState} from 'react'
import emailjs from '@emailjs/browser'
import styles from './Contacto.module.css'

const EMAILJS_SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID || 'service_qdpjvh2'
const EMAILJS_TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID || 'template_m9c89uh'
const EMAILJS_PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY || 'iUY5dKiWCT0bpxIuR'
const WHATSAPP_NUMBER = import.meta.env.PUBLIC_WHATSAPP_NUMBER || '5491128580480'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Me gustaría hacer una consulta.')}`
const CONTACT_EMAIL = 'administracion@estudiocontablesz.com'

const opcionesServicio = [
    'Contabilidad',
    'Impuestos',
    'Sueldos y jornales',
    'Sociedades',
    'Agencias de Viajes y Turismo',
    'Otra consulta',
]

export function Contacto() {
    const form = useRef();
    const [cargando, setCargando] = useState(false);
    const [resultado, setResultado] = useState(null);

    const enviarEmail = (e) => {
        e.preventDefault();
        if (cargando) return;
        setCargando(true);
        setResultado(null);

        emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_PUBLIC_KEY
        )
        .then((result) => {
            setResultado({ tipo: 'exito', mensaje: '¡Mensaje enviado con éxito! Te responderemos a la brevedad.' });
            form.current.reset(); 
        })
        .catch((error) => {
            console.error('Error de EmailJS:', error);
            setResultado({ tipo: 'error', mensaje: 'No pudimos enviar el mensaje. Probá de nuevo o escribinos por otro canal.' });
        })
        .finally(() => {
            setCargando(false);
        });
    };
    return (
        <section className={styles.contacto} id="contacto">
            <div className={styles.contactoInner}>
            <h2 className={styles.contactoTitle}>Contacto</h2>
            <p className={styles.contactoSubtitle}>
                ¿Tenés alguna consulta? Escribinos y te responderemos a la brevedad.
            </p>
            
            <div className={styles.contactoGrid}>
                <div className={styles.trustBlock}>
                    <p className={styles.trustTitle}>Respaldo profesional</p>
                    <ul className={styles.trustList}>
                        <li>
                            <svg className={styles.trustIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                            Contador Público (UNLZ) al frente del estudio.
                        </li>
                        <li>
                            <svg className={styles.trustIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                            Docente en carreras de Turismo, terciarias y universitarias.
                        </li>
                        <li>
                            <svg className={styles.trustIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                            Más de 15 años de experiencia y 4 profesionales.
                        </li>
                        <li>
                            <svg className={styles.trustIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                            Más de 100 clientes activos.
                        </li>
                    </ul>
                </div>
                <form ref={form} onSubmit={enviarEmail} className={styles.contactoForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nombre" className={styles.label}>Nombre</label>
                        <input 
                            type="text" 
                            id="nombre" 
                            name="nombre" 
                            className={styles.input} 
                            placeholder="Tu nombre completo"
                            maxLength={80}
                            autoComplete="name"
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className={styles.input} 
                            placeholder="tu@email.com"
                            maxLength={120}
                            autoComplete="email"
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="telefono" className={styles.label}>Teléfono (opcional)</label>
                        <input 
                            type="tel" 
                            id="telefono" 
                            name="telefono" 
                            className={styles.input} 
                            placeholder="+54 9 11 ..."
                            maxLength={30}
                            autoComplete="tel"
                            inputMode="tel"
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="servicio" className={styles.label}>¿Sobre qué querés consultar?</label>
                        <select id="servicio" name="servicio" className={styles.select} defaultValue="">
                            <option value="" disabled>Elegí una opción</option>
                            {opcionesServicio.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="mensaje" className={styles.label}>Mensaje</label>
                        <textarea 
                            id="mensaje" 
                            name="mensaje" 
                            className={styles.textarea} 
                            placeholder="Escribí tu consulta..."
                            rows="5"
                            maxLength={1000}
                            required
                        ></textarea>
                    </div>
                    <label className={styles.consent}>
                        <input type="checkbox" name="consentimiento" required />
                        <span>Autorizo el uso de mis datos para responder esta consulta. Ver <a href="/privacidad">política de privacidad</a>.</span>
                    </label>
                    <button type="submit" className={styles.submitBtn} disabled={cargando}>
                        {cargando ? 'Enviando...' : 'Enviar Mensaje'}
                    </button>
                    <div role="status" aria-live="polite">
                        {resultado && (
                            <div className={`${styles.alerta} ${resultado.tipo === 'exito' ? styles.alertaExito : styles.alertaError}`}>
                                {resultado.mensaje}
                                {resultado.tipo === 'error' && (
                                    <p className={styles.alertaHint}>
                                        También podés <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">escribirnos por WhatsApp</a> o a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </form>

                <div className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                        <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <div>
                            <span className={styles.contactLabel}>Dirección</span>
                            <p className={styles.contactValue}>Burzaco, Buenos Aires</p>
                        </div>
                    </div>
                    <div className={styles.contactItem}>
                        <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        <div>
                            <span className={styles.contactLabel}>Teléfono</span>
                            <p className={styles.contactValue}>+54 9 11 2858-0480</p>
                        </div>
                    </div>
                    <div className={styles.contactItem}>
                        <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        <div>
                            <span className={styles.contactLabel}>Email</span>
                            <p className={styles.contactValue}>administracion@estudiocontablesz.com</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
    )
}
