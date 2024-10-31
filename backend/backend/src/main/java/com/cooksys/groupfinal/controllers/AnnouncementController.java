package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.AnnouncementRequestDto;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

import java.util.Set;

@RestController
@RequestMapping("/announcements")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")  // Allowing Angular localhost
public class AnnouncementController {
	
	private final AnnouncementService announcementService;

	// Endpoint to create an announcement
	@PostMapping("/{companyId}")
	public AnnouncementDto createAnnouncement(@PathVariable Long companyId,
											  @RequestBody AnnouncementRequestDto announcementRequestDto) {
		return announcementService.createAnnouncement(companyId, announcementRequestDto);
	}

	// Endpoint to get announcements for a company
	@GetMapping("/company/{companyId}")
	public Set<AnnouncementDto> getAnnouncementsByCompany(@PathVariable Long companyId) {
		return announcementService.getAnnouncementsByCompany(companyId);
	}

	@PatchMapping("/{announcementId}")
	public AnnouncementDto updateAnnouncement(
			@PathVariable Long announcementId,
			@RequestBody AnnouncementRequestDto announcementRequestDto) {
		return announcementService.updateAnnouncement(announcementId, announcementRequestDto);
	}






}




