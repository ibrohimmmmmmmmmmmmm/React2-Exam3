import React, { memo } from 'react'
import Section1 from './Section1/Section1'
import Section2 from './Section2/Section2'

export default memo(function Home() {
  return (
    <>
      <Section1 />
      <Section2 />
    </>
  )
})
