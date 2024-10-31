package com.cooksys.groupfinal.services.impl;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.AnnouncementService;


import lombok.RequiredArgsConstructor;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {
    private final AnnouncementRepository announcementRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final AnnouncementMapper announcementMapper;
    private final CredentialsMapper credentialsMapper;

    @Override
    public AnnouncementDto createAnnouncement(Long companyId, AnnouncementRequestDto announcementRequestDto) {
        // Validate input
        if (announcementRequestDto == null || announcementRequestDto.getCredentials() == null
                || announcementRequestDto.getTitle() == null || announcementRequestDto.getMessage() == null) {
            throw new BadRequestException("Invalid announcement data.");
        }

        // Authenticate user
        Credentials credentials = credentialsMapper.dtoToEntity(announcementRequestDto.getCredentials());
        User user = userRepository.findByCredentialsUsernameAndActiveTrue(credentials.getUsername())
                .orElseThrow(() -> new NotAuthorizedException("Invalid credentials."));

        if (!user.isAdmin()) {
            throw new NotAuthorizedException("Only admin users can post announcements.");
        }

        // Find company
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new NotFoundException("Company not found."));

        // Create and save announcement
        Announcement announcement = new Announcement();
        announcement.setTitle(announcementRequestDto.getTitle());
        announcement.setMessage(announcementRequestDto.getMessage());
        announcement.setAuthor(user);
        announcement.setCompany(company);
        announcementRepository.saveAndFlush(announcement);

        return announcementMapper.entityToDto(announcement);
    }

    @Override
    public Set<AnnouncementDto> getAnnouncementsByCompany(Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new NotFoundException("Company not found."));
        Set<Announcement> announcements = company.getAnnouncements();
        return announcementMapper.entitiesToDtos(announcements);
    }



    @Override
    public AnnouncementDto updateAnnouncement(Long announcementId, AnnouncementRequestDto announcementRequestDto) {
        // Validate input
        if (announcementRequestDto == null || announcementRequestDto.getCredentials() == null) {
            throw new BadRequestException("Invalid announcement data.");
        }

        // Authenticate user
        Credentials credentials = credentialsMapper.dtoToEntity(announcementRequestDto.getCredentials());
        User user = userRepository.findByCredentialsUsernameAndActiveTrue(credentials.getUsername())
                .orElseThrow(() -> new NotAuthorizedException("Invalid credentials."));

        if (!user.isAdmin()) {
            throw new NotAuthorizedException("Only admin users can update announcements.");
        }

        // Find existing announcement
        Announcement announcement = announcementRepository.findById(announcementId)
                .orElseThrow(() -> new NotFoundException("Announcement not found."));

        // Update announcement details if provided
        if (announcementRequestDto.getTitle() != null) {
            announcement.setTitle(announcementRequestDto.getTitle());
        }

        if (announcementRequestDto.getMessage() != null) {
            announcement.setMessage(announcementRequestDto.getMessage());
        }

        // Save updated announcement
        announcementRepository.saveAndFlush(announcement);

        return announcementMapper.entityToDto(announcement);
    }


}
