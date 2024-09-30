import { Blog } from "../models/blog.mjs";

// Handler for Rendering all blogs
async function handleForRenderAllBlogs(req, res) {
    const { user } = req;
    // Ensure the user is authenticated
    if (!req.user) {
      return res.redirect("/user/signin"); // Redirect to signin if not authenticated
    }
  
    try {
      const userId = req.user._id; // Get user ID from the validated token
      const blogs = await Blog.find({ createdBy: userId }).populate(
        "createdBy",
        "fullName"
      );
  
      // // Check if blogs were retrieved
      // console.log("Fetched blogs:", blogs); // Debugging line
  
      res.render("my-blogs", { blogs, user });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).send(error);
    }
  }
  
  // Handler functionfor editing the blog
  async function handleForRenderEditBlogPage(req, res) {
    const { id } = req.params; // Extract id from the route parameters
  
    try {
      const blog = await Blog.findById(id); // Use id to find the blog
      if (!blog) {
        return res.status(404).send("Blog not found");
      }
      res.render("edit-blog", { blog }); // Render the edit-blog view
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.render("error"); // Render the error view
    }
  }
  
  // Handler for Updatig the Blog
  async function handlerForUpdateBlog(req, res) {
    const { title, body, coverImageURL } = req.body; // Destructure the request body
    const blogId = req.params.id; // Get the blog ID from the route parameter
  
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { title, body, coverImageURL }, // Update fields
        { new: true } // Return the updated document
      );
  
      if (!updatedBlog) {
        return res.status(404).send("Blog not found");
      }
  
      res.redirect("/my-blogs"); // Redirect to the My Blogs page after updating
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).send(error);
    }
  }
  
  // Handler for Deleting Blog
  async function handleForDeleteBlog(req, res) {
    try {
      await Blog.findByIdAndDelete(req.params.id);
      res.redirect("/my-blogs");
    } catch (error) {
      res.status(500).send(error);
    }
  }

  export {
    handleForDeleteBlog,
    handlerForUpdateBlog,
    handleForRenderEditBlogPage,
    handleForRenderAllBlogs
  }