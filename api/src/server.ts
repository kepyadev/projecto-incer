import { env } from 'process';

import app from './app';
import migrateMongo from './cronjob/migrate-mongo';
import mongoBdConnect from './mongoose/index';
import { initAdmin } from './services/user.service';

const PORT: string | number = env.PORT || 4000;

const URI = env.MONGO_URI;

// eslint-disable-next-line no-console
console.log('MONGO', URI);

// zebedeu2
mongoBdConnect(URI || 'error')
  .then(
    () => {
      // res.set('debug', true);
      // eslint-disable-next-line no-console
      app.listen(`${PORT}`, () => console.log(`Server running o n http://localhost:${PORT}`));

      migrateMongo.execute();

      initAdmin();
    },
    erro => {
      // eslint-disable-next-line no-console
      console.log('FALHA NO MONGODB', erro.message);
    }
  )
  .catch(() => {
    // eslint-disable-next-line no-console
    console.log('FALHA', 'Lamentamos, não foi possível conectar ao banco de dados');
  });
