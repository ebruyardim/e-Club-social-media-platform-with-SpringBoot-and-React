package application.Service;

import application.Model.Member;
import application.Model.MemberSubclub;
import application.Model.Post;
import application.Model.PostComment;
import application.Repository.MemberRepository;
import application.Repository.MemberSubclubRepository;
import application.Repository.PostCommentRepository;
import application.Repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Service
@RequiredArgsConstructor
public class PostCommentService {
    Connection conn = null;

    @Autowired
    private PostCommentRepository postCommentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MemberSubclubRepository memberSubclubRepository;
    Boolean isSlang;

    public String addPostComment(Integer postId, PostComment postComment,Integer memberId) {
        setConnection();
        try{
            Post p=postRepository.findById(postId).get();
            int subclubId=p.getSubClubId();
            MemberSubclub msc=memberSubclubRepository.findByMemberIdAndSubclubId(memberId,subclubId);
            Member m=memberRepository.findById(memberId).get();
            postComment.setPost(p);
            postComment.setMemberId(memberId);
            postComment.setMemberName(m.getUsername());

            String[] currencies = postComment.getComment().split(" ");
            for(int i=0;i<currencies.length ;i++){
                String word=currencies[i];
                String queryCheck = "SELECT * FROM lovelace.slang_words WHERE word = "+quote(word);
                Statement stmt = conn.createStatement();
                ResultSet res = stmt.executeQuery(queryCheck);
                boolean exists = res.next();
                if(exists==true){
                    isSlang=true;
                    int bancount=msc.getBanCount();
                    bancount=bancount+1;
                    msc.setBanCount(bancount);
                    msc.setBanDay(LocalDateTime.now());
                    msc.setIsBanned(1);
                    memberSubclubRepository.save(msc);
                    try{
                        String setEvent = "Select ban_day into @a from lovelace.member_has_subclub where id =" + msc.getId()+";";
                        String setDrop1="DROP EVENT IF EXISTS lovelace.post_event"+msc.getId()+";";

                        String setDrop2="DROP EVENT IF EXISTS lovelace.post_comment_event"+msc.getId()+";";
                        String createEvent="CREATE EVENT lovelace.post_comment_event" +msc.getId()+" ON SCHEDULE AT @a+INTERVAL 5 MINUTE ON COMPLETION PRESERVE DO update lovelace.member_has_subclub set is_banned=0 where id="+msc.getId();

                        Statement stmt2 = conn.createStatement();
                        boolean setEventBool = stmt2.execute(setEvent);
                        boolean setDropBool = stmt2.execute(setDrop1);
                        boolean setDropBool2 = stmt2.execute(setDrop2);

                        boolean setCreateEventBool = stmt2.execute(createEvent);

                    }catch (Exception d){
                        return d.getMessage();
                    }
                }else{
                    isSlang=false;
                }
            }
            if(isSlang==true){
                return "Slang";
            }
            else{
                postCommentRepository.save(postComment);
                return "Comment "+ postComment.getId()+" saved";
            }
        }catch (Exception e){
            return "Post or member not exist, or user not member of this subclub";
        }

    }

    private void setConnection() {
        try {
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/lovelace?useSSL=false&allowPublicKeyRetrieval=true" + "&user=root&password=98ebru87");
        } catch (SQLException ex) {
            // handle any errors
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        }
    }

    public Iterable<PostComment> getPostComments() {
        return postCommentRepository.findAll();
    }

    public List<PostComment> getPostCommentById(Integer postId) {
        return postCommentRepository.findByPostId(postId);
    }

    public String deleteById(Integer postCommentId) {
        postCommentRepository.deleteById(postCommentId);
        return "Post comment deleted";
    }

    public static String quote(String s) {
        return new StringBuilder()
                .append('\'')
                .append(s)
                .append('\'')
                .toString();
    }
}
