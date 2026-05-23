import React, { memo } from 'react'
import FlashSalesHeader from './FlashSalesHeader'
import ProductsCatalog from '../../ProductsCatalog/ProductsCatalog'
export default memo(function Section2() {
  return (
    <>
      <FlashSalesHeader />
      <ProductsCatalog />
    </>
  )
})