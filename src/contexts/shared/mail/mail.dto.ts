export interface MailDto {
    to: string | string[],
    from: string,
    subject: string,
    template: string,
    context?: Object,
}