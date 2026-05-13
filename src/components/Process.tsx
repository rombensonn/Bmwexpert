import { Icon } from './Icon';

const processSteps = [
  'Вы оставляете заявку или звоните',
  'Уточняем авто и задачу',
  'Назначаем удобное время',
  'Осматриваем автомобиль',
  'Согласуем работы и стоимость',
  'Выполняем ремонт или ТО',
  'Передаём авто и объясняем, что было сделано'
];

export function Process() {
  return (
    <section className="section process-section" id="process" aria-labelledby="process-title">
      <div className="container">
        <div className="process-workbench reveal">
          <div className="process-copy">
            <p className="eyebrow">Как проходит обслуживание</p>
            <h2 id="process-title">Сценарий визита виден заранее: от заявки до передачи автомобиля</h2>
            <p>
              Формат похож на рабочую панель мастера: слева этапы, справа сервисная карта с тем, что согласовано и что
              осталось сделать.
            </p>
          </div>

          <ol className="process-rail">
            {processSteps.map((step, index) => (
              <li className={index === 4 ? 'is-active' : undefined} key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>

          <div className="process-device" aria-label="Пример сервисной карты">
            <div className="process-device-top">
              <span />
              <strong>Карта согласования</strong>
            </div>
            <div className="process-device-message is-client">Нужно понять стоимость ТО и тормозов</div>
            <div className="process-device-message is-service">
              Осмотрим автомобиль, покажем состояние узлов и согласуем работы до начала.
            </div>
            <div className="process-device-checks">
              <p><Icon name="check" size={17} /> Авто и задача уточнены</p>
              <p><Icon name="check" size={17} /> Время визита назначено</p>
              <p><Icon name="shield" size={17} /> Стоимость согласуется до работ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
