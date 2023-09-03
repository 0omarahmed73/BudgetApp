import React from 'react'
import { MainLayout } from '../layout/MainLayout'
import { Hero } from '../components/budget/hero/Hero'
import Button from '../components/ui/button/Button'
import BudgetContent from '../components/budget/budgetcontent/BudgetContent'

export const BudgetPage = () => {
  return (
    <MainLayout>
      <Hero/>
      <BudgetContent />
    </MainLayout>
  )
}
