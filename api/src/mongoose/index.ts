import mongoose from 'mongoose';

const mongoBdConnect = async (uri: string) => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // 30 segundos
    serverSelectionTimeoutMS: 30000, // 30 segundos
  };
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);
  mongoose.set('debug', false);

  await mongoose.connect(uri, options);
};

export default mongoBdConnect;
