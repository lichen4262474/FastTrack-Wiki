package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

//This DTO will be used to receive announcement creation requests.
@NoArgsConstructor
@Data
public class AnnouncementRequestDto {
    private CredentialsDto credentials;
    private String title;
    private String message;
}