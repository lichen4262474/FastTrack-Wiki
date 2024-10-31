package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

import java.util.Set;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")  // Allowing Angular localhost
public class TeamController {
	
	private final TeamService teamService;

	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public TeamDto getTeam(@PathVariable Long id) {
		return teamService.getTeam(id);
	}

	@GetMapping("/{id}/users")
	@ResponseStatus(HttpStatus.OK)
	public Set<BasicUserDto> getTeamUsers(@PathVariable Long id) {
		return teamService.getTeamUsers(id);
	}
}
