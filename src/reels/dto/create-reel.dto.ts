export class CreateReelDto {
    constructor(
        private readonly title: string,
        private readonly url: string,
        private readonly urlImage: string,
        private readonly userId: string,
        private readonly createAt: Date
    ) {}
}
