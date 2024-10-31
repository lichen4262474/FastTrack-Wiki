package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;

import java.util.Set;

public interface AnnouncementService {
    AnnouncementDto createAnnouncement(Long companyId, AnnouncementRequestDto announcementRequestDto);
    Set<AnnouncementDto> getAnnouncementsByCompany(Long companyId);
    AnnouncementDto updateAnnouncement(Long announcementId, AnnouncementRequestDto announcementRequestDto);
}

