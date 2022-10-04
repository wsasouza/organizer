import { ReactNode, useCallback, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { createContext } from 'use-context-selector'
import { DropResult } from 'react-beautiful-dnd'

import { initialValueMoney } from '../utils/initialValue'

export interface Transaction {
  id: string
  description: string
  type: 'income' | 'outcome'
  category: string
  value: number
  createdAt: Date
}

interface CreateTransactionInput {
  description: string
  type: 'income' | 'outcome'
  category: string
  value: number
}

interface TransactionContextType {
  quantityTransactions: number
  transactions: Transaction[]
  transactionsFiltered: Transaction[]
  fetchTransactionsFiltered: (query?: string) => void
  createTransaction: (data: CreateTransactionInput) => void
  deleteTransaction: (id: string) => void
  onDragEnd: (result: DropResult) => void
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

const MONEY_TRANSACTIONS = '@Organizer:money'

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(
    initialValueMoney(MONEY_TRANSACTIONS),
  )

  const [transactionsFiltered, setTransactionsFiltered] = useState<
    Transaction[]
  >([])

  const [quantityTransactions, setQuantityTransactions] = useState(0)

  const fetchTransactionsFiltered = useCallback(
    (query?: string) => {
      if (query) {
        const queryFormatted = query.toLowerCase()

        const result = transactions.filter(function (transaction) {
          if (
            transaction.description.toLowerCase().includes(queryFormatted) ||
            transaction.category.toLowerCase().includes(queryFormatted) ||
            transaction.type.toLowerCase().includes(queryFormatted)
          ) {
            return transaction
          } else return ''
        })

        setTransactionsFiltered(result)
        setQuantityTransactions(result.length)
      } else {
        setTransactionsFiltered(transactions)
        setQuantityTransactions(transactions.length)
      }
    },
    [transactions],
  )

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) {
      return
    }

    const transactions = Array.from(transactionsFiltered)
    const [newOrder] = transactions.splice(source.index, 1)
    transactions.splice(destination.index, 0, newOrder)

    setTransactionsFiltered(transactions)
  }

  function createTransaction(data: CreateTransactionInput) {
    const { description, category, type, value } = data

    const newTransaction = {
      id: uuidv4(),
      description,
      category,
      type,
      value,
      createdAt: new Date(),
    }

    setTransactions((oldState) => [...oldState, newTransaction])
    toast.success('Nova transação criada.')
  }

  function deleteTransaction(id: string) {
    setTransactions((oldState) =>
      oldState.filter((transaction) => transaction.id !== id),
    )
    toast.info('Transação foi removida com sucesso.')
  }

  useEffect(() => {
    localStorage.setItem(MONEY_TRANSACTIONS, JSON.stringify(transactions))
    fetchTransactionsFiltered()
  }, [fetchTransactionsFiltered, transactions])

  return (
    <TransactionsContext.Provider
      value={{
        quantityTransactions,
        transactions,
        transactionsFiltered,
        fetchTransactionsFiltered,
        createTransaction,
        deleteTransaction,
        onDragEnd,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
