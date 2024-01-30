using System.Net;
using System.Net.Mail;
using API.Interfaces;

namespace API.Services
{
    public class EmailSenderService : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string message)
        {
            var mail = "zuberekpl2115@gmail.com";
            var pw = "zjrlsymuhxwtqdzq";

            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(mail, pw)
            };

            return client.SendMailAsync(
                new MailMessage(
                    from: mail,
                    to: email,
                    subject,
                    message
                )
            );
        }
    }
}