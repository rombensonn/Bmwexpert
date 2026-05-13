import { brands } from '../data/services';

export function Brands() {
  return (
    <section className="section brands" aria-labelledby="brands-title">
      <div className="container">
        <div className="section-heading reveal">
          <p className="eyebrow">Для каких авто</p>
          <h2 id="brands-title">Обслуживаем BMW и популярные марки легковых автомобилей</h2>
          <p>
            Если не уверены, берём ли вашу модель — отправьте марку, год и задачу, мы подскажем по записи.
          </p>
        </div>
        <div className="brand-cloud reveal" aria-label="Марки автомобилей">
          {brands.map((brand) => (
            <span key={brand}>{brand}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
