import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <><footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top" style={{backgroundColor: "green"}}>
    <div className="col-md-4 d-flex align-items-center">
      <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
        {/* <svg className="bi" width="30" height="24"><use xlink:href="#bootstrap"></use></svg> */}
      </Link>
      <span className="mb-3 mb-md-0 text-white">© 2023 DelciousFood, Inc</span>
    </div>

    
  </footer></>
  )
}
