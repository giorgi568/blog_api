#! /usr/bin/env node

console.log(
  'Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

const userArgs = process.argv.slice(2);
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

const users = [];
const posts = [];
const comments = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];
main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createUsers();
  await createPosts();
  await createComments();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function userCreate(index, username, password, admin) {
  const user = new User({
    username: username,
    password: password,
    admin: admin,
  });

  await user.save();
  users[index] = user;
  console.log('added user: ' + username);
}

async function postCreate(index, title, text, author, published) {
  const post = new Post({
    title: title,
    text: text,
    author: author,
    published: published,
  });

  await post.save();
  posts[index] = post;
  console.log('added post: ' + title);
}

async function commentCreate(index, text, author, post) {
  const comment = new Comment({
    text: text,
    author: author,
    post: post,
  });

  await comment.save();
  comments[index] = comment;
  console.log('added comment by: ' + author);
}

async function createUsers() {
  console.log('adding users');
  await Promise.all([userCreate(0, 'giorgi', 'admin', true)]);
}

async function createPosts() {
  console.log('adding posts');
  await Promise.all([
    postCreate(
      0,
      'Eugène-François Vidocq and the Birth of the Detective',
      'When the Brigade de Sûreté was set up in Paris in 1812, it was a first of its kind: a criminal investigation bureau composed of undercover officers, which would later evolve into France’s national police force. At a time when institutionalised policing was still in its infancy, the Sûreté provided the blueprint for Scotland Yard, established in 1829, and the FBI a century later. At its head, one might imagine someone akin to the men who would follow in this bureau chief’s footsteps: Robert Peel, the Conservative politician and future prime minister who first put Britain’s “bobbies” on the beat, or J. Edgar Hoover, a law student who rose through the ranks of the Justice Department to serve as the American federal agency’s first director. Eugène-François Vidocq (1775–1857), the Sûreté’s founding chief, was nothing of the kind. After a youth of petty criminality, he spent the first fifteen years of his adult life either in prison or on the run, leaving him with little time to pursue a political career. And for a man more at home donning disguises and planning daring jailbreaks, administration wasn’t really his thing.',
      users[0],
      true
    ),
    postCreate(
      1,
      'From Snowdrop to Nightjar',
      'Spring came late to much of the northern hemisphere in 1784. One reason we know this is because of records made by Robert Marsham of Stratton Strawless in Norfolk, England, in which he noted that his hawthorns began to leaf on April 22, fully two months later than in recent previous seasons, and the latest by far in all the forty-eight years he had been keeping records. The anomaly was due to an eruption of the Lakagígar volcanic fissure in Iceland that past June, which had led to a hot, cloudy summer followed by an extremely hard winter in much of Europe. In 1736, while still in his twenties, Marsham embarked on his lifetime project of recording what he was to call his “Indications of Spring”. He noted down the dates of biological events related to the indigenous flora and fauna, and made more general observations too. During the exceptionally cold winter of 1739–40, for example, he wrote that many of his trees split apart and the urine froze in his chamber pot. In Norwich and surrounding areas, there were food riots “for which some were hang’d at ye next Assizes”.1 As a prominent landowner, Marsham served for much of his long life on local assizes juries, and, fearful of revolutions like those in America and France, played his part in handing down these harsh sentences. Although most of his journals and letters have been lost over time, “Indications of Spring” has survived because, after a half-century of assiduous data entry, he presented his accumulated findings to the Royal Society. To Joseph Banks, the society’s president, Marsham wrote: “As I know of your boundless curiosity, I think it possible that an imperfect Calendar of some few articles of Spring, many years past, may afford you some amusement.”2 The calendar was published in the society’s journal, Philosophical Transactions, the following year as a tabulation on three foldout pages.',
      users[0],
      true
    ),
    postCreate(
      2,
      'Lithographs from Franz Wilhelm Junghuhn’s Java-Album (1854)',
      'Java-Album was printed from drawings by Franz Wilhelm Junghuhn to accompany a four-volume travelogue about his expeditions in the Dutch East Indies, published in 1854. The images were printed at great trouble — eleven color lithograph plates, with a twelfth tipped in as frontispiece to Volume 1— but they were not, by all accounts, appreciated by Junghuhn’s readers. Whereas the writing was judged literary, exuberant, and melodic, the renderings, as one critic wrote, “ha[ve] a hardness that makes the landscape look unnatural”. The sensuousness of Junghuhn’s prose apparently made his pictures feel sterile.',
      users[0],
      true
    ),
  ]);
}
async function createComments() {
  console.log('adding comments');
  await Promise.all([
    commentCreate(0, 'this is no good', 'critic', posts[0]),
    commentCreate(1, 'awesome!', 'enjoyer', posts[0]),
    commentCreate(2, 'this is important work', 'user455', posts[1]),
  ]);
}
