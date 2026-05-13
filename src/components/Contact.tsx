import { business } from '../data/business';
import { Icon } from './Icon';
import { LeadForm } from './LeadForm';

export function Contact() {
  return (
    <section className="section contact-section" id="contacts" aria-labelledby="contacts-title">
      <div className="container contact-layout">
        <div className="lead-panel reveal" id="lead">
          <div className="section-heading">
            <p className="eyebrow">Запись в сервис</p>
            <h2 id="contacts-title">Опишите задачу — подскажем по времени и стоимости</h2>
            <p>После отправки заявки свяжемся в рабочее время: ежедневно с 10:00 до 18:00.</p>
          </div>
          <LeadForm />
        </div>

        <aside className="contact-card reveal" aria-label="Контакты автосервиса">
          <span className="icon-badge icon-badge-large">
            <Icon name="map" size={24} />
          </span>
          <h2>Bmwexpert</h2>
          <dl>
            <div>
              <dt>Адрес</dt>
              <dd>{business.address}</dd>
            </div>
            <div>
              <dt>Телефон</dt>
              <dd>
                <a href={business.phoneHref}>{business.phone}</a>
              </dd>
            </div>
            <div>
              <dt>График</dt>
              <dd>{business.schedule}</dd>
            </div>
            <div>
              <dt>Формат</dt>
              <dd>Предварительная запись</dd>
            </div>
          </dl>

          <div className="contact-actions">
            <a className="button button-primary" href={business.phoneHref}>
              <Icon name="phone" size={19} /> Позвонить
            </a>
            <a className="button button-secondary" href={business.whatsappHref} target="_blank" rel="noreferrer">
              <Icon name="message" size={19} /> Написать в WhatsApp
            </a>
            <a className="button button-ghost" href={business.routeHref} target="_blank" rel="noreferrer">
              <Icon name="route" size={19} /> Построить маршрут в Яндекс Картах
            </a>
          </div>

          <div className="map-placeholder">
            <p>Карту не загружаем сразу, чтобы первый экран оставался быстрым.</p>
            <a href={business.routeHref} target="_blank" rel="noreferrer">
              Открыть маршрут
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
