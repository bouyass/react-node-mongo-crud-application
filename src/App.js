import './App.css';
import { BrowserRouter as Router , Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import AddEmployee from './components/AddEmployee'
import UpdateEmployee from './components/UpdateEmployee'

function App() {
  return (
    
    <div className="App">
      <Router>
      <Switch>
        <Route path="/add" component={AddEmployee}/>
        <Route path="/update" component={UpdateEmployee}/>
        <Route path="/" component={Home}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
