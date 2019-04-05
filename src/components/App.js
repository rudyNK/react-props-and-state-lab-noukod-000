import React from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
  changeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    });
  }
  fetchPets = () => {
    let url = '/api/pets';
    if (this.state.filters.type !== 'all')
    {
      url = '/api/pets?type=' + this.state.filters.type;
    }

    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      this.setState({
        pets: data
      })
    });
  }
  adoptPet = (petID) => {
    const pets = this.state.pets.map(pet => {
      return pet.id === petID ? { ...pet, isAdopted: true } : pet;
    });
    this.setState({ pets });
  }

  render() {
    return (
<div className="ui container">
  <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
  </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App