package application.Service;

import application.Model.ChatSessionPublic;
import application.Model.Club;
import application.Model.SubClub;
import application.Repository.ChatSessionPublicRepository;
import application.Repository.ClubRepository;
import application.Repository.SubClubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Service
@RequiredArgsConstructor
public class SubClubService {

    @Autowired
    private SubClubRepository subclubRepository;

    @Autowired
    private ClubRepository clubRepository;
    
    @Autowired
    private ChatSessionPublicRepository chatSessionRepository;

    public Integer addSubclub(SubClub subClub, Integer clubId) {
        
    	subClub.setClub(clubRepository.findById(clubId).get());
        
    	ChatSessionPublic chat = new ChatSessionPublic();        
        subClub.setChatSession(chat);
        
        chat.setSubClub(subClub);
        subclubRepository.save(subClub);
        
        return subClub.getId();
    }

    public List<SubClub> findSubclubByClubId(Integer clubId) {
        return subclubRepository.findByClubId(clubId);
    }

    public SubClub findById(Integer subclubid) {

        return subclubRepository.findById(subclubid).get();
    }


    public String deleteSubClub(int subclubid) {
        subclubRepository.deleteById(subclubid);
        return "Deleted";
    }

    public Iterable<SubClub> getAllSubClubs() {
        return subclubRepository.findAll();
    }


    public String updateRate(int rate, int subclubId) {
        SubClub s=subclubRepository.findById(subclubId).get();
        int rateCount=s.getRateCount();
        rateCount=rateCount+1;
        float new_rate=(s.getRate()*s.getRateCount()+rate)/rateCount;
        s.setRateCount(rateCount);
        s.setRate(new_rate);
        subclubRepository.save(s);
        return "New rate of subclub "+ s.getName()+" is "+Math.round(s.getRate());
    }

    public String getRate(Integer subclubid) {
        return "Rate is "+Math.round(subclubRepository.findById(subclubid).get().getRate());
    }

    public String getImageBySubclub(Integer subclubid) {
        Club club = subclubRepository.findById(subclubid).get().getClub();
        String image = club.getClubImage();
        return image;
    }
}
