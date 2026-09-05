import Link from 'next/link';
import { Logotipo } from '@/components/ui/Logotipo';
import { enlaceWhatsApp, sitio } from '@/content/sitio';

export function Pie() {
  const anio = new Date().getFullYear();

  return (
    <footer className="sobre-oscuro bg-tinta text-papel">
      <div className="contenedor py-16 lg:py-20">
        <div className="grid items-stretch gap-9 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
          <div>
            <Logotipo tono="oscuro" conDescriptor />
          </div>

          {sitio.navegacionPie.map((grupo) => (
            <nav key={grupo.titulo} aria-label={grupo.titulo}>
              <h2 className="etiqueta text-papel/50">{grupo.titulo}</h2>
              <ul className="mt-4 space-y-1">
                {grupo.enlaces.map((enlace) => (
                  <li key={enlace.href}>
                    <Link
                      href={enlace.href}
                      className="flex min-h-[36px] items-center text-menudo text-papel/80 transition-colors duration-150 hover:text-sello-claro"
                    >
                      {enlace.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="etiqueta text-papel/50">Contacto</h2>
            <ul className="mt-4 space-y-1 text-menudo text-papel/80">
              <li>
                <a
                  href={`mailto:${sitio.contacto.correo}`}
                  className="flex min-h-[36px] items-center transition-colors duration-150 hover:text-sello-claro"
                >
                  {sitio.contacto.correo}
                </a>
              </li>
              <li>
                <a
                  href={enlaceWhatsApp(
                    'Hola. Me gustaría recibir información sobre Trayecto Liceo.',
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[36px] items-center transition-colors duration-150 hover:text-sello-claro"
                >
                  {sitio.contacto.whatsappVisible}
                </a>
              </li>
              <li className="pt-2 text-papel/60">{sitio.contacto.domicilio}</li>
              <li className="text-papel/60">{sitio.contacto.horario}</li>
            </ul>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1">
              {sitio.redes.map((red) => (
                <li key={red.url}>
                  <a
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[36px] items-center text-menudo text-papel/80 transition-colors duration-150 hover:text-sello-claro"
                  >
                    {red.titulo}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-4">
              <a
                href={sitio.psicometrics.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[36px] items-center font-mono text-etiqueta uppercase text-sello-claro transition-opacity duration-150 hover:opacity-75"
              >
                {sitio.psicometrics.nombre} ↗
              </a>
            </p>
          </div>
        </div>

        <div className="regla-oscura mt-14 flex flex-col gap-3 pt-6 text-menudo text-papel/55 sm:flex-row sm:items-baseline sm:justify-between">
          <p>
            {sitio.nombre} es marca operada por {sitio.operadora}
          </p>
          <p className="flex flex-wrap items-center gap-x-4">
            <Link
              href={sitio.avisoPrivacidad}
              className="underline underline-offset-4 transition-colors duration-150 hover:text-sello-claro"
            >
              Aviso de privacidad
            </Link>
            <span>© {anio}. Todos los derechos reservados.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
