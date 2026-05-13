import { business } from '../data/business';
import { Icon } from './Icon';

export function MobileCTA() {
  return (
    <div className="mobile-cta" aria-label="Быстрые действия">
      <a href={business.phoneHref}>
        <Icon name="phone" size={19} />
        Позвонить
      </a>
      <a href="#lead">
        <Icon name="calendar" size={19} />
        Записаться
      </a>
    </div>
  );
}
