const tasks = [];

// 1. GET ALL TASKS
const getTasks = (req, res) => {
  const userTasks = tasks.filter((task) => task.userId === req.userId);
  res.status(200).json(userTasks);
};

// 2. CREATE A TASK
const createTask = (req, res) => {
  const { title, description } = req.body;

  const newTask = {
    id: Date.now().toString(),
    title,
    description,
    userId: req.userId,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

// 3. UPDATE A TASK
const updateTask = (req, res) => {
  const taskId = req.params.id;
  const { title, description, completed } = req.body;

  const taskIndex = tasks.findIndex(
    (task) => task.id === taskId && task.userId === req.userId,
  );

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const existingTask = tasks[taskIndex];
  tasks[taskIndex] = {
    ...existingTask,
    title: title !== undefined ? title : existingTask.title,
    description:
      description !== undefined ? description : existingTask.description,
    completed: completed !== undefined ? completed : existingTask.completed,
  };

  res.status(200).json(tasks[taskIndex]);
};

// 4. DELETE A TASK
const deleteTask = (req, res) => {
  const taskId = req.params.id;

  const taskIndex = tasks.findIndex(
    (task) => task.id === taskId && task.userId === req.userId,
  );

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.status(204).send();
};

module.exports = { getTasks, createTask, updateTask, deleteTask, tasks };
