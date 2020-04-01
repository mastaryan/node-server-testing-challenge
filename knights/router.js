const router = require('express').Router();
const Knights = require('./model.js');

// Get all Knights of Carlos
router.get('/', (req, res) => {
  Knights.find()
    .then(knights => {
      res.status(200).json(knights);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json('Error retrieving the Knights of Carlos');
    });
});

// Get a specific Knight
router.get('/:id', (req, res) => {
  Knights.findById(req.params.id)
    .then(knight => {
      if (knight) {
        res.status(200).json(knight);
      } else {
        res.status(404).json('Knight with that ID does not exist');
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json('Error retrieving knight');
    });
});

// Create a new Knight
router.post('/', (req, res) => {
  Knights.add(req.body)
    .then(knight => {
      res.status(201).json(knight);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json('Error creating new knight');
    });
});

// Update an existing Knight
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Knights.edit(changes, id)
    .then(knight => {
      res.status(200).json('Successfully updated knight');
    })
    .catch(err => {
      console.log(err);
      res.status(500).json('Error updating knight');
    });
});

// Delete an existing Knight
router.delete('/:id', (req, res) => {
  Knights.del(req.params.id)
    .then(knight => {
      if (knight) {
        res.status(200).json('Successfully deleted knight');
      } else {
        res.status(404).json('Knight with that ID does not exist');
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json('Error deleting knight');
    });
});

module.exports = router;