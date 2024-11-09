import React from "react";
import { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithArrays() {
	const API = `${REMOTE_SERVER}/lab5/todos`;
	const [todo, setTodo] = useState({
		id: "1",
		title: "NodeJS Assignment",
		description: "Create a NodeJS server with ExpressJS",
		due: "2021-09-09",
		completed: false,
	});
	return (
		<div id="wd-working-with-arrays">
			<h3>Working with Arrays</h3>
			<h4>Retrieving Arrays</h4>
			<a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
				Get Todos{" "}
			</a>
			<hr />
			<h4>Retrieving an Item from an Array by ID</h4>
			<a
				id="wd-retrieve-todo-by-id"
				className="btn btn-primary float-end"
				href={`${API}/${todo.id}`}
			>
				Get Todo by ID
			</a>
			<input
				id="wd-todo-id"
				defaultValue={todo.id}
				className="form-control w-50"
				onChange={(e) => setTodo({ ...todo, id: e.target.value })}
			/>
			<hr />
			<h4>Filtering Array Items</h4>
			<a
				id="wd-retrieve-completed-todos"
				className="btn btn-primary"
				href={`${API}?completed=true`}
			>
				Get Completed Todos
			</a>
			<hr />
			<hr />
			<h4>Creating new Items in an Array</h4>
			<a
				id="wd-retrieve-completed-todos"
				className="btn btn-primary"
				href={`${API}/create`}
			>
				Create Todo
			</a>
			<hr />
			<h4>Deleting from an Array</h4>
			<a
				id="wd-retrieve-completed-todos"
				className="btn btn-primary float-end"
				href={`${API}/${todo.id}/delete`}
			>
				Delete Todo with ID = {todo.id}{" "}
			</a>
			<input
				defaultValue={todo.id}
				className="form-control w-50"
				onChange={(e) => setTodo({ ...todo, id: e.target.value })}
			/>
			<hr />
			<h4>Updating an Item in an Array</h4>
			<input
				defaultValue={todo.id}
				className="form-control mb-2"
				onChange={(e) => setTodo({ ...todo, id: e.target.value })}
			/>
			<input
				defaultValue={todo.title}
				className="form-control mb-2"
				onChange={(e) => setTodo({ ...todo, title: e.target.value })}
			/>
			<input
				defaultValue={todo.description}
				className="form-control mb-2"
				onChange={(e) => setTodo({ ...todo, description: e.target.value })}
			/>
			<div className="form-check form-switch">
				<input
					type="checkbox"
					id = "wd-completed-check"
					defaultChecked={todo.completed}
					className="form-check-input"
					onChange={(e) =>
						setTodo({ ...todo, completed: Boolean(e.target.value) })
					}
				/>
				<label className="form-check-label" htmlFor="wd-completed-check">Completed</label>
			</div><br />
			<a
				href={`${API}/${todo.id}/title/${todo.title}`}
				className="btn btn-primary float-end"
			>
				Update Todo
			</a>
			<br />
			<br />
			<hr />
		</div>
	);
}
