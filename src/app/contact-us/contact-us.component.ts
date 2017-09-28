import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { GlobalConstantsRepository } from '../services/shared/globalConstantsRepository';

interface ContactFormData
{
    FullName : string;
    EmailId : string;
    Subject : string;
    Body : string;
}

@Component({
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})

export class ContactUsComponent {

  submitted: boolean = false;
  fname: string;
  subjectText: string;
  messageText: string;
  emailId: string;
  showMessageBox: boolean;
  submitMessage: string;
  private fields: string;

  onSubmit() {
    var email = <ContactFormData>{};
    email.Body = this.messageText;
    email.FullName = this.fname;
    email.Subject = this.subjectText;
    email.EmailId = this.emailId;

    this.http.post(this.globalConstants.getContactAPIUrl(), email).toPromise().then(e => {
        this.submitMessage = "Message submitted successfully";
    }).catch(a => 
    {
        this.submitMessage = "Message could not be submitted"; 
    });

    this.submitted = true;
    this.showMessageBox = true;
  }

  hideMessagebox() {
    this.showMessageBox = false;
  }
  constructor(private http:Http, private globalConstants: GlobalConstantsRepository) {
    this.submitMessage = "Message submitted successfully";
  }
}
