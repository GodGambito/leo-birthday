# 🪗 Misión Acordeón • Cumpleaños 18 de Leonardo Barreto Finol

Aplicación web desarrollada en **Next.js (App Router)** con **TypeScript**, **Tailwind CSS**, soporte para **Supabase** y optimizada al 100% para celulares y despliegue inmediato en **Vercel**.

---

## 🎨 Características Principales

1. **Diseño Black + Lime (`#111111` + `#B6FF00`)**:
   - Estética oscura moderna, limpia y festiva con acentos neón lima de alto impacto.
   - 100% responsive, pensada para el 90%+ de tráfico mobile desde WhatsApp e Instagram.
2. **Termómetro del Acordeón (Meta: $1,000 USD)**:
   - Barra de progreso interactiva con porcentaje animado.
   - Simulación visual del fuelle del acordeón que se ilumina con el avance.
   - Mensajes motivacionales según el avance alcanzado.
3. **Podio Top 3 Destacado**:
   - 🥇 **1er Lugar**: Corona, resplandor neón lima y badge *"Fan #1 de Leo"*.
   - 🥈 **2do Lugar**: Medalla y acabados en plata brillante.
   - 🥉 **3er Lugar**: Medalla y acabados en bronce cálido.
   - Cita textual del flyer: *"Cualquier aporte suma... aunque ya sabemos que quien más quiera a Leo, más va a contribuir. 👀😂"*
4. **Tabla General de Posiciones**:
   - Listado completo de aportantes ordenados de mayor a menor.
   - **Suma acumulativa automática**: si una persona hace varios aportes, se suman automáticamente y se muestra un badge con la cantidad de aportes realizados.
   - Buscador en tiempo real por nombre de amigo o familiar.
5. **Tarjeta Zelle con 1-Tap Copy**:
   - Teléfono oficial: `305-680-4441`
   - Titular: `Americo Barreto`
   - Botón táctil para copiar el número al portapapeles con confirmación visual y confetti.
6. **Detalles de la Fiesta**:
   - Fecha: Viernes, 03 de Octubre • 8:30 PM
   - Dirección: `5131 Crown Haven Dr. Kissimmee, Fl. 34746`
   - Atajos directos para abrir en **Google Maps**, **Apple Maps** y **Waze**.
7. **Previsualización en Redes Sociales (Open Graph)**:
   - Configurada con `invitacion.jpeg` para que al compartir por WhatsApp o redes se vea la tarjeta oficial de la invitación.
8. **Acceso Secreto para Leo y Paola**:
   - Ruta privada difícil de adivinar: `/mision-acordeon-secreto-leo18`
   - Teclado táctil PIN estilo iOS (PIN por defecto: `1803`).
   - Botones rápidos para sumar a personas existentes o registrar nuevos aportantes con chips de monto (`+$20`, `+$50`, `+$100`, `+$200`).
   - Pestaña de historial con opción de anular/eliminar en caso de error.

---

## 🚀 Despliegue en Vercel (1 Clic)

1. Sube este repositorio a tu GitHub.
2. Ve a [Vercel](https://vercel.com) y selecciona **Add New Project** > Importa tu repositorio.
3. Configura las variables de entorno en Vercel:
   - `NEXT_PUBLIC_GOAL_AMOUNT`: `1000`
   - `ADMIN_PIN`: `1803` (o el PIN secreto de 4 dígitos que prefieras)
   - `NEXT_PUBLIC_SUPABASE_URL`: URL de tu proyecto Supabase *(opcional para persistencia en nube)*
   - `SUPABASE_SERVICE_ROLE_KEY`: Service role key de tu proyecto Supabase *(opcional)*
4. Haz clic en **Deploy** y ¡listo!

---

## 🗄️ Configuración de Supabase (2 minutos)

1. Crea un proyecto gratuito en [supabase.com](https://supabase.com).
2. Ve a la sección **SQL Editor** en el menú lateral.
3. Copia y pega el contenido del archivo [`supabase/schema.sql`](./supabase/schema.sql) y haz clic en **Run**.
4. Ve a **Project Settings** > **API** y copia tu `Project URL` y tu `service_role` secret (o `anon` key) en las variables de entorno de Vercel.

*(Nota: Si no configuras Supabase de inmediato, la aplicación cuenta con un modo de respaldo en memoria con datos realistas para que funcione sin problemas desde el primer segundo).*

---

## 📱 Acceso de Leo y Paola

- **Enlace secreto**: `https://tu-sitio.vercel.app/mision-acordeon-secreto-leo18`
- **PIN por defecto**: `1803`
