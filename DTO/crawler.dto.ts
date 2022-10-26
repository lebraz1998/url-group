import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";

export class CrawlerQueryDto {
  @IsNotEmpty()
  @IsString()
  u: string;
}

export class CrawlerParamDto {
  @IsNumber()
  id: number;
}

export class CrawlerBodyDto {
  @IsString()
  author?: string;
  @IsOptional()
  @IsDateString()
  date?: Date;
  @IsString()
  description?: string;
  @IsString()
  image?: string;
  @IsString()
  logo?: string;
  @IsString()
  publisher?: string;
  @IsString()
  title?: string;
  @IsString()
  video?: string;
  @IsString()
  locationName?: string;
  @IsString()
  streetAddress?: string;
  @IsString()
  addressCountry?: string;
  @IsString()
  addressLocality?: string;
  @IsString()
  postalCode?: string;
  @IsString()
  lang?: string;
}

export class CrawlerUpdateBodyDto {
  @IsOptional()
  @IsString()
  author?: string;
  @IsOptional()
  @IsDateString()
  date?: Date;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsString()
  image?: string;
  @IsOptional()
  @IsString()
  logo?: string;
  @IsOptional()
  @IsString()
  publisher?: string;
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
  @IsString()
  video?: string;
  @IsOptional()
  @IsString()
  locationName?: string;
  @IsOptional()
  @IsString()
  streetAddress?: string;
  @IsOptional()
  @IsString()
  addressCountry?: string;
  @IsOptional()
  @IsString()
  addressLocality?: string;
  @IsOptional()
  @IsString()
  postalCode?: string;
  @IsOptional()
  @IsString()
  lang?: string;
}
