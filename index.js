import express from "express"
import methodOverride from "method-override";



const app = express();
const port = process.env.PORT || 3000;

let posts = [];
let currentId = 1;

app.use(express.urlencoded({ extended: true })); //عشان الmiddleware
app.use(express.static("public"));//css
app.use(methodOverride("_method"));//عشان اعمل put و delete
app.set("view engine", "ejs");//اشغل الejs
//بيget الpage اصلا
app.get("/",(req,res)=>
  {res.render("index.ejs", { posts });
});

// CREATE post بكريت عادي بحط id عشان اميز كل بوست واعد البوستات وبحط فالbody عنوان و كونتنت وبعد لما اخلص يرجعني للبيدج
app.post("/new", (req, res) => {
  const { title, content } = req.body;

  posts.push({
    id: currentId++,
    title,
    content
  });

  res.redirect("/");
});

//PUT بستخدم الميدلوير عشان ادور عال اي دي ولو مش موجود الميدلوير بيكنسل لو لقاه بيخليني اغير بقي براحتي بعنوان وكونتنت جديد

app.get("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) return res.redirect("/");

  res.render("edit", { post });
});

app.put("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;

  const post = posts.find(p => p.id === id);
  if (!post) return res.redirect("/");

  post.title = title;
  post.content = content;

  res.redirect("/");
});

//DELETE بدولر عالاي دي وامسح

app.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);

  posts = posts.filter(post => post.id !== id);

  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});