import {loja, imagens, waLink} from '../lib/loja';
import LandingMenu from './landing-menu';

const ext = {target: '_blank', rel: 'noopener noreferrer'};
const arrow = <svg className="b-ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" /></svg>;
const igIcon = <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>;

function Logo({rodape = false}: {rodape?: boolean}) {
  return (
    <a className="b-brand" href="#inicio" aria-label={loja.nome + ' - início'}>
      {loja.logo
        ? <img className="b-logo-image" src={loja.logo} alt={loja.nome} />
        : <>{!rodape && <span className="b-mascot">{loja.sigla}</span>}<span className="b-brand-type">{loja.marca[0]}<small>{loja.marca[1]}</small></span></>}
    </a>
  );
}

export default function Landing() {
  const wa = waLink();
  const insta = loja.instagram ? `https://www.instagram.com/${loja.instagram}/` : '';
  const a = loja.avaliacao;
  const partes = a.destaque && a.texto.includes(a.destaque) ? a.texto.split(a.destaque) : [a.texto];
  const iniciais = a.cliente.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  const temQuadro = !!a.texto;
  const heroStyle = {'--hero-img': imagens.heroFundo ? `url(${imagens.heroFundo})` : 'none'} as React.CSSProperties;

  return (
    <div className="lp">
      <div className="b-shell" id="inicio">
        <div className="b-grain" />
        <div className="b-announcement"><b><svg className="b-ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 1.8 8.2L22 12l-8.2 1.8L12 22l-1.8-8.2L2 12l8.2-1.8z" /></svg> novidade</b> {loja.aviso}</div>
        <header className="b-wrap lp-header">
          <Logo />
          <nav aria-label="Navegação principal">
            <a href="#inicio" className="b-active">Home</a><a href="/catalogos/todos">Portfólio</a><a href="#como-funciona">Colecionáveis</a><a href="#por-que">Utilidades</a><a href="#orcamento">Orçamentos</a>
          </nav>
          <a className="b-contact" href={wa} {...ext}>Fale Conosco {arrow}</a>
          <LandingMenu />
        </header>

        <main>
          <section className="b-hero b-wrap">
            <div className="b-hero-art" aria-hidden="true" style={heroStyle} />
            <div className="b-hero-sparks" aria-hidden="true" />
            <div className="b-hero-graffiti" aria-hidden="true"><span>Impressão</span><b>3D</b><span>sem limites</span></div>
            <div className="b-hero-content">
              <h1 className={loja.nomeCurto.length > 14 ? 'b-h1-longo' : undefined}><span className="b-cyan b-headline-glitch" data-text="Você imagina.">Você imagina.</span><span className="b-magenta">A {loja.nomeCurto} cria! <span aria-hidden="true">↗</span></span></h1>
              <p className="b-lead">Do <strong>3D para a sua realidade.</strong> A gente transforma a sua referência, seu presente ou aquela ideia maluca em uma criação feita só para você.</p>
              <div className="b-hero-actions">
                <a className="b-btn b-btn-primary" href={wa} {...ext}>Fazer orçamento <span className="b-arrow">{arrow}</span></a>
                <a className="b-btn b-btn-secondary" href="/catalogos/todos"><span className="b-button-icon"><svg className="b-ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 7 4v10l-7 4-7-4V7zM5 7l7 4 7-4M12 11v10" /></svg></span> Explorar peças</a>
              </div>
              <div className="b-hero-tags">
                <span className="b-tag">{loja.cidade ? <><strong>{loja.cidade}</strong> • {loja.entrega}</> : <strong>{loja.entrega}</strong>}</span>
                <span className="b-tag">Feito para a sua ideia</span>
                <span className="b-tag">Do presente ao projeto sob medida</span>
              </div>
            </div>
            <span className="b-down">role para explorar</span>
          </section>

          <div className="b-ticker" aria-label="categorias"><div className="b-ticker-inner">Sua ideia <b>✦</b><span>feito sob medida</span><b>✦</b> Camada por camada <span>✦</span> Do seu jeito <b>✦</b><span>Com a sua personalidade</span><b>✦</b> Sua ideia <span>✦</span> Feito sob medida <b>✦</b> Camada por camada <span>✦</span> Do seu jeito <b>✦</b><span>Com a sua personalidade</span><b>✦</b></div></div>

          <section className="b-universe-section" id="como-funciona">
            {imagens.flutuante1 && <img className="b-floating-figure b-blonde" src={imagens.flutuante1} alt="" aria-hidden="true" />}
            {imagens.flutuante2 && <img className="b-floating-figure b-purple" src={imagens.flutuante2} alt="" aria-hidden="true" />}
            {imagens.flutuante3 && <img className="b-floating-figure b-hero" src={imagens.flutuante3} alt="" aria-hidden="true" />}
            <div className="b-wrap b-universe-copy">
              <div className="b-kicker">Nada de prateleira pronta</div>
              <h2>Sua ideia merece<br /><em>nascer diferente.</em></h2>
              <p>A {loja.nome.toUpperCase()} é um ateliê para criações que têm a sua cara. Você imagina, conta para a gente e acompanha a magia ganhando forma.</p>
              <div className="b-universe-steps" aria-label="Como funciona">
                <div className="b-universe-step"><b>[ 01 ]</b><span>Você conta<br />a ideia</span></div>
                <div className="b-universe-step"><b>[ 02 ]</b><span>A gente dá<br />vida a ela</span></div>
                <div className="b-universe-step"><b>[ 03 ]</b><span>Sua criação<br />chega até você</span></div>
              </div>
            </div>
          </section>

          <section className="b-impact" id="por-que">
            <div className="b-wrap b-impact-wrap">
              <div className="b-impact-content">
                <div className="b-kicker">Por que criar com a {loja.nomeCurto}?</div>
                <h2>Feito para ser<br /><em>a sua cara.</em></h2>
                <p>Não importa se você chegou com um rabisco, uma referência ou uma ideia ainda meio maluca: aqui, ela vira algo único, com cuidado em cada camada.</p>
                {loja.numeros.length > 0 && <div className="b-stats">{loja.numeros.map(n => <div className="b-stat" key={n.texto}><b>{n.valor}</b><span>{n.texto}</span></div>)}</div>}
              </div>
              {imagens.organizador && <div className="b-impact-print" aria-hidden="true"><img src={imagens.organizador} alt="" /></div>}
            </div>
          </section>

          <section className="b-proof" id="quem-criou">
            <div className="b-wrap b-section">
              <div className="b-section-head">
                <div><div className="b-kicker">A comunidade está criando</div><h2>Quem já<br /><em>criou com a gente?</em></h2></div>
                <p className="b-section-copy">Gente de verdade, criações que saíram do feed e foram parar nas casas, mesas e coleções por aí.</p>
              </div>
              {(imagens.galeria.length > 0 || temQuadro) && <div className={'b-proof-grid' + (temQuadro ? '' : ' b-solo')}>
                {imagens.galeria.length > 0 && <div className="b-community-orbit" aria-label="Peças impressas em 3D">
                  {imagens.galeria.slice(0, 3).map((g, i) => <img key={g.src} className={'b-orbit-figure ' + ['b-one', 'b-two', 'b-three'][i]} src={g.src} alt={g.alt} />)}
                </div>}
                {temQuadro && (
                  <aside className="b-review-board">
                    {a.texto && <>
                      <div className="b-review-top"><div className="b-avatars"><span className="b-avatar" /><span className="b-avatar" /><span className="b-avatar" /></div><div><b>{a.nota ? a.nota + ' da galera que criou com a gente' : 'A galera que criou com a gente'}</b><span>✦ Avaliações cheias de carinho</span></div></div>
                      <div className="b-quote">“{partes[0]}{partes.length > 1 && <><mark>{a.destaque}</mark>{partes[1]}</>}”</div>
                      <div className="b-reviewer">{a.foto ? <img className="b-face" src={a.foto} alt={'Foto de ' + a.cliente} /> : <span className="b-face b-face-initials" aria-hidden="true">{iniciais}</span>}<div><strong>{a.cliente}</strong><small>Cliente {loja.nome}</small></div></div>
                    </>}
                    {insta && <a className="b-insta" href={insta} {...ext}>↗ Acompanhe @{loja.instagram} no Instagram</a>}
                  </aside>
                )}
              </div>}
              {!temQuadro && insta && <a className="b-insta b-insta-solo" href={insta} {...ext}>↗ Acompanhe @{loja.instagram} no Instagram</a>}
            </div>
          </section>

          <section className="b-contact-strip" id="orcamento">
            <div className="b-wrap">
              <div className="b-contact-panel">
                <h3>Tem uma ideia<br />doida por aí? <span>Vamos criá-la.</span></h3>
                <a className="b-project-start" href={wa} {...ext}>Começar meu projeto →</a>
              </div>
            </div>
          </section>
        </main>

        <a className="b-community-float" href={loja.grupoWhatsApp || wa} {...ext} aria-label={loja.grupoWhatsApp ? 'Entrar no grupo de leilões no WhatsApp' : 'Falar com a ' + loja.nome + ' no WhatsApp'}>
          <span className="b-wa-mark"><svg className="b-ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.6-4A8 8 0 1 1 20 11.5Z" /><path d="M9.1 8.3c.2-.5.5-.5.7-.5h.4c.1 0 .3.1.4.3l.7 1.7c.1.3.1.5-.1.7l-.5.6c.6 1.2 1.6 2.1 2.8 2.6l.6-.6c.2-.2.4-.2.7-.1l1.6.7c.2.1.3.2.3.4v.4c0 .3 0 .5-.5.7-.4.2-1.1.3-1.8.1-1.1-.3-2.4-1.2-3.5-2.3-1.1-1.1-1.9-2.4-2.2-3.5-.2-.7-.1-1.4.1-1.8Z" /></svg></span>
          <span><b>{loja.grupoWhatsApp ? 'Grupo de leilões' : 'Fale no WhatsApp'}</b>WhatsApp {loja.nome}</span>
        </a>

        <footer>
          <div className="b-wrap">
            <div className="b-footer-main">
              <div><Logo rodape /><p className="b-footer-copy">Você imagina. A {loja.nomeCurto} cria. {loja.rodape}</p></div>
              <div className="b-footer-links">
                <div><h4>Navegação</h4><a href="#como-funciona">Como funciona</a><a href="/catalogos/todos">Explorar portfólio</a><a href="#por-que">Por que a {loja.nomeCurto}?</a>{loja.grupoWhatsApp && <a href={loja.grupoWhatsApp} {...ext}>Grupo de leilões</a>}{loja.termosDeUso && <a href={loja.termosDeUso}>Termos de uso</a>}</div>
                <div><h4>Fale com a gente</h4><a href={wa} {...ext}>Pedir orçamento</a>{insta && <a href={insta} {...ext}>Instagram</a>}{loja.linktree && <a href={loja.linktree} {...ext}>Todos os links</a>}<a href={wa} {...ext}>Whatsapp</a></div>
                <div className="b-footer-details"><h4>Informações</h4>{loja.cidade && <p>{loja.cidade.replace('-', ' — ')}</p>}<p>{loja.entrega}.</p><p>Criações sob medida, feitas camada por camada.</p></div>
              </div>
            </div>
            <div className="b-footer-social" aria-label="Perfis no Instagram">
              {insta && <a className="b-social-link" href={insta} {...ext} aria-label={'Instagram da ' + loja.nome}>{igIcon}</a>}
              <a className="b-social-link" href={loja.credito.url} {...ext} aria-label={'Instagram @' + loja.credito.usuario}>{igIcon}</a>
            </div>
            <div className="b-footer-bottom">
              <span>© {new Date().getFullYear()} {loja.nome}. Todos os direitos reservados.</span>
              <span className="b-footer-credit"><small>CRIAÇÃO &amp; DESENVOLVIMENTO WEB</small><a href={loja.credito.url} {...ext}>Feito por @{loja.credito.usuario} ↗</a></span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
