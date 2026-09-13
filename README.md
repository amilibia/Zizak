# 🍄 Zizak Pro - Sistema Inteligente de Predicción Micológica

> **Predicción bioclimática y visor territorial micológico para el Norte Peninsular (Navarra, País Vasco, Pirineos, Cantabria y La Rioja).**

[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-emerald.svg)](https://amilibia.github.io/Zizak/)
[![Licencia](https://img.shields.io/badge/License-MIT-blue.svg)](#)
[![Estado](https://img.shields.io/badge/Estado-Activo%20%2F%20v8.0-success.svg)](#)

🌐 **Acceso Web Online**: [https://amilibia.github.io/Zizak/](https://amilibia.github.io/Zizak/)  
📦 **Versión Standalone (Archivo Único)**: [https://amilibia.github.io/Zizak/Zizak_Pro.html](https://amilibia.github.io/Zizak/Zizak_Pro.html)

---

## 📌 ¿Qué es Zizak Pro?

**Zizak Pro** es una aplicación web interactiva diseñada para recolectores, micólogos y aficionados que desean predecir con precisión la probabilidad de fructificación de setas y hongos comestibles (*Boletus edulis*, *Lactarius deliciosus*, *Cantharellus cibarius*, *Amanita caesarea*, *Calocybe gambosa*, etc.) en la franja Norte Peninsular.

A diferencia de los pronósticos convencionales, Zizak Pro implementa un **motor ecológico de simulación bioclimática** (basado en la metodología *MYCOSILVA*) que no solo evalúa el tiempo del día actual, sino la **historia meteorológica de las últimas 2 semanas** y la predicción a 7 días.

---

## ✨ Características Principales

### ☔ 1. Capa de Predicción de Lluvia Estilo Telediario (TV)
* Visualización en tiempo real del frente de lluvias para **Hoy, Mañana y Pasado**.
* Capas meteorológicas sobre el mapa con etiquetas de precipitación exacta (`🌧️ +12.4mm`) y gradiente de color por acumulado ($1\text{-}5\text{mm}$, $5\text{-}15\text{mm}$, $15\text{-}25\text{mm}$, $>25\text{mm}$).

### 🟢 2. Píldoras Semáforo con Porcentajes Directos en el Mapa
* Los marcadores del mapa muestran directamente el porcentaje de probabilidad numérico (`🟢 84%`, `🟡 52%`, `🔴 18%`).
* Indicadores visuales de tendencia (`📈 ¡Brote a la vista!`) cuando se prevé una mejoría por choque térmico o lluvias recientes.

### 🧠 3. Motor de Predicción Bioclimática Avanzado
* **Ventanas de Incubación (Lag)**: Simula los ritmos de desarrollo del micelio subterráneo ($7\text{ a }21\text{ días}$ tras frentes de agua copiosos).
* **Filtro Anti-Evaporación**: Lluvias chiri-miri ($<5\text{mm}$) en días de calor ($>22^\circ\text{C}$) o aire seco se descuentan al 100% por no humedecer el micelio.
* **Penalización por Aborto por Ola de Calor**: Detecta rachas calurosas ($>26^\circ\text{C}$) durante el periodo de incubación que deshidratan los primordios.
* **Balance Hídrico del Suelo (SMI / $ET_0$)**: Cálculo según el tipo de suelo (acidófilo o basófilo) y la evapotranspiración real.

### 🍄 4. Guía Ilustrada de Especies y Recetario Gastronómico
* Fichas completas de **24 especies emblemáticas** con fotografías en HD.
* Calendario de fructificación mes a mes, hábitat preferente, confusiones peligrosas y consejos de cocina.

### 📸 5. Cuaderno de Campo Micológico (Privado & Offline)
* Registro personal de salidas al monte con almacenamiento en la base de datos del navegador (**IndexedDB**).
* Guarda coordenadas GPS, fecha, especie principal, peso recolectado y fotos de la cesta.

### ⚙️ 6. Calibración y Guía Explicativa
* Panel de calibración personalizable con guía desplegable integrada para ajustar la capacidad hídrica del suelo ($S_{max}$), rangos óptimos de temperatura y castigos por calor.

---

## 🛠️ Tecnología Utilizada

* **Frontend**: HTML5, Tailwind CSS, JavaScript ES Modules.
* **Visor Territorial**: Leaflet.js con capas Satelital (ESRI), Topográfica y Zonas Micológicas (A - S).
* **Gráficos**: Chart.js para evolutivos térmicos y de precipitación acumulada.
* **API Meteorológica**: Datos en tiempo real e históricos de [Open-Meteo API](https://open-meteo.com/).
* **Almacenamiento Local**: IndexedDB y LocalStorage (máxima privacidad, 100% en el dispositivo del usuario).

---

## 📂 Estructura del Repositorio

```text
├── index.html                 # Punto de entrada principal (web modular)
├── Zizak_Pro.html             # Versión empaquetada 100% en archivo único (standalone)
├── js/
│   ├── app.js                 # Inicialización y controlador principal
│   ├── data/                  # Ubiaciones por defecto, especies, recetas y zonas A-S
│   ├── i18n/                  # Diccionarios bilingües (Castellano / Euskara)
│   ├── models/                # Motor bioclimático, API meteo y base de datos IndexedDB
│   └── ui/                    # Controladores del mapa, tarjetas, guía y cuaderno
├── assets/
│   ├── css/                   # Estilos personalizados
│   └── img/species/           # Fotografías de las 24 especies de setas
└── README.md                  # Documentación del proyecto
```

---

## 📜 Licencia y Créditos

Desarrollado para el seguimiento micológico del Norte Peninsular. Integrado con los principios de conservación micoselvícola del proyecto **MYCOSILVA**.

Distribución bajo licencia **MIT**. ¡Buena recolección en el monte! 🍄🌲
