import { ReactNode } from 'react'
import { SummaryCardContainer } from './styles'

interface SummaryCardProps {
  title: string
  icon: ReactNode
  content: string
  detail: string
  variant?: 'green' | 'red'
}

export function SummaryCard(data: SummaryCardProps) {
  const { content, detail, icon, title, variant } = data
  return (
    <SummaryCardContainer variant={variant}>
      <header>
        <strong>{title}</strong>
        {icon}
      </header>
      <strong>{content}</strong>
      <span>{detail}</span>
    </SummaryCardContainer>
  )
}
