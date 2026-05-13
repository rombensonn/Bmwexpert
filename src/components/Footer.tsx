import { business, legalLinks } from '../data/business';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <strong>{business.name}</strong>
          <p>
            {business.address}
            <br />
            {business.phone} · {business.schedule}
          </p>
        </div>

        <nav aria-label="Юридические документы">
          {legalLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="container footer-disclaimer">
        <p>
          Информация на сайте носит справочный характер. Итоговая стоимость работ зависит от модели автомобиля,
          состояния узлов и выбранных расходников. Перед выполнением работ объём и стоимость согласуются.
        </p>
      </div>
    </footer>
  );
}
