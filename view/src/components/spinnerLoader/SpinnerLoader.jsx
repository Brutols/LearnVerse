import { CircularProgress } from '@mui/material'
import React from 'react'
import './spinnerLoader.scss'

const SpinnerLoader = () => {
  return (
    <div className='progressContainer'>
        <CircularProgress size={100} />
    </div>
  )
}

export default SpinnerLoader