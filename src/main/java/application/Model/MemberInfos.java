package application.Model;

import java.util.ArrayList;
import java.util.HashMap;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberInfos {

	private Integer id;
	private String name;
	private String mail;
	private ArrayList<HashMap<String, Object>> subclubList;
	
		// subclub
		// ban count
}
