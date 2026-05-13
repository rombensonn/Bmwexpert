import { useState } from 'react';
import { business, navItems } from '../data/business';
import { Icon } from './Icon';

export function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Перейти к содержанию
      </a>
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="Bmwexpert, перейти к началу страницы" onClick={closeMenu}>
          <span className="brand-mark">B</span>
          <span>
            <strong>{business.name}</strong>
            <small>автосервис в Ногинске</small>
          </span>
        </a>

        <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Основная навигация">
          {navItems.map((item) => (
            <a href={item.href} key={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="phone-link" href={business.phoneHref}>
            <Icon name="phone" size={18} />
            <span>{business.phone}</span>
          </a>
          <a className="button button-primary button-small" href="#lead">
            Записаться
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
