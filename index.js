const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public/"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let tasks = [
	{
		id: uuid(),
		title: "Task 1",
		description: "Take the dog out.",
	},
	{
		id: uuid(),
		title: "Task 2",
		description: "Wash the dishes.",
	},
	{
		id: uuid(),
		title: "Task 3",
		description: "Clean out the garage.",
	},
];

app.get("/", (req, res) => {
	res.render("task/index", { tasks });
});

app.post("/task", (req, res) => {
	const { title, description } = req.body;
	tasks.push({ title, description, id: uuid() });
	res.redirect("/");
});

app.get("/task/:id/edit", (req, res) => {
	const { id } = req.params;
	const task = tasks.find((d) => d.id === id);
	res.render("task/edit", { task });
});

app.patch("/task/:id", (req, res) => {
	const { id } = req.params;
	const newTitle = req.body.title;
	const foundTitle = tasks.find((t) => t.id === id);
	foundTitle.title = newTitle;
	const newDescription = req.body.description;
	const foundDescription = tasks.find((d) => d.id === id);
	foundDescription.description = newDescription;
	res.redirect("/");
});

app.delete("/task/:id", (req, res) => {
	const { id } = req.params;
	tasks = tasks.filter((t) => t.id !== id);
	res.redirect("/");
});

app.listen(port, () => {
	console.log(`WORKING ON PORT ${port}!`);
});
