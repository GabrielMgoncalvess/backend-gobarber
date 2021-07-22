
export default interface IMailProvider {
    SendMail(to: string, body: string): Promise<void>;
}