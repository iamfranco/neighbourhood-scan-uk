export interface NomisGeographyResponseItem {
  value: number,
  label: string,
  gss: string
}

export const makeRandomNomisGeographyResponseItem = (): NomisGeographyResponseItem => ({
  value: Math.random(),
  label: Math.random().toString(),
  gss: Math.random().toString()
})