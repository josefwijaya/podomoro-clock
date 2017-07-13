const defaultState = {
  sessionLength: 1, // minutes
  breakLength: 1, // minutes
  longBreakLength: 10, // minutes
  minutes: 0, // minutes
  seconds: 0, // seconds
  period: ''
};

export default function reducer (state = defaultState, action) {
  switch (action.type) {
    // case 'SET_TIMER_LENGTH': () => {
    //   console.log('reducer set length');
    //   const newState = {
    //     sessionLength: action.payload.value
    //   }
    //   return { ...state, newState }
    // }
    case 'SET_TIMER_LENGTH': {
      const newState = {
        sessionLength: action.payload.value
      }
      return {
        ...state,
        [action.payload.key]: action.payload.value
      }
    }
  }
  return state;
}