import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser'
import { GlobalConstantsRepository } from '../services/shared/globalConstantsRepository';
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

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
  
  constructor(
    private http:Http,
    private globalConstants: GlobalConstantsRepository,
    private gaService: GoogleAnalyticsService,
    private title: Title,
    private meta: Meta) {
    
    gaService.trackPageView('ContactPage');
    title.setTitle('Contact Us - Pixelated Planet')
    meta.addTags([
        { name: 'twitter:title', content: 'Contact Us - Pixelated Planet' },
        { property: 'og:title', content: 'Contact Us - Pixelated Planet' },
        { property: 'og:type', content: 'website'},
        { property: 'og:site_name', content: 'The Pixelated Planet'},
        { property: 'fb:app_id', content: '132676104124561'},
        { name: 'description', content: 'Contact us at Pixelated Planet with any questions, feedback or requests!' },
        { property: 'og:description', content: 'Contact us at Pixelated Planet with any questions, feedback or requests!' },
        { name: 'twitter:description', content: 'Contact us at Pixelated Planet with any questions, feedback or requests!' },
        { property: 'og:image', content: 'http://www.thepixelatedplanet.com/assets/img/yosemite.jpg' },
        { name: 'twitter:image', content: 'http://www.thepixelatedplanet.com/assets/img/yosemite.jpg' },
        { property: 'og:url', content: 'https://www.thepixelatedplanet.com/contact' },
        { name: 'twitter:site', content: 'https://www.thepixelatedplanet.com/contact' },
      ], true);

    this.submitMessage = "Message submitted successfully";
  }
}
