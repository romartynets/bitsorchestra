import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classes from './BookEditor.module.scss';
import { NavLink } from 'react-router-dom';

export const BookEditor = (props) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState({});
	const properties = ['title', 'author', 'category', 'isbn'];
	useEffect(() => {
		id && fetch(`http://localhost:3004/books/${id}`)
			.then(response => response.json())
			.then(response => setData(response));
	}, []);
	const isEdit = !!id;

	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.target);
		const body = properties.reduce((acc, prop) => {
			return { ...acc, [prop]: data.get(prop) }
		}, {});
		fetch('http://localhost:3004/books', {
			method: 'POST', headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}, body: JSON.stringify(body)
		})
			.then(function () {
				alert('The book was successfully added.');
				navigate('/');
			})
	}

	const handleEdit = (event) => {
		event.preventDefault();
		const data = new FormData(event.target);
		const body = properties.reduce((acc, prop) => {
			return { ...acc, [prop]: data.get(prop) }
		}, {});
		fetch(`http://localhost:3004/books/${id}`, {
			method: 'PATCH', headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}, body: JSON.stringify(body)
		})
			.then(function () {
				alert('The book was successfully edited.');
				navigate('/');
			})
	}

	return (
		<div className="BookEditor">
			<form className={classes.form} onSubmit={isEdit ? handleEdit : handleSubmit}>
				<label>
					Book title:
    			<input required type="text" name="title" defaultValue={data.title} />
				</label>
				<label>
					Author name:
    			<input required type="text" name="author" defaultValue={data.author} />
				</label>
				<label>
					Category:
					<select required defaultValue={data.category} name="category">
						<option>Action and Adventure</option>
						<option>Classics</option>
						<option>Comic Book or Graphic Novel</option>
						<option>Fantasy</option>
						<option>Historical Fiction</option>
						<option>Horror</option>
						<option>Romance</option>
						<option>Science Fiction (Sci-Fi)</option>
						<option>Suspense and Thrillers</option>
						<option>Women's Fiction</option>
						<option>Biographies and Autobiographies</option>
						<option>Short Stories</option>
					</select>
				</label>
				<label>
					ISBN:
    			<input required type="number" name="isbn" defaultValue={data.isbn} />
				</label>
				<div className={classes.btn} >
					<NavLink to={`/`}>
						<div className={classes.btn__cancel}>Cancel</div>
					</NavLink>
					<input className={classes.btn__submit} type="submit" value={`${isEdit ? 'Edit' : 'Add'} a Book`} />
				</div>
			</form>
		</div>
	);
}



