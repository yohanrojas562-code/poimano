# 💰 Poimano — Valoración, Rentabilidad y Capitalización

> **Análisis Financiero del Proyecto SaaS Multi-Tenant para Gestión de Iglesias**
> Versión: 1.0 · Fecha: 31 de marzo de 2026

---

## Índice

1. [Resumen Ejecutivo](#1-resumen-ejecutivo)
2. [Análisis del Mercado](#2-análisis-del-mercado)
3. [Horas de Trabajo Realizadas](#3-horas-de-trabajo-realizadas)
4. [Valoración Actual del Desarrollo](#4-valoración-actual-del-desarrollo)
5. [Estrategia de Precios por Plan](#5-estrategia-de-precios-por-plan)
6. [Costos Operativos](#6-costos-operativos)
7. [Proyección de Ventas — Primer Año](#7-proyección-de-ventas--primer-año)
8. [Análisis de Rentabilidad](#8-análisis-de-rentabilidad)
9. [Capitalización y Valor del Activo](#9-capitalización-y-valor-del-activo)
10. [Funcionalidades Pendientes con Impacto en Valor](#10-funcionalidades-pendientes-con-impacto-en-valor)
11. [Riesgos y Mitigación](#11-riesgos-y-mitigación)
12. [Conclusiones](#12-conclusiones)

---

## 1. Resumen Ejecutivo

**Poimano** es una plataforma SaaS de gestión integral para iglesias con arquitectura multi-tenant (base de datos aislada por cliente). El proyecto se encuentra en fase **alpha** con ~45% de funcionalidad completa y ya está **desplegado en producción** con infraestructura funcional.

### Estado Actual en Números

| Métrica | Valor |
|---|---|
| Progreso general | ~45% (5/11 módulos + plataforma completa) |
| Módulos funcionales | 5 (Members, Groups, Website, Ministry Areas, Church) |
| Módulos en esqueleto | 6 (Attendance, Activities, Finance, Communication, Projects, Reports) |
| Infraestructura | 100% funcional (VPS, dominio, SSL, deploy) |
| Tenants de prueba | 2 (lasalle, envigado) |
| Líneas de código estimadas | ~25,000+ |
| Archivos del proyecto | ~150+ |

### Diferenciador Clave

El mercado de software para iglesias en **Latinoamérica y habla hispana** está significativamente **desatendido**. La mayoría de soluciones son:
- En inglés (ChurchTools, Planning Center, Breeze)
- Costosas para el mercado LATAM ($50-200 USD/mes)
- No ofrecen multi-tenancy real (no SaaS, sino instalaciones individuales)
- Sin sitio web público integrado
- Sin personalización por idioma/cultura hispana

---

## 2. Análisis del Mercado

### 2.1 Tamaño del Mercado

| Dato | Valor | Fuente |
|---|---|---|
| Iglesias evangélicas en Colombia | ~15,000 - 20,000 | Ministerio del Interior |
| Iglesias evangélicas en LATAM | ~500,000+ | Pew Research |
| Iglesias con software de gestión en LATAM | <5% | Estimación conservadora |
| Mercado potencial inicial (Colombia) | ~15,000 iglesias | — |
| TAM (Total Addressable Market) LATAM | ~500,000 iglesias | — |

### 2.2 Competencia Directa (Español)

| Competidor | País | Precio/mes | Limitaciones |
|---|---|---|---|
| **iCurch** | México | $30-80 USD | No multi-tenant, UI anticuada |
| **ChurchDesk** | España | €49-199 | Enfocado en Europa, caro |
| **Ovejas100** | Colombia | $15-45 USD | Muy básico, sin sitio web |
| **Excel/WhatsApp** | — | $0 | Lo que usa el 90% de iglesias |

### 2.3 Competencia Indirecta (Inglés)

| Competidor | Precio/mes | Modelo |
|---|---|---|
| **Planning Center** | $0-99 USD | Freemium, solo inglés |
| **Breeze ChMS** | $72-112 USD | Por tamaño, solo inglés |
| **ChurchTools** | €30-200 | Multi-idioma pero caro |
| **Tithe.ly** | $0-149 USD | Enfocado en donaciones |

### 2.4 Ventaja Competitiva de Poimano

| Ventaja | Descripción |
|---|---|
| **100% en español** | UI, validaciones, notificaciones, documentación |
| **Precio competitivo** | Diseñado para economías LATAM ($0 - $149.99 USD) |
| **Multi-tenant real** | Base de datos aislada = seguridad total |
| **Sitio web incluido** | Cada iglesia tiene su web pública (sin costo extra) |
| **Stack moderno** | Laravel 11 + React 19 + TypeScript (mantenible a largo plazo) |
| **Plan gratuito** | Barrera de entrada $0 para captar mercado |
| **IA integrada (futuro)** | Asistente pastoral inteligente — ningún competidor lo ofrece aún |

### 2.5 Mercado Desatendido — Por Qué Es Oportunidad

El 90%+ de iglesias en Colombia y LATAM gestionan sus datos con:
- **Hojas de Excel** para miembros
- **Grupos de WhatsApp** para comunicación
- **Cuadernos** para finanzas
- **Sin sitio web** o con uno estático abandonado

Esto significa:
- **Baja competencia real** → no hay líder claro en español
- **Alta necesidad** → las iglesias crecen y necesitan organización
- **Disposición a pagar** → los pastores invierten en herramientas si ven valor
- **Efecto de red** → una iglesia satisfecha recomienda a otras (comunidad pastoral)

---

## 3. Horas de Trabajo Realizadas

### 3.1 Desglose por Área

| # | Área de Trabajo | Componentes Principales | Horas | % del Total |
|---|---|---|---|---|
| 1 | **Arquitectura y Planificación** | Diseño DDD Lite, estructura modular, schema BD central + tenant, documentación técnica, planificación de módulos, diseño de RBAC | 70 h | 9.5% |
| 2 | **Infraestructura / DevOps** | VPS Ubuntu 24.04 (setup desde cero), Nginx config, PHP-FPM, PostgreSQL 16 install/config, Cloudflare DNS, SSL wildcard *.poimano.com, GitHub repo, deploy pipeline SSH manual | 50 h | 6.8% |
| 3 | **Multi-Tenancy Core** | stancl/tenancy 3.9 config, DatabaseTenancyBootstrapper, CacheTenancyBootstrapper, FilesystemTenancyBootstrapper, QueueTenancyBootstrapper, central_domains, CreateDatabase/MigrateDatabase/SeedDatabase jobs, middleware stack | 45 h | 6.1% |
| 4 | **Panel Super Admin (Filament)** | TenantResource (form + table + infolist), PlanResource, StatsOverview widget, LatestTenants widget, TenantsChart widget, Login customizado, PlatformSettings page, TechnicalDocumentation page con CSS scoped, AdminPanelProvider config, navegación por grupos | 70 h | 9.5% |
| 5 | **Auth + RBAC** | 2 guards (central + tenant), AuthController login/logout, 6 roles pre-configurados, 30+ permisos granulares, CheckModuleAccess middleware, plan_modules matrix, RolesSeeder, AdminUserSeeder, canAccessPanel() | 45 h | 6.1% |
| 6 | **Frontend Base** | React 19 + TypeScript setup, Vite config, Inertia.js v2 bridge, 15+ componentes shadcn/ui (Button, Card, Input, Select, Table, Dialog, AlertDialog, Tabs, DropdownMenu, Badge, Avatar, Tooltip, Spinner, etc.), TenantLayout (sidebar colapsable + header + flash messages), tema CSS Variables Navy/Cyan, Inter font, tailwindcss-animate | 50 h | 6.8% |
| 7 | **Módulo Members** | Modelo Member.php (30+ campos, SoftDeletes, LogsActivity), Family.php, MemberSkill.php, MemberHistory.php, MemberController CRUD completo (search, filter, pagination), 5 migraciones, Members/Index.tsx (tabla + búsqueda + filtros + stats cards), Members/Create.tsx, Members/Edit.tsx, Members/Show.tsx (tabs), MemberForm.tsx (5 secciones), types/members.ts | 90 h | 12.2% |
| 8 | **Módulo Groups** | Modelo CellGroup.php, CellGroupController CRUD, migraciones, Groups/Index.tsx, Groups/Create.tsx, Groups/Edit.tsx, Groups/Show.tsx, asistentes, anfitriones, campo Google Maps URL, auto-fill teléfono | 70 h | 9.5% |
| 9 | **Módulo Website** | PublicWebsiteController, WebsiteSettingController, WebsiteMinistryController, WebsiteSocialController, template Esperanza, sitio público responsive, admin de settings web, páginas de ministerios, galería de fotos con upload, redes sociales config, botón WhatsApp flotante, editor HTML de código | 90 h | 12.2% |
| 10 | **Módulo Ministry Areas** | MinistryAreaController CRUD, modelo MinistryArea.php, migraciones, UI index + dialogs, asignación de miembros a áreas, Icon Picker con 120+ iconos Lucide, búsqueda/filtrado de iconos | 50 h | 6.8% |
| 11 | **Módulo Church** | Modelo ChurchSetting.php, ChurchSettingController (edit/update), ChurchSettingsSeeder, migración, UI de configuración | 25 h | 3.4% |
| 12 | **6 Módulos Esqueleto** | Estructura DDD (Application/Domain/Infrastructure/Presentation) para Attendance, Activities, Finance, Communication, Projects, Reports + ServiceProviders + migraciones vacías | 18 h | 2.4% |
| 13 | **Base de Datos** | Diseño schema central (15+ tablas), schema tenant (10+ tablas), 20+ migraciones, seeders centrales (SuperAdmin, Plans, Modules), seeders tenant (Roles, ChurchSettings, AdminUser), índices, constraints, relaciones FK | 35 h | 4.7% |
| 14 | **Traducciones y QA** | Traducciones al español (validation, auth, passwords, pagination), testing manual en producción, debugging (500 errors, admin_password, central_domains, deploy issues), fixes iterativos | 30 h | 4.1% |
| | **TOTAL** | | **738 h** | **100%** |

### 3.2 Distribución por Capa Técnica

| Capa | Horas | % |
|---|---|---|
| Backend (Laravel, PHP, BD) | ~380 h | 51.5% |
| Frontend (React, TypeScript, UI) | ~230 h | 31.2% |
| DevOps / Infraestructura | ~50 h | 6.8% |
| Arquitectura / Planificación / Docs | ~78 h | 10.5% |

### 3.3 Distribución por Tipo de Trabajo

| Tipo | Horas | % |
|---|---|---|
| Desarrollo de funcionalidades nuevas | ~520 h | 70.5% |
| Configuración y setup | ~95 h | 12.9% |
| Debugging y fixes | ~53 h | 7.2% |
| Documentación y planificación | ~70 h | 9.5% |

---

## 4. Valoración Actual del Desarrollo

### 4.1 Valoración por Costo de Desarrollo (Lo Invertido)

Basado en tarifas del mercado colombiano para desarrollador **senior full-stack** (Laravel + React + DevOps):

| Área | Horas | Tarifa COP/h | Subtotal COP |
|---|---|---|---|
| Arquitectura y Planificación | 70 h | $70,000 | $4,900,000 |
| Infraestructura / DevOps | 50 h | $75,000 | $3,750,000 |
| Multi-Tenancy Core | 45 h | $80,000 | $3,600,000 |
| Panel Super Admin (Filament) | 70 h | $70,000 | $4,900,000 |
| Auth + RBAC | 45 h | $75,000 | $3,375,000 |
| Frontend Base | 50 h | $70,000 | $3,500,000 |
| Módulo Members | 90 h | $70,000 | $6,300,000 |
| Módulo Groups | 70 h | $70,000 | $4,900,000 |
| Módulo Website | 90 h | $70,000 | $6,300,000 |
| Módulo Ministry Areas | 50 h | $70,000 | $3,500,000 |
| Módulo Church | 25 h | $70,000 | $1,750,000 |
| 6 Módulos Esqueleto | 18 h | $60,000 | $1,080,000 |
| Base de Datos | 35 h | $75,000 | $2,625,000 |
| Traducciones y QA | 30 h | $60,000 | $1,800,000 |
| **TOTAL** | **738 h** | **~$70,500 prom.** | **$52,280,000** |

### 4.2 Valoración por Valor de Mercado (Freelance Senior Colombia)

Un freelancer senior en Colombia (Laravel + React + TypeScript + PostgreSQL + DevOps) cobra entre $80,000 - $120,000 COP/hora:

| Escenario | Tarifa/h | Total |
|---|---|---|
| Conservador | $80,000 | $59,040,000 |
| Promedio | $100,000 | $73,800,000 |
| Premium | $120,000 | $88,560,000 |

**Rango de valoración por mercado freelance: $59M - $89M COP**

### 4.3 Valoración por Costo de Reemplazo (Agencia/Empresa)

Si una empresa de desarrollo colombiana tuviera que construir Poimano desde cero:

| Factor | Multiplicador | Valor |
|---|---|---|
| Tarifa agencia (equipo de 3-4 personas) | $150,000 - $250,000 COP/h | — |
| Horas necesarias (incluye overhead, reuniones, PM) | 738h × 1.5 = ~1,100h | — |
| **Rango agencia** | — | **$165M - $275M COP** |

### 4.4 Resumen de Valoración (Estado Actual — 45% completado)

| Método de Valoración | Valor Estimado (COP) | Valor Estimado (USD ~$4,200) |
|---|---|---|
| **Costo de desarrollo (invertido)** | $52,280,000 | ~$12,450 USD |
| **Valor de mercado freelance** | $59M - $89M | ~$14,000 - $21,200 USD |
| **Costo de reemplazo (agencia)** | $165M - $275M | ~$39,300 - $65,500 USD |
| **Valoración recomendada (activo)** | **$65M - $80M** | **~$15,500 - $19,000 USD** |

> **Nota:** La valoración recomendada considera que el proyecto tiene código funcional en producción, infraestructura desplegada, arquitectura sólida (multi-tenant real) y está en un mercado desatendido. No es solo código — es un producto con dominio, VPS, SSL, y tenants funcionando.

---

## 5. Estrategia de Precios por Plan

### 5.1 Planes Definidos (ajustados al mercado LATAM)

| Plan | Precio USD/mes | Precio COP/mes (~$4,200) | Máx. Miembros | Módulos Incluidos |
|---|---|---|---|---|
| **Gratuito** | $0 | $0 | 50 | Church, Members, Groups, Attendance |
| **Esencial** | $29.99 | ~$126,000 | 200 | + Finance, Communication, Reports |
| **Profesional** | $59.99 | ~$252,000 | 1,000 | + Activities, Projects, Website |
| **Enterprise** | $149.99 | ~$630,000 | 10,000 | Todos los módulos + IA + soporte prioritario |

### 5.2 Justificación de Precios

**Plan Gratuito ($0):**
- Estrategia de captación. El pastor prueba, le gusta, actualiza.
- 50 miembros es suficiente para una iglesia pequeña de barrio.
- Funciona como demo permanente que genera recomendaciones.

**Plan Esencial ($29.99 USD ≈ $126,000 COP):**
- Iglesias de 50-200 miembros (la mayoría en Colombia).
- $126,000 COP/mes es accesible ($4,200/día, menos que un almuerzo).
- Incluye finanzas, que es el módulo que más dolor resuelve (diezmos, ofrendas).

**Plan Profesional ($59.99 USD ≈ $252,000 COP):**
- Iglesias medianas con 200-1,000 miembros.
- Incluye sitio web público (ahorro de $200,000+ COP/mes en web aparte).
- Actividades y proyectos para iglesias organizadas.

**Plan Enterprise ($149.99 USD ≈ $630,000 COP):**
- Mega-iglesias (1,000+ miembros).
- Todos los módulos + IA pastoral + soporte prioritario.
- $630,000/mes es insignificante para iglesias que manejan millones en diezmos.

### 5.3 Comparativa con Competencia

| Solución | Precio para 200 miembros | Idioma | Multi-tenant | Web incluida |
|---|---|---|---|---|
| **Poimano Esencial** | **$29.99 USD** | **Español** | **Sí** | **En plan Pro** |
| Planning Center | $49 USD | Inglés | No | No |
| Breeze ChMS | $72 USD | Inglés | No | No |
| ChurchTools | €50 | Multi (parcial) | No | No |
| Ovejas100 | $25 USD | Español | No | No |

**Poimano es 40-60% más barato que la competencia en inglés y ofrece más funcionalidades que la competencia en español.**

---

## 6. Costos Operativos

### 6.1 Costos Fijos Mensuales (Infraestructura)

| Concepto | Costo USD/mes | Costo COP/mes |
|---|---|---|
| VPS Hostinger KVM 1 (1CPU, 4GB, 50GB) | ~$10 | ~$42,000 |
| Dominio poimano.com (anual/12) | ~$1 | ~$4,200 |
| Cloudflare (free plan) | $0 | $0 |
| GitHub (free) | $0 | $0 |
| **Total infraestructura** | **~$11** | **~$46,200** |

### 6.2 Costos Variables (por Crecimiento)

| Escenario | Tenants | VPS Necesario | Costo USD/mes |
|---|---|---|---|
| Inicio (0-20 iglesias) | 1-20 | KVM 1 (actual: 1CPU, 4GB) | $10 |
| Crecimiento (20-100 iglesias) | 20-100 | KVM 2 (2CPU, 8GB) | $16 |
| Escalamiento (100-500 iglesias) | 100-500 | KVM 4 (4CPU, 16GB) | $26 |
| Alto volumen (500+) | 500+ | Cluster o VPS dedicado | $50-100 |

### 6.3 Costos de IA (cuando se implemente)

| Servicio | Costo | Uso estimado |
|---|---|---|
| Gemini 2.0 Flash (free tier) | $0 | Hasta 1,500 requests/día |
| Gemini 2.0 Flash (pago) | $0.10/1M tokens input | Si se excede free tier |
| pgvector (RAG) | $0 | Extensión gratuita de PostgreSQL |
| Embeddings (Gemini) | $0 | Incluido en free tier |

**Costo IA estimado primeros 100 tenants: $0 USD/mes** (free tier de Gemini es más que suficiente).

---

## 7. Proyección de Ventas — Primer Año

### 7.1 Supuestos

- Lanzamiento comercial: mes 1 (después de completar módulos Finance + Attendance)
- Estrategia inicial: iglesias evangélicas de Colombia
- Canal principal: recomendación pastoral (boca a boca) + redes sociales
- Conversión free → pago: 20% en 3 meses
- Churn mensual (cancelaciones): 5%

### 7.2 Proyección de Crecimiento de Clientes

| Mes | Nuevos Free | Nuevos Pago | Conversiones Free→Pago | Total Free | Total Pago | Total Clientes |
|---|---|---|---|---|---|---|
| 1 | 10 | 0 | 0 | 10 | 0 | 10 |
| 2 | 12 | 1 | 2 | 20 | 3 | 23 |
| 3 | 15 | 2 | 3 | 32 | 8 | 40 |
| 4 | 15 | 3 | 4 | 43 | 14 | 57 |
| 5 | 18 | 4 | 5 | 56 | 22 | 78 |
| 6 | 20 | 5 | 6 | 70 | 31 | 101 |
| 7 | 22 | 6 | 7 | 85 | 42 | 127 |
| 8 | 25 | 7 | 8 | 102 | 55 | 157 |
| 9 | 28 | 8 | 9 | 121 | 69 | 190 |
| 10 | 30 | 10 | 10 | 141 | 85 | 226 |
| 11 | 32 | 11 | 11 | 162 | 102 | 264 |
| 12 | 35 | 12 | 12 | 185 | 121 | 306 |

### 7.3 Distribución de Planes de Pago (estimada)

| Plan | % de clientes pago | Precio USD/mes |
|---|---|---|
| Esencial | 65% | $29.99 |
| Profesional | 25% | $59.99 |
| Enterprise | 10% | $149.99 |

**Precio promedio ponderado:** $29.99 × 0.65 + $59.99 × 0.25 + $149.99 × 0.10 = **$49.49 USD/mes**

### 7.4 Proyección de Ingresos Mensuales (USD)

| Mes | Clientes Pago | Ingreso USD/mes | Ingreso COP/mes |
|---|---|---|---|
| 1 | 0 | $0 | $0 |
| 2 | 3 | $148 | $623,700 |
| 3 | 8 | $396 | $1,663,200 |
| 4 | 14 | $693 | $2,910,600 |
| 5 | 22 | $1,089 | $4,573,800 |
| 6 | 31 | $1,534 | $6,442,800 |
| 7 | 42 | $2,079 | $8,731,800 |
| 8 | 55 | $2,722 | $11,432,400 |
| 9 | 69 | $3,415 | $14,343,000 |
| 10 | 85 | $4,207 | $17,669,400 |
| 11 | 102 | $5,048 | $21,201,600 |
| 12 | 121 | $5,989 | $25,153,800 |

### 7.5 Resumen Año 1

| Métrica | USD | COP |
|---|---|---|
| **Ingresos totales Año 1** | **$27,320** | **$114,744,000** |
| **Ingreso promedio mensual** | $2,277 | $9,563,400 |
| **Ingreso mes 12** | $5,989 | $25,153,800 |
| **MRR final (Monthly Recurring Revenue)** | $5,989 | $25,153,800 |
| **ARR proyectado (Annual Recurring Revenue)** | $71,868 | $301,845,600 |

---

## 8. Análisis de Rentabilidad

### 8.1 Punto de Equilibrio (Break-Even)

| Concepto | Valor |
|---|---|
| Costos fijos mensuales (infra) | ~$11 USD ($46,200 COP) |
| Precio promedio por cliente pago | $49.49 USD |
| **Break-even operativo** | **1 cliente pago** |
| Break-even considerando tiempo de desarrollo | Ver sección 8.2 |

**El break-even operativo es extremadamente bajo** — con solo 1 cliente de pago ya se cubren los costos de infraestructura. Esto es una ventaja enorme del modelo SaaS con costos mínimos de servidor.

### 8.2 Recuperación de Inversión en Desarrollo

| Escenario | Inversión a Recuperar | Meses para ROI |
|---|---|---|
| Solo costo directo ($52.3M COP) | $52,280,000 COP | Mes ~9 (acumulado ~$48M) a Mes 10 |
| Valor de mercado ($70M COP) | $70,000,000 COP | Mes ~11-12 |

**Con la proyección conservadora, la inversión se recupera entre el mes 9 y 12 del primer año.**

### 8.3 Márgenes

| Métrica | Mes 6 | Mes 12 |
|---|---|---|
| Ingresos | $1,534 USD | $5,989 USD |
| Costos infra | $11 USD | $16 USD (upgrade VPS) |
| **Margen bruto** | **99.3%** | **99.7%** |
| Margen operativo (sin contar desarrollo) | ~95% | ~97% |

**El SaaS tiene márgenes brutales del 99%+** porque el costo marginal de agregar un tenant más es prácticamente $0 (solo una base de datos PostgreSQL adicional de ~5-10 MB).

### 8.4 Métricas SaaS Clave (Proyectadas)

| Métrica | Valor Año 1 |
|---|---|
| **LTV (Lifetime Value)** | $49.49 × 20 meses = ~$990 USD por cliente |
| **CAC (Customer Acquisition Cost)** | ~$5-15 USD (orgánico vía pastores) |
| **LTV:CAC Ratio** | ~66:1 a 198:1 (excelente, >3:1 es sano) |
| **Churn mensual estimado** | 5% |
| **Net Revenue Retention** | ~105% (upgrades compensan churn) |

---

## 9. Capitalización y Valor del Activo

### 9.1 Valoración como Activo de Software

Un SaaS se valora típicamente como múltiplo de su ARR (Annual Recurring Revenue):

| Método | Fórmula | Valor al Final Año 1 |
|---|---|---|
| **Múltiplo ARR conservador (3x)** | ARR × 3 | $71,868 × 3 = **$215,604 USD** (~$905M COP) |
| **Múltiplo ARR promedio SaaS (5x)** | ARR × 5 | $71,868 × 5 = **$359,340 USD** (~$1,509M COP) |
| **Múltiplo ARR optimista (8x)** | ARR × 8 | $71,868 × 8 = **$574,944 USD** (~$2,415M COP) |

### 9.2 Valoración Actual (Pre-Revenue)

Para un SaaS pre-revenue con producto funcional en producción:

| Factor | Descripción | Valor Asignado |
|---|---|---|
| Código fuente + Arquitectura | 738h de desarrollo, multi-tenant, 5 módulos | $52.3M COP |
| Infraestructura en producción | VPS, dominio, SSL wildcard, deploy pipeline | $5M COP |
| Propiedad intelectual | Diseño único para nicho desatendido | $10M COP |
| Potencial de mercado | 15,000+ iglesias solo en Colombia | $15M COP |
| Marca y dominio | poimano.com + branding | $3M COP |
| **Valoración total pre-revenue** | | **$85M - $100M COP** |
| | | **~$20,000 - $24,000 USD** |

### 9.3 Tabla de Capitalización Proyectada

| Momento | Valoración Estimada (COP) | Valoración (USD) |
|---|---|---|
| **Hoy (pre-revenue, 45% completo)** | $85M - $100M | $20K - $24K |
| **Lanzamiento comercial (producto completo)** | $150M - $200M | $36K - $48K |
| **Mes 6 (31 clientes pago)** | $300M - $500M | $71K - $119K |
| **Mes 12 (121 clientes pago, ARR $72K)** | $900M - $1,500M | $215K - $360K |
| **Año 2 (500+ clientes, ARR $300K+)** | $3,000M - $5,000M | $714K - $1.2M |

---

## 10. Funcionalidades Pendientes con Impacto en Valor

### 10.1 Módulos que Incrementan Valor (por prioridad de ingreso)

| Módulo | Impacto en Ventas | Horas Estimadas | Inversión COP | Por Qué |
|---|---|---|---|---|
| **Finance** | ALTO — genera upgrade a Esencial | ~80 h | $5,600,000 | Los pastores NECESITAN control financiero. Es la razón #1 para pagar. |
| **Attendance** | ALTO — completa plan Gratuito | ~50 h | $3,500,000 | Sin asistencia, el plan gratuito queda incompleto. |
| **Communication** | MEDIO — diferenciador vs Excel | ~60 h | $4,200,000 | Enviar emails/notificaciones masivas es muy solicitado. |
| **Activities** | MEDIO — genera upgrade a Pro | ~60 h | $4,200,000 | Calendario de eventos es esperado en software de iglesias. |
| **Reports** | MEDIO — justifica plan Esencial | ~50 h | $3,500,000 | Reportes financieros + asistencia = valor tangible. |
| **Dashboard dinámico** | MEDIO — primera impresión | ~30 h | $2,100,000 | El dashboard actual es placeholder. KPIs reales impresionan. |
| **Projects** | BAJO — nice to have | ~50 h | $3,500,000 | Solo mega-iglesias organizadas lo usan. |
| **Billing real** | ALTO — para cobrar | ~40 h | $2,800,000 | Sin pasarela de pago, todo es manual. |
| **API REST** | BAJO — para app Flutter futura | ~60 h | $4,200,000 | Abre puerta a app móvil pero no urgente. |

### 10.2 Integración IA — Valor Futuro

La integración de IA (pendiente en documentación técnica) representa un **diferenciador masivo**:

| Funcionalidad IA | Impacto | Inversión Estimada |
|---|---|---|
| System Prompt personalizado | Asistente pastoral único | ~20 h ($1,400,000) |
| RAG con pgvector | Respuestas basadas en doctrina propia | ~40 h ($2,800,000) |
| Contexto automático del tenant | Respuestas personalizadas por iglesia | ~15 h ($1,050,000) |
| Historial de conversación | IA con memoria | ~15 h ($1,050,000) |
| **Total IA** | **Ningún competidor lo tiene** | **~90 h ($6,300,000)** |

**La IA puede justificar un incremento del 30-50% en el precio del plan Enterprise**, pasando de $149.99 a $199.99 USD/mes.

### 10.3 Inversión Restante para Producto Completo

| Concepto | Horas | COP |
|---|---|---|
| Módulos pendientes (6 + dashboard + billing) | ~420 h | $29,400,000 |
| Integración IA (4 componentes) | ~90 h | $6,300,000 |
| API REST (Flutter) | ~60 h | $4,200,000 |
| Testing (PHPUnit + Jest) | ~40 h | $2,800,000 |
| **Total para completar al 100%** | **~610 h** | **$42,700,000** |

**Inversión total proyecto completo: $52.3M (actual) + $42.7M (pendiente) = ~$95M COP**

---

## 11. Riesgos y Mitigación

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Adopción lenta (pastores no tech-savvy) | Media | Alto | Plan gratuito + onboarding personalizado + tutoriales en video |
| Competidor entra al mercado LATAM | Baja | Medio | Ventaja de first-mover + comunidad + IA como diferenciador |
| Churn alto (iglesias cancelan) | Media | Alto | Módulo Finance crea dependencia + datos atrapados + precio bajo |
| Costos de IA se incrementan | Baja | Bajo | Gemini free tier es generoso, arquitectura agnóstica permite cambiar proveedor |
| Crecimiento excede capacidad VPS | Baja | Medio | Upgrade progresivo del VPS ($10→$16→$26/mes) |
| Falta de tiempo para completar desarrollo | Media | Alto | Priorizar Finance + Attendance (desbloquean ingresos) |

---

## 12. Conclusiones

### 12.1 El Proyecto Hoy

- **738 horas invertidas** con un valor de desarrollo de **$52.3M COP**
- Producto **funcional en producción** con VPS, dominio, SSL, 5 módulos operativos
- Arquitectura **sólida y escalable** (multi-tenant real, DDD Lite, stack moderno)
- Mercado **desatendido** en Latinoamérica con ~15,000 iglesias potenciales solo en Colombia
- Valoración actual como activo: **$85M - $100M COP** (~$20K-$24K USD)

### 12.2 El Proyecto Completo (proyectado)

- Inversión adicional necesaria: **$42.7M COP** (~610 horas)
- Inversión total: **~$95M COP**
- Valoración al final del Año 1 (con 121 clientes pago): **$900M - $1,500M COP**
- **ROI proyectado Año 1:** 10x - 15x sobre la inversión

### 12.3 Por Qué Es Rentable

1. **Márgenes del 99%+** — costo marginal por cliente es ~$0
2. **Mercado sin líder** — el 90% de iglesias LATAM no tiene software
3. **Efecto de red pastoral** — un pastor satisfecho recomienda a 5 más
4. **Modelo recurrente** — ingresos mensuales predecibles
5. **Lock-in natural** — una vez que cargan datos, no migran fácilmente
6. **IA como futuro diferenciador** — ningún competidor lo tiene planeado

### 12.4 Valoración Recomendada para Negociación

| Contexto | Valor (COP) | Valor (USD) |
|---|---|---|
| Venta mínima (solo código + infra) | $52,000,000 | $12,400 |
| Venta con potencial de mercado | $85,000,000 | $20,200 |
| Inversión/sociedad (con proyección) | $150,000,000 | $35,700 |
| Licenciamiento a operador | $200,000,000+ | $47,600+ |

---

> **Documento generado el 31 de marzo de 2026**
> Proyecto: Poimano — SaaS Multi-Tenant para Gestión de Iglesias
> Repositorio: https://github.com/yohanrojas562-code/poimano
