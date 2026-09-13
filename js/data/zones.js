// Zizak Pro - Zonas Bioclimáticas del Norte Peninsular (Navarra A-S, Euskadi, Pirineos, Huesca, Cantabria)

export const NAVARRA_ZONES = {
  A: { code: 'A', nameES: 'Zona A: Baztán, Vera, Norte', nameEU: 'A Eremua: Baztan, Bera, Iparraldea', vegES: 'Caducifolios, alerces, coníferas de repoblación, pastizales. Clima atlántico muy húmedo.', vegEU: 'Hostoerorkorrak, larkiarratza, berrogeitzeko koniferak, larreak. Klima atlantiko oso hezea.', defaultHabitat: 'hayedo', defaultSoil: 'acidofilo', favSpecies: ['boletus_edulis', 'cantharellus', 'boletus_aereus', 'clitocybe_nebularis'] },
  B: { code: 'B', nameES: 'Zona B: Bértiz, Legate, Otxondo', nameEU: 'B Eremua: Bertiz, Legate, Otxondo', vegES: 'Hayedos atlánticos, robledales autóctonos y roble americano. Alta humedad marina.', vegEU: 'Atlantikoetako pago-basoak, bertako hariztiak eta roble amerikarra.', defaultHabitat: 'robledal_atlantico', defaultSoil: 'acidofilo', favSpecies: ['boletus_edulis', 'boletus_aereus', 'cantharellus', 'amanita_caesarea'] },
  C: { code: 'C', nameES: 'Zona C: Larraún', nameEU: 'C Eremua: Larraun', vegES: 'Hayedos húmedos, robledales y pastizales de vertiente atlántica.', vegEU: 'Pago-baso hezeak, hariztiak eta larre atlantikoak.', defaultHabitat: 'hayedo', defaultSoil: 'acidofilo', favSpecies: ['boletus_edulis', 'hygrophorus_marzuolus', 'cortinarius_caperatus'] },
  D: { code: 'D', nameES: 'Zona D: Basaburúa, Ultzama, Atez', nameEU: 'D Eremua: Basaburua, Ultzama, Atetz', vegES: 'Hayedos acidófilos con brezo/arándano y robledales pedunculados. Máxima producción micológica (Parque Micológico).', vegEU: 'Pago-baso azidozaleak txilar eta mirtiloekin. Ekoizpen mikologiko handiena (Parke Mikologikoa).', defaultHabitat: 'hayedo', defaultSoil: 'acidofilo', favSpecies: ['boletus_edulis', 'boletus_aereus', 'cantharellus', 'hygrophorus_marzuolus', 'tricholoma_columbetta'] },
  E: { code: 'E', nameES: 'Zona E: Quinto Real, Sorogain', nameEU: 'E Eremua: Kintoa, Sorogain', vegES: 'Hayedos pirenaicos de alta humedad, alerces y prados de montaña.', vegEU: 'Pirinioetako pago-basoak hezetasun handiarekin, larkiarratzak eta mendiko larreak.', defaultHabitat: 'hayedo', defaultSoil: 'acidofilo', favSpecies: ['boletus_edulis', 'boletus_pinophilus', 'hygrophorus_marzuolus', 'hydnum_repandum'] },
  F: { code: 'F', nameES: 'Zona F: Burguete, Roncesvalles, Irati, Remendía', nameEU: 'F Eremua: Auritz, Orreaga, Irati, Remendia', vegES: 'Grandes masas de hayedo pirenaico, pino abeto y prados de altitud. Clima frío-húmedo.', vegEU: 'Mendiko pago-baso zabalak, abetuak eta goi-mendiko larreak. Klima hotz-hezea.', defaultHabitat: 'hayedo', defaultSoil: 'acidofilo', favSpecies: ['boletus_edulis', 'boletus_pinophilus', 'hygrophorus_marzuolus', 'cortinarius_caperatus', 'cantharellus'] },
  G: { code: 'G', nameES: 'Zona G: Alto Belagua, Larra', nameEU: 'G Eremua: Belagua Gaina, Larra', vegES: 'Pinares de pino negro (Pinus uncinata), pino albar y pastos subalpinos sobre lapiaz.', vegEU: 'Pinu beltzaren pinudiak (Pinus uncinata), pinu gorriak eta goi-mendiko larreak.', defaultHabitat: 'pinar_silvestre', defaultSoil: 'basofilo', favSpecies: ['boletus_pinophilus', 'lactarius', 'hygrophorus_marzuolus'] },
  H: { code: 'H', nameES: 'Zona H: Sierra de Aralar', nameEU: 'H Eremua: Aralar Mendilerroa', vegES: 'Hayedos húmedos sobre calizas, rasos y pastizales de alta montaña.', vegEU: 'Pago-baso hezeak kareharri gainean eta mendiko zelaiak.', defaultHabitat: 'hayedo', defaultSoil: 'basofilo', favSpecies: ['boletus_edulis', 'calocybe_gambosa', 'hygrophorus_marzuolus', 'clitocybe_nebularis'] },
  I: { code: 'I', nameES: 'Zona I: Barranca - Burunda (Sakana)', nameEU: 'I Eremua: Sakana / Burunda', vegES: 'Hayedos de ladera y robledales atlánticos de fondo de valle.', vegEU: 'Mendiko pago-basoak eta ibarraldeko harizti atlantikoak.', defaultHabitat: 'robledal_atlantico', defaultSoil: 'acidofilo', favSpecies: ['boletus_edulis', 'boletus_aereus', 'cantharellus', 'neoboletus_erythropus'] },
  J: { code: 'J', nameES: 'Zona J: Sierras de Urbasa, Andía y Lóquiz', nameEU: 'J Eremua: Urbasa, Andia eta Lokiz Mendilerroak', vegES: 'Mesetas de hayedo calcícola, rasos ganaderos y bosquetes de quejigo.', vegEU: 'Kare-pagoen goi-lautadak, abeltzaintzako zelaiak eta erkametzak.', defaultHabitat: 'hayedo', defaultSoil: 'basofilo', favSpecies: ['boletus_edulis', 'calocybe_gambosa', 'lepista_nuda', 'clitocybe_nebularis'] },
  K: { code: 'K', nameES: 'Zona K: Valles Prepirenaicos (Urraules, Romanzado)', nameEU: 'K Eremua: Pirinioaurreko Ibarrak', vegES: 'Pinares de pino silvestre (Pinus sylvestris), quejigales y matorral submediterráneo.', vegEU: 'Pinu gorrien pinudiak, erkametzak eta azpimediterraneoko sastrakadiak.', defaultHabitat: 'pinar_silvestre', defaultSoil: 'basofilo', favSpecies: ['lactarius', 'craterellus_lutescens', 'tricholoma_portentosum', 'hydnum_repandum'] },
  L: { code: 'L', nameES: 'Zona L: Valles Pirenaicos (Roncal y Salazar)', nameEU: 'L Eremua: Erronkari eta Zaraitzu Ibarrak', vegES: 'Extensos pinares de pino silvestre, hayedos pirenaicos y abetales.', vegEU: 'Pinu gorrien pinudi zabalak, Pirinioetako pago-basoak eta abetadiak.', defaultHabitat: 'pinar_silvestre', defaultSoil: 'acidofilo', favSpecies: ['lactarius', 'boletus_edulis', 'craterellus_lutescens', 'tricholoma_portentosum', 'hygrophorus_marzuolus'] },
  M: { code: 'M', nameES: 'Zona M: Cuencas de Pamplona, Lumbier e Izaga', nameEU: 'M Eremua: Iruñerria, Irunberri eta Izaga', vegES: 'Quejigales, pinares de repoblación, hayedos secos y vegetación de ribera.', vegEU: 'Erkametzak, berrogeitzeko pinudiak, pago-baso lehorrak eta ibai-landaredia.', defaultHabitat: 'mixto_caducifolio', defaultSoil: 'basofilo', favSpecies: ['lactarius', 'tricholoma_terreum', 'calocybe_gambosa', 'marasmius_oreades'] },
  N: { code: 'N', nameES: 'Zona N: Sierras de Illón y Leyre', nameEU: 'N Eremua: Illon eta Leire Mendilerroak', vegES: 'Pinares de pino silvestre, hayedos calcícolas y carrascales de montaña.', vegEU: 'Pinu gorrien pinudiak, kare-pagoak eta mendiko arte-sasiak.', defaultHabitat: 'pinar_silvestre', defaultSoil: 'basofilo', favSpecies: ['lactarius', 'craterellus_lutescens', 'lactarius_sanguifluus', 'tricholoma_terreum'] },
  O: { code: 'O', nameES: 'Zona O: Valle de Lana y Sur de Lóquiz', nameEU: 'O Eremua: Lanako Harana eta Lokiz Hegoaldea', vegES: 'Carrascales mediterráneos (Quercus ilex), quejigales y matorral aromático.', vegEU: 'Mediterraneoko arte-sasiak (Quercus ilex), erkametzak eta sastrakadi usaintsuak.', defaultHabitat: 'carrascal', defaultSoil: 'basofilo', favSpecies: ['amanita_caesarea', 'boletus_aereus', 'pleurotus_eryngii', 'lactarius_sanguifluus'] },
  P: { code: 'P', nameES: 'Zona P: Zona Media Occidental (Codés, Sierra del Perdón)', nameEU: 'P Eremua: Mendebaldeko Erdialdea (Kodes, Erreniega)', vegES: 'Carrascales, quejigales, matorrales y pinares repoblados.', vegEU: 'Arte-sasiak, erkametzak, sastrakadiak eta pinudiak.', defaultHabitat: 'carrascal', defaultSoil: 'basofilo', favSpecies: ['lactarius', 'pleurotus_eryngii', 'tricholoma_terreum', 'amanita_caesarea'] },
  Q: { code: 'Q', nameES: 'Zona Q: Zona Media Oriental (Valdorba, Ujué)', nameEU: 'Q Eremua: Ekialdeko Erdialdea (Orbaibar, Uxue)', vegES: 'Carrascales mediterráneos, coscojares, pino carrasco y cultivos micológicos.', vegEU: 'Arte-sasi mediterraneoak, karraskilak, halepo pinua eta uzta-lurrak.', defaultHabitat: 'carrascal', defaultSoil: 'basofilo', favSpecies: ['lactarius_sanguifluus', 'pleurotus_eryngii', 'tricholoma_terreum', 'amanita_caesarea'] },
  R: { code: 'R', nameES: 'Zona R: Sierra de Izco y Alaiz', nameEU: 'R Eremua: Izko eta Alaiz Mendilerroak', vegES: 'Pinares repoblados, hayedos de solana secos, quejigales y matorral.', vegEU: 'Berrogeitzeko pinudiak, egutera lehorreko pago-basoak eta erkametzak.', defaultHabitat: 'pinar_silvestre', defaultSoil: 'basofilo', favSpecies: ['lactarius', 'tricholoma_terreum', 'clitocybe_nebularis'] },
  S: { code: 'S', nameES: 'Zona S: La Ribera (Bardenas, Carcastillo, Lerín)', nameEU: 'S Eremua: Erribera (Bardenak, Karkastulu, Lerin)', vegES: 'Pinares mediterráneos de pino carrasco (Pinus halepensis), coscojares, estepas y sotos de ribera.', vegEU: 'Halepo pinuaren pinudi mediterraneoak, karraskilak, estepak eta ibai-ertzeak.', defaultHabitat: 'carrascal', defaultSoil: 'basofilo', favSpecies: ['pleurotus_eryngii', 'lactarius_sanguifluus', 'tricholoma_terreum', 'morchella_conica'] }
};

export function getRegionalZoneInfo(lat, lon) {
  // Detector regional ampliado para el Norte Peninsular
  if (lat >= 43.10 && lon <= -1.45) { return lon < -1.60 ? NAVARRA_ZONES.A : NAVARRA_ZONES.B; }
  if (lat >= 42.92 && lat < 43.12 && lon <= -1.35) {
    if (lon < -1.85) return NAVARRA_ZONES.H;
    if (lon < -1.70) return NAVARRA_ZONES.C;
    if (lon < -1.50) return NAVARRA_ZONES.D;
    return NAVARRA_ZONES.E;
  }
  if (lat >= 42.85 && lon > -1.35) {
    if (lon > -0.95) return NAVARRA_ZONES.G;
    if (lon > -1.15) return NAVARRA_ZONES.F;
    return NAVARRA_ZONES.L;
  }
  if (lat >= 42.75 && lat < 42.95 && lon <= -1.80) { return lon < -2.00 ? NAVARRA_ZONES.I : NAVARRA_ZONES.J; }
  if (lat >= 42.65 && lat < 42.88 && lon > -1.80 && lon <= -1.35) { return NAVARRA_ZONES.M; }
  if (lat >= 42.65 && lat < 42.90 && lon > -1.35 && lon <= -0.90) { return lat > 42.75 ? NAVARRA_ZONES.K : NAVARRA_ZONES.N; }
  if (lat >= 42.50 && lat < 42.75) {
    if (lon < -2.00) return NAVARRA_ZONES.O;
    if (lon < -1.65) return NAVARRA_ZONES.P;
    if (lon < -1.40) return NAVARRA_ZONES.R;
    return NAVARRA_ZONES.Q;
  }
  if (lat < 42.50) { return NAVARRA_ZONES.S; }
  return NAVARRA_ZONES.D;
}
