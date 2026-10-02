'use client';

import { useRef, useState } from 'react';
import { AlertCircle, ArrowUpRight, Check, LoaderCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { profile } from '@/data/profile';
import { buttonOutline, buttonPrimary } from './ui';

const ENDPOINT = 'https://api.web3forms.com/submit';
const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = 'name' | 'email' | 'message';
type Status = 'idle' | 'sending' | 'success' | 'error';

const inputClass =
  'w-full border border-steel bg-canvas px-6 text-[17px] text-fg outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted focus:border-action focus:ring-4 focus:ring-action/20 aria-[invalid=true]:border-danger';

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const successRef = useRef<HTMLDivElement>(null);

  if (!accessKey) {
    return (
      <div className="rounded-[28px] bg-card p-8 md:p-10">
        <p className="leading-relaxed text-muted">{t.contact.unconfigured}</p>
        <a href={`mailto:${profile.email}`} className={`${buttonPrimary} mt-6`}>
          {t.contact.emailLink}
        </a>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start rounded-[28px] bg-card p-8 outline-none md:p-10"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-action text-action-fg">
          <Check className="size-5" strokeWidth={2} aria-hidden />
        </span>
        <p className="mt-5 text-[24px] leading-[1.17] font-semibold">{t.contact.success}</p>
        <button type="button" onClick={() => setStatus('idle')} className={`${buttonOutline} mt-6`}>
          {t.contact.again}
        </button>
      </div>
    );
  }

  const validate = (data: FormData) => {
    const next: Partial<Record<Field, string>> = {};
    if (!String(data.get('name') ?? '').trim()) next.name = t.contact.form.nameRequired;
    if (!emailPattern.test(String(data.get('email') ?? '').trim())) next.email = t.contact.form.emailInvalid;
    if (!String(data.get('message') ?? '').trim()) next.message = t.contact.form.messageRequired;
    return next;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validate(data);
    setErrors(nextErrors);
    const firstInvalid = (['name', 'email', 'message'] as Field[]).find((field) => nextErrors[field]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus('sending');
    data.append('access_key', accessKey);
    data.append('subject', `New portfolio message from ${String(data.get('name')).trim()}`);
    data.append('from_name', 'Jawad.dev portfolio');

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
      if (response.ok && result?.success) {
        form.reset();
        setStatus('success');
        requestAnimationFrame(() => successRef.current?.focus());
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const field = (name: Field) => ({
    id: `contact-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
    onChange: () => {
      if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
    },
  });

  const fieldError = (name: Field) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="ps-6 text-[14px] text-danger">
        {errors[name]}
      </p>
    ) : null;

  const sending = status === 'sending';

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-label={t.contact.formTitle}
      aria-busy={sending}
      className="grid gap-5 rounded-[28px] bg-card p-6 sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="contact-name" className="text-[14px] font-semibold">
            {t.contact.form.name}
          </label>
          <input
            {...field('name')}
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            placeholder={t.contact.form.namePlaceholder}
            className={`${inputClass} h-12 rounded-full`}
          />
          {fieldError('name')}
        </div>
        <div className="grid gap-2">
          <label htmlFor="contact-email" className="text-[14px] font-semibold">
            {t.contact.form.email}
          </label>
          <input
            {...field('email')}
            type="email"
            dir="ltr"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={254}
            placeholder={t.contact.form.emailPlaceholder}
            className={`${inputClass} h-12 rounded-full rtl:text-right`}
          />
          {fieldError('email')}
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-message" className="text-[14px] font-semibold">
          {t.contact.form.message}
        </label>
        <textarea
          {...field('message')}
          required
          rows={6}
          maxLength={5000}
          placeholder={t.contact.form.messagePlaceholder}
          className={`${inputClass} resize-y rounded-[22px] py-3.5 leading-[1.47]`}
        />
        {fieldError('message')}
      </div>

      {/* Web3Forms spam trap: real visitors never see or tick this. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {status === 'error' && (
        <div role="alert" className="flex gap-3 rounded-[18px] bg-danger/10 p-4 text-[14px]">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-danger" strokeWidth={2} aria-hidden />
          <p className="leading-relaxed">
            {t.contact.error}{' '}
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1 text-link underline underline-offset-4">
              {t.contact.emailLink}
              <ArrowUpRight className="size-3.5 rtl:-scale-x-100" strokeWidth={2} aria-hidden />
            </a>
          </p>
        </div>
      )}

      <div>
        <button type="submit" disabled={sending} className={buttonPrimary}>
          {sending && <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" strokeWidth={2} aria-hidden />}
          {sending ? t.contact.sending : t.contact.form.send}
        </button>
      </div>
    </form>
  );
}
