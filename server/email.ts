import sgMail from '@sendgrid/mail';

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const msg = {
      to: options.to,
      from: 'notifications@hacksnub.com', // Replace with your verified sender
      subject: options.subject,
      text: options.text,
      html: options.html,
    };
    
    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export async function sendLeadNotification(leadData: {
  name: string;
  email: string;
  phone: string | null | undefined;
  company: string;
  employees: string;
}): Promise<boolean> {
  const adminEmail = 'admin@hacksnub.com'; // Replace with the actual admin email

  const subject = `New Lead: ${leadData.name} from ${leadData.company}`;
  
  const text = `
    New lead from the website:
    
    Name: ${leadData.name}
    Email: ${leadData.email}
    Phone: ${leadData.phone}
    Company: ${leadData.company}
    Company Size: ${leadData.employees}
  `;
  
  const html = `
    <h2>New Lead from HackSnub Website</h2>
    <p>A new lead has submitted the contact form:</p>
    <table border="0" cellpadding="5" cellspacing="0" style="border: 1px solid #ccc; border-radius: 5px;">
      <tr>
        <td><strong>Name:</strong></td>
        <td>${leadData.name}</td>
      </tr>
      <tr>
        <td><strong>Email:</strong></td>
        <td>${leadData.email}</td>
      </tr>
      <tr>
        <td><strong>Phone:</strong></td>
        <td>${leadData.phone}</td>
      </tr>
      <tr>
        <td><strong>Company:</strong></td>
        <td>${leadData.company}</td>
      </tr>
      <tr>
        <td><strong>Company Size:</strong></td>
        <td>${leadData.employees}</td>
      </tr>
    </table>
    <p>Please follow up with this lead as soon as possible.</p>
  `;
  
  return sendEmail({
    to: adminEmail,
    subject,
    text,
    html
  });
}