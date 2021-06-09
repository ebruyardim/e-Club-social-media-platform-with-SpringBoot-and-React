package application.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import application.Model.Club;
import application.Model.Member;
import application.Model.MemberClub;
import application.Repository.ClubRepository;
import application.Repository.MemberClubRepository;
import application.Repository.MemberRepository;

@Service
@CrossOrigin(origins = "http://localhost:3000")
public class MemberClubService {

    @Autowired
    MemberClubRepository memberclubRepository;
    @Autowired
    ClubRepository clubRepository;
    @Autowired
    MemberRepository memberRepository;

    public String joinClub(MemberClub memberclub) {

        Club club = clubRepository.findById(memberclub.getClubId()).get();
        Member member = memberRepository.findById(memberclub.getMemberId()).get();

        memberclubRepository.save(memberclub);

        return member.getUsername() + " can join " + club.getName() + "'s subclubs.";
    }

    public Iterable<MemberClub> getAllMemberClubs() {
        return memberclubRepository.findAll();
    }

    public List<MemberClub> getMemberClubsByMemberId(Integer memberId) {
        return memberclubRepository.findByMemberId(memberId);
    }


    public String joinClubs(List<Club> clubs, Member member) {
        String clubsList = " ";
        int memberId = member.getId();
        List<MemberClub> memberClubs = new ArrayList<>();
        for (Club club : clubs) {

            MemberClub memberClub = new MemberClub(memberId, club.getId());
            clubsList += club.getName() + " ";
            memberClubs.add(memberClub);

        }

        memberclubRepository.saveAll(memberClubs);

        return memberId + " can join" + clubsList + "clubs.";


    }
}
