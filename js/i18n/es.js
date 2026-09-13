// Zizak Pro - Diccionario Español (ES)

export const es = {
  appName: "Zizak Pro",
  appTagline: "Sistema Inteligente de Predicción Micológica - Norte Peninsular",
  nav: {
    forecast: "Predicción & Lugares",
    map: "Visor Territorial",
    guide: "Guía de Especies",
    journal: "Cuaderno de Campo",
    settings: "Calibración"
  },
  add: {
    title: "Añadir Nueva Ubicación Micológica",
    placeholder: "Ej. Selva de Irati, Aralar, Gorbeia, Ultzama, Ordesa...",
    search: "Buscar Lugar",
    habitatSummary: "Hábitat y Parámetros Micoselvícolas",
    habitatType: "Tipo de Hábitat Forestal",
    canopy: "Luminosidad / Estructura del Bosque",
    age: "Edad de la Masa Forestal",
    soil: "Tipo de Suelo (pH / Acidez)",
    addBtn: "➕ Añadir a Mis Lugares"
  },
  moon: {
    title: "Fase Lunar Actual",
    next: "Próxima Luna Llena: "
  },
  parks: {
    title: "Parques Micológicos Oficiales",
    desc: "Información de permisos, cotos y regulaciones:"
  },
  controls: {
    filterBy: "Filtrar por probabilidad:",
    all: "Todas las probabilidades",
    high: "🟢 Alta",
    mid: "🟡 Media",
    low: "🔴 Baja",
    sortBy: "Ordenar por:",
    name: "Nombre del paraje",
    chance: "Probabilidad máxima"
  },
  loading: "Cargando datos meteorológicos y calculando modelo bioclimático...",
  welcome: {
    title: "¡Bienvenido a Zizak Pro!",
    text: "Selecciona o busca tu zona de recolección en Navarra, País Vasco, Costa Cantábrica o Pirineos para obtener pronósticos micológicos precisos basados en el modelo ecológico MYCOSILVA."
  },
  forecast7: "Pronóstico Micológico a 7 Días:",
  speciesTitle: "Especies Preferentes y Probabilidad",
  score: "Puntuación de Fructificación",
  whyBtn: "❓ ¿Por qué esta probabilidad?",
  chanceMap: {
    Alta: "Alta Fructificación",
    Media: "Fructificación Media",
    Baja: "Fructificación Baja"
  },
  map: {
    title: "Visor Territorial del Norte Peninsular",
    subtitle: "Navega con mapa Satelital, Topográfico o mapa Zonal A-S (Navarra, Euskadi, Pirineos).",
    opacityTitle: "🗺️ Capa Zonas Navarra (A-S)",
    opacityDesc: "Capa micoselvícola MYCOSILVA",
    layers: {
      osm: "🗺️ Mapa Político",
      satellite: "🛰️ Satélite ESRI",
      topo: "⛰️ Topográfico"
    }
  },
  guide: {
    title: "Guía Ilustrada de Setas Comestibles",
    subtitle: "Catálogo completo con fenología mes a mes, hábitat, confusiones y recetas.",
    subtabGuide: "Fichas de Especies",
    subtabRecipes: "Recetario Gastronómico",
    searchPh: "Buscar por nombre común, científico, euskera o hábitat...",
    traits: "Rasgos Clave de Identificación",
    habitat: "Hábitat y Tipo de Bosque",
    confusions: "⚠️ Confusiones Peligrosas",
    edibility: "Valor Culinario",
    fruitingSeason: "Calendario de Fructificación (Ene - Dic)",
    filterEdible: "Todas las comestibilidades",
    filterSeason: "Todas las estaciones",
    filterZone: "Todas las zonas",
    navarraOnly: "📌 Más frecuentes en Navarra (Ultzama)",
    generalGuide: "🍄 Guía General Norte Peninsular"
  },
  recipes: {
    intro: "🍳 Recomendación de cocina: Limpiar en seco con cepillo o trapo húmedo. Preservar el aroma y la textura sin lavar bajo chorro de agua directo.",
    prep: "Preparación Recomendada",
    preservation: "Conservación"
  },
  journal: {
    title: "Cuaderno de Campo Micológico",
    desc: "Guarda tus capturas con coordenadas GPS exactas, peso, especie y fotografía.",
    newBtn: "📸 Nueva Captura",
    formTitle: "Registrar Nueva Captura en el Monte",
    date: "Fecha de la Salida",
    location: "Nombre del Paraje / Coordenadas",
    species: "Especie Principal Capturada",
    quantity: "Cantidad / Peso Estimado (kg)",
    photo: "Fotografía de la Cesta (opcional)",
    notes: "Observaciones / Comentarios",
    save: "💾 Guardar Captura",
    cancel: "Cancelar",
    empty: "Aún no has registrado capturas en tu cuaderno. ¡Añade tu primera salida!"
  },
  settings: {
    title: "Calibración del Modelo Bioclimático",
    tabs: {
      general: "Parámetros de Clima",
      triggers: "Disparadores de Lluvia",
      species: "Ajuste de Especies"
    },
    reset: "Restaurar Estandar",
    general: {
      smiTitle: "Capacidad de Retención de Agua (SMI Smax)",
      smaxAcid: "Sueloc Ácido (Smax)",
      smaxBasic: "Suelo Basófilo (Smax)",
      smaxDefault: "Suelo Medio (Smax)",
      tempTitle: "Temperatura Base y Óptimos (°C)",
      tOpt: "Rango Óptimo (°C)",
      tHeatTh: "Castigo por Calor Excesivo (°C)"
    }
  },
  sync: {
    btn: "Sync / Copia JSON",
    title: "Copia de Seguridad e Importación",
    desc: "Exporta tus lugares y capturas a un archivo JSON o importa datos para actualizar el cuaderno.",
    exportTitle: "Exportar Copia de Seguridad",
    exportBtn: "⬇️ Descargar Backup JSON",
    importTitle: "Importar Backup",
    importBtn: "⬆️ Restaurar desde JSON"
  },
  breakdown: {
    lackingTitle: "❌ ¿Qué falta para mayor fructificación?",
    optimalTitle: "✅ Condiciones óptimas presentes:",
    soil_wet: "💧 Suelo óptimamente húmedo (SMI ≥ 0.7)",
    soil_mid: "💧 Suelo con humedad moderada (SMI ≥ 0.5)",
    soil_dry: "Suelo seco: Falta acumulación de precipitación (SMI < 0.5)",
    soil_dry_severe: "Suelo extremadamente seco: Urge lluvia copiosa para reactivar el micelio",
    pulse_rain: "🌧️ Impulso activo por lluvia reciente desencadenante (hace 7-21 días)",
    no_rain_pulse: "Falta un frente de lluvia copioso reciente (hace 7-21 días) que reactive la eclosión",
    temp_opt: "🌡️ Temperatura media en el rango biológico ideal",
    temp_cold: "Falta temperatura: Frío excesivo frena el desarrollo de brotes",
    heat_penalty: "Sobra calor: Temperaturas sofocantes (>26°C) desecan los sombreros",
    heat_interruption: "⚠️ Ola de calor o viento seco interrumpió la incubación del micelio tras las lluvias pasadas",
    rain_evaporated: "⚠️ Lluvia insignificante (<5mm) evaporada por calor sin penetrar la hojarasca ni llegar al micelio",
    vpd_low: "🌬️ Aire húmedo protegido (VPD bajo, ideal para hongos)",
    vpd_high: "Sobra viento/aire seco: Ambiente desecante frena la formación de primaveras",
    frost: "Heladas nocturnas recientes perjudican los cuerpos fructíferos",
    habitat_mult: "🌲 Hábitat boscoso óptimo y sustrato favorable",
    zone_bonus: "🗺️ Alta afinidad bioclimática con la masa forestal de la zona (+35%)"
  },
  rain: {
    title: "☔ Lluvia (TV):",
    off: "Off",
    today: "🌧️ Hoy",
    tomorrow: "🌧️ Mañana",
    afterTomorrow: "🌧️ Pasado",
    legendTitle: "🌧️ Predicción de Precipitación Acumulada",
    legend15: "💧 1-5 mm (Débil)",
    legend515: "🌧️ 5-15 mm (Moderada)",
    legend1525: "🟩 15-25 mm (Copiosa)",
    legend25: "🟪 >25 mm (Abundante)"
  },
  calibrationGuide: {
    title: "¿Cómo se calcula la probabilidad y cómo afecta la calibración?",
    button: "Explicación del Modelo",
    intro: "El motor bioclimático de Zizak Pro simula la respuesta fisiológica del micelio subterráneo combinando la meteorología observada de las últimas 2 semanas con la predicción a 7 días.",
    card1Title: "⏳ 1. Ventanas de Incubación (Lag)",
    card1Desc: "Las setas no salen el día de la lluvia. El micelio necesita de 7 a 21 días de incubación tras un frente copioso (>15-25 mm). El pico de fructificación se alcanza entre el día 10 y 16 post-lluvia.",
    card2Title: "☀️ 2. Filtro Anti-Evaporación (< 5mm)",
    card2Desc: "Con temperaturas altas (>22°C) o aire seco, lluvias chiri-miri (<5 mm) se evaporan al 100% en la hojarasca sin humedecer el micelio subterráneo, evitando falsos picos de probabilidad.",
    card3Title: "🔥 3. Aborto por Ola de Calor Continuado",
    card3Desc: "Si durante el periodo de incubación surgen 3+ días seguidos de calor sofocante (>26°C) o viento seco, la fructificación iniciada se deshidrata y el motor penaliza la probabilidad.",
    card4Title: "⚙️ 4. Impacto de Modificar la Calibración",
    card4Desc: "• Smax Suelo (mm): Aumentarlo exige precipitaciones mayores para saturar el terreno.<br/>• Temperatura Óptima: Ajusta el rango térmico ideal para las especies de la zona.<br/>• Castigo por Calor: Umbral donde el calor seco empieza a restar probabilidad."
  },
  sections: {
    userSaved: "Mis Lugares Guardados",
    userSavedEmptyTitle: "No tienes parajes personalizados guardados aún.",
    userSavedEmptyDesc: "Haz clic sobre cualquier punto en el Visor Territorial para guardar tu zona de setas.",
    officialZones: "Zonas Micológicas y Parques de Referencia",
    showOfficial: "👁️ Mostrar Zonas de Referencia",
    hideOfficial: "👁️ Ocultar Zonas de Referencia",
    parajes: "parajes",
    zonas: "zonas",
    goToDetail: "🚀 Ir a detalle",
    todayChance: "Probabilidad Hoy:",
    broteIn: "📈 ¡Brote previsto en",
    broteInDays: "días!",
    broteHalo: "📈 ¡Brote a la vista!",
    altitude: "altitud",
    delete: "🗑️ Eliminar"
  }
};
