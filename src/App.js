import { Button, Col, Input, Row, Spin } from 'antd';
import { createContext, useContext, useReducer } from 'react'
import './App.css';
import 'antd/dist/antd.css'

const LoginTypes = {
  SET_USER: "SET_USER",
  SET_PASS: "SET_PASS",
  SUCCESS: "SUCCESS",
  LOGIN: "LOGIN",
  FAIL: "FAIL",
  Error: "Error"
}

const initState = {
  username: '',
  password: '',
  loading: false,
  errMsg: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case LoginTypes.SET_USER:
      return {
        ...state,
        username: action.payload
      }
    case LoginTypes.SET_PASS:
      return {
        ...state,
        password: action.payload
      }
    case LoginTypes.LOGIN:
      return {
        ...state,
        loading: true
      }
    case LoginTypes.SUCCESS:
      return {
        ...state,
        loading: false
      }
    case LoginTypes.FAIL:
      return {
        ...state,
        loading: false
      }
    case LoginTypes.Error:
      return {
        ...state,
        errMsg: 'some error find'
      }
    default:
      throw new Error();
  }
}

const LoginContext = createContext(null)

function App() {
  const [state, dispatch] = useReducer(reducer, initState)
  
  const usernameHander = e => {
    dispatch({
      type: LoginTypes.SET_USER,
      payload: e.target.value
    })
  }
  const passportHander = e => {
    dispatch({
      type: LoginTypes.SET_PASS,
      payload: e.target.value
    })
  }
  console.log('state', state);
  return (
    <div className="App">
      <Spin spinning={state.loading}>
        <Row>
          <Col span={12} offset={6}>
            <LoginContext.Provider value={dispatch}>
              <Input value={state.username} onChange={usernameHander} />
              <Input value={state.password} onChange={passportHander} />
              <div>
                <Child></Child>
              </div>
              <div>{state.errMsg}</div>
            </LoginContext.Provider>
          </Col>
        </Row>
      </Spin>
    </div>
  );
}

function Child() {
  const dispatch = useContext(LoginContext)
  const login = () => {
    dispatch({ type: LoginTypes.LOGIN })
    setTimeout(() => {
      const type = Math.random() > 0.5 ? LoginTypes.SUCCESS : LoginTypes.FAIL
      console.log('type: ', type);
      dispatch({ type })
    }, 1000)
  }
  return (
    <Button type="primary" onClick={login}>Login</Button>
  )
}

export default App;
