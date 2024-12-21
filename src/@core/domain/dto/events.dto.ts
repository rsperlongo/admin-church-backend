import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { CategoryEnum } from "../enum/category.enum";

export class EventsDto {
    @IsUUID()
    id: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsEnum(CategoryEnum)
    category: CategoryEnum[];

    @IsNotEmpty()
    @IsDate()
    initialDate: Date;

    @IsNotEmpty()
    @IsDate()
    finishDate: Date;

}