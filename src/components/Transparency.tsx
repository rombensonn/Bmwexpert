import { Icon } from './Icon';

const transparencyItems = [
  'Покажем причину неисправности',
  'Согласуем стоимость до начала',
  'Объясним, что входит в работу',
  'Подскажем варианты по расходникам',
  'Можно уточнить условия по своим запчастям при записи'
];

export function Transparency() {
  return (
    <section className="section transparency" aria-labelledby="transparency-title">
      <div className="container transparency-layout">
        <div className="section-heading reveal">
          <p className="eyebrow">Прозрачность по работам и расходникам</p>
          <h2 id="transparency-title">Сначала согласование — потом ремонт</h2>
          <p>
            Мы не начинаем дополнительные работы без согласования. Если при осмотре видим проблему, объясняем, что
            влияет на безопасность, что можно отложить, а что лучше сделать сразу.
          </p>
        </div>

        <div className="transparency-card reveal">
          {transparencyItems.map((item) => (
            <div className="transparency-item" key={item}>
              <span>
                <Icon name="check" size={18} />
              </span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
