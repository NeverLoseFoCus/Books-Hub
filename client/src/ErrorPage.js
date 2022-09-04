import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import "./styles/ErrorPage.css"

export default function ErrorPage() {
  const [error, setError] = useState("something went wrong")
  const query = new URLSearchParams(useLocation().search);
    useEffect(() => {
        const errorContent = query.get("errorContent")
        setError(errorContent)
    })
  return (
    <div className="ErrorPage"><div className='ErrorPage-container'><p className="ErrorPage-content">{error}</p></div></div>
  )
}
