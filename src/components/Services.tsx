import { serviceCards } from '../data/services';
import { Icon } from './Icon';

const featuredServices = serviceCards.slice(0, 3);
const matrixServices = serviceCards.slice(3);

export function Services() {
  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="service-board reveal">
          <div className="service-board-head">
            <p className="eyebrow">С чем поможем</p>
            <h2 id="services-title">Выберите направление — соберём понятную карту работ по вашей машине</h2>
            <p>
              Услуги разложены как сервисный лист: сначала тип задачи, затем осмотр, согласование и понятный следующий
              шаг.
            </p>
          </div>

          <div className="service-showcase" aria-label="Основные направления обслуживания">
            {featuredServices.map((service, index) => (
              <article className="service-preset" key={service.title}>
                <div className="service-visual" aria-hidden="true">
                  <span className="service-visual-label">Заявка 0{index + 1}</span>
                  <div className="service-visual-line is-wide" />
                  <div className="service-visual-line" />
                  <div className="service-visual-status">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#lead">Уточнить по моей машине</a>
              </article>
            ))}
          </div>

          <div className="service-matrix" aria-label="Дополнительные направления работ">
            {matrixServices.map((service) => (
              <article className="service-matrix-cell" key={service.title}>
                <Icon name="tool" size={22} />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#lead" aria-label={`Уточнить по направлению ${service.title}`}>
                  →
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
