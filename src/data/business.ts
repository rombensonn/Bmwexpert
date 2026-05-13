const basePath = import.meta.env.BASE_URL;
const publicPath = (path: string) => `${basePath}${path.replace(/^\//, '')}`;

export const business = {
  name: 'Bmwexpert',
  city: 'Ногинск',
  address: 'Электростальское ш., 23А, стр. 6, Ногинск',
  phone: '+7 (985) 491-86-48',
  phoneHref: 'tel:+79854918648',
  whatsappHref:
    'https://wa.me/79854918648?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D0%B0%D1%82%D1%8C%D1%81%D1%8F%20%D0%B2%20Bmwexpert',
  routeHref:
    'https://yandex.ru/maps/?mode=search&text=Bmwexpert%20%D0%9D%D0%BE%D0%B3%D0%B8%D0%BD%D1%81%D0%BA%20%D0%AD%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%BE%D1%81%D1%82%D0%B0%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B5%20%D1%88.%2C%2023%D0%90%2C%20%D1%81%D1%82%D1%80.%206',
  rating: '4,3',
  ratingValue: 4.3,
  reviewCount: 11,
  ratingCount: 26,
  schedule: 'ежедневно 10:00–18:00',
  shortSchedule: '10:00–18:00',
  bookingFormat: 'предварительная запись',
  cashback: '5% кешбэк на все покупки',
  payments: ['наличные', 'банковский перевод', 'СБП']
};

export const navItems = [
  { label: 'Услуги', href: '#services' },
  { label: 'Цены', href: '#prices' },
  { label: 'Как работаем', href: '#process' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' }
];

export const legalLinks = [
  { label: 'Политика обработки персональных данных', href: publicPath('/legal/privacy-policy.html') },
  { label: 'Согласие на обработку персональных данных', href: publicPath('/legal/personal-data-consent.html') },
  { label: 'Политика cookie', href: publicPath('/legal/cookie-policy.html') },
  { label: 'Пользовательское соглашение', href: publicPath('/legal/user-agreement.html') }
];
