import { FormEvent, useEffect, useMemo, useState } from 'react';
import { legalLinks } from '../data/business';
import { serviceOptions } from '../data/services';
import { LeadFormErrors, LeadFormValues, validateLeadForm } from './LeadForm.validation';

type LeadFormProps = {
  variant?: 'full' | 'compact';
};

type SubmitState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
};

const initialValues: LeadFormValues = {
  name: '',
  phone: '',
  car: '',
  service: '',
  preferredTime: '',
  comment: '',
  personalDataConsent: false,
  privacyPolicyAccepted: false
};

function collectTrackingData() {
  const params = new URLSearchParams(window.location.search);

  return {
    page: window.location.href,
    referrer: document.referrer,
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    utm_content: params.get('utm_content') ?? '',
    utm_term: params.get('utm_term') ?? ''
  };
}

export function LeadForm({ variant = 'full' }: LeadFormProps) {
  const [values, setValues] = useState<LeadFormValues>(initialValues);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [csrfToken, setCsrfToken] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle', message: '' });

  const legalMap = useMemo(
    () => ({
      consent: legalLinks.find((link) => link.href.includes('personal-data-consent'))?.href ?? '#',
      privacy: legalLinks.find((link) => link.href.includes('privacy-policy'))?.href ?? '#'
    }),
    []
  );

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/csrf.php', {
      credentials: 'same-origin',
      signal: controller.signal
    })
      .then((response) => response.json())
      .then((data: { success?: boolean; token?: string }) => {
        if (data.success && data.token) {
          setCsrfToken(data.token);
        }
      })
      .catch(() => {
        setCsrfToken('');
      });

    return () => controller.abort();
  }, []);

  const updateValue = (field: keyof LeadFormValues, value: string | boolean) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateLeadForm(values);
    setErrors(validation.errors);

    if (!validation.valid) {
      setSubmitState({ status: 'error', message: 'Проверьте обязательные поля и согласия.' });
      return;
    }

    setSubmitState({ status: 'loading', message: 'Отправляем заявку...' });

    try {
      const response = await fetch('/api/lead.php', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify({
          ...values,
          website: honeypot,
          tracking: collectTrackingData()
        })
      });

      const data = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Не удалось отправить заявку.');
      }

      setValues(initialValues);
      setHoneypot('');
      setSubmitState({
        status: 'success',
        message: data.message || 'Заявка отправлена. Мы свяжемся с вами в рабочее время: ежедневно с 10:00 до 18:00.'
      });
    } catch (error) {
      setSubmitState({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Не удалось отправить заявку. Позвоните в сервис или попробуйте позже.'
      });
    }
  };

  return (
    <form className={`lead-form lead-form-${variant}`} id="lead-form" onSubmit={submitLead} noValidate>
      <div className="form-grid">
        <label>
          <span>Имя *</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateValue('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'lead-name-error' : undefined}
            required
          />
          {errors.name ? <small id="lead-name-error">{errors.name}</small> : null}
        </label>

        <label>
          <span>Телефон *</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 ___ ___-__-__"
            value={values.phone}
            onChange={(event) => updateValue('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'lead-phone-error' : undefined}
            required
          />
          {errors.phone ? <small id="lead-phone-error">{errors.phone}</small> : null}
        </label>

        <label className="optional-field">
          <span>Марка и модель авто</span>
          <input
            name="car"
            type="text"
            autoComplete="off"
            placeholder="Например, BMW X5 2018"
            value={values.car}
            onChange={(event) => updateValue('car', event.target.value)}
          />
        </label>

        <label>
          <span>Что нужно сделать</span>
          <select
            name="service"
            value={values.service}
            onChange={(event) => updateValue('service', event.target.value)}
          >
            <option value="">Выберите услугу</option>
            {serviceOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </label>

        <label className="optional-field">
          <span>Удобный день/время</span>
          <input
            name="preferredTime"
            type="text"
            placeholder="Например, завтра после 14:00"
            value={values.preferredTime}
            onChange={(event) => updateValue('preferredTime', event.target.value)}
          />
        </label>

        <label className="optional-field form-wide">
          <span>Комментарий</span>
          <textarea
            name="comment"
            rows={4}
            placeholder="Опишите симптом, пробег или задачу"
            value={values.comment}
            onChange={(event) => updateValue('comment', event.target.value)}
          />
        </label>
      </div>

      <label className="hp-field" aria-hidden="true">
        <span>Не заполняйте это поле</span>
        <input name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
      </label>

      <div className="consent-list">
        <label className="checkbox-field">
          <input
            type="checkbox"
            name="personalDataConsent"
            checked={values.personalDataConsent}
            onChange={(event) => updateValue('personalDataConsent', event.target.checked)}
            required
          />
          <span>
            Даю согласие на обработку персональных данных.{' '}
            <a href={legalMap.consent} target="_blank" rel="noreferrer">
              Читать согласие
            </a>
          </span>
        </label>
        {errors.personalDataConsent ? <small>{errors.personalDataConsent}</small> : null}

        <label className="checkbox-field">
          <input
            type="checkbox"
            name="privacyPolicyAccepted"
            checked={values.privacyPolicyAccepted}
            onChange={(event) => updateValue('privacyPolicyAccepted', event.target.checked)}
            required
          />
          <span>
            Ознакомлен(а) с Политикой обработки персональных данных.{' '}
            <a href={legalMap.privacy} target="_blank" rel="noreferrer">
              Читать политику
            </a>
          </span>
        </label>
        {errors.privacyPolicyAccepted ? <small>{errors.privacyPolicyAccepted}</small> : null}
      </div>

      <button className="button button-primary form-submit" type="submit" disabled={submitState.status === 'loading'}>
        {submitState.status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
      </button>

      <p className={`form-message ${submitState.status !== 'idle' ? `is-${submitState.status}` : ''}`} aria-live="polite">
        {submitState.message}
      </p>
    </form>
  );
}
