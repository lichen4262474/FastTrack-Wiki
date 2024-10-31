package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;

import java.util.Set;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);

   	BasicUserDto createUser(UserRequestDto userRequestDto);

	ProfileDto getUserProfile(Long id);

	void addTeamToUsers(Set<User> users, Team team);
}
