import React from 'react';
import './User.css';
import { Link } from 'react-router-dom';

const User = ({ _id, name, genre, age, removeUser }) => {

  return(
    <tr>
      <td>{ name }</td>
      <td>{ genre }</td>
      <td>{ age }</td>
      <td>
        <button onClick={ () => removeUser(_id) } className="Action-Button fa fa-trash"></button>
        <Link to={{ pathname: '/edit', search: _id }}>
         <button className="Action-Button fa fa-pencil"></button>
        </Link>
      </td>
    </tr>
  );
};

export default User;