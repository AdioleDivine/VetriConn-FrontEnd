"use client";
import React, { useState } from "react";
import styles from "./index.module.scss";
import FacebookIcon from "@/public/images/facebook.svg";
import LocationIcon from "@/public/images/location.svg";
import CallCallingIcon from "@/public/images/call-calling.svg";
import SmsIcon from "@/public/images/sms.svg";
import SmsTrackingIcon from "@/public/images/sms-tracking.svg";
import { FiLinkedin } from "react-icons/fi";
import { sendContactMessage, ContactMessage } from "@/lib/api";
import { useToaster } from "@/components/ui/Toaster";

interface ContactSectionProps {
  id?: string;
}

const ContactSection = ({ id }: ContactSectionProps) => {
  const [formData, setFormData] = useState<ContactMessage>({
    full_name: "",
    email: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const { showToast } = useToaster();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name") {
      setFormData((prev) => ({ ...prev, full_name: value }));
    } else if (name === "message") {
      setFormData((prev) => ({ ...prev, description: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.full_name.trim() ||
      !formData.email.trim() ||
      !formData.description.trim()
    ) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all fields.",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await sendContactMessage(formData);

      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });

      showToast({
        type: "success",
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      // Reset form
      setFormData({ full_name: "", email: "", description: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again.";

      setSubmitStatus({
        type: "error",
        message: errorMessage,
      });

      showToast({
        type: "error",
        title: "Message Failed to Send",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactSection} id={id}>
      <h1 className={styles.heading}>Get In Touch</h1>
      <div className={styles.contentWrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>
            Send a message{" "}
            <span className={styles.icon}>
              <SmsTrackingIcon />
            </span>
          </h2>

          {submitStatus.type && (
            <div
              className={`${styles.statusMessage} ${styles[submitStatus.type]}`}
            >
              {submitStatus.message}
            </div>
          )}

          <input
            type="text"
            name="name"
            placeholder="Full name"
            className={styles.input}
            value={formData.full_name}
            onChange={handleInputChange}
            disabled={isSubmitting}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className={styles.input}
            value={formData.email}
            onChange={handleInputChange}
            disabled={isSubmitting}
            required
          />
          <textarea
            name="message"
            placeholder="Description"
            className={styles.textarea}
            rows={6}
            value={formData.description}
            onChange={handleInputChange}
            disabled={isSubmitting}
            required
          />
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </form>
        <div className={styles.infoCard}>
          <h2 className={styles.infoHeading}>Contact information</h2>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>
              <LocationIcon />
            </span>
            <span>Ottawa, Ontario.</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>
              <CallCallingIcon />
            </span>
            <span>
              English - 1(647)-889-9542 <br />
              <br /> French - 1(613)-501-9162
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoIcon}>
              <SmsIcon />
            </span>
            <span>richmonda@vetriconn.ca</span>
          </div>
          <div className={styles.socials}>
            <a
              href="https://www.facebook.com/profile.php?id=61580233844003"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.linkedin.com/company/vetriconn-inc/?viewAsMember=true"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLinkedin />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
