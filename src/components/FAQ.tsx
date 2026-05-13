import { faqItems } from '../data/faq';

export function FAQ() {
  const sidebarItems = ['Запись', 'Стоимость', 'Расходники'];

  return (
    <section className="section faq" aria-labelledby="faq-title">
      <div className="container">
        <div className="faq-board reveal">
          <div className="faq-title-block">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title">Перед визитом остаются только практические вопросы</h2>
          </div>

          <aside className="faq-sidebar" aria-label="Темы вопросов">
            <span>Темы</span>
            {sidebarItems.map((item, index) => (
              <a className={index === 0 ? 'is-active' : undefined} href="#lead" key={item}>
                {item}
                <span aria-hidden="true">→</span>
              </a>
            ))}
            <a className="faq-sidebar-cta" href="#lead">Задать свой вопрос</a>
          </aside>

          <div className="faq-panel">
            <p className="faq-panel-lead">
              Короткие ответы на то, что обычно уточняют до записи: время, стоимость, BMW, расходники и способы оплаты.
            </p>
            <div className="faq-list">
              {faqItems.map((item) => (
                <details className="faq-item" key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
