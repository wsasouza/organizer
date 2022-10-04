import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import * as Dialog from '@radix-ui/react-dialog'
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyCircleDollar,
  PlusCircle,
} from 'phosphor-react'

import { NewTransactionModal } from './NewTransactionModal'
import { SearchForm } from './SearchForm'
import { SummaryCard } from '../../components/SummaryCard'
import { useMoneySummary } from '../../hooks/useMoneySummary'
import { priceFormatter } from '../../utils/formatter'
import { TransactionsContext } from '../../contexts/TransactionsContexts'
import { ItemCard } from './ItemCard'

import {
  AddButtonContainer,
  AddNewTransactionButton,
  ItemCardContainer,
  MoneyContainer,
  MoneyHeader,
  SummaryCardContainer,
} from './styles'

export function Money() {
  const [open, setOpen] = useState(false)

  const itemsCard = useContextSelector(TransactionsContext, (context) => {
    return context.transactionsFiltered
  })

  const deleteCard = useContextSelector(TransactionsContext, (context) => {
    return context.deleteTransaction
  })

  const {
    lastDateEntries,
    lastDateExpenses,
    summary,
    transactionsInterval,
    variant,
  } = useMoneySummary()

  return (
    <MoneyContainer>
      <MoneyHeader>
        <AddButtonContainer>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <AddNewTransactionButton>
                <PlusCircle size={16} color="#070500" weight="duotone" />
                Nova Transação
              </AddNewTransactionButton>
            </Dialog.Trigger>
            <NewTransactionModal setOpen={setOpen} />
          </Dialog.Root>
        </AddButtonContainer>
        <SummaryCardContainer>
          <SummaryCard
            title="Entradas"
            icon={<ArrowCircleUp size={32} color="#06400e" weight="duotone" />}
            content={priceFormatter.format(summary.income)}
            detail={lastDateEntries}
          />
          <SummaryCard
            title="Saídas"
            icon={
              <ArrowCircleDown size={32} color="#AB222E" weight="duotone" />
            }
            content={priceFormatter.format(summary.outcome)}
            detail={lastDateExpenses}
          />
          <SummaryCard
            title="Total"
            icon={
              <CurrencyCircleDollar
                size={32}
                color="#070500"
                weight="duotone"
              />
            }
            content={priceFormatter.format(summary.total)}
            detail={transactionsInterval}
            variant={variant}
          />
        </SummaryCardContainer>
      </MoneyHeader>
      <SearchForm />
      <ItemCardContainer>
        {itemsCard.map((item) => {
          return (
            <ItemCard
              key={item.id}
              description={item.description}
              value={item.value}
              category={item.category}
              type={item.type}
              createdAt={item.createdAt}
              id={item.id}
              onDeleteCard={deleteCard}
            />
          )
        })}
      </ItemCardContainer>
    </MoneyContainer>
  )
}
