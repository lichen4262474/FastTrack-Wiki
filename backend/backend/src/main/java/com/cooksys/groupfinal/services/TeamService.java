package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Team;

import java.util.Set;

public interface TeamService {

    TeamDto getTeam(Long id);

    Set<BasicUserDto> getTeamUsers(Long id);

    TeamDto createTeam(TeamRequestDto teamRequestDto);

    void setTeamCompany(Team team, Company company);
}
