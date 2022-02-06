import React from 'react';
import classes from './App.module.scss';
import { Table } from '../Table';
import { BookEditor } from '../BookEditor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './resetStyles.scss';

export const App = () => {
  return (
    <div className={classes.wrapper}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="edit/" element={<BookEditor />}>
            <Route path=":id" element={<BookEditor />} />
          </Route>
          <Route path="/books/new" element={<BookEditor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

