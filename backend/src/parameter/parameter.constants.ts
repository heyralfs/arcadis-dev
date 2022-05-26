export const parameterConstants = [
  {
    code: 'ALUMINIO_DISSOLVIDO',
    name: 'Alumínio dissolvido',
    unity: 'mg/l',
    limit: 0.1,
  },
  { code: 'ARSENIO_TOTAL', name: 'Arsênio total', unity: 'mg/l', limit: 0.01 },
  { code: 'CHUMBO_TOTAL', name: 'Chumbo total', unity: 'mg/l', limit: 0.01 },
  {
    code: 'COBRE_DISSOLVIDO',
    name: 'Cobre dissolvido',
    unity: 'mg/l',
    limit: 0.009,
  },
  {
    code: 'ESCHERICHIA_COLI',
    name: 'Escherichia coli',
    unity: 'NMP/100ml',
    limit: 1000,
  },
  { code: 'CROMO_TOTAL', name: 'Cromo total', unity: 'mg/l', limit: 0.05 },
  { code: 'CADMIO_TOTAL', name: 'Cádmio total', unity: 'mg/l', limit: 0.001 },
  { code: 'DBO', name: 'DBO', unity: 'mg O2/l', limit: 5 },
] as const;
