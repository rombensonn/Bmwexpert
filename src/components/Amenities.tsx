import { business } from '../data/business';
import { Icon } from './Icon';

const amenities = [
  { title: 'Парковка', icon: 'car' as const },
  { title: 'Wi-Fi', icon: 'wifi' as const },
  { title: 'Туалет', icon: 'check' as const },
  { title: 'Можно с собакой', icon: 'check' as const },
  { title: 'Предварительная запись', icon: 'calendar' as const },
  { title: 'Оплата наличными, переводом, СБП', icon: 'cash' as const },
  { title: 'Пандус и парковка для людей с инвалидностью', icon: 'access' as const },
  { title: business.schedule, icon: 'clock' as const }
];

export function Amenities() {
  return (
    <section className="section amenities" aria-labelledby="amenities-title">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">Удобства сервиса</p>
          <h2 id="amenities-title">Перед визитом понятно, что есть на месте</h2>
        </div>

        <div className="amenities-grid">
          {amenities.map((item) => (
            <div className="amenity-item reveal" key={item.title}>
              <Icon name={item.icon} size={20} />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
