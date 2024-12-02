import { IsDate, IsNotEmpty } from "class-validator";

export class EventsDto {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    @IsDate()
    initialDate: Date;

    @IsNotEmpty()
    @IsDate()
    finishDate: Date;

}