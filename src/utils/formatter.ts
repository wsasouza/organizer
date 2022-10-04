export const dateFormatter = new Intl.DateTimeFormat('pt-BR')

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const quantityItemsDisplay = (quantityItems: number) => {
  if (quantityItems === 0) return 'Nenhum item'
  else if (quantityItems === 1) {
    return `${`${quantityItems}`.padStart(2, '0')} item`
  } else return `${`${quantityItems}`.padStart(2, '0')} itens`
}
