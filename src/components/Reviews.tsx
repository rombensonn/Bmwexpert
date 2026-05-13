import { business } from '../data/business';
import { Icon } from './Icon';

const reviews = [
  'Быстро и качественно обслужили авто. Теперь только сюда.',
  'Приехал на очередное ТО, всё посмотрели, проверили, поменяли масло и фильтры.',
  'Ребята знающие, всё расскажут и покажут.',
  'Лишнего не навязывают, вменяемые цены.'
];

export function Reviews() {
  return (
    <section className="section reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="container">
        <div className="reviews-head reveal">
          <div className="section-heading">
            <p className="eyebrow">Отзывы</p>
            <h2 id="reviews-title">Что отмечают клиенты Bmwexpert</h2>
          </div>
          <div className="rating-card" aria-label={`Рейтинг ${business.rating} на основе ${business.ratingCount} оценок`}>
            <Icon name="star" size={24} />
            <strong>{business.rating}</strong>
            <span>{business.ratingCount} оценок · {business.reviewCount} отзывов</span>
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <article className="review-card reveal" key={review}>
              <p>«{review}»</p>
            </article>
          ))}
        </div>

        <p className="source-note reveal">
          По данным отзывов на Яндекс Картах. Перед публикацией финального сайта тексты отзывов нужно сверить с
          источником.
        </p>
      </div>
    </section>
  );
}
