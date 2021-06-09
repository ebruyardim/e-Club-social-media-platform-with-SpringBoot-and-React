package application.Service;

import application.Model.Member;
import application.Model.MemberSubclub;
import application.Model.Post;
import application.Repository.MemberRepository;
import application.Repository.MemberSubclubRepository;
import application.Repository.PostRepository;
import application.Repository.SubClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.sql.*;
import java.time.LocalDateTime;

@Service
@CrossOrigin(origins = "http://localhost:3000")

public class PostService {

    @Autowired
    PostRepository postRepository;
    @Autowired
    SubClubRepository subclubRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    MemberSubclubRepository mbr;

    Connection conn = null;
    Boolean isSlang=false;

    public String createPost(Post post,Integer subclubId, Integer memberId) throws SQLException {
        setConnection();
        MemberSubclub msc=mbr.findByMemberIdAndSubclubId(memberId,subclubId);
        if(msc != null){
            Member m=memberRepository.findById(memberId).get();
            post.setMemberId(memberId);
            post.setMemberSubclub(msc.getId());
            post.setSubClubId(subclubId);
            post.setMemberName(m.getUsername());
            String[] currencies = post.getContent().split(" ");
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
                    mbr.save(msc);
                    try{
                        String setEvent = "Select ban_day into @a from lovelace.member_has_subclub where id =" + msc.getId()+";";
                        String setDrop="DROP EVENT IF EXISTS lovelace.post_event"+msc.getId()+";";
                        String setDrop2="DROP EVENT IF EXISTS lovelace.post_comment_event"+msc.getId()+";";
                        String createEvent="CREATE EVENT lovelace.post_event" +msc.getId()+" ON SCHEDULE AT @a+INTERVAL 5 MINUTE ON COMPLETION PRESERVE DO update lovelace.member_has_subclub set is_banned=0 where id="+msc.getId();

                        Statement stmt2 = conn.createStatement();
                        boolean setEventBool = stmt2.execute(setEvent);
                        boolean setDropBool = stmt2.execute(setDrop);
                        boolean setDropBool2 = stmt2.execute(setDrop2);

                        boolean setCreateEventBool = stmt2.execute(createEvent);
                        return "Slang";
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
                postRepository.save(post);
                return "Post saved";
            }
        }
        else{
            return "User is not member of this subclub";
        }

    }

    private String quote(String s) {
        return new StringBuilder()
                .append('\'')
                .append(s)
                .append('\'')
                .toString();
    }

    public Iterable<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public String updatePost(Integer postId,Post post){
        Post p=postRepository.findById(postId).get();
        p.setContent(post.getContent());
        postRepository.save(p);
        return "Updated";
    }

    public String deleteById(Integer postId) {
        postRepository.deleteById(postId);
        return "Deleted";
    }

    public String updateLike(Integer postId) {
        Post p=postRepository.findById(postId).get();
        int likes=p.getLikes();
        likes=likes+1;
        p.setLikes(likes);
        postRepository.save(p);
        return "Like saved";
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
}
