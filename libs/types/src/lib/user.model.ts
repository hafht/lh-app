import { DayOfTheWeekEnum } from './enums/date-time.enum';

export interface ApiUserSkillGroup {
  id: number;
  name: string;
  skills: Array<ApiUserSkill>;
}

export interface ApiUserSkill {
  id: number;
  name: string;
}



export interface ApiUserInfo {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  studioId: string;
  studioName: string;
  skillGroups: Array<ApiUserSkillGroup>,
  countryId: number;
  countryCode: string;
  countryName: string;
  languageId: number;
  languageCode: string;
  languageName: string;
  currencyId: number;
  currencyCode: string;
  currencyName: string;
  currencyPrefix: string;
  currencyPostfix: string;
  allowedFeatures: Array<number>;
  phone: string;
  signUpTimestamp: number;
  firstName: string;
  lastName: string;
  userTypeId: number;
  roleTypeId: number;
  roleId: string;
  roleName: string;
  allowedScreens: Array<{ screenId: number; permission: number }>;
  clientIds: Array<string>;
  studioSetting: any;
  address: string
  city: string;
  zipCode: string;
  timezoneId: number;
  dateFormat: number;
  dayOfTheWeek: DayOfTheWeekEnum;
  is24HourTime: boolean;
}

export type MyUserInfo = ApiUserInfo;
