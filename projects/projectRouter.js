const express = require("express");

const project = require("./projectModel.js");

const router = express.Router();

router.get("/", (req, res) => {
  project
    .find()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get projects" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  project
    .findById(id)
    .then(pjt => {
      if (pjt) {
        res.json(pjt);
      } else {
        res
          .status(404)
          .json({ message: "Could not find project with that particular id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get project" });
    });
});

router.get("/:id/tasks", (req, res) => {
  const { id } = req.params;

  project
    .findTasks(id)
    .then(tasks => {
      if (tasks.length) {
        res.json(tasks);
      } else {
        res
          .status(404)
          .json({ message: "Could not find tasks for given project" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get tasks" });
    });
});

router.get("/:id/resources", (req, res) => {
  const { id } = req.params;

  project
    .findResources(id)
    .then(resources => {
      if (resources.length) {
        res.json(resources);
      } else {
        res
          .status(404)
          .json({ message: "Could not find resources for given project" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get tasks" });
    });
});

router.post("/", (req, res) => {
  const projectData = req.body;

  project
    .add(projectData)
    .then(pjt => {
      res.status(201).json(pjt);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new project" });
    });
});

router.post("/:id/tasks", (req, res) => {
  const taskData = req.body;
  const { id } = req.params;

  project
    .findById(id)
    .then(pjt => {
      if (pjt) {
        project.addTask(taskData, id).then(task => {
          res.status(201).json(task);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find project with given id." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to create new task" });
    });
});

router.post("/:id/resources", (req, res) => {
  const resourceData = req.body;
  const { id } = req.params;

  project
    .findById(id)
    .then(pjt => {
      if (pjt) {
        project.addResource(resourceData, id).then(resource => {
          res.status(201).json(resource);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find project with given id." });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to create new resource" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  project
    .findById(id)
    .then(pjt => {
      if (pjt) {
        project.update(changes, id).then(updatedProject => {
          res.json(updatedProject);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find project with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update project" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  project
    .remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find project with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete project" });
    });
});

module.exports = router;
