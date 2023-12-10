import React from 'react'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

function Spinner({loading}) {
  return (
    <div>
        <ClimbingBoxLoader
        color="#ff0000"
        loading={loading}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {/* <h1>TODO</h1> */}
    </div>
  )
}

export default Spinner