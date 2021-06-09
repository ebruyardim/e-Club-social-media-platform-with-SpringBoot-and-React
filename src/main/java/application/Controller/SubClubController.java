package application.Controller;

import application.Model.SubClub;
import application.Service.SubClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequiredArgsConstructor
@RequestMapping(path = "/subclubs")
public class SubClubController {

    private final SubClubService subclubService;

    @PostMapping(path = "/add/{clubId}") // Map ONLY POST Requests
    public @ResponseBody
    Integer addNewSubClub(@PathVariable(value = "clubId") Integer clubId,
                         @RequestBody SubClub subClub){ // @ResponseBody means the returned String is the response, not a view name

        return subclubService.addSubclub(subClub,clubId);
    }

    @GetMapping("/all/{clubId}")
    public @ResponseBody List<SubClub> getSubClubByClub(@PathVariable(value = "clubId") Integer clubId) {
        return subclubService.findSubclubByClubId(clubId);
    }

    @GetMapping("/all")
    public @ResponseBody
    Iterable<SubClub> getAllSubClubs() {
        return subclubService.getAllSubClubs();
    }

    @GetMapping("/getById/{subclubid}")
    private @ResponseBody SubClub getSubClubById(@PathVariable("subclubid") Integer subclubid) {
        return subclubService.findById(subclubid);

    }

    @DeleteMapping("/deleteById/{subclubid}")
    private @ResponseBody
    String deleteSubClub(@PathVariable("subclubid") int subclubid) {
        return subclubService.deleteSubClub(subclubid);
    }

    @PutMapping("/updateRate/{rate}/{subclubid}")
    private @ResponseBody
    String updateRate(@PathVariable("rate") int rate, @PathVariable("subclubid") int subclubId) {
        return subclubService.updateRate(rate,subclubId);
    }

    @GetMapping("/getRateById/{subclubid}")
    private @ResponseBody
    String getRateById(@PathVariable("subclubid") Integer subclubid) {
        return subclubService.getRate(subclubid);
    }

    @GetMapping("/getImage/{subclubid}")
    private @ResponseBody
    String getImageBySubclub(@PathVariable("subclubid") Integer subclubid) {
        return subclubService.getImageBySubclub(subclubid);
    }

}
