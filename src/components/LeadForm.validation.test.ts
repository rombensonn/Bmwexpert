import { describe, expect, it } from 'vitest';
import { validateLeadForm } from './LeadForm.validation';

const baseLead = {
  name: 'Иван',
  phone: '+7 (985) 491-86-48',
  car: 'BMW X3',
  service: 'ТО',
  preferredTime: '',
  comment: '',
  personalDataConsent: true,
  privacyPolicyAccepted: true
};

describe('validateLeadForm', () => {
  it('requires name, phone and both separate legal consents', () => {
    const result = validateLeadForm({
      ...baseLead,
      name: '',
      phone: '123',
      personalDataConsent: false,
      privacyPolicyAccepted: false
    });

    expect(result.valid).toBe(false);
    expect(result.errors.name).toBe('Укажите имя');
    expect(result.errors.phone).toBe('Укажите корректный телефон');
    expect(result.errors.personalDataConsent).toContain('согласие');
    expect(result.errors.privacyPolicyAccepted).toContain('политикой');
  });

  it('accepts a lead with required fields and consents', () => {
    const result = validateLeadForm(baseLead);

    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });
});
