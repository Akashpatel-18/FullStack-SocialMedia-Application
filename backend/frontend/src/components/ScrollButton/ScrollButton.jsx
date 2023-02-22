import React from 'react'
import { useState } from 'react'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import './ScrollButton.css'

const ScrollButton = () => {

const [visible, setVisible] = useState(false)

const toggleVisible = () => {
    const height = document.documentElement.scrollTop
    if(height > 800){
        setVisible(true)
    }
    else if(height <= 800){
        setVisible(false)
    }
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

window.addEventListener('scroll', toggleVisible)

  return (
    <>
    <div className="upBox">
    <KeyboardArrowUpOutlinedIcon className='up' onClick={scrollToTop} style={{display: visible? "inline" : "none"}} />
    </div>
    </>
  )
}

export default ScrollButton