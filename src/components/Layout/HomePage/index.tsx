import Footer from '@/components/Layout/footer'
import Navbar from '@/components/Fragment/navbar'
import React from 'react'

const LayoutHomePage = ({children}:any) => {
  return (
    <div>
        <Navbar />
        {children}
        <Footer />
    </div>
  )
}

export default LayoutHomePage