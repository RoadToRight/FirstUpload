import nodemailer from 'nodemailer'

export const sendEmail = (email,link) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        port:587,
        secure:false,
        requireTLS:true,
        auth: {
          user: 'syedsameershah2008@gmail.com',
          pass: 'idrc plph zzvt iymi'
        }
      });
      
      var mailOptions = {
        from: 'syedsameershah2008@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        html: `\n\n <a href="${link}">Click Here To Varify</a>\n\nIf you have not requested for this please ignore it`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

   
      

}
