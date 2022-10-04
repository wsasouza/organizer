export const normalizeValueCurrency = (value: string | undefined) => {
  if (!value) return ''

  return (Number(value.replace(/\D/g, '')) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export const unMaskValue = (value: string) => {
  return typeof value === 'number'
    ? value
    : Number(value.replace(/\D/g, '')) / 100
}
