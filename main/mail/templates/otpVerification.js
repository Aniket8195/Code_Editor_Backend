const otpTemplate = (otp) => {
    return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>OTP Verification Email</title>
          <style>
              body {
                  background-color: #f4f4f4;
                  font-family: 'Courier New', monospace;
                  font-size: 16px;
                  line-height: 1.4;
                  color: #333333;
                  margin: 0;
                  padding: 0;
              }
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  text-align: center;
                  background-color: #fff;
                  border-radius: 5px;
                  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
              }
      
              .logo {
                  max-width: 200px;
                  margin-bottom: 20px;
              }
      
              .message {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 20px;
                  color: #1a73e8;
              }
      
              .body {
                  font-size: 16px;
                  margin-bottom: 20px;
              }
      
              .cta {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #1a73e8;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  font-weight: bold;
                  margin-top: 20px;
              }
      
              .support {
                  font-size: 14px;
                  color: #999999;
                  margin-top: 20px;
              }
      
              .highlight {
                  font-weight: bold;
                  color: #1a73e8;
              }
          </style>
      
      </head>
      
      <body>
          <div class="container">
              <a href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.svgrepo.com%2Fsvg%2F504224%2Fcode-editor&psig=AOvVaw3b-5x_ih4yxpskXooMz2nJ&ust=1710694307435000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCOC074Sf-YQDFQAAAAAdAAAAABAE"></a>
              <div class="message">OTP Verification Email</div>
              <div class="body">
                  <p>Dear User,</p>
                  <p>Thank you for registering with CodeSchool. To complete your registration, please use the following OTP
                      (One-Time Password) to verify your account:</p>
                  <h2 class="highlight">${otp}</h2>
                  <p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
                  Once your account is verified, you will have access to our platform and its features.</p>
              </div>
              <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                      href="mailto:info@codeschool.com">info@codeschool.com</a>. We are here to help!</div>
          </div>
      </body>
      
      </html>`;
};
module.exports = otpTemplate;