import { business } from '../data/business';
import { Icon } from './Icon';

const statuses = ['Приняли авто', 'Провели осмотр', 'Согласовали работы', 'Выполнили ремонт', 'Передали автомобиль'];

export function Hero() {
  return (
    <section className="hero section" id="top" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-content reveal">
          <p className="eyebrow">Bmwexpert · Ногинск · предварительная запись</p>
          <h1 id="hero-title">Автосервис Bmwexpert в Ногинске — ТО, диагностика и ремонт без лишних работ</h1>
          <p className="hero-lead">
            Обслуживаем BMW и другие легковые автомобили. Сначала проверяем, объясняем и согласуем стоимость — затем
            приступаем к работе.
          </p>

          <div className="hero-badges" aria-label="Ключевая информация о сервисе">
            <span>
              <Icon name="star" size={17} /> Рейтинг {business.rating} на Яндекс Картах
            </span>
            <span>{business.ratingCount} оценок</span>
            <span>
              <Icon name="clock" size={17} /> {business.schedule}
            </span>
            <span>
              <Icon name="map" size={17} /> {business.address}
            </span>
            <span>
              <Icon name="calendar" size={17} /> Предварительная запись
            </span>
          </div>

          <div className="hero-actions">
            <a className="button button-primary" href="#lead">
              Записаться на ТО
            </a>
            <a className="button button-secondary" href="#lead">
              Уточнить стоимость
            </a>
            <a className="button button-ghost" href={business.routeHref} target="_blank" rel="noreferrer">
              <Icon name="route" size={19} /> Построить маршрут
            </a>
          </div>
        </div>

        <div className="service-sheet reveal" aria-label="Сервисная карта автомобиля">
          <div className="sheet-topline">
            <div>
              <span className="sheet-kicker">Заявка на обслуживание</span>
              <strong>Карта работ № 042</strong>
            </div>
            <span className="status-pill">согласование</span>
          </div>

          <div className="sheet-car">
            <Icon name="car" size={32} />
            <div>
              <span>Автомобиль клиента</span>
              <strong>ТО / диагностика / ремонт</strong>
            </div>
          </div>

          <ol className="status-list">
            {statuses.map((status, index) => (
              <li key={status}>
                <span className="status-index">{index + 1}</span>
                <span>{status}</span>
              </li>
            ))}
          </ol>

          <div className="sheet-note">
            <Icon name="shield" size={20} />
            <p>Дополнительные работы не начинаем без согласования объёма и стоимости.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
