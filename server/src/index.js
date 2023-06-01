const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();

const app = express();
const port = 3000;
const db = pgp('postgres://username:password@database:5432/default_database');

app.use(
  cors({
    origin: 'http://localhost:3030',
  })
);

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const data = await db.any('SELECT * FROM colors');
    console.log(data);
  } catch (e) {
    console.log(e);
  }
  res.send('Survey App');
});

app.get('/default-values', (req, res) => {
  db.task('default-values-query', async (t) => {
    const colors = await t.any(
      'SELECT * FROM colors WHERE is_default = $1',
      true
    );
    const foods = await t.any(
      'SELECT * FROM foods WHERE is_default = $1',
      true
    );
    return { colors, foods };
  })
    .then((data) => res.send(data))
    .catch((e) => {
      console.log(e);
      res.send({ colors: [], foods: [] });
    });
});

app.get('/survey-results', (req, res) => {
  db.task('survey-results-query', async (t) => {
    const colors = await t.any('SELECT * FROM colors');
    const foods = await t.any('SELECT * FROM foods');

    return { colors, foods };
  })
    .then((data) => res.json(data))
    .catch((e) => {
      console.log(e);
      res.json({ colors: [], foods: [] });
    });
});

app.post('/record-vote', (req, res) => {
  const { color, food } = req.body;

  if (!color || !food) {
    res.status(400).json({ error: 'MISSING_DATA' });
  }

  // wrap all these queries in a task so they use the same connection
  db.task('record-vote-query', async (t) => {
    const existingColor = await t.oneOrNone(
      'SELECT * FROM colors WHERE name = $1',
      color
    );
    const existingFood = await t.oneOrNone(
      'SELECT * FROM foods WHERE name = $1',
      food
    );

    if (existingColor === null) {
      await t.none(
        'INSERT INTO colors (name, is_default, votes) VALUES ($1, $2, $3)',
        [color, false, 1]
      );
    } else {
      const { id, votes } = existingColor;
      await t.none('UPDATE colors SET votes = $1 WHERE id = $2', [
        votes + 1,
        id,
      ]);
    }

    if (existingFood === null) {
      await t.none(
        'INSERT INTO foods (name, is_default, votes) VALUES ($1, $2, $3)',
        [food, false, 1]
      );
    } else {
      const { id, votes } = existingFood;
      await t.none('UPDATE foods SET votes = $1 WHERE id = $2', [
        votes + 1,
        id,
      ]);
    }
  })
    .then(res.json({ success: 'VOTE_RECORDED' }))
    .catch((e) => {
      console.log(e);
      res.status(500).json({ error: 'DATABASE_ERROR' });
    });
});

app.listen(port, () => {
  console.log(`survey-app:server listening on port ${port}`);
});
