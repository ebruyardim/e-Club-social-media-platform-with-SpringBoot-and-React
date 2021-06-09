package application.Controller;

import application.Model.NewSubClubRequest;
import application.Model.Post;
import application.Model.PostComment;
import application.Service.NewSubClubRequestService;
import application.Service.PostCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequiredArgsConstructor
@RequestMapping(path = "/newSubclubRequest")
public class NewSubClubRequestController {

    private final NewSubClubRequestService newSubClubRequestService;

    @PostMapping(path = "/addNew/{memberId}")
    public @ResponseBody
    String addNewRequest(@PathVariable(value = "memberId") Integer memberId,@RequestBody NewSubClubRequest newSubclubRequest){
        return newSubClubRequestService.addNewRequest(newSubclubRequest,memberId);
    }

    @PutMapping(path = "/updateExisting/{newSubclubRequestId}/{memberId}")
    public @ResponseBody
    String updateExistingRequest(@PathVariable(value = "memberId") Integer memberId,@PathVariable(value = "newSubclubRequestId") Integer newSubclubRequestId){
        return newSubClubRequestService.updateExistingRequest(newSubclubRequestId,memberId);
    }

    @GetMapping(path = "/getAll")
    public @ResponseBody Iterable<NewSubClubRequest> getAllRequest() {
        return newSubClubRequestService.getAllRequests();
    }

}
