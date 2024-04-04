import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
const db_url = process.env.MONGODB_URL;
async function main() {
  if (!db_url) {
    return new Error('db url is undefined');
  } else {
    await mongoose.connect(db_url);
  }
}
main().catch((err) => {
  console.log(err);
});