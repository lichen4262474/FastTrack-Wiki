package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.TeamRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final TeamMapper teamMapper;
    private final BasicUserMapper basicUserMapper;

    @Override
    public TeamDto getTeam(Long id) {
        Team team = findTeamById(id);
        return teamMapper.entityToDto(team);
    }

    @Override
    public Set<BasicUserDto> getTeamUsers(Long id) {
        Team team = findTeamById(id);
        Set<User> teamUsers = team.getTeammates().stream()
                .filter(User::isActive)
                .collect(Collectors.toSet());
        return basicUserMapper.entitiesToBasicUserDtos(teamUsers);
    }

    @Override
    public TeamDto createTeam(TeamRequestDto teamRequestDto) {
        validateTeamRequest(teamRequestDto);

        Team existingTeam = findTeamByName(teamRequestDto.getName());
        if (existingTeam != null) {
            throw new BadRequestException(String.format("Team name '%s' already exists.", existingTeam.getName()));
        }

        Team teamToCreate = teamMapper.requestDtoToEntity(teamRequestDto);
        teamRepository.saveAndFlush(teamToCreate);

        return teamMapper.entityToDto(teamToCreate);
    }

    @Override
    public void setTeamCompany(Team team, Company company) {
        team.setCompany(company);
        teamRepository.saveAndFlush(team);
    }

    /************* HELPER METHODS *************/

    private Team findTeamById(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Team ID: %s was not found.", id)));
    }

    private Team findTeamByName(String name) {
        return teamRepository.findByName(name)
                .orElse(null);
    }

    private void validateTeamRequest(TeamRequestDto teamRequestDto) {
        if (teamRequestDto == null) {
            throw new BadRequestException("Bad Request: Team Request is 'null'.");
        }

        if (teamRequestDto.getName() == null || teamRequestDto.getName().isBlank()) {
            throw new BadRequestException("Team Name is required.");
        }

        if (teamRequestDto.getDescription() == null || teamRequestDto.getDescription().isBlank()) {
            throw new BadRequestException("Team Description is required.");
        }
    }
}
