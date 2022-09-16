export default function handler(req, res) {
  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    port: 587,     
    host: "smtp-mail.outlook.com",
       auth: {
        user: 'dummerzooke@outlook.com',
        pass: process.env.NEXT_PUBLIC_PASS
         },
         secure: false,
    tls: {
      rejectUnauthorized: false
  },
  });
  
  const mailData = {
      from: 'dummerzooke@outlook.com',
      to: req.body.email,
      subject: `${req.body.name}: Your Invoice for ${req.body.order}`,
      text: req.body.message + " | Sent from: ezPayBill" ,
      html: `<div>Greetings</div><div>Click <a href=" ${req.body.message}">here</a> to view the Invoice</div>
            <p>Sent from: ezPayBill</p>`
  }

  transporter.sendMail(mailData, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
  })

  console.log(req.body)
  res.send('success')
  }