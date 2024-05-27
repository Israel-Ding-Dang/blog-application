import express from "express";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3000;

let blogPosts = [];

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));


app.post("/submit-blog", (req, res) => {
    const { title, body, author } = req.body;
    const postId = uuidv4(); // Generate unique postId

    // Add new post with postId
    blogPosts.push({ postId, title, body, author });

    console.log("Updated blogPosts array:", blogPosts);
    res.redirect("/");
});

app.post("/submit-blog-edit", (req, res) => {
    const { postId, title, body, author } = req.body;

    // Find the index of the post to edit
    const postIndex = blogPosts.findIndex(post => post.postId === postId);
    if (postIndex !== -1) {
        // Update the existing post with new data
        blogPosts[postIndex] = { postId, title, body, author };
        console.log("Updated blog post:", blogPosts[postIndex]);
    } else {
        console.log("Invalid postId for editing:", postId);
    }

    res.redirect("/");
});

app.post('/delete-blog', (req, res) => {
    const postId = req.body.postId;

    // Find index of post to delete
    const postIndex = blogPosts.findIndex(post => post.postId === postId);
    if (postIndex !== -1) {
        blogPosts.splice(postIndex, 1); // Remove the post at the correct index
    } else {
        console.log("Invalid postId for deletion:", postId);
    }

    res.redirect("/");
});

app.get("/", (req, res) => {
    res.render("index.ejs", {
        myBlogs: blogPosts
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});