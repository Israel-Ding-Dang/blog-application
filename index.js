import express from "express";

const app = express();
const port = 3000;

let blogPosts = [];

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));


app.post("/submit-blog", (req, res) => {
    const { title, body } = req.body;
    let { index } = req.body;
    index = parseInt(index, 10); // Parse index as an integer

    if (!isNaN(index) && blogPosts[index]) { // Check if index is a number and exists in the array
        // Update existing post
        blogPosts[index] = { title, body };
    } else {
        // Add new post if index is NaN or does not exist
        blogPosts.push({ title, body });
    }
    console.log("Updated blogPosts array:", blogPosts);
    res.redirect("/");
});

app.post('/delete-blog', (req, res) => {
    let { index } = req.body;
    index = parseInt(index, 10); // Ensure index is an integer

    if (!isNaN(index) && index >= 0 && index < blogPosts.length) {
        blogPosts.splice(index, 1); // Remove the post at the correct index
    } else {
        console.log("Invalid index for deletion:", index);
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