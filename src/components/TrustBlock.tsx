import { Icon } from './Icon';

const trustItems = [
  {
    title: 'Быстро и по делу',
    text: 'Без долгих объяснений и лишнего ожидания: фиксируем задачу, время и следующий шаг.'
  },
  {
    title: 'Показываем, что делаем',
    text: 'Объясняем проблему понятным языком и показываем, какие узлы требуют внимания.'
  },
  {
    title: 'Не навязываем лишнее',
    text: 'Сначала диагностика и согласование. Дополнительные работы обсуждаем отдельно.'
  },
  {
    title: 'Работаем с гарантией',
    text: 'Условия гарантии зависят от вида работ и расходников, их можно уточнить при записи.'
  }
];

export function TrustBlock() {
  return (
    <section className="section trust-section" aria-labelledby="trust-title">
      <div className="container">
        <div className="trust-editorial reveal">
          <div className="trust-editorial-head">
            <p className="eyebrow">Почему приезжают повторно</p>
            <h2 id="trust-title">Доверие появляется, когда ремонт видно по шагам, а не по словам.</h2>
            <p>
              Мы усилили блок вокруг того, что важно до визита: объяснить задачу, показать причину, согласовать цену и
              не начинать лишнее без разговора с владельцем.
            </p>
          </div>

          <div className="trust-proof-grid">
            {trustItems.slice(0, 3).map((item) => (
              <article className="trust-proof-cell" key={item.title}>
                <Icon name="check" size={22} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="trust-insight-row">
            <div className="trust-mockup" aria-hidden="true">
              <span>Осмотр</span>
              <div className="mockup-card">
                <strong>Замечание по узлу</strong>
                <p>Показываем, что влияет на безопасность, а что можно отложить.</p>
                <button type="button" tabIndex={-1}>Согласовать</button>
              </div>
            </div>
            <article className="trust-proof-cell trust-proof-cell-accent">
              <Icon name="shield" size={22} />
              <h3>{trustItems[3].title}</h3>
              <p>{trustItems[3].text}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
