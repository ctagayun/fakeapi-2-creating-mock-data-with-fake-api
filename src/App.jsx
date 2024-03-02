/* 
  I  n a previous tutorial, we implemented the fake API with 
  JavaScript's Promises for having it asynchronous and 
  JavaScript's setTimeout function for having an artificial 
  delay. Now we want to use this fake API with its mock data 
  as replacement for a backend in our React application

  */
import * as React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {getAsyncStories, getUsers, createUser, updateUser, deleteUser } from './api';
import './App.css'


 // Eliminate "return" statement and enclosing bracket if no business 
 //business logic. Otherwise retain the {} and put a "return" statement
 const App = () => { 

  const [stories, setStories] = React.useState([]);

  //useEffect is called:
  //  1. initially when the component renders the first time
  //  2. Leaving out the second argument (the dependency array) 
  //     would make the function for the side-effect (e.g getAsyncStories)
  //     run on every render (initial render and update renders) of 
  //     the component. 
  //  3. If the dependency array of React's useEffect is an empty 
  //     array, the function for the side-effect is only called 
  //     once when the component renders for the first time. 
  //     After all, the hook lets us opt into React's component 
  //     lifecycle when mounting, updating and unmounting the 
  //     component. It can be triggered when the component is first 
  //     mounted, but also if one of its values (state, props, derived 
  //     values from state/props) is updated.
    React.useEffect(() => {
     getAsyncStories().then(result => {
        setStories(result.data.stories);
      });
    }, []); 

   const [users, setUsers] = React.useState([]);
   React.useEffect(() => {
    const doGetUsers = async ()  => {
       const result = await getUsers();
       setUsers(result);
     };
     doGetUsers();
   }, []); 

  return (
     <div>
       <h1> My Fake API</h1>
       <hr />
       <UserList list={users}/>
       <hr />
       <List list={stories}/>
     </div>
   );
}

// List component
const List = (props) =>  (
  <ul>
     {props.list.map((item) => (
       <Item key={item.objectID} item={item} />
     ))}
  </ul>
 
);

//Item component
//Create another component that will display list of stories.
//This component called "Item" encapsulates the task of displaying 
//each stories' record
const Item = (props) => (
<li>
      <span>
        <a href={props.item.url}>{props.item.title}</a>
      </span>
      <span>{props.item.author}</span>
      <span>{props.item.num_comments}</span>
      <span>{props.item.points}</span>
    </li>

);     
 
//UserList component
const UserList = (props) =>  (
  <ul>
     {props.list.map((item) => (
       <User key={item.id} item={item} />
     ))}
  </ul>
 
);

const User = (props) => (
  <li>
      <span>{props.item.id}</span>
      <span>{props.item.firstName}</span>
      <span>{props.item.lastName}</span>
  </li>
  
  ); 
export default App
