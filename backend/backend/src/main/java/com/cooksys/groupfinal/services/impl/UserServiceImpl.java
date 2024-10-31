package com.cooksys.groupfinal.services.impl;

import java.util.Set;

import com.cooksys.groupfinal.dtos.*;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.ProfileMapper;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
    private final BasicUserMapper basicUserMapper;
    private final FullUserMapper fullUserMapper;
	private final CredentialsMapper credentialsMapper;
    private final ProfileMapper profileMapper;

	@Override
	public FullUserDto login(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
        User userToValidate = findUser(credentialsDto.getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
            throw new NotAuthorizedException("The provided credentials are invalid.");
        }
        if (userToValidate.getStatus().equals("PENDING")) {
        	userToValidate.setStatus("JOINED");
        	userRepository.saveAndFlush(userToValidate);
        }
        return fullUserMapper.entityToFullUserDto(userToValidate);
	}

    @Override
    public BasicUserDto createUser(UserRequestDto userRequestDto) {
        validateUserRequest(userRequestDto);

        User userToCreate = fullUserMapper.requestDtoToEntity(userRequestDto);
        User existingUser = findUserActiveAndInactive(userToCreate.getCredentials().getUsername());
        if (existingUser != null) {
            existingUser.setActive(true);
            throw new BadRequestException("User already exists. If the user was deleted, they have been re-activated.");
        }

        userToCreate.getCredentials().setUsername(userToCreate.getProfile().getEmail());
        userToCreate.setActive(true);
        userToCreate.setStatus("PENDING");
        userRepository.saveAndFlush(userToCreate);

        return basicUserMapper.entityToBasicUserDto(userToCreate);
    }

    @Override
    public ProfileDto getUserProfile(Long id) {
        User user = userRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new NotFoundException(String.format("User ID: '%s' not found.", id)));
        return profileMapper.entityToDto(user.getProfile());
    }

    @Override
    public void addTeamToUsers(Set<User> users, Team team) {
        users.forEach(user -> user.getTeams().add(team));
        userRepository.saveAllAndFlush(users);
    }

    /************ HELPER METHODS ************/

    private User findUser(String username) {
        return userRepository.findByCredentialsUsernameAndActiveTrue(username)
                .orElseThrow(() -> new NotFoundException("The username provided does not belong to an active user."));
    }

    private User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("User ID: '%s' not found.", id)));
    }

    private User findUserActiveAndInactive(String username) {
        return userRepository.findByCredentialsUsername(username).orElse(null);
    }

    private void validateUserRequest(UserRequestDto userRequestDto) {
        if (userRequestDto == null || userRequestDto.getCredentials() == null || userRequestDto.getProfile() == null) {
            throw new BadRequestException("Credentials and profile are required.");
        }

        String username = userRequestDto.getCredentials().getUsername();
        String password = userRequestDto.getCredentials().getPassword();
        String firstName = userRequestDto.getProfile().getFirstName();
        String lastName = userRequestDto.getProfile().getLastName();
        String email = userRequestDto.getProfile().getEmail();
        String phone = userRequestDto.getProfile().getPhone();

        if (username == null) {
            throw new BadRequestException("Username is required.");
        }

        if (password == null) {
            throw new BadRequestException("Password is required.");
        }

        if (firstName == null) {
            throw new BadRequestException("First name is required.");
        }

        if (lastName == null) {
            throw new BadRequestException("Last name is required.");
        }

        if (email == null) {
            throw new BadRequestException("Email is required.");
        }

        if (phone == null) {
            throw new BadRequestException("Phone is required.");
        }
    }
}
