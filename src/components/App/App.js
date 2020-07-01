import React from 'react';
import './App.css';
import {PlayList} from '../PlayList/PlayList';
import {SearchResults} from '../SearchResults/SearchResults';
import {SearchBar} from '../SearchBar/SearchBar';
import Spotify from '../../util/Spotify';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      SearchResults:[{name:'Aakriti',artist:'papop',album:'tutukhamen',id:1},
      {name:'Aak',artist:'papop',album:'tutakhamen',id:2},
      {name:'Aakr',artist:'paop',album:'tutikhamen',id:3}],
      playlistName:"fav",
      playlistTracks:[{name:'Aakriti',artist:'papop',album:'tutukhamen',id:1}]
    }
    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
  }

  addTrack(track){
    let tracks=this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    else{
     tracks.push(track);
     this.setState({
        playlistTracks:tracks
      });
    }
  }

  removeTrack(track){
    let playlist=this.state.playlistTracks;
    var index=playlist.indexOf(track);
    playlist.splice(index,1);

    //or use the below given filter method 
    // playlist=playlist.filter((item)=>{
    //   return (track.id!==item.id);
    // });
  
    this.setState({
        playlistTracks:playlist
    })
  }

  savePlaylist(){
      const trackUris=this.state.playlistTracks.map(track=>{
        return track.uri;
      });
  }

  search(term){
      Spotify.search(term).then(searchResults=>{
        this.setState({
          searchResults:searchResults
        });
      });
  }


  updatePlaylistName(name){
      this.setState({
        playlistName:name
      });
  }

  render(){
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.SearchResults} onAdd={this.addTrack} />
          <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
        </div>
      </div>
    </div>
    );
  }
  
}

export default App;
