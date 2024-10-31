package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.ProjectDto;

public interface ProjectService {


    ProjectDto assignProjectToTeamInCompany(Long companyId, Long teamId, ProjectDto projectDto);

    ProjectDto editProject(Long companyId, Long teamId, Long projectId, ProjectDto projectDto);

}
