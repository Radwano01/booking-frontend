import React, { useState } from 'react'
import "./header.css"
import {FaBed, FaPlaneDeparture, FaTaxi,FaRegCalendarAlt} from "react-icons/fa"
import {BsFillCarFrontFill,BsFillPersonFill} from "react-icons/bs"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns"
import { useNavigate } from 'react-router-dom';

const Header = ({type}) => {

    const [destiantion, setDestiantion] = useState("")
    const [openDate , setOpenDate] = useState(false)

    const navigate = useNavigate()
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
    ]);

    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adult:1,
        children:0,
        room:1
    })

    const handleOption = (name, operation)=>{
        setOptions(prev=> {return{
            ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1
        }})
    }

    const handleSearch = ()=>{
        navigate("/hotels", {state: {destiantion, date, options}})
    }
  return (
    <div className='header'>
        <div className={`${type === "list" ? "headerContainer listMode" : "headerContainer"}`}>
            <div className="headerList">
                <div className="headerListItem active">
                    <FaBed/>
                    <span>Stays</span>
                </div>
                <div className="headerListItem">
                    <FaPlaneDeparture/>
                    <span>Flights</span>
                </div>
                <div className="headerListItem">
                    <BsFillCarFrontFill/>
                    <span>Car rentals</span>
                </div>
                <div className="headerListItem">
                    <FaBed/>
                    <span>Attractions</span>
                </div>
                <div className="headerListItem">
                    <FaTaxi/>
                    <span>Airport taxis</span>
                </div>
            </div>
            {type !== "list" &&
                <>  <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
                    <p className="headerDesc">
                        Get rewarded for your travels – unlock instant savings of 10% or
                        more with a free Lamabooking account
                    </p>
                    <button className="headerBtn">Sign in / Regsiter</button>
                    <div className="headerSearch">
                        <div className="headerSearchItem">
                            <FaBed className='headerIcon'/>
                            <input type="text" 
                                placeholder='Where are you going?'
                                className='headerSearchInput'
                                onChange={(e)=> setDestiantion(e.target.value)} 
                            />
                        </div>
                        <div className="headerSearchItem">
                            <FaRegCalendarAlt className='headerIcon'/>
                            <span onClick={()=> setOpenDate(!openDate)} className='headerSearchText'>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                            {openDate && 
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDate([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={date}
                                    minDate={new Date()}
                                    className='date'
                                />
                            }
                        </div>
                        <div className="headerSearchItem">
                            <BsFillPersonFill className='headerIcon'/>
                            <span onClick={()=> setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adult ${options.children} children ${options.room} room`}</span>
                            {openOptions &&
                                <div className="options">
                                    <div className="optionItem">
                                        <span className="optionText">Adult</span>
                                        <button className='optionCounter'>
                                            <button className="optionCounterButton" onClick={()=> handleOption("adult", "d")} disabled={options.adult <= 0}>-</button>
                                            <div className="optionCounterNumber">{options.adult}</div>
                                            <button className="optionCounterButton" onClick={()=> handleOption("adult", "i")}>+</button>
                                        </button>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Children</span>
                                        <button className='optionCounter'>
                                            <button className="optionCounterButton" onClick={()=> handleOption("children", "d")} disabled={options.adult <= 0}>-</button>
                                            <div className="optionCounterNumber">{options.children}</div>
                                            <button className="optionCounterButton" onClick={()=> handleOption("children", "i")}>+</button>
                                        </button>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Room</span>
                                        <button className='optionCounter'>
                                            <button className="optionCounterButton" onClick={()=> handleOption("room", "d")} disabled={options.adult <= 1}>-</button>
                                            <div className="optionCounterNumber">{options.room}</div>
                                            <button className="optionCounterButton" onClick={()=> handleOption("room", "i")}>+</button>
                                        </button>
                                    </div>
                                </div>
                            }
                            <div className="headerSearchItem">
                                <button className="headerBtn" onClick={handleSearch}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
        
    </div>
  )
}

export default Header