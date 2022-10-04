import { useState } from 'react'
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

import {
  AddButtonContainer,
  AddNewTransactionButton,
  ItemCardContainer,
  MoneyContainer,
  MoneyHeader,
  SummaryCardContainer,
} from './styles'
import { priceFormatter } from '../../utils/formatter'

export function Money() {
  const [open, setOpen] = useState(false)

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
        {/* <ItemCard
              // key={item.id}
              description="Salário"
              category="carro"
              type="outcome"
              value={450}
              createdAt="2022-10-03T16:48:34.983Z"
              // id={item.id}
              // onDeleteCard={deleteCard}
            /> */}
      </ItemCardContainer>
    </MoneyContainer>
  )
}
