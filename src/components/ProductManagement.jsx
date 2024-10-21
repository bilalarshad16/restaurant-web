import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { getData } from '../services/NetworkService'
import axios from 'axios'

function ProductManagement() {
  return (
    <div>
      Welcone to Product Management..!
    </div>
  )
}

export default ProductManagement
