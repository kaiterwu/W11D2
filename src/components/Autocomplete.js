import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useEffect,useState,useRef } from 'react';

const Autocomplete = (props) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     inputVal: '',
  //     showList: false
  //   };
  //   this.inputRef = React.createRef();
  // }
// const [currentState,setCurrentState] = useState({inputVal: '',showList:false})
const [inputVal,setinputVal] = useState("")
const [showList,setShowList] = useState(false)
const inputRef = useRef();
  // componentDidUpdate() {
  //   if (this.state.showList) {
  //     document.addEventListener('click', this.handleOutsideClick);
  //   } else {
  //     console.log("Removing Autocomplete listener on update!");
  //     document.removeEventListener('click', this.handleOutsideClick);
  //   }
  // }

  

  // componentWillUnmount () {
  //   console.log("Cleaning up event listener from Autocomplete!");
  //   document.removeEventListener('click',handleOutsideClick);
  // }
  useEffect (()=> {
    if (showList)
      document.addEventListener('click', handleOutsideClick);
    else {
      console.log("Removing Autocomplete listener on update!");
      document.removeEventListener('click', handleOutsideClick);
    }
      
    return (() => {
      console.log("Cleaning up event listener from Autocomplete!");
      document.removeEventListener('click', handleOutsideClick)
    });
  }, [showList]);
  
  useEffect(()=>{
    console.log("Cleaning up event listener from Autocomplete!");
    document.removeEventListener('click',handleOutsideClick);
  },[])

  const handleInput = (e) => {
    setinputVal(e.target.value );
  }

  const selectName = e => {
    e.stopPropagation();
    // setCurrentState({ inputVal: e.target.innerHTML, showList: false });
    setinputVal(e.target.innerHTML)
    setShowList(false)
  }

  const handleOutsideClick = () => {
    // Leave dropdown visible as long as input is focused
    if (document.activeElement ===inputRef.current) return;
    else setShowList(false)
  }

  const matches = () => {
    // const inputVal  = currentState.inputVal;
    const names  = props.names;
    // debugger
    const inputLength = inputVal.length;
    const matches = [];

    if (inputLength === 0) return names;

    names.forEach(name => {
      const nameSegment = name.slice(0, inputLength);
      if (nameSegment.toLowerCase() ===inputVal.toLowerCase()) {
        matches.push(name);
      }
    });

    if (matches.length === 0) matches.push('No matches');

    return matches;
  }

  // render() {
    const results = matches().map((result) => {
      const nodeRef = React.createRef();
      return (
        <CSSTransition
          nodeRef={nodeRef}
          key={result}
          classNames="result"
          timeout={{ enter: 500, exit: 300 }}
        >
          <li ref={nodeRef} className="nameLi" onClick={selectName}>
            {result}
          </li>
        </CSSTransition>
      )
    });

    return (
      <section className="autocomplete-section">
        <h1>Autocomplete</h1>
        <div className="auto">
          <input
            placeholder="Search..."
            ref={inputRef}
            onChange={handleInput}
            value={inputVal}
            onFocus={() => setShowList({ showList: true })}
          />
          {showList && (
            <ul className="auto-dropdown">
              <TransitionGroup>
                {results}
              </TransitionGroup>
            </ul>
          )}
        </div>
      </section>
    );
  }
// }

export default Autocomplete;