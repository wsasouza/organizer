import { useEffect } from 'react'
import { useContextSelector } from 'use-context-selector'
import * as Dialog from '@radix-ui/react-dialog'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ArrowCircleDown, ArrowCircleUp, PlusCircle, X } from 'phosphor-react'

import { TransactionsContext } from '../../../../contexts/TransactionsContexts'
import { normalizeValueCurrency, unMaskValue } from '../../../../utils/masks'
import { moneyCategories } from '../../../../utils/categories'

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
  Title,
  SelectCategory,
} from './styles'

const newTransactionFormSchema = z.object({
  description: z.string(),
  category: z.string().min(3),
  value: z.string(),
  type: z.enum(['income', 'outcome']),
})

interface NewTransactionModalProps {
  setOpen: (state: boolean) => void
}

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal({ setOpen }: NewTransactionModalProps) {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  )

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  const value = watch('value')

  useEffect(() => {
    setValue('value', normalizeValueCurrency(value))
  }, [setValue, value])

  function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, category, type } = data
    const value = unMaskValue(data.value)

    createTransaction({
      description,
      category,
      type,
      value,
    })

    reset()
    setOpen(false)
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Title>
          <PlusCircle size={24} /> Nova transação
        </Title>
        <CloseButton asChild onClick={() => reset()}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            {...register('description')}
            required
          />

          <input
            type="text"
            placeholder="Valor"
            required
            {...register('value')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <SelectCategory {...register('category')}>
            <option value="no" hidden>
              Selecione a categoria
            </option>
            {moneyCategories.map((category) => {
              return (
                <option key={category.key} value={category.key}>
                  {category.name}
                </option>
              )
            })}
          </SelectCategory>

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
