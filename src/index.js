import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NewComment from './App';
import * as serviceWorker from './serviceWorker';

//создаем функцию получения текущей даты
function formatDate(date) {
	return date.toLocaleDateString() + ' || ' + date.toLocaleTimeString();
}

class Comments extends React.Component {
	constructor() {
		super();
		this.state = {
			comments: localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : [],
			newComments: {newUser: '', newComment: ''}
		};

		this.onChangeInput = this.onChangeInput.bind(this);
		this.addComment = this.addComment.bind(this);
		this.removeComment = this.removeComment.bind(this);
	}
//создаем метод, добавляющий комментарий
	addComment(event) {
		event.preventDefault();
		//создаем копию массива текущего состояния объекта
		const comments = [...this.state.comments];
		//добалвяем новые значения в копию массива
		comments.push({
			user: this.state.newComments.newUser,
			comment: this.state.newComments.newComment,
			date: formatDate(new Date())
		})
		//записываем массив данных в LocalStorage
		localStorage.setItem('comments', JSON.stringify(comments))
		//обновляем состояния
		this.setState({
			comments,
			newComments: {newUser: '', newComment: ''}
		})
	}
//создаем метод отслеживающий ввод данных в поля ввода
	onChangeInput(event) {
		const name = event.target.name;
		const value = event.target.value;
		this.setState(prev => ({newComments: {...prev.newComments, [name]: value}}))
	}
//создаем метод для удаления комментария
	removeComment(key) {
		//вытаскиваем в массив из LocalStorage все существующие данные
		let arr = JSON.parse(localStorage.getItem('comments'));
		//исключаем из массива значение, которое будем удалять
		let comments = arr.filter(item => item !== arr[key]);
		//переписываем массив в LocalStorage
		localStorage.setItem('comments', JSON.stringify(comments));
		//обновяем состояния
		this.setState({ comments });
	};
//рендерим элементы на страницу
	render() {
		return (
			<div className="container">
				<div className="comments">
				{this.state.comments.map((item, i) => item.user !== '' ?
						<NewComment
							key ={i}
							user={item.user + ':'}
							comment={item.comment}
							date={item.date}
							removeComment={this.removeComment.bind(this, i)}
							/> :
							null)
				}
			 </div>
			<form onSubmit={this.addComment}>
				<input
					type="text"
					name="newUser"
					value={this.state.newComments.newUser}
					onChange={this.onChangeInput}
					placeholder="Введите Ваше имя"
					required
				 />
				<textarea
					name="newComment"
					value={this.state.newComments.newComment}
					onChange={this.onChangeInput}
					placeholder="Введите комментарий"
					required
				/>
				<button type="submit" value="submit">
					Добавить
				</button>
			</form>
			</div>
		);
	}
}

ReactDOM.render(
	<React.StrictMode>
		<Comments />
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.unregister();
