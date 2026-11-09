'use client';
import {useEffect, useState} from 'react';

const links = [
  ['#inicio', 'Home'], ['/catalogos/todos', 'Portfólio'], ['#como-funciona', 'Colecionáveis'], ['#por-que', 'Utilidades'], ['#orcamento', 'Orçamentos'],
];

// Menu do celular + efeito de movimento da arte do topo (igual ao site de referência).
export default function LandingMenu() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const art = document.querySelector<HTMLElement>('.b-hero-art');
    const sparks = document.querySelector<HTMLElement>('.b-hero-sparks');
    const move = (e: PointerEvent) => {
      if (window.innerWidth < 701 || !art || !sparks) return;
      const x = (e.clientX / window.innerWidth - .5) * 10, y = (e.clientY / window.innerHeight - .5) * 8;
      art.style.transform = `translate(${x}px, ${y}px)`;
      sparks.style.transform = `translate(${-x * 1.6}px, ${-y * 1.6}px)`;
    };
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('pointermove', move, {passive: true});
    document.addEventListener('keydown', key);
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('keydown', key); };
  }, []);
  return (
    <>
      <button className="b-mobile-menu" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen(v => !v)}>
        <svg className="b-ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
      </button>
      <nav aria-label="Navegação móvel" className={'b-mobile-nav-drawer' + (open ? ' b-open' : '')} id="mobile-navigation" onClick={e => { if ((e.target as HTMLElement).closest('a')) setOpen(false); }}>
        {links.map(([href, label], i) => <a key={href + label} href={href} className={i === 0 ? 'b-active' : undefined}>{label}</a>)}
      </nav>
    </>
  );
}
