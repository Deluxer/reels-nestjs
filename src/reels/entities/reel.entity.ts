import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Reel extends Document {

    @Prop({
        index: true,
    })
    title: string;
    
    @Prop({
        index: true,
    })
    url: string;

    @Prop({
        index: true,
    })
    urlImage: string;

    @Prop({
        index: true,
    })
    userId: string;

    @Prop({
        index: true,
    })
    creatAt: Date;

}

export const ReelSchema = SchemaFactory.createForClass( Reel );