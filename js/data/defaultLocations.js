// Zizak Pro - Matriz de Puntos de Referencia del Norte Peninsular & Zonas Micológicas A-S

export const DEFAULT_LOCATIONS = [
  // ZONAS MICOLÓGICAS DE NAVARRA (A - S)
  { zoneCode: 'A', isOfficialZone: true, name: '[Zona A] Baztán / Bera (Navarra)', lat: 43.160, lon: -1.520, altitude: 580, habitat: 'robledal_atlantico', canopy: 'claro_trasmocho', ageClass: 'maduro', soilAcidity: 'acidofilo' },
  { zoneCode: 'B', isOfficialZone: true, name: '[Zona B] Señorío de Bértiz / Legate (Navarra)', lat: 43.140, lon: -1.610, altitude: 620, habitat: 'robledal_atlantico', canopy: 'claro_trasmocho', ageClass: 'maduro', soilAcidity: 'acidofilo' },
  { zoneCode: 'C', isOfficialZone: true, name: '[Zona C] Larraún / Lekunberri (Navarra)', lat: 43.000, lon: -1.820, altitude: 710, habitat: 'hayedo', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'acidofilo' },
  { zoneCode: 'D', isOfficialZone: true, name: '[Zona D] Parque Micológico Ultzama - Basaburúa (Navarra)', lat: 42.990, lon: -1.680, altitude: 620, habitat: 'hayedo', canopy: 'claro_trasmocho', ageClass: 'maduro', soilAcidity: 'acidofilo' },
  { zoneCode: 'E', isOfficialZone: true, name: '[Zona E] Quinto Real / Sorogain (Navarra)', lat: 43.020, lon: -1.420, altitude: 880, habitat: 'hayedo', canopy: 'claro_trasmocho', ageClass: 'maduro', soilAcidity: 'acidofilo' },
  { zoneCode: 'F', isOfficialZone: true, name: '[Zona F] Selva de Irati / Orreaga (Navarra)', lat: 42.983, lon: -1.217, altitude: 950, habitat: 'hayedo', canopy: 'claro_trasmocho', ageClass: 'maduro', soilAcidity: 'acidofilo' },
  { zoneCode: 'G', isOfficialZone: true, name: '[Zona G] Alto Belagua / Larra (Navarra)', lat: 42.910, lon: -0.840, altitude: 1450, habitat: 'pinar_silvestre', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'basofilo' },
  { zoneCode: 'H', isOfficialZone: true, name: '[Zona H] Sierra de Aralar (Navarra)', lat: 42.980, lon: -2.000, altitude: 1100, habitat: 'hayedo', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'basofilo' },
  { zoneCode: 'I', isOfficialZone: true, name: '[Zona I] Barranca / Sakana (Navarra)', lat: 42.890, lon: -2.080, altitude: 540, habitat: 'robledal_atlantico', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'acidofilo' },
  { zoneCode: 'J', isOfficialZone: true, name: '[Zona J] Sierras de Urbasa y Andía (Navarra)', lat: 42.825, lon: -2.150, altitude: 920, habitat: 'hayedo', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'basofilo' },
  { zoneCode: 'K', isOfficialZone: true, name: '[Zona K] Valles Prepirenaicos / Urraules (Navarra)', lat: 42.780, lon: -1.200, altitude: 680, habitat: 'pinar_silvestre', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'basofilo' },
  { zoneCode: 'L', isOfficialZone: true, name: '[Zona L] Valles Pirenaicos / Roncal y Salazar (Navarra)', lat: 42.866, lon: -0.916, altitude: 1050, habitat: 'pinar_silvestre', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'acidofilo' },
  { zoneCode: 'M', isOfficialZone: true, name: '[Zona M] Cuencas de Pamplona e Izaga (Navarra)', lat: 42.740, lon: -1.520, altitude: 510, habitat: 'mixto_caducifolio', canopy: 'normal', ageClass: 'medio', soilAcidity: 'basofilo' },
  { zoneCode: 'N', isOfficialZone: true, name: '[Zona N] Sierras de Illón y Leyre (Navarra)', lat: 42.640, lon: -1.120, altitude: 890, habitat: 'pinar_silvestre', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'basofilo' },
  { zoneCode: 'O', isOfficialZone: true, name: '[Zona O] Valle de Lana y Sur de Lóquiz (Navarra)', lat: 42.720, lon: -2.180, altitude: 640, habitat: 'carrascal', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'basofilo' },
  { zoneCode: 'P', isOfficialZone: true, name: '[Zona P] Codés / Sierra del Perdón (Navarra)', lat: 42.610, lon: -2.250, altitude: 720, habitat: 'carrascal', canopy: 'normal', ageClass: 'medio', soilAcidity: 'basofilo' },
  { zoneCode: 'Q', isOfficialZone: true, name: '[Zona Q] Valdorba / Ujué (Navarra)', lat: 42.580, lon: -1.560, altitude: 550, habitat: 'carrascal', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'basofilo' },
  { zoneCode: 'R', isOfficialZone: true, name: '[Zona R] Sierra de Izco y Alaiz (Navarra)', lat: 42.650, lon: -1.480, altitude: 820, habitat: 'pinar_silvestre', canopy: 'normal', ageClass: 'medio', soilAcidity: 'basofilo' },
  { zoneCode: 'S', isOfficialZone: true, name: '[Zona S] La Ribera / Bardenas Reales (Navarra)', lat: 42.190, lon: -1.460, altitude: 380, habitat: 'carrascal', canopy: 'normal', ageClass: 'medio', soilAcidity: 'basofilo' },

  // GIPUZKOA
  { isOfficialZone: true, name: 'Parque Natural Aiako Harria (Gipuzkoa)', lat: 43.280, lon: -1.820, altitude: 650, habitat: 'hayedo', canopy: 'claro_trasmocho', ageClass: 'maduro', soilAcidity: 'acidofilo' },
  { isOfficialZone: true, name: 'Monte Hernio (Gipuzkoa)', lat: 43.160, lon: -2.150, altitude: 820, habitat: 'hayedo', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'basofilo' },

  // BIZKAIA
  { isOfficialZone: true, name: 'Parque Natural de Gorbeia (Bizkaia)', lat: 43.033, lon: -2.800, altitude: 850, habitat: 'hayedo', canopy: 'claro_trasmocho', ageClass: 'maduro', soilAcidity: 'acidofilo' },
  { isOfficialZone: true, name: 'Parque Natural de Urkiola (Bizkaia)', lat: 43.100, lon: -2.640, altitude: 720, habitat: 'hayedo', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'basofilo' },

  // ARABA
  { isOfficialZone: true, name: 'Sierra de Entzia / Opakua (Araba)', lat: 42.810, lon: -2.310, altitude: 1000, habitat: 'hayedo', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'basofilo' },
  { isOfficialZone: true, name: 'Parque Natural de Izki (Araba)', lat: 42.680, lon: -2.480, altitude: 750, habitat: 'robledal_atlantico', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'acidofilo' },

  // HUESCA / PIRINEOS ARAGONESES
  { isOfficialZone: true, name: 'Valle de Hecho - Selva de Oza (Huesca)', lat: 42.833, lon: -0.733, altitude: 1150, habitat: 'pinar_silvestre', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'acidofilo' },
  { isOfficialZone: true, name: 'Valle de Ansó (Huesca)', lat: 42.750, lon: -0.820, altitude: 860, habitat: 'pinar_silvestre', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'acidofilo' },
  { isOfficialZone: true, name: 'Ordesa y Monte Perdido / Torla (Huesca)', lat: 42.620, lon: -0.110, altitude: 1300, habitat: 'pinar_silvestre', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'acidofilo' },
  { isOfficialZone: true, name: 'Valle de Benasque (Huesca)', lat: 42.600, lon: 0.520, altitude: 1140, habitat: 'pinar_silvestre', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'acidofilo' },

  // CANTABRIA
  { isOfficialZone: true, name: 'Parque Natural Saja-Besaya (Cantabria)', lat: 43.150, lon: -4.180, altitude: 780, habitat: 'hayedo', canopy: 'claro_trasmocho', ageClass: 'maduro', soilAcidity: 'acidofilo' },
  { isOfficialZone: true, name: 'Valle de Liébana / Potes (Cantabria)', lat: 43.150, lon: -4.620, altitude: 600, habitat: 'robledal_atlantico', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'acidofilo' },

  // LA RIOJA
  { isOfficialZone: true, name: 'Sierra de la Demanda / Ezcaray (La Rioja)', lat: 42.230, lon: -3.010, altitude: 1100, habitat: 'hayedo', canopy: 'normal', ageClass: 'maduro', soilAcidity: 'acidofilo' }
];
