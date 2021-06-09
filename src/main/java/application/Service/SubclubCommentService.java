package application.Service;

import application.Model.Member;
import application.Model.SubClub;
import application.Model.SubclubComment;
import application.Repository.MemberRepository;
import application.Repository.SubClubRepository;
import application.Repository.SubclubCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Service
@RequiredArgsConstructor
public class SubclubCommentService {
    @Autowired
    private SubClubRepository subclubRepository;

    @Autowired
    private SubclubCommentRepository subclubCommentRepository;

    @Autowired
    private MemberRepository memberRepository;

    public String addSubclubComment(Integer subclubId, SubclubComment subclubComment, Integer memberId) {
        try {
            SubClub s = subclubRepository.findById(subclubId).get();
            Member m = memberRepository.findById(memberId).get();
            int clubid = s.getClub().getId();
            subclubComment.setSubclub(subclubRepository.findById(subclubId).get());
            subclubComment.setSubclubClubId(clubid);
            subclubComment.setMemberName(m.getUsername());
            subclubComment.setMemberId(memberId);
            subclubCommentRepository.save(subclubComment);
            return "Subclub comment saved";
        } catch (Exception e) {
            return "Member or subclub not exist";
        }

    }

    public Iterable<SubclubComment> getSubclubComments() {
        return subclubCommentRepository.findAll();
    }

    public List<SubclubComment> getSubclubCommentById(Integer subclubId) {
        return subclubCommentRepository.findBySubclubId(subclubId);
    }

    public String deleteById(Integer subclubCommentId) {
        subclubCommentRepository.deleteById(subclubCommentId);
        return "Subclub " + subclubCommentId + " comment deleted";
    }
}
