type IconProps = {
  name:
    | 'phone'
    | 'map'
    | 'calendar'
    | 'star'
    | 'check'
    | 'menu'
    | 'close'
    | 'shield'
    | 'tool'
    | 'clock'
    | 'message'
    | 'route'
    | 'card'
    | 'car'
    | 'wifi'
    | 'access'
    | 'cash';
  className?: string;
  size?: number;
  title?: string;
};

const paths: Record<IconProps['name'], string> = {
  phone:
    'M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.06 3h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.59 2.61a2 2 0 0 1-.45 2.11L9 10.64a16 16 0 0 0 4.36 4.36l1.2-1.2a2 2 0 0 1 2.11-.45c.84.27 1.71.47 2.61.59A2 2 0 0 1 22 16.92Z',
  map:
    'M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  calendar:
    'M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
  star:
    'm12 2 3.09 6.26L22 9.27l-5 4.88L18.18 21 12 17.77 5.82 21 7 14.15l-5-4.88 6.91-1.01L12 2Z',
  check:
    'M20 6 9 17l-5-5',
  menu:
    'M4 6h16 M4 12h16 M4 18h16',
  close:
    'M18 6 6 18 M6 6l12 12',
  shield:
    'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z M9 12l2 2 4-5',
  tool:
    'M14.7 6.3a4 4 0 0 0-5 5L3 18v3h3l6.7-6.7a4 4 0 0 0 5-5l-2.3 2.3-2.9-2.9 2.2-2.4Z',
  clock:
    'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M12 6v6l4 2',
  message:
    'M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z',
  route:
    'M3 6h6a4 4 0 0 1 0 8H7a4 4 0 0 0 0 8h14 M18 19l3 3-3 3 M6 3l3 3-3 3',
  card:
    'M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z M2 10h20 M7 15h4',
  car:
    'M5 12 7 6h10l2 6 M3 12h18v6H3v-6Z M7 18v2 M17 18v2 M6 15h.01 M18 15h.01',
  wifi:
    'M5 13a10 10 0 0 1 14 0 M8.5 16.5a5 5 0 0 1 7 0 M12 20h.01',
  access:
    'M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M10 8h4l1 6h4l1 8 M9 22l2-8-1-6Z M5 10a7 7 0 0 0 5 11',
  cash:
    'M3 7h18v10H3V7Z M7 11h.01 M17 13h.01 M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'
};

export function Icon({ name, className, size = 20, title }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path d={paths[name]} />
    </svg>
  );
}
