package application.Controller;


import application.Model.Post;
import application.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@CrossOrigin(origins = "http://localhost:3000")

@Controller
@RequestMapping(path="/subclubPosts")
public class PostController {

    @Autowired
    PostService postService;


    @PostMapping("/createPost/{memberid}/{subclubid}")
    public @ResponseBody
    String createpost(@RequestBody Post post,@PathVariable("subclubid") Integer subclubId,@PathVariable("memberid") Integer memberId) throws SQLException {
        return postService.createPost(post,subclubId,memberId);
    }

    @GetMapping(path = "/getAll")
    public @ResponseBody Iterable<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @PutMapping(path = "/update/{postid}")
    public @ResponseBody String updatePost(@PathVariable("postid") Integer pathId,@RequestBody Post post) {

        return postService.updatePost(pathId,post);
    }

    @DeleteMapping(path = "/deleteById/{postid}")
    public @ResponseBody String getAllPosts(@PathVariable("postid") Integer postId) {
        return postService.deleteById(postId);
    }

    @PutMapping(path = "/updateLike/{postid}")
    public @ResponseBody String updateLike(@PathVariable("postid") Integer postId) {
        return postService.updateLike(postId);
    }
}
