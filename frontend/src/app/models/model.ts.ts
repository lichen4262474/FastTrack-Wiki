// Credentials DTO
export interface CredentialsDto {
  username: string;
  password: string;
}

// Profile DTO
export interface ProfileDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

// Basic User DTO
export interface BasicUserDto {
  id: number; // Use `number` instead of `long` in TypeScript
  profile: ProfileDto;
  admin: boolean;
  active: boolean;
  status: string;
}

// Full User DTO
export interface FullUserDto {
  id: number;
  profile: ProfileDto;
  admin: boolean;
  active: boolean;
  status: string;
  companies: CompanyDto[];
  teams: TeamDto[];
}

// User Request DTO
export interface UserRequestDto {
  credentials: CredentialsDto;
  profile: ProfileDto;
  admin: boolean;
}

// Team DTO
export interface TeamDto {
  id: number;
  name: string;
  description: string;
  teammates: BasicUserDto[];
}

// Company DTO
export interface CompanyDto {
  id: number;
  name: string;
  description: string;
  teams: TeamDto[];
  users: BasicUserDto[];
}

// Announcement DTO
export interface AnnouncementDto {
  id: number;
  date: Date; // TypeScript uses `Date` instead of `timestamp`
  title: string;
  message: string;
  author: BasicUserDto;
}

// Project DTO
export interface ProjectDto {
  id: number;
  name: string;
  description: string;
  active: boolean;
  team: TeamDto;
}

// Team Request DTO
export interface TeamRequestDto {
  name: string;
  description: string;
  teammates: BasicUserDto[]; // Array of BasicUserDto
}

// Announcement Request DTO
export interface AnnouncementRequestDto {
  credentials: CredentialsDto;
  title: string;
  message: string;
}

//ProjectRequestDto
export interface ProjectRequestDto {
  name: string;
  description: string;
  active: boolean;
}
