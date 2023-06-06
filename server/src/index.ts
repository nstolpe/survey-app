import cors, { CorsOptions } from 'cors';
import express, { Request, Response } from 'express';
import pgPromise, { IDatabase } from 'pg-promise';

interface Color {
  id: number;
  name: string;
  is_default: boolean;
  votes: number;
}

interface Food {
  id: number;
  name: string;
  is_default: boolean;
  votes: number;
}

interface DefaultValues {
  colors: Color[];
  foods: Food[];
}

interface SurveyResults {
  colors: Color[];
  foods: Food[];
}

interface Vote {
  color: string;
  food: string;
}

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  CLIENT_BASE_URL,
} = process.env;

const app = express();
const port = 3000;

const db: IDatabase<unknown> = pgPromise()(
  `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@database:${POSTGRES_PORT}/${POSTGRES_DB}`
);

const corsOptions: CorsOptions = {
  origin: CLIENT_BASE_URL,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  res.send('Survey App');
});

app.get('/default-values', (req: Request, res: Response) => {
  db.task('default-values-query', async (t) => {
    const colors: Color[] = await t.any(
      'SELECT * FROM colors WHERE is_default = $1',
      true
    );
    const foods: Food[] = await t.any(
      'SELECT * FROM foods WHERE is_default = $1',
      true
    );
    return { colors, foods };
  })
    .then((data: DefaultValues) => res.send(data))
    .catch((e) => {
      console.log(e);
      res.send({ colors: [], foods: [] });
    });
});

app.get('/survey-results', (req: Request, res: Response) => {
  db.task('survey-results-query', async (t) => {
    const colors: Color[] = await t.any('SELECT * FROM colors');
    const foods: Food[] = await t.any('SELECT * FROM foods');
    return { colors, foods };
  })
    .then((data: SurveyResults) => res.json(data))
    .catch((e) => {
      console.log(e);
      res.json({ colors: [], foods: [] });
    });
});

app.post('/record-vote', (req: Request, res: Response) => {
  const { color, food }: Vote = req.body;

  if (!color || !food) {
    res.status(400).json({ error: 'MISSING_DATA' });
  }

  const sanitizedColor = color.toLowerCase();
  const sanitizedFood = food.toLowerCase();

  // wrap all these queries in a task so they use the same connection
  db.task('record-vote-query', async (t) => {
    const existingColor: Color | null = await t.oneOrNone(
      'SELECT * FROM colors WHERE name = $1',
      sanitizedColor
    );
    const existingFood: Food | null = await t.oneOrNone(
      'SELECT * FROM foods WHERE name = $1',
      sanitizedFood
    );

    if (existingColor === null) {
      await t.none(
        'INSERT INTO colors (name, is_default, votes) VALUES ($1, $2, $3)',
        [sanitizedColor, false, 1]
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
        [sanitizedFood, false, 1]
      );
    } else {
      const { id, votes } = existingFood;
      await t.none('UPDATE foods SET votes = $1 WHERE id = $2', [
        votes + 1,
        id,
      ]);
    }
  })
    .then(() => res.json({ success: 'VOTE_RECORDED' }))
    .catch((e) => {
      console.log(e);
      res.status(500).json({ error: 'DATABASE_ERROR' });
    });
});

app.listen(port, () => {
  console.log(`survey-app:server listening on port ${port}`);
});
