import Link from 'next/link';
import { BotonEnlace } from '@/components/ui/Boton';
import { sitio } from '@/content/sitio';

export default function NoEncontrado() {
  return (
    <section className="contenedor flex min-h-[60vh] flex-col justify-center py-seccion">
      <p className="etiqueta">Error 404</p>
      <h1 className="mt-5 max-w-[18ch] text-t1">Esta página no existe o cambió de dirección.</h1>
      <p className="mt-6 max-w-lectura text-cuerpo-lg text-tinta-suave">
        Puedes volver al inicio o ir directamente a la sección que buscabas.
      </p>

      <div className="mt-9">
        <BotonEnlace href="/">Volver al inicio</BotonEnlace>
      </div>

      <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-linea pt-6">
        {sitio.navegacion.map((elemento) => (
          <li key={elemento.href}>
            <Link
              href={elemento.href}
              className="flex min-h-[44px] items-center text-menudo text-institucional underline underline-offset-4"
            >
              {elemento.titulo}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
