import { Blog } from "../models/blog.mjs";
import { Comment } from "../models/comment.mjs";

// Handler to render add blog
const renderAddBlogFormHandler = (req, res) => {
  res.render("addblog", { user: req.user });
};

// Handler to Get blog
const getBlogByIdHandler = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.id }).populate(
      "createdBy"
    );

    if (!blog) {
      return res.status(404).render("404", { message: "Blog post not found" });
    }

    if (!blog.createdBy) {
      console.error("Creator of the blog post not found");
      return res
        .status(404)
        .render("404", { message: "Creator of the blog post not found" });
    }

    // Determine where the request came from
    const referer = req.get("referer"); // Get the referrer URL
    const fromMyBlogs = referer && referer.includes("/my-blogs"); // Check if the referrer includes '/my-blogs'

    // Render the blog along with totalBlogs and fromMyBlogs flag
    res.render("blog", { user: req.user, blog, comments, fromMyBlogs });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).render("error", { message: "Internal Server Error" });
  }
};

// Handler to post a new blog
const createBlogPostHandler = async (req, res) => {
  try {
    const { title, body } = req.body;
    const coverImageURL = req.file
      ? `/uploads/${req.file.filename}`
      : undefined;

    const blog = await Blog.create({
      title,
      body,
      createdBy: req.user._id,
      coverImageURL,
    });

    res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).render("error", { message: "Internal Server Error" });
  }
};

// Handler to add comment to a blog
const addCommentToBlogHandler = async (req, res) => {
  try {
    await Comment.create({
      content: req.body.content,
      createdBy: req.user._id,
      blogId: req.params.blogId,
    });

    res.redirect(`/blog/${req.params.blogId}`);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).render("error", { message: "Internal Server Error" });
  }
};

  export { addCommentToBlogHandler, createBlogPostHandler, getBlogByIdHandler, renderAddBlogFormHandler };