import { priceItems } from '../data/services';
import { Icon } from './Icon';

export function PriceList() {
  return (
    <section className="section price-section" id="prices" aria-labelledby="prices-title">
      <div className="container">
        <div className="price-board reveal">
          <div className="price-board-strip" aria-hidden="true" />
          <div className="price-board-head">
            <div className="section-heading">
            <p className="eyebrow">Популярные услуги и цены</p>
              <h2 id="prices-title">Ориентир по стоимости до визита. Точная цена — после осмотра и согласования.</h2>
            <p>
                Прайс сделан как сметная таблица: видно базовую услугу, что входит в работу и где цена зависит от
                модели автомобиля.
            </p>
            </div>
            <div className="price-board-summary" aria-label="Порядок согласования цены">
              <span>01</span>
              <p>Называем ориентир</p>
              <span>02</span>
              <p>Проверяем автомобиль</p>
              <span>03</span>
              <p>Согласуем объём и цену</p>
            </div>
          </div>

          <div className="price-matrix">
            {priceItems.map((item, index) => (
              <article className="price-tile" key={item.title}>
                <div className="price-tile-meta">
                  <span>0{index + 1}</span>
                  <small>ориентир</small>
                </div>
                <h3>{item.title}</h3>
                {item.description ? <p>{item.description}</p> : null}
                <strong>{item.price}</strong>
              </article>
            ))}
            <div className="price-note">
              <Icon name="shield" size={20} />
              <p>
                Итоговая стоимость зависит от модели автомобиля, состояния узлов и выбранных расходников. Перед началом
                работ согласуем объём и цену.
              </p>
            </div>
          </div>

            <a className="button button-primary" href="#lead">
              Уточнить стоимость для моей машины
            </a>
        </div>
      </div>
    </section>
  );
}
