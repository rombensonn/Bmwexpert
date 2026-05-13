export type LeadFormValues = {
  name: string;
  phone: string;
  car: string;
  service: string;
  preferredTime: string;
  comment: string;
  personalDataConsent: boolean;
  privacyPolicyAccepted: boolean;
};

export type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

export function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

export function validateLeadForm(values: LeadFormValues): { valid: boolean; errors: LeadFormErrors } {
  const errors: LeadFormErrors = {};
  const cleanName = values.name.trim();
  const normalizedPhone = normalizePhone(values.phone);
  const digitsCount = normalizedPhone.replace(/\D/g, '').length;

  if (cleanName.length < 2) {
    errors.name = 'Укажите имя';
  }

  if (digitsCount < 10 || digitsCount > 15) {
    errors.phone = 'Укажите корректный телефон';
  }

  if (!values.personalDataConsent) {
    errors.personalDataConsent = 'Нужно дать согласие на обработку персональных данных';
  }

  if (!values.privacyPolicyAccepted) {
    errors.privacyPolicyAccepted = 'Нужно подтвердить ознакомление с политикой обработки персональных данных';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}
