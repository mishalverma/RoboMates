import React, {Component} from 'react';
import SearchBox from './SearchBox'
import CardList from './CardList'
import Scroll from './Scroll'
import ErrorBoundary from './ErrorBoundary'
//import { robots } from './robots'
// import { render } from '@testing-library/react';
import './App.css'

class App extends Component{
    constructor(){
        super()
        this.state ={
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users').then(response=>{
           return response.json();
        }).then(users=>{
           this.setState({robots:users})
        })
    }

    onSearchChange = (event)=>{
        this.setState({ searchfield: event.target.value})
        
        //console.log(filteredRobots);
    }
    render(){
        const filteredRobots = this.state.robots.filter(robot =>{
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if(!this.state.robots.length){
            return(<h1 className='f1'>Loading...</h1>);
            
        }else{
        return (
        <div className='tc'>
            <h1 className='f1'>RoboMates</h1>
            <SearchBox searchChange={this.onSearchChange} />
            <Scroll>
                <ErrorBoundary>
                    <CardList robots={filteredRobots} /> 
                </ErrorBoundary>
                
            </Scroll>
           

        </div>
        
        );
    }
    }
    
}

export default App