package application.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Getter
@Setter
public class Answer {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer id;

    @Column(name="reply",nullable = false)
    private String reply;

    @Column(name="`option`",nullable = false)
    private char option;

    @Column(name="point",nullable = false)
    private int point;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    @JoinColumn(name = "question_id")
    private Question question;


    @ManyToMany(mappedBy = "answers")
    @JsonIgnore
    private Set<Member> members;

    
    
	@Override
	public String toString() {

		return "Answer [id=" + id + ", answer=" + reply + ", option=" + option + ", point=" + point + ", question="
				+ question + "]";

	}


	public Answer() {}
	
	public Answer(String reply, char option, int point) {
		this.reply = reply;
		this.option = option;
		this.point = point;
	}

    
}
