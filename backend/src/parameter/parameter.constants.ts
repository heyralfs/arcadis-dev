export const parameterConstants = [
  {
    code: 'ALUMINIO_DISSOLVIDO',
    name: 'Alumínio dissolvido',
    unit: 'mg/l',
    limit: 0.1,
  },
  { code: 'ARSENIO_TOTAL', name: 'Arsênio total', unit: 'mg/l', limit: 0.01 },
  { code: 'CHUMBO_TOTAL', name: 'Chumbo total', unit: 'mg/l', limit: 0.01 },
  {
    code: 'COBRE_DISSOLVIDO',
    name: 'Cobre dissolvido',
    unit: 'mg/l',
    limit: 0.009,
  },
  {
    code: 'ESCHERICHIA_COLI',
    name: 'Escherichia coli',
    unit: 'NMP/100ml',
    limit: 1000,
  },
  { code: 'CROMO_TOTAL', name: 'Cromo total', unit: 'mg/l', limit: 0.05 },
  { code: 'CADMIO_TOTAL', name: 'Cádmio total', unit: 'mg/l', limit: 0.001 },
  { code: 'DBO', name: 'DBO', unit: 'mg O2/l', limit: 5 },
] as const;
