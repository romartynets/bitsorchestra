import { TableItem } from './TableItem';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Table.module.scss';

export const Table = () => {
  const [data, setData] = useState([]);
  const getData = () => {
    fetch('http://localhost:3004/books')
      .then(response => response.json())
      .then(response => setData(response));
  };
  const handleDelete = (id) => {
    fetch(`http://localhost:3004/books/${id}`, {
      method: 'DELETE', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(function () {
        alert('The book was successfully deleted.');
        getData();
      })
  }

  useEffect(() => {
    getData();
  }, []);



  return (
    <>
    <div className={classes.wrapper}>
      <table className={classes.table}>
        <thead className={classes.table__head}>
          <tr>
            <th>Book title</th>
            <th>Author name</th>
            <th>Category</th>
            <th>ISBN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={classes.table__body}>
          {data.map((el, index) => (
            <TableItem className={classes.table__item} title={el.title} author={el.author} category={el.category} isbn={el.isbn} id={el.id} handleDelete={handleDelete} key={index} />
          ))}
        </tbody>
      </table>
    </div>
    <NavLink className={classes.btn_add} to={'/books/new'}>Add a book</NavLink>
    </>
  );
}
