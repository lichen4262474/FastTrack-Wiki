package com.cooksys.groupfinal.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.dtos.ProjectDto;

@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")  // Allowing Angular localhost
public class ProjectController {
	
	private final ProjectService projectService;

	// Add Project to Team
	@PostMapping("/{companyId}/teams/{teamId}/projects")
	@ResponseStatus(HttpStatus.CREATED)
	public ProjectDto addProjectToTheTeam(
			@PathVariable Long companyId,
			@PathVariable Long teamId,
			@RequestBody ProjectDto projectDto
	) {
		return projectService.assignProjectToTeamInCompany(companyId, teamId, projectDto);
	}

	// Edit Project
	@PatchMapping("/{companyId}/teams/{teamId}/projects/{projectId}")
	public ProjectDto editProject(
			@PathVariable Long companyId,
			@PathVariable Long teamId,
			@PathVariable Long projectId,
			@RequestBody ProjectDto projectDto
	) {
		return projectService.editProject(companyId, teamId, projectId, projectDto);
	}

}
