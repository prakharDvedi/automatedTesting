const tasks = [];

const getTasks = (req, res) => {
  const userTasks = tasks.filter((task) => task.userId === req.userId);
  res.status(200).json(userTasks);
};

const createTask = (req, res) => {
  const { title, description } = req.body;
  // creating a new task structure
  const newTask = {
    id: Date.now(),
    title,
    description,
    userId: req.userId,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const userId = req.params.id;
  const { newTitle, newDescription } = req.body;
  const taskIndex = tasks.findIndex((task) => task.id === userId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  tasks[taskIndex] = {
    title: newTitle,
    description: newDescription,
    userId: req.userId,
    completed: false,
  };
  res.status(200).json(tasks[taskIndex]);
};
