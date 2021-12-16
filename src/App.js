import React, { useEffect, useState } from 'react'
import './App.css'
import Swal from 'sweetalert2'

const App = () => {

  const initialCircle = [
    { id: 0, value: 0 },
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 },
    { id: 5, value: 0 },
    { id: 6, value: 0 },
    { id: 7, value: 0 },
    { id: 8, value: 0 },
  ]

  const initialBedLeft = [
    { id: 0, value: "gray" },
    { id: 1, value: "gray" },
    { id: 2, value: "gray" },
    { id: 3, value: "gray" },
    { id: 4, value: "gray" },
    { id: 5, value: "gray" },
    { id: 6, value: "gray" },
    { id: 7, value: "gray" },
  ]
  
  const initialBedRight = [
    { id: 0, value: "gray" },
    { id: 1, value: "gray" },
    { id: 2, value: "gray" },
    { id: 3, value: "gray" },
    { id: 4, value: "gray" },
    { id: 5, value: "gray" },
    { id: 6, value: "gray" },
    { id: 7, value: "gray" },
  ]

  const [circlePos, setCirclePos] = useState(initialCircle)
  const [leftBed, setLeftBed] = useState(initialBedLeft)
  const [rightBed, setRightBed] = useState(initialBedRight)
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handleChange = async (idx) => {
    const { value: num } = await Swal.fire({
      title: 'Input new value',
      input: 'number',
      inputLabel: 'new value',
      inputPlaceholder: 'Enter number'
    })
    console.log(idx)
    
    if (num) {
      const ele = circlePos
      console.log("ele", ele)
      ele[idx].value = +num
      setCirclePos(
        ele,
      )
      console.log("gg", circlePos)
    }
    forceUpdate()
  }

  const handleChangeBed = async (idx, dir) => {
    const colorPalette = {
      Red: 'Red',
      Green: 'Green',
      Blue: 'Blue',
      gray: 'gray',
      yellow: 'yellow',
      orange: 'orange'
    }

    const { value: color } = await Swal.fire({
      title: 'Select color',
      input: 'radio',
      inputOptions: colorPalette,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to choose something!'
        }
      }
    })
    
    if (color) {
      if (dir === 'left') {
        const ele = leftBed
          ele[idx].value = color
          setLeftBed(
            ele,
        )
      } else {
        const ele = rightBed
          ele[idx].value = color
          setRightBed(
            ele,
        )
      }
    }
    forceUpdate()
  }

  const displayCircle = (ele) => {
    return (
      <div>
        {ele.map((val) => (
          <div 
          onClick={() => handleChange(val.id)}
          className='numberCircle' key={val.id}>{val.value}</div>
        ))}
      </div>
    )
  }

  const displayBedLeft = (ele) => {
    return (
      <div>
        {ele.map((val) => (
          <div 
          onClick={() => handleChangeBed(val.id, 'left')}
          key={val.id}>
            <i className={`${val.value} fas fa-bed iconsize`}></i>
          </div>
        ))}
      </div>
    )
  }
  
  const displayBedRight = (ele) => {
    return (
      <div>
        {ele.map((val) => (
          <div 
          onClick={() => handleChangeBed(val.id, 'right')}
          key={val.id}>
            <i className={`${val.value} fas fa-bed iconsize`}></i>
          </div>
        ))}
      </div>
    )
  }

  // const getInitialState = () => {
  //   var selectedOption = localStorage.getItem( 'SelectedOption' ) || 1;

  //   return {
  //       selectedOption: selectedOption
  //   };
  // },

  // const setSelectedOption = (option) => {
  //   localStorage.setItem( 'SelectedOption', option );
  // }
  
  return (
    <div className='App'>
      {console.log("gg", circlePos)}
      {console.log("l", leftBed)}
      {console.log("r", rightBed)}
      <div className='space'>
        {displayBedLeft(leftBed)}
      </div>
      <div className='space'>
        {displayCircle(circlePos)}
      </div>
      <div className='space'>
        {displayBedRight(rightBed)}
      </div>
    </div>
  )
}

export default App
