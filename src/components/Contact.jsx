import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Github, Linkedin, LoaderCircle, Mail, MessageCircle, Phone, Send } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { portfolio } from "../config/portfolio.js";

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim(),
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim(),
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim(),
};
const isEmailJsConfigured = Object.values(emailJsConfig).every(
  (value) => Boolean(value) && !/^your_.*$/i.test(value),
);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialValues = { name: "", email: "", subject: "", message: "" };
const fieldLabels = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
};

const phoneDigits = portfolio.phoneNumber?.replace(/\D/g, "") ?? "";
const internationalPhone = phoneDigits
  ? phoneDigits.startsWith("91")
    ? phoneDigits
    : `91${phoneDigits}`
  : "";

const contactCards = [
  {
    label: "Email",
    value: portfolio.professionalEmail,
    href: portfolio.professionalEmail
      ? `mailto:${portfolio.professionalEmail}`
      : "",
    icon: Mail,
  },
  {
    label: "Phone",
    value: portfolio.phoneNumber,
    href: portfolio.phoneNumber
      ? `tel:+91${portfolio.phoneNumber.replace(/\D/g, "")}`
      : "",
    icon: Phone,
  },
  {
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: internationalPhone ? `https://wa.me/${internationalPhone}` : "",
    icon: MessageCircle,
    external: true,
  },
  {
    label: "GitHub",
    value: portfolio.githubProfileUrl,
    href: portfolio.githubProfileUrl,
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: portfolio.linkedinProfileUrl,
    href: portfolio.linkedinProfileUrl,
    icon: Linkedin,
  },
].filter(({ value, href }) => value && href);

function validateField(field, value) {
  if (!value.trim()) return `${fieldLabels[field]} is required.`;
  if (field === "email" && !emailPattern.test(value.trim())) {
    return "Enter a valid email address.";
  }
  return "";
}

export default function Contact() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const submissionLock = useRef(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((currentValues) => ({ ...currentValues, [name]: value }));
    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: validateField(name, value),
      }));
    }
    setFeedback({ type: "", message: "" });
  }

  function handleBlur(event) {
    const { name, value } = event.target;
    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validateField(name, value),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submissionLock.current) return;

    const nextErrors = Object.fromEntries(
      Object.entries(values).map(([field, value]) => [
        field,
        validateField(field, value),
      ]),
    );
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      setFeedback({
        type: "error",
        message: "Please correct the highlighted fields before sending.",
      });
      return;
    }

    if (!isEmailJsConfigured) {
      setFeedback({
        type: "error",
        message:
          "Email sending is not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your .env file, then restart Vite.",
      });
      return;
    }

    submissionLock.current = true;
    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });
    try {
      const response = await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        },
        { publicKey: emailJsConfig.publicKey },
      );
      if (response.status !== 200) {
        throw new Error("EmailJS did not confirm that the message was sent.");
      }
      setFeedback({
        type: "success",
        message: "Your message was sent successfully. Thank you for getting in touch.",
      });
      setValues(initialValues);
      setErrors({});
    } catch {
      setFeedback({
        type: "error",
        message: "Your message could not be sent. Please try again or contact me directly by email.",
      });
    } finally {
      submissionLock.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="section-container">
        <Reveal className="section-heading">
          <span className="section-kicker">GET IN TOUCH</span>
          <h2>Let’s Build Something <span>Meaningful</span></h2>
          <p>Recruiters, developers, and collaborators—I’d love to connect and talk about ideas.</p>
        </Reveal>
        <div className="contact-grid">
          <Reveal className="contact-details">
            <h3>Start a conversation</h3>
            <p>
              {contactCards.length
                ? "Choose a contact option below to get in touch."
                : "Contact details are not configured yet. Add your email, phone, or profile links in src/config/portfolio.js."}
            </p>
            <div className="contact-cards">
              {contactCards.map(({ label, value, href, icon: Icon }) => {
                const isExternalProfile =
                  label === "GitHub" || label === "LinkedIn" || label === "WhatsApp";
                return (
                  <a
                    className="contact-card"
                    href={href}
                    key={label}
                    target={isExternalProfile ? "_blank" : undefined}
                    rel={isExternalProfile ? "noopener noreferrer" : undefined}
                  >
                    <span className="contact-icon"><Icon size={19} /></span>
                    <span><small>{label}</small><strong>{value}</strong></span>
                  </a>
                );
              })}
            </div>
          </Reveal>
          <Reveal className="contact-form-wrap" delay={90}>
            <form
              className="contact-form"
              noValidate
              onSubmit={handleSubmit}
              aria-busy={isSubmitting}
            >
              <div className="form-row">
                {["name", "email"].map((field) => (
                  <label key={field} htmlFor={`contact-${field}`}>
                    {fieldLabels[field]}
                    <input
                      id={`contact-${field}`}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      autoComplete={field}
                      placeholder={field === "name" ? "Your name" : "you@example.com"}
                      value={values[field]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      aria-invalid={Boolean(errors[field])}
                      aria-describedby={errors[field] ? `contact-${field}-error` : undefined}
                    />
                    {errors[field] && (
                      <span className="field-error" id={`contact-${field}-error`}>
                        {errors[field]}
                      </span>
                    )}
                  </label>
                ))}
              </div>
              {["subject", "message"].map((field) => {
                const Field = field === "message" ? "textarea" : "input";
                return (
                  <label key={field} htmlFor={`contact-${field}`}>
                    {fieldLabels[field]}
                    <Field
                      id={`contact-${field}`}
                      name={field}
                      type={field === "subject" ? "text" : undefined}
                      rows={field === "message" ? "5" : undefined}
                      placeholder={field === "subject" ? "What would you like to discuss?" : "Write your message..."}
                      value={values[field]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      aria-invalid={Boolean(errors[field])}
                      aria-describedby={errors[field] ? `contact-${field}-error` : undefined}
                    />
                    {errors[field] && (
                      <span className="field-error" id={`contact-${field}-error`}>
                        {errors[field]}
                      </span>
                    )}
                  </label>
                );
              })}
              <button
                className="button button-primary form-submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>Sending... <LoaderCircle className="sending-icon" size={16} aria-hidden="true" /></>
                ) : (
                  <>Send message <Send size={16} aria-hidden="true" /></>
                )}
              </button>
              {!isEmailJsConfigured && (
                <p className="form-feedback error" role="status">
                  EmailJS is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env to enable sending.
                </p>
              )}
              <p
                className={`form-feedback${feedback.type ? ` ${feedback.type}` : ""}`}
                role={feedback.type === "error" ? "alert" : "status"}
                aria-live="polite"
              >
                {feedback.message}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
