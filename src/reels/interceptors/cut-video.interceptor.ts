import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, of, tap, timeout } from "rxjs";
import * as FfmpegCommand from 'fluent-ffmpeg';
import { tmpdir } from 'os';

@Injectable()
export class CutVideoInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const req = context.switchToHttp().getRequest();
    const file = req.file;
  
    this.transformVideo(file);

    return next
    .handle();
  }

  transformVideo(file: any) {
    const startTimeInSeconds = 0;
    const fragmentDurationInSeconds = 20;
    FfmpegCommand()
    .clone()
    .input(`${ tmpdir() }/${ file.filename }`)
    .inputOptions([`-ss ${ startTimeInSeconds }`])
    .outputOptions([`-t ${ fragmentDurationInSeconds }`])
    .noAudio()
    .takeScreenshots(
      {
        count: 1,
        timemarks: ["00:00:00.000" ],
        filename: `%b`,
        size: "480x480",
        // size: "480x?",
      },
      `./static/screenshots/`
    )
    .on('error', (error) => {
      console.log(error);
    })
    .save(`./static/videos/${ file.filename }`);
  }

}