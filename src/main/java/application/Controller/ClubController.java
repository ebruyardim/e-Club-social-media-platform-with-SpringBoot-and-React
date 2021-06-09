package application.Controller;

import application.Model.CQA;
import application.Model.Club;
import application.Service.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping(path = "/clubs")
@RequiredArgsConstructor
public class ClubController {

    private final ClubService clubService;

    @PostMapping(path = "/add")
    public @ResponseBody
    Integer addNewClub(@RequestBody Club club) {
        return clubService.addClub(club);
    }

    @PostMapping(path = "/addNewClub")
    public @ResponseBody
    Integer addNewClub(@RequestBody CQA club) {
        return clubService.addNewClub(club);
    }
    
    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Club> getAllClubs() {
        return clubService.findAllClubs();

    }

    @GetMapping("/getById/{clubid}")
    private @ResponseBody Club getClubById(@PathVariable("clubid") int clubid) {
        return clubService.getClubById(clubid);
    }

    @DeleteMapping("/deleteById/{clubid}")
    private @ResponseBody
    String deleteClub(@PathVariable("clubid") int clubid) {
        return clubService.deleteClubById(clubid);
    }

    @PutMapping("/update/{clubid}/{info}")
    private @ResponseBody
    String updateClub(@PathVariable("clubid") int id, @PathVariable("info") String info) {

        return clubService.updateClub(id,info);
    }
}
