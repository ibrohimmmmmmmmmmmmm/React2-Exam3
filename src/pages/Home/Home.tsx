import React, { memo } from 'react'
import Section1 from './Section1/Section1'
import Section2 from './Section2/Section2'
import BrowseByCategory from './Browsebycategory/Browsebycategory '
import Section4 from './Section4/Section4'
import MusicBanner from './Musicbanner'
import NewArrival from './Newarrival'

export default memo(function Home() {
  return (
    <>
      <Section1 />
      <Section2 />
      <BrowseByCategory />
      <Section4 />
      <MusicBanner />
      <Section4 />
      <NewArrival />
    </>
  )
})
