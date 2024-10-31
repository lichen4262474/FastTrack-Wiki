package com.cooksys.groupfinal.services.impl;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.ProjectService;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;

import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final CompanyRepository companyRepository;
    private final TeamRepository teamRepository;
    private final ProjectMapper projectMapper;

    // TODO: Implement findCompanyById and findTeamById methods
    private Company findCompanyById(Long companyId) {
        return companyRepository.findById(companyId)
                .orElseThrow(() -> new NotFoundException("Company not found with the provided ID"));
    }

    private Team findTeamById(Long teamId) {
        return teamRepository.findById(teamId)
                .orElseThrow(() -> new NotFoundException("Team not found with the provided ID"));
    }

    // TODO: Implement assignProjectToTeamInCompany method
    @Override
    public ProjectDto assignProjectToTeamInCompany(Long companyId, Long teamId, ProjectDto projectDto) {
        Company company = findCompanyById(companyId);
        Team team = findTeamById(teamId);

        if (!company.getTeams().contains(team)) {
            throw new NotFoundException("Team not found in the specified company");
        }

        if (projectDto == null || projectDto.getName() == null || projectDto.getDescription() == null) {
            throw new BadRequestException("A name and a description are required for the project.");
        }

        Project projectToSave = projectMapper.dtoToEntity(projectDto);
        projectToSave.setActive(true);
        projectToSave.setTeam(team);

        Project savedProject = projectRepository.saveAndFlush(projectToSave);

        return projectMapper.entityToDto(savedProject);
    }

    // TODO: Implement editProject method
    @Override
    public ProjectDto editProject(Long companyId, Long teamId, Long projectId, ProjectDto projectDto) {
        Company company = findCompanyById(companyId);
        Team team = findTeamById(teamId);

        if (!company.getTeams().contains(team)) {
            throw new NotFoundException("Team not found in the specified company");
        }

        Project existingProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new NotFoundException("Project not found with the provided ID"));

        if (!existingProject.getTeam().getId().equals(team.getId())) {
            throw new NotFoundException("The specified project is not associated with the given team");
        }

        // TODO: Implement the logic to update the project
        if (projectDto.getName() != null) {
            existingProject.setName(projectDto.getName());
        }
        if (projectDto.getDescription() != null) {
            existingProject.setDescription(projectDto.getDescription());
        }
        existingProject.setActive(projectDto.isActive());

        Project updatedProject = projectRepository.saveAndFlush(existingProject);

        return projectMapper.entityToDto(updatedProject);
    }

}
