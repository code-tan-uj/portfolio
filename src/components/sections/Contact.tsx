"use client";

import {
  useState,
  useRef,
  useCallback,
  type FormEvent,
  type ChangeEvent,
} from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  User,
  Tag,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
} from "lucide-react";
import {
  validateContactForm,
  validateEmail,
  validateRequired,
  type ContactFormData,
  type FieldError,
} from "@/lib/formValidation";
import { Particles } from "@/components/effects";

/* ========================================================================== */
/*  Animation variants                                                         */
/* ========================================================================== */

const EASE = [0.4, 0, 0.2, 1] as const;

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const staggerItem = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: EASE } },
};

/* ========================================================================== */
/*  Contact info data                                                          */
/* ========================================================================== */

const CONTACT_EMAIL = "hello@example.com";
const CONTACT_LOCATION = "San Francisco, CA";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "Email", href: `mailto:${CONTACT_EMAIL}`, icon: Mail },
];

/* ========================================================================== */
/*  Sub-components                                                             */
/* ========================================================================== */

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="flex flex-col items-center text-center"
      style={{ marginBottom: "var(--space-12)" }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-sm)",
          fontWeight: 600,
          color: "var(--color-accent)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-wider)",
          marginBottom: "var(--space-3)",
        }}
      >
        Get In Touch
      </span>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(var(--text-3xl), 5vw, var(--text-5xl))",
          fontWeight: 800,
          color: "var(--color-text-primary)",
          margin: 0,
          lineHeight: "var(--leading-tight)",
        }}
      >
        Let&apos;s Work Together
      </h2>
      <p
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-lg)",
          color: "var(--color-text-secondary)",
          margin: 0,
          marginTop: "var(--space-3)",
          marginBottom: "var(--space-4)",
        }}
      >
        Have a project in mind? Let&apos;s talk
      </p>
      <motion.div
        style={{
          height: 4,
          borderRadius: 2,
          background: "var(--gradient-accent)",
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={inView ? { width: 64, opacity: 1 } : { width: 0, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
      />
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

function ContactInfo() {
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(CONTACT_EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col gap-6"
    >
      {/* Email */}
      <motion.div
        variants={staggerItem}
        className="rounded-2xl"
        style={{
          padding: "var(--space-5)",
          background: "var(--glass-bg)",
          backdropFilter: "blur(var(--glass-blur))",
          WebkitBackdropFilter: "blur(var(--glass-blur))",
          border: "1px solid var(--glass-border)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{
              width: 44,
              height: 44,
              background: "var(--color-primary-light)",
              color: "var(--color-primary)",
              flexShrink: 0,
            }}
          >
            <Mail size={20} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-xs)",
                color: "var(--color-text-tertiary)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-wide)",
              }}
            >
              Email
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-base)",
                color: "var(--color-text-primary)",
                textDecoration: "none",
              }}
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <motion.button
            onClick={copyEmail}
            className="flex items-center justify-center rounded-lg cursor-pointer"
            style={{
              width: 36,
              height: 36,
              background: "transparent",
              border: "1px solid var(--color-border)",
              color: copied ? "var(--color-success)" : "var(--color-text-tertiary)",
              transition: "all var(--duration-base) var(--ease-smooth)",
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            title="Copy email"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </motion.button>
        </div>
      </motion.div>

      {/* Location */}
      <motion.div
        variants={staggerItem}
        className="rounded-2xl"
        style={{
          padding: "var(--space-5)",
          background: "var(--glass-bg)",
          backdropFilter: "blur(var(--glass-blur))",
          WebkitBackdropFilter: "blur(var(--glass-blur))",
          border: "1px solid var(--glass-border)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-xl"
            style={{
              width: 44,
              height: 44,
              background: "var(--color-primary-light)",
              color: "var(--color-primary)",
              flexShrink: 0,
            }}
          >
            <MapPin size={20} />
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-xs)",
                color: "var(--color-text-tertiary)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "var(--tracking-wide)",
              }}
            >
              Location
            </p>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-base)",
                color: "var(--color-text-primary)",
              }}
            >
              {CONTACT_LOCATION}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Availability */}
      <motion.div
        variants={staggerItem}
        className="rounded-2xl"
        style={{
          padding: "var(--space-4) var(--space-5)",
          background: "var(--glass-bg)",
          backdropFilter: "blur(var(--glass-blur))",
          WebkitBackdropFilter: "blur(var(--glass-blur))",
          border: "1px solid var(--glass-border)",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="inline-block rounded-full"
            style={{
              width: 10,
              height: 10,
              background: "var(--color-success)",
              boxShadow: "0 0 8px var(--color-success)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-sm)",
              fontWeight: 600,
              color: "var(--color-text-primary)",
            }}
          >
            Available for hire
          </span>
        </div>
      </motion.div>

      {/* Social links */}
      <motion.div
        variants={staggerItem}
        className="flex items-center gap-3"
        style={{ marginTop: "var(--space-2)" }}
      >
        {SOCIALS.map((s) => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="flex items-center justify-center rounded-xl"
            style={{
              width: 48,
              height: 48,
              color: "var(--color-text-tertiary)",
              border: "1px solid var(--color-border)",
              textDecoration: "none",
              transition:
                "all var(--duration-base) var(--ease-smooth)",
            }}
            whileHover={{
              scale: 1.12,
              y: -3,
              backgroundColor: "var(--color-primary-light)",
              borderColor: "var(--color-primary)",
              color: "var(--color-primary)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <s.icon size={22} />
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

type FormStatus = "idle" | "submitting" | "success" | "error";

function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      // Clear error on change
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    },
    [errors],
  );

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      // Per-field validation on blur
      let msg = "";
      if (name === "email" && value.trim() && !validateEmail(value)) {
        msg = "Please enter a valid email";
      } else if (!validateRequired(value) && name !== "website") {
        msg = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      }
      if (msg) {
        setErrors((prev) => ({ ...prev, [name]: msg }));
      }
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const fieldErrors = validateContactForm(form);
      if (fieldErrors.length > 0) {
        const errMap: Record<string, string> = {};
        fieldErrors.forEach((fe: FieldError) => {
          errMap[fe.field] = fe.message;
        });
        setErrors(errMap);
        setTouched({ name: true, email: true, subject: true, message: true });
        return;
      }

      setStatus("submitting");

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to send message");
        }

        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "", website: "" });
        setErrors({});
        setTouched({});
        setTimeout(() => setStatus("idle"), 4000);
      } catch (error) {
        console.error("Contact form error:", error);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    },
    [form],
  );

  const isDisabled = status === "submitting" || status === "success";

  return (
    <motion.form
      variants={fadeUp}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl flex flex-col gap-5"
      style={{
        padding: "var(--space-8)",
        background: "var(--glass-bg)",
        backdropFilter: "blur(var(--glass-blur))",
        WebkitBackdropFilter: "blur(var(--glass-blur))",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--glass-shadow)",
      }}
    >
      {/* Honeypot */}
      <div
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={handleChange}
        />
      </div>

      {/* Name */}
      <FormField
        label="Name"
        name="name"
        type="text"
        placeholder="Your name"
        icon={<User size={18} />}
        value={form.name}
        error={touched.name ? errors.name : undefined}
        disabled={isDisabled}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />

      {/* Email */}
      <FormField
        label="Email"
        name="email"
        type="email"
        placeholder="your@email.com"
        icon={<Mail size={18} />}
        value={form.email}
        error={touched.email ? errors.email : undefined}
        disabled={isDisabled}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />

      {/* Subject */}
      <FormField
        label="Subject"
        name="subject"
        type="text"
        placeholder="What's this about?"
        icon={<Tag size={18} />}
        value={form.subject}
        error={touched.subject ? errors.subject : undefined}
        disabled={isDisabled}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          style={{
            display: "block",
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-sm)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            marginBottom: "var(--space-2)",
          }}
        >
          Message <span style={{ color: "var(--color-accent)" }}>*</span>
        </label>
        <div className="relative">
          <div
            className="absolute"
            style={{
              top: 14,
              left: 14,
              color: errors.message && touched.message
                ? "var(--color-error)"
                : "var(--color-text-tertiary)",
              pointerEvents: "none",
            }}
          >
            <MessageSquare size={18} />
          </div>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder="Your message..."
            value={form.message}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isDisabled}
            style={{
              width: "100%",
              padding: "var(--space-3) var(--space-3) var(--space-3) 42px",
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-base)",
              color: "var(--color-text-primary)",
              background: "var(--color-surface)",
              border: `1px solid ${
                errors.message && touched.message
                  ? "var(--color-error)"
                  : "var(--color-border)"
              }`,
              borderRadius: "var(--radius-xl)",
              outline: "none",
              resize: "vertical",
              transition: "border-color var(--duration-base) var(--ease-smooth)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--color-primary)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)";
            }}
            onFocusCapture={() => {}}
            onBlurCapture={(e) => {
              const hasError = errors.message && touched.message;
              e.currentTarget.style.borderColor = hasError
                ? "var(--color-error)"
                : "var(--color-border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>
        <div className="flex items-center justify-between" style={{ marginTop: "var(--space-1)" }}>
          {errors.message && touched.message ? (
            <p
              role="alert"
              style={{
                margin: 0,
                fontFamily: "var(--font-primary)",
                fontSize: "var(--text-xs)",
                color: "var(--color-error)",
              }}
            >
              {errors.message}
            </p>
          ) : (
            <span />
          )}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-tertiary)",
            }}
          >
            {form.message.length}/2000
          </span>
        </div>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={isDisabled}
        className="flex items-center justify-center gap-2 rounded-xl cursor-pointer"
        style={{
          width: "100%",
          padding: "var(--space-3) var(--space-8)",
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-base)",
          fontWeight: 600,
          color: "#fff",
          background:
            status === "success"
              ? "var(--color-success)"
              : status === "error"
                ? "var(--color-error)"
                : "var(--gradient-primary)",
          border: "none",
          opacity: isDisabled ? 0.8 : 1,
          transition: "all var(--duration-base) var(--ease-smooth)",
          marginTop: "var(--space-2)",
        }}
        whileHover={isDisabled ? undefined : { scale: 1.02, boxShadow: "0 4px 20px rgba(99,102,241,0.35)" }}
        whileTap={isDisabled ? undefined : { scale: 0.98 }}
      >
        {status === "submitting" && (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 size={18} />
            </motion.span>
            Sending...
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle2 size={18} />
            Message Sent!
          </>
        )}
        {status === "error" && (
          <>
            <AlertCircle size={18} />
            Failed. Try again
          </>
        )}
        {status === "idle" && (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </motion.button>
    </motion.form>
  );
}

/* -------------------------------------------------------------------------- */

function FormField({
  label,
  name,
  type,
  placeholder,
  icon,
  value,
  error,
  disabled,
  onChange,
  onBlur,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  error?: string;
  disabled: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        style={{
          display: "block",
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-sm)",
          fontWeight: 600,
          color: "var(--color-text-primary)",
          marginBottom: "var(--space-2)",
        }}
      >
        {label} {required && <span style={{ color: "var(--color-accent)" }}>*</span>}
      </label>
      <div className="relative">
        <div
          className="absolute"
          style={{
            top: "50%",
            left: 14,
            transform: "translateY(-50%)",
            color: error ? "var(--color-error)" : "var(--color-text-tertiary)",
            pointerEvents: "none",
          }}
        >
          {icon}
        </div>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          style={{
            width: "100%",
            padding: "var(--space-3) var(--space-3) var(--space-3) 42px",
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-base)",
            color: "var(--color-text-primary)",
            background: "var(--color-surface)",
            border: `1px solid ${error ? "var(--color-error)" : "var(--color-border)"}`,
            borderRadius: "var(--radius-xl)",
            outline: "none",
            transition: "border-color var(--duration-base) var(--ease-smooth)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--color-primary)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.1)";
          }}
          onBlurCapture={(e) => {
            e.currentTarget.style.borderColor = error
              ? "var(--color-error)"
              : "var(--color-border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>
      {error && (
        <p
          role="alert"
          style={{
            margin: 0,
            marginTop: "var(--space-1)",
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-xs)",
            color: "var(--color-error)",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* ========================================================================== */
/*  Main Contact component                                                     */
/* ========================================================================== */

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.05 });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative"
      style={{ padding: "var(--space-24) var(--space-6)" }}
    >
      {/* Background particles */}
      <Particles count={40} speed={0.25} linkDistance={100} interactive={false} />

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative mx-auto"
        style={{ maxWidth: "var(--container-xl)", zIndex: 1 }}
      >
        <SectionHeader />

        <div
          className="grid gap-10"
          style={{ gridTemplateColumns: "1fr" }}
        >
          {/* Responsive two-column via media query inline workaround */}
          <div
            className="contact-grid grid gap-10"
            style={{ alignItems: "start" }}
          >
            {/* Left — Contact Info */}
            <ContactInfo />

            {/* Right — Form */}
            <ContactForm />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
