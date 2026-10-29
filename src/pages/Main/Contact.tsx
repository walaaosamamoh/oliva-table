import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Mail, MessageCircle, Send } from "lucide-react";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const { t } = useTranslation();

  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Demo only: connect this to your backend later.
    console.log("Contact form:", form);
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <main>
      {/* Hero */}
      <section className="px-6 py-16 md:px-16 md:py-20 lg:px-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-terracotta">
            {t("contact.eyebrow")}
          </p>

          <h1 className="font-serif text-4xl leading-tight text-olive md:text-6xl">
            {t("contact.title")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-charcoal/75">
            {t("contact.intro")}
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="px-6 pb-16 md:px-16 md:pb-24 lg:px-24">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-sand/70 md:grid-cols-[0.85fr_1.15fr]">
          {/* Intro panel */}
          <div className="flex flex-col justify-between gap-12 bg-olive p-8 text-cream md:p-10 lg:p-12">
            <div>
              <div className="mb-8 flex size-12 items-center justify-center rounded-full bg-cream/10">
                <MessageCircle size={24} />
              </div>

              <h2 className="font-serif text-3xl leading-snug md:text-4xl">
                {t("contact.sideTitle")}
              </h2>

              <p className="mt-5 leading-8 text-cream/75">
                {t("contact.sideDescription")}
              </p>
            </div>

            <div className="border-t border-cream/20 pt-6">
              <div className="mb-4 flex items-center gap-3">
                <Mail size={19} className="shrink-0 text-sand" />
                <p className="text-sm leading-6 text-cream/80">
                  {t("contact.emailNote")}
                </p>
              </div>

              <Link
                to="/menu"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-cream px-5 py-3 text-sm font-semibold text-olive transition hover:bg-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
              >
                {t("contact.menuLink")}
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>

          {/* Form panel */}
          <div className="bg-cream p-6 md:p-10 lg:p-12">
            {submitted ? (
              <div
                role="status"
                className="flex min-h-96 flex-col items-center justify-center text-center"
              >
                <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-olive/10 text-olive">
                  <Mail size={30} strokeWidth={1.5} />
                </div>

                <h2 className="font-serif text-3xl text-olive">
                  {t("contact.successTitle")}
                </h2>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 min-h-11 rounded-full bg-olive px-6 py-3 font-medium text-cream transition hover:bg-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
                >
                  {t("contact.sendAnother")}
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-2xl text-olive md:text-3xl">
                  {t("contact.formTitle")}
                </h2>

                <p className="mb-8 mt-3 text-sm leading-7 text-charcoal/70">
                  {t("contact.formDescription")}
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-charcoal"
                    >
                      {t("contact.name")}
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t("contact.namePlaceholder")}
                      required
                      className="min-h-12 w-full rounded-xl border border-sand bg-transparent px-4 py-3 text-charcoal outline-none transition placeholder:text-charcoal/45 focus:border-olive focus:ring-1 focus:ring-olive"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-charcoal"
                    >
                      {t("contact.email")}
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t("contact.emailPlaceholder")}
                      required
                      className="min-h-12 w-full rounded-xl border border-sand bg-transparent px-4 py-3 text-charcoal outline-none transition placeholder:text-charcoal/45 focus:border-olive focus:ring-1 focus:ring-olive"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-medium text-charcoal"
                    >
                      {t("contact.subject")}
                    </label>

                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder={t("contact.subjectPlaceholder")}
                      required
                      className="min-h-12 w-full rounded-xl border border-sand bg-transparent px-4 py-3 text-charcoal outline-none transition placeholder:text-charcoal/45 focus:border-olive focus:ring-1 focus:ring-olive"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-charcoal"
                    >
                      {t("contact.message")}
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t("contact.messagePlaceholder")}
                      rows={5}
                      required
                      className="w-full resize-y rounded-xl border border-sand bg-transparent px-4 py-3 text-charcoal outline-none transition placeholder:text-charcoal/45 focus:border-olive focus:ring-1 focus:ring-olive"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-olive px-6 py-3 font-semibold text-cream transition hover:bg-olive/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
                  >
                    {t("contact.send")}
                    <Send size={17} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
